#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

python manage.py seed_data

# Start the Django server
python manage.py runserver 0.0.0.0:8000
