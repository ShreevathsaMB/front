# Use an official Node.js runtime as a parent image
FROM node:12

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
