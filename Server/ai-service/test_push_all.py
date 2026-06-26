import os
import redis
import json
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv(dotenv_path='f:/AIVO/Server/.env')
REDIS_URL = os.getenv('REDIS_URL')

redis_client = redis.from_url(REDIS_URL)

jobs = [
    {
        'jobId': str(ObjectId()),
        'type': 'analysis',
        'url': 'https://example.com'
    },
    {
        'jobId': str(ObjectId()),
        'type': 'competitor',
        'targetUrl': 'https://example.com',
        'competitorUrl': 'https://example.org'
    },
    {
        'jobId': str(ObjectId()),
        'type': 'llmstxt',
        'url': 'https://example.com'
    }
]

for job in jobs:
    redis_client.lpush('aivo_tasks', json.dumps(job))
    print(f"Pushed {job['type']} job: {job['jobId']}")
