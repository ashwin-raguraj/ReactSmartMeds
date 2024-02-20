# tasks.py

from celery import shared_task
import requests

@shared_task
def call_api():
    response = requests.get('http://127.0.0.1:8000/api/times/')
    # Process the response if needed
