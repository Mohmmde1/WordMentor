# Base image with PyTorch
FROM python:3.12-slim AS base

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

# Install dependencies
COPY ./backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /app/backend/requirements.txt

# Stage 2: Copy the application code
FROM base AS final

# Set the working directory in the container
WORKDIR /app/backend

# Copy the rest of the application code
COPY ./backend /app/backend

# Copy the startup script into the container
COPY ./docker/backend/startup.sh /docker/backend/startup.sh

# Set execute permissions on the startup script
RUN chmod +x /docker/backend/startup.sh

# Start the Django application using the startup script
CMD ["/docker/backend/startup.sh"]
