from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'call-api-every-minute': {
        'task': 'FoodApp.tasks.tasks.call_api',
        'schedule': crontab(minute='*'),
    },
}
