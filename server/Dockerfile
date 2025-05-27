# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port (change if your backend uses a different port)
EXPOSE 5001

# Start the backend
CMD ["node", "server.js"]