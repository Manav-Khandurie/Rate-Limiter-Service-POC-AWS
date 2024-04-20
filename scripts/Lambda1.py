import redis
import json
import time
#redis-cli -h rate-limiter-cache-0001-001.easvay.0001.use1.cache.amazonaws.com -p 6379
redis_client = redis.StrictRedis(host='rate-limiter-cache.easvay.clustercfg.use1.cache.amazonaws.com', port=6379, db=0)

def lambda_handler(event, context):
    # Parse input parameters from the event
    resource = event['resource']
    time_window = int(event['time_window'])  # Time window in seconds

    # Define rate limiting parameters
    max_requests = 100  # Maximum number of requests allowed in the time window
    refill_rate = 10    # Number of tokens to refill per second

    # Generate Redis key for the resource
    redis_key = f"rate_limit:{resource}"

    # Get current timestamp
    current_time = int(time.time())

    # Calculate time window start and end
    window_start = current_time - time_window
    window_end = current_time

    # Check if the resource key exists in Redis
    if not redis_client.exists(redis_key):
        # If key doesn't exist, initialize it with maximum tokens
        redis_client.set(redis_key, max_requests)
        redis_client.expire(redis_key, time_window)

    # Retrieve current token count
    current_tokens = int(redis_client.get(redis_key))

    # Calculate the number of tokens to refill since last check
    elapsed_time = current_time - int(redis_client.ttl(redis_key))
    refill_tokens = min(max_requests, current_tokens + refill_rate * elapsed_time)

    # Update token count in Redis
    redis_client.set(redis_key, refill_tokens)

    # Check if request can be processed
    if refill_tokens >= 1:
        # If tokens are available, decrement token count and allow request
        redis_client.decr(redis_key)
        return {
            'statusCode': 200,
            'body': json.dumps('Request allowed.')
        }
    else:
        # If tokens are exhausted, reject request
        return {
            'statusCode': 429,
            'body': json.dumps('Rate limit exceeded. Please try again later.')
        }
