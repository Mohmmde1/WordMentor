from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_celery.settings')

# Initialize Celery application
app = Celery('backend_celery')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

# Optional: Define a Celery beat schedule if you're using periodic tasks
# from celery.schedules import crontab

# app.conf.beat_schedule = {
#     'add-every-30-seconds': {
#         'task': 'app1.tasks.add',
#         'schedule': 30.0,
#         'args': (16, 16)
#     },
#     'multiply-at-midnight': {
#         'task': 'app2.tasks.multiply',
#         'schedule': crontab(hour=0, minute=0),
#         'args': (4, 4),
#     },
# }

# Ensure you configure Celery logging to capture the task output
if __name__ == '__main__':
    app.start()
