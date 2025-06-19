# Base image
FROM node:20-alpine

# working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Expose app port (adjust if needed)
EXPOSE 4000 

# Start the app
CMD ["node", "src/server.js"]
