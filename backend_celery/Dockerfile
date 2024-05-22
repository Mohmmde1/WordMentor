# Use the official Python image as the base image
FROM python:3.12-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies and create a virtual environment
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    && python -m venv /opt/venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the virtual environment path
ENV PATH="/opt/venv/bin:$PATH"

# Set the working directory in the container
WORKDIR /app

# Copy only the requirements file first to leverage Docker's cache
COPY ./requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt

# Copy the rest of the application code
COPY . /app

# Copy the entrypoint script into the container and make it executable
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the entrypoint to the shell script
ENTRYPOINT ["/entrypoint.sh"]

# Expose the port the app runs on
EXPOSE 8000

