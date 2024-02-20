from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BE.settings')

app = Celery('BE')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

CELERY_BEAT_SCHEDULE = {
    'call-api-every-minute': {
        'task': 'FoodApp.tasks.tasks.call_api',
        'schedule': {
            'every': 60,  # Every 60 seconds (1 minute)
            'relative': True,  # Use relative scheduling
        },
    },
}
