#!/bin/sh

# Navigate to the directory where manage.py is located
cd /app

# Apply database migrations
python manage.py makemigrations
python manage.py migrate


# Start the Django server
python manage.py runserver 0.0.0.0:8000
