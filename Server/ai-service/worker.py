import os
import json
import time
import redis
from pymongo import MongoClient
import google.generativeai as genai
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Load environment variables from parent folder
load_dotenv(dotenv_path='../.env')

REDIS_URL = os.getenv('REDIS_URL')
MONGODB_URI = os.getenv('MONGODB_URI')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print("Starting AIVO Python AI Worker...")

redis_client = None
mongo_client = None

# Initialize Connections
if not all([REDIS_URL, MONGODB_URI, GEMINI_API_KEY]):
    print("WARNING: Missing essential environment variables. Check ../.env")
else:
    try:
        redis_client = redis.from_url(REDIS_URL)
        mongo_client = MongoClient(MONGODB_URI)
        
        genai.configure(api_key=GEMINI_API_KEY)
            
        print("Connections initialized successfully.")
        
    except Exception as e:
        print(f"Error connecting to services: {e}")

def process_analysis_job(job_data):
    """
    Simulates the 6 AIVO analysis engines on the extracted page content.
    """
    url = job_data.get('url')
    job_id = job_data.get('jobId')
    user_id = job_data.get('userId')
    
    print(f"[{job_id}] Processing URL: {url} for User: {user_id}")
    
    # Engine 1: Content Extraction
    print(f"[{job_id}] Extracting clean content...")
    time.sleep(1) # Simulating work/network lag
    
    # Engine 2: Semantic Scoring
    print(f"[{job_id}] Running Semantic Embeddings...")
    
    # Engine 3: Entity Extraction (Gemini)
    print(f"[{job_id}] Requesting Named Entity Recognition from Gemini...")
    time.sleep(1)
    
    # Simulate DB Update (assuming db exists)
    if mongo_client:
        try:
            # In actual implementation: update the doc in MongoDB
            # mongo_client.aivo.reports.update_one({'_id': job_id}, {'$set': {'status': 'Completed'}})
            print(f"[{job_id}] Saving result to MongoDB...")
        except Exception as err:
            print(f"Failed to update MongoDB: {err}")
            
    print(f"[{job_id}] Processing Complete!")

def listen_queue():
    if not redis_client:
        print("Cannot start listening without Redis connection.")
        return
        
    print("Worker listening on queue 'aivo_tasks'...")
    while True:
        try:
            # Block until an item is available in 'aivo_tasks' list
            result = redis_client.blpop("aivo_tasks", timeout=0)
            if result:
                _, data_bytes = result
                job_data = json.loads(data_bytes)
                process_analysis_job(job_data)
        except Exception as e:
            print(f"Error in queue listening loop: {e}")
            time.sleep(5)

if __name__ == "__main__":
    listen_queue()
