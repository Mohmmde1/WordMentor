# Use the official Python image as the base image
FROM python:3.12-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Create a virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Set the working directory in the container
WORKDIR /app/backend

# Install dependencies
COPY ./backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy the startup script into the container
COPY ./docker/backend/startup.sh /docker/backend/startup.sh

# Set execute permissions on the startup script
RUN chmod +x /docker/backend/startup.sh

# Start the Django application using the startup script
CMD ["/docker/backend/startup.sh"]
