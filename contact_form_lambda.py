import json
import boto3
import os

# Create the SES client outside the handler for connection reuse
ses = boto3.client('ses')

# Environment variables
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'haadi.saqib@gmail.com')
RECEIVER_EMAIL = os.environ.get('RECEIVER_EMAIL', 'haadi.saqib@gmail.com')

# Consistent CORS headers for all responses
CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
}

def lambda_handler(event, context):
    print(f"Received event: {json.dumps(event, indent=2)}")

    # 1. Handle CORS preflight requests
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200, 
            'headers': CORS_HEADERS, 
            'body': json.dumps({'message': 'CORS preflight successful'})
        }

    # 2. Parse the incoming JSON body
    try:
        payload = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Invalid JSON'})
        }

    # 3. Extract and validate form data
    name = payload.get('name', '').strip()
    email = payload.get('email', '').strip()
    subject = payload.get('subject', '').strip()
    message = payload.get('message', '').strip()

    # Validate required fields
    if not name or not email or not subject or not message:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'All fields are required'})
        }

    # Basic email validation
    if '@' not in email or '.' not in email:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Invalid email format'})
        }

    # 4. Build the email parameters
    email_subject = f"Contact Form: {subject}"
    
    email_body_text = f"""
Contact Form Submission

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This message was sent from the LegalLink contact form.
    """.strip()

    email_body_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #2563eb; }}
            .message {{ background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2563eb; margin-top: 20px; }}
            .footer {{ background-color: #f8f9fa; padding: 15px; text-align: center; color: #666; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Contact Form Submission</h1>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Name:</span> {name}
            </div>
            <div class="field">
                <span class="label">Email:</span> {email}
            </div>
            <div class="field">
                <span class="label">Subject:</span> {subject}
            </div>
            <div class="message">
                <div class="label">Message:</div>
                <div>{message.replace('\n', '<br>')}</div>
            </div>
        </div>
        <div class="footer">
            This message was sent from the LegalLink contact form.
        </div>
    </body>
    </html>
    """

    ses_params = {
        'Source': SENDER_EMAIL,
        'Destination': {
            'ToAddresses': [RECEIVER_EMAIL],
        },
        'Message': {
            'Subject': {
                'Data': email_subject,
                'Charset': 'UTF-8'
            },
            'Body': {
                'Text': {
                    'Data': email_body_text,
                    'Charset': 'UTF-8'
                },
                'Html': {
                    'Data': email_body_html,
                    'Charset': 'UTF-8'
                }
            }
        }
    }

    # 5. Send the email
    try:
        print(f"Sending email from {SENDER_EMAIL} to {RECEIVER_EMAIL}")
        resp = ses.send_email(**ses_params)
        print(f"Email sent successfully with MessageId: {resp.get('MessageId')}")
    except Exception as e:
        print(f"Error sending email: {e}")
        return {
            'statusCode': 500,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'})
        }

    # 6. Return success response
    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps({
            'success': True, 
            'messageId': resp.get('MessageId'),
            'message': 'Contact form submitted successfully'
        })
    } 