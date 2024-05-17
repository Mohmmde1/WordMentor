#!/bin/bash

# Navigate to the directory where manage.py is located
cd /app/backend


# Manage migrations
python3 manage.py makemigrations
python3 manage.py migrate

# Run Django server
python manage.py runserver 0.0.0.0:8000
