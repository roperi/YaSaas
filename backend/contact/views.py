import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
import json

@api_view(['POST'])
def send_contact_email(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')

        send_mail(
            'Contact Form Submission',
            f'Name: {name}\nEmail: {email}\nMessage: {message}',
            os.environ.get('SOURCE_EMAIL'),  # Replace with your verified SES email
            [os.environ.get('DESTINATION_EMAIL')],  # Replace with your recipient email
            fail_silently=False,
        )

        return Response({'status': 'success'})
    else:
        return Response({'status': 'error'})
