from Lambda1 import lambda_handler
import json

with open('test_event.json') as f:
    test_event = json.load(f)

result = lambda_handler(test_event, None)
print(result)
