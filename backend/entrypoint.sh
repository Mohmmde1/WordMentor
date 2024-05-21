#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Check if we need to start the Celery worker
if [ "$1" = "celery" ]; then
    shift
    celery -A backend worker --uid nobody -l info "$@"
else
    # Start the Django server
    exec "$@"
fi
