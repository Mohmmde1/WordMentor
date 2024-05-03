# Use the official Node.js image as the base image
FROM node:lts-alpine3.19

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json files
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./frontend .

# Expose the port on which the app runs
EXPOSE 3000

# COPY ./docker/frontend/startup.sh /docker/frontend/startup.sh

# Set execute permissions on the startup script
# RUN chmod +x /docker/frontend/startup.sh

# Start the Next.js application
CMD ["npm", "run", "dev"]
