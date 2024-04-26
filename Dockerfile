# Use an official Node.js runtime as the base image
FROM node:18-bullseye

# Set the TERM environment variable to xterm
ENV TERM xterm

# Install required packages
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . .

# Install project dependencies
RUN npm install

ARG BUILD_COMMAND=build

# Build the React app
RUN npm run ${BUILD_COMMAND}

# Expose a port (e.g., 3000) for your React app to run
EXPOSE 3000

# Serve the built React app
CMD [ "npx", "serve", "-s", "build" ]
