# Use official Node.js LTS image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Upgrade npm to latest
RUN npm install -g npm@latest

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .


