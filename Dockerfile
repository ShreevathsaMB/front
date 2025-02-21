# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the application (if needed)
RUN npm run build # or yarn build

# Expose the port your application runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"] # Or serve the build folder with a static server.