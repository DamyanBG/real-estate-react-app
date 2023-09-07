# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all source files to the container
COPY . .

# Build the React app
RUN npm run build

# Expose a port (e.g., 3000) for your React app to run
EXPOSE 3000

# Serve the built React app
CMD [ "npx", "serve", "-s", "build" ]
