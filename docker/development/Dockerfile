# docker/development/Dockerfile

# Base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /usr/src/backend-app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .
COPY .env.development .env

# Generate Prisma client
RUN npx prisma generate

# Expose app port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
