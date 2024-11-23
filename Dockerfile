# Use Debian-based Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json initially
COPY package*.json ./

# Install dependencies, forcing a rebuild of native modules
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
