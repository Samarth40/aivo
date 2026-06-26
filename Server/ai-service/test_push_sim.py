import os
import redis
import json
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv(dotenv_path='f:/AIVO/Server/.env')
REDIS_URL = os.getenv('REDIS_URL')

redis_client = redis.from_url(REDIS_URL)

job_data = {
    'jobId': str(ObjectId()),
    'type': 'simulation',
    'url': 'https://example.com',
    'selectedModels': ['chatgpt', 'gemini']
}

redis_client.lpush('aivo_tasks', json.dumps(job_data))
print(f"Pushed simulation job: {job_data['jobId']}")
