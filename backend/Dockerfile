# Use Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all backend files to the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to start the server
CMD ["node", "server.js"]
