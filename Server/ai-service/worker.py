import os

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

load_dotenv(dotenv_path='../.env')

REDIS_URL = os.getenv('REDIS_URL')
MONGODB_URI = os.getenv('MONGODB_URI')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("Starting AIVO Python AI Worker...")

redis_client = None
mongo_client = None
db = None

# Initialize Connections
if not all([REDIS_URL, MONGODB_URI, GEMINI_API_KEY]):
    print("WARNING: Missing essential environment variables in ../.env")
else:
    try:
        redis_client = redis.from_url(REDIS_URL)
        mongo_client = MongoClient(MONGODB_URI)
        db = mongo_client.get_database() # Uses the DB specified in MONGODB_URI
        
        genai.configure(api_key=GEMINI_API_KEY)
        print("✅ Backend Connections initialized successfully.")
    except Exception as e:
        print(f"❌ Error connecting to services: {e}")

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
                    'aiEnginesAnalyzed': 6, # Future enhancement to hit more engines
                    'expectedCitations': metrics.get('expectedCitations', 0)
                },
                'semanticDensity': metrics.get('semanticDensity', 0),
                'entitiesFound': metrics.get('entitiesFound', [])
            }}
        )
    print(f"[{job_id}] Job Complete!")


def listen_queue():
    if not redis_client:
        print("Cannot start listening without Redis connection.")
        return
        
    print("🚀 Worker listening on queue 'aivo_tasks'...")
    
    # Exponential backoff parameters for Redis drops
    backoff = 1
    
    while True:
        try:
            result = redis_client.blpop("aivo_tasks", timeout=0)
            if result:
                _, data_bytes = result
                job_data = json.loads(data_bytes)
                process_analysis_job(job_data)
                
            backoff = 1 # Reset backoff on success
            
        except Exception as e:
            print(f"Error in queue listening loop: {e}")
            traceback.print_exc()
            time.sleep(backoff)
            backoff = min(backoff * 2, 60) # Capped at 60 seconds

if __name__ == "__main__":
    listen_queue()
