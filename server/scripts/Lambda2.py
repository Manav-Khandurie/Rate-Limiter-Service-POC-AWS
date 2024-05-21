import redis
import time
import os

URL = os.environ.get('URL')
# redis_client = redis.Redis(host=URL, port=6379, db=0)
redis_client = redis.Redis.from_url(URL)
def is_allowed(resource, limit, window_size_seconds):
    key = f"fixed_window:{resource}"
    current_count = redis_client.get(key)
    current_count = int(current_count) if current_count else 0
    
    if current_count >= limit:
        return False
    
    current_count += 1
    redis_client.setex(key, window_size_seconds, current_count)
    return True

def lambda_handler(event, context):
    resource = event['resource']
    limit = event['limit']
    window_size_seconds = event['window_size_seconds']
    url = event['url']

    if is_allowed(resource, limit, window_size_seconds):
        # Perform your operation
        return {
            'statusCode': 200,
            'body': f"Allowed request to {url}"
        }
    else:
        return {
            'statusCode': 429,
            'body': f"Rate limit exceeded for {url}"
        }
