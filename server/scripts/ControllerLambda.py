import boto3
import json

lambda_client = boto3.client('lambda')
def lambda_handler(event, context):

    function_name = event.get('function')
    payload = event.get('payload', {})

    function_arns = {
        'Lambda1-RL': 'arn:aws:lambda:us-east-1:247477386084:function:Lambda1-RL',
        'Lambda2-RL': 'arn:aws:lambda:us-east-1:247477386084:function:Lambda2-RL',
        'Lambda3-RL': 'arn:aws:lambda:us-east-1:247477386084:function:Lambda3-RL',
        'Test_Fun': 'arn:aws:lambda:us-east-1:247477386084:function:Test_Fun'
    }

    if function_name not in function_arns:
        return {
            'statusCode': 400,
            'body': 'Invalid function name',
            'name': function_name
        }

    try:
        response = lambda_client.invoke(
            FunctionName=function_arns[function_name],
            InvocationType='RequestResponse',  
            Payload=json.dumps(payload)
        )

        response_payload = json.load(response['Payload'])
        return response_payload;
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error invoking function: {str(e)}'
        }
