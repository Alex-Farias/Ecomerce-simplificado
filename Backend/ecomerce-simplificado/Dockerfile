# Step 1: Use official Node.js image from Docker Hub
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Step 4: Install application dependencies
RUN npm install

# Step 5: Copy the rest of your application files to the container
COPY . .

# Step 6: Expose the app port (make sure it matches with APP_PORT from .env)
EXPOSE ${APP_PORT}

# Step 7: Define the command to run the application in development mode
CMD ["npm", "run", "start:dev"]
