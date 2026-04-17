import os
import sys

# Fix Windows console encoding for emoji/unicode output
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Fix for "TypeError: Metaclasses with custom tp_new are not supported" on Python 3.14+
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

import json
import time
import traceback
import redis
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import google.generativeai as genai

# Pipeline Modules
from pipeline.extractor import extract_website_content
from pipeline.analyzer import analyze_content
from pipeline.simulator import run_simulation
from pipeline.competitor import run_competitor_analysis
from pipeline.llmstxt import run_llmstxt_generation

# Resolve path to Server/.env regardless of CWD
# worker.py is at: Server/ai-service/worker.py
# Server/.env is 1 level up: ai-service/ -> Server/.env
_script_dir = os.path.dirname(os.path.abspath(__file__))
_env_path = os.path.join(_script_dir, '../.env')
load_dotenv(dotenv_path=_env_path)

REDIS_URL = os.getenv('REDIS_URL')
MONGODB_URI = os.getenv('MONGODB_URI')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("Starting AIVO Python AI Worker...")
print(f"ENV Check - REDIS_URL: {'OK' if REDIS_URL else 'MISSING'}")
print(f"ENV Check - MONGODB_URI: {'OK' if MONGODB_URI else 'MISSING'}")
print(f"ENV Check - GEMINI_API_KEY: {'OK' if GEMINI_API_KEY else 'MISSING'}")

redis_client = None
mongo_client = None
db = None

# Initialize Connections
if not all([REDIS_URL, MONGODB_URI, GEMINI_API_KEY]):
    print("WARNING: Missing essential environment variables in Server/.env")
else:
    try:
        redis_client = redis.from_url(REDIS_URL)
        # Test Redis connection
        redis_client.ping()

        mongo_client = MongoClient(MONGODB_URI)
        # Test MongoDB connection
        mongo_client.admin.command('ping')
        db = mongo_client.get_database()
        
        genai.configure(api_key=GEMINI_API_KEY)
        print("[OK] Backend Connections initialized successfully.")
    except Exception as e:
        print(f"[ERROR] Error connecting to services: {e}")

def fail_job(job_id, error_msg):
    print(f"[{job_id}] FAILED: {error_msg}")
    if db is not None:
        try:
            db.analyses.update_one(
                {'_id': ObjectId(job_id)},
                {'$set': {'status': 'Failed', 'errorMessage': error_msg}}
            )
        except Exception as e:
            print(f"Could not update MongoDB on failure: {e}")

def process_analysis_job(job_data):
    url = job_data.get('url')
    job_id = job_data.get('jobId')
    
    print(f"\n--- Starting Job: {job_id} [{url}] ---")
    
    # 1. Update status to Extracting
    if db is not None:
        db.analyses.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Extracting'}})

    # 2. Extract HTML
    print(f"[{job_id}] Step 1: Extracting HTML Content...")
    ext_result = extract_website_content(url)
    if not ext_result['success']:
        return fail_job(job_id, f"Extraction failed: {ext_result.get('error')}")

    # 3. Update status to Analyzing
    if db is not None:
        db.analyses.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Analyzing'}})

    # 4. Gemini Analysis
    print(f"[{job_id}] Step 2: Running Gemini LLM SEO Analysis...")
    ai_result = analyze_content(ext_result)
    if not ai_result['success']:
        return fail_job(job_id, f"AI Analysis failed: {ai_result.get('error')}")

    # 5. Save Final Result to MongoDB
    print(f"[{job_id}] Step 3: Saving results to MongoDB...")
    metrics = ai_result['data']
    
    if db is not None:
        db.analyses.update_one(
            {'_id': ObjectId(job_id)},
            {'$set': {
                'status': 'Completed',
                'completedAt': time.strftime('%Y-%m-%dT%H:%M:%S.000Z', time.gmtime()),
                'scoreInfo': {
                    'aiVisibilityScore': metrics.get('aiVisibilityScore', 0),
                    'aiEnginesAnalyzed': 6,
                    'expectedCitations': metrics.get('expectedCitations', 0)
                },
                'semanticDensity': metrics.get('semanticDensity', 0),
                'entitiesFound': metrics.get('entitiesFound', [])
            }}
        )
    print(f"[{job_id}] Job Complete!")


def process_simulation_job(job_data):
    job_id = job_data.get('jobId')
    url = job_data.get('url')
    content = job_data.get('content')
    selected_models = job_data.get('selectedModels', [])
    
    print(f"\n--- Starting Simulation Job: {job_id} ---")
    
    if db is not None:
        db.simulations.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Extracting/Analyzing'}})

    # 1. Gather Content
    if url and not content:
        print(f"[{job_id}] Sim-Step 1: Extracting URL HTML Content...")
        ext_result = extract_website_content(url)
        if not ext_result['success']:
            error_msg = f"Extraction failed: {ext_result.get('error')}"
            print(f"[{job_id}] FAILED: {error_msg}")
            if db is not None:
                db.simulations.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': error_msg}})
            return
        content = ext_result['mainTextChunk']
    elif content:
        print(f"[{job_id}] Sim-Step 1: Using provided raw content...")
    else:
        error_msg = "No URL or content provided"
        if db is not None:
            db.simulations.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': error_msg}})
        return
        
    if db is not None:
        db.simulations.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Simulating LLMs'}})

    # 2. Run Gemini Multi-Model Simulator
    print(f"[{job_id}] Sim-Step 2: Simulating {len(selected_models)} LLM engines natively via Gemini 2.5 Flash...")
    sim_result = run_simulation(content, selected_models)
    
    if not sim_result['success']:
        error_msg = f"AI Simulation failed: {sim_result.get('error')}"
        print(f"[{job_id}] FAILED: {error_msg}")
        if db is not None:
            db.simulations.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': error_msg}})
        return

    # 3. Save Final Simulation JSON to DB
    print(f"[{job_id}] Sim-Step 3: Saving results to simulations MongoDB...")
    
    if db is not None:
        db.simulations.update_one(
            {'_id': ObjectId(job_id)},
            {'$set': {
                'status': 'Completed',
                'results': sim_result['data']
            }}
        )
    print(f"[{job_id}] Simulation Job Complete!")



def process_competitor_job(job_data):
    job_id = job_data.get('jobId')
    target_url = job_data.get('targetUrl')
    competitor_url = job_data.get('competitorUrl')

    print(f"\n--- Starting Competitor Job: {job_id} ---")

    if db is not None:
        db.competitors.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Extracting'}})

    # Extract both pages
    print(f"[{job_id}] Extracting target: {target_url}")
    target_ext = extract_website_content(target_url)
    if not target_ext['success']:
        err = f"Target extraction failed: {target_ext.get('error')}"
        print(f"[{job_id}] FAILED: {err}")
        if db is not None:
            db.competitors.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': err}})
        return

    print(f"[{job_id}] Extracting competitor: {competitor_url}")
    comp_ext = extract_website_content(competitor_url)
    if not comp_ext['success']:
        err = f"Competitor extraction failed: {comp_ext.get('error')}"
        print(f"[{job_id}] FAILED: {err}")
        if db is not None:
            db.competitors.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': err}})
        return

    if db is not None:
        db.competitors.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Analyzing'}})

    print(f"[{job_id}] Running Gemini competitor analysis...")
    result = run_competitor_analysis(
        target_ext['mainTextChunk'],
        comp_ext['mainTextChunk'],
        target_url,
        competitor_url
    )

    if not result['success']:
        err = f"AI analysis failed: {result.get('error')}"
        print(f"[{job_id}] FAILED: {err}")
        if db is not None:
            db.competitors.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': err}})
        return

    if db is not None:
        db.competitors.update_one(
            {'_id': ObjectId(job_id)},
            {'$set': {'status': 'Completed', 'results': result['data']}}
        )
    print(f"[{job_id}] Competitor Job Complete!")


def process_llmstxt_job(job_data):
    job_id = job_data.get('jobId')
    url = job_data.get('url')

    print(f"\n--- Starting LLMs.txt Job: {job_id} [{url}] ---")

    if db is not None:
        db.llmstxts.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Crawling'}})

    print(f"[{job_id}] Crawling: {url}")
    ext_result = extract_website_content(url)
    if not ext_result['success']:
        err = f"Crawl failed: {ext_result.get('error')}"
        print(f"[{job_id}] FAILED: {err}")
        if db is not None:
            db.llmstxts.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': err}})
        return

    if db is not None:
        db.llmstxts.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Generating'}})

    print(f"[{job_id}] Generating llms.txt via Gemini...")
    result = run_llmstxt_generation(ext_result['mainTextChunk'], url)

    if not result['success']:
        err = f"Generation failed: {result.get('error')}"
        print(f"[{job_id}] FAILED: {err}")
        if db is not None:
            db.llmstxts.update_one({'_id': ObjectId(job_id)}, {'$set': {'status': 'Failed', 'error': err}})
        return

    # Add unique IDs to sections so the frontend can use them
    import uuid
    data = result['data']
    for section in data.get('sections', []):
        section['id'] = str(uuid.uuid4())
        section['isOpen'] = True

    if db is not None:
        db.llmstxts.update_one(
            {'_id': ObjectId(job_id)},
            {'$set': {'status': 'Completed', 'results': data}}
        )
    print(f"[{job_id}] LLMs.txt Job Complete!")


def listen_queue():
    if not redis_client:
        print("Cannot start listening without Redis connection.")
        return
        
    print("Worker listening on queue 'aivo_tasks'... (Ctrl+C to stop)")
    
    # Exponential backoff parameters for Redis drops
    backoff = 1
    
    while True:
        try:
            result = redis_client.blpop("aivo_tasks", timeout=0)
            if result:
                _, data_bytes = result
                job_data = json.loads(data_bytes)
                
                job_type = job_data.get('type', 'analysis')
                if job_type == 'simulation':
                    process_simulation_job(job_data)
                elif job_type == 'competitor':
                    process_competitor_job(job_data)
                elif job_type == 'llmstxt':
                    process_llmstxt_job(job_data)
                else:
                    process_analysis_job(job_data)
                
            backoff = 1  # Reset backoff on success
            
        except Exception as e:
            print(f"Error in queue listening loop: {e}")
            traceback.print_exc()
            time.sleep(backoff)
            backoff = min(backoff * 2, 60)  # Capped at 60 seconds

if __name__ == "__main__":
    listen_queue()
