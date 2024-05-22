#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Start Celery worker
celery -A backend_celery worker --uid nobody -l info