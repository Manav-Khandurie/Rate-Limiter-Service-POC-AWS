import redis
import time
import os

URL = os.environ.get('URL')
redis_client = redis.Redis(host=URL, port=6379, db=0)

def is_allowed(resource, bucket_size, refill_rate, ttl_seconds):
    key = f"token_bucket:{resource}"
    current_tokens = redis_client.get(key)
    current_tokens = int(current_tokens) if current_tokens else bucket_size
    
    last_update_time = redis_client.get(f"last_update_time:{resource}")
    last_update_time = float(last_update_time) if last_update_time else time.time()
    time_since_last_update = time.time() - last_update_time
    
    tokens_to_add = int(time_since_last_update * (refill_rate / ttl_seconds))
    current_tokens = min(current_tokens + tokens_to_add, bucket_size)
    redis_client.setex(key, ttl_seconds, current_tokens)  # Set token bucket with TTL
    redis_client.setex(f"last_update_time:{resource}", ttl_seconds, time.time())  # Set last update time with TTL

    if current_tokens >= 1:
        redis_client.decr(key)
        return True
    else:
        return False

def lambda_handler(event, context):
    resource = event['resource']
    bucket_size = event['bucketsize']
    refill_rate = event['refillrate']
    ttl_seconds = event['ttl']
    url = event['url']

    if is_allowed(resource, bucket_size, refill_rate, ttl_seconds):
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
