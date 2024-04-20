import redis
import time
import os

URL = os.environ.get('URL')
# Connect to Redis
redis_client = redis.Redis(host=URL, port=6379, db=0)

def is_allowed(resource, limit, window_size_seconds):
    key = f"sliding_window_log:{resource}"
    current_time = int(time.time())

    # Add the current timestamp to the log
    redis_client.zadd(key, {current_time: current_time})

    # Remove timestamps older than the sliding window
    redis_client.zremrangebyscore(key, '-inf', current_time - window_size_seconds)

    # Get the count of timestamps within the sliding window
    count = redis_client.zcount(key, '-inf', '+inf')

    # Check if the count exceeds the limit
    if count > limit:
        return False
    else:
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
