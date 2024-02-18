# Use a Node.js base image with a specified version
FROM node:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install app dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt.js application
RUN pnpm run build

# Expose port 2429
EXPOSE 2429

# Start the Nuxt.js app
CMD ["pnpm", "run", "start"]
