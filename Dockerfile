# Use a slim Node.js base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (use RUN for multi-stage builds)
RUN npm install

# Switch to a smaller runtime image
FROM node:18-slim

# Copy only the production-ready app files
COPY . .

# Expose port (adjust if your app listens on a different port)
EXPOSE 3000

# Start the command defined in package.json (usually "npm start")
CMD [ "npm", "start" ]
