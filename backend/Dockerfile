# Use a lightweight Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy dependencies first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
