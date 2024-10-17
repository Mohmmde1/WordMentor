# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend
REQUIRED_NODE_VERSION = 18.17.0

# Commands

help:
	@echo "Available commands:"
	@echo "  make install-backend     - Install backend dependencies (Pipenv or requirements.txt)."
	@echo "  make install-frontend    - Install frontend dependencies (npm or yarn)."
	@echo "  make run-backend         - Run Django backend."
	@echo "  make run-frontend        - Run frontend (Next.js)."
	@echo "  make run-all             - Run both backend and frontend concurrently."
	@echo "  make migrate             - Run Django migrations."
	@echo "  make clean-pyc           - Remove Python bytecode."

# Install backend dependencies using Pipenv or requirements.txt
install-backend:
	@echo "Installing backend dependencies..."
	cd $(BACKEND_DIR) && pipenv install --dev || pip install -r requirements.txt

# Install frontend dependencies (npm or yarn)
install-frontend:
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install || yarn install

# Check Node.js version for frontend
check-node-version:
	@echo "Checking Node.js version..."
	@if ! node -v | awk -v req_version=$(REQUIRED_NODE_VERSION) '{ exit !($$1 >= req_version) }'; then \
		echo "Error: You are using Node.js $$(node -v). Node.js version >= $(REQUIRED_NODE_VERSION) is required."; \
		exit 1; \
	fi

# Run Django backend
run-backend:
	@echo "Running Django backend..."
	cd $(BACKEND_DIR) && python manage.py runserver

# Run frontend (Next.js)
run-frontend: check-node-version
	@echo "Running frontend..."
	cd $(FRONTEND_DIR) && npm run dev

# Run both backend and frontend concurrently
run-all:
	@echo "Running both backend and frontend..."
	$(MAKE) -j2 run-backend run-frontend

# Django database migrations
migrate:
	@echo "Running Django migrations..."
	cd $(BACKEND_DIR) && python manage.py migrate

# Clean Python cache and bytecode files
clean-pyc:
	@echo "Removing Python bytecode..."
	find . -name '*.pyc' -delete
	find . -name '__pycache__' -delete
