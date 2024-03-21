#!/bin/bash

# Navigate to the directory where manage.py is located
cd /app/backend

# Check if Pipfile.lock exists
if [ -f "Pipfile.lock" ]; then
    # Install dependencies using pipenv
    pipenv install --system --deploy

    # Manage migrations
    python3 manage.py makemigrations
    python3 manage.py migrate
fi

# Run Django server
python manage.py runserver 0.0.0.0:8000
