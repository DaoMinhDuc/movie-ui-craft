# Use official Node.js image
FROM node:20-alpine

# Set the working directory in the container

WORKDIR /app 
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve
# Set the environment variable for production
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "3000"]