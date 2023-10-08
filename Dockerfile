# Use an official Node.js runtime as the base image
FROM node:18-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . .

# Install project dependencies
RUN npm install

# Build the React app
RUN npm run build

# Expose a port (e.g., 3000) for your React app to run
EXPOSE 3000

# Serve the built React app
CMD [ "npx", "serve", "-s", "build" ]
