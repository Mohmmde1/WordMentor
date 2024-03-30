# Use a more specific Python base image
FROM python:3.12-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Pipenv
RUN pip install pipenv

# Set the working directory in the container
WORKDIR /app/backend

# Copy only the Pipfiles
COPY ./backend/Pipfile* ./

# Install project dependencies
RUN pipenv install --system --deploy --ignore-pipfile

# Copy the rest of the application code
COPY ./backend .

# Copy the startup script into the container
COPY ./docker/backend/startup.sh /docker/backend/startup.sh

# Set execute permissions on the startup script
RUN chmod +x /docker/backend/startup.sh

# Start the Django application using the startup script
CMD ["/docker/backend/startup.sh"]
