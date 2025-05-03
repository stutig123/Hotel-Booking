# Step 1: Use the official Node.js Alpine image for the build environment
FROM node:18-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or bun.lockb) files into the container
COPY package*.json ./
# If you use bun as the package manager, copy bun.lockb instead:
# COPY bun.lockb ./

# Step 4: Install dependencies using npm or bun (adjust according to your package manager)
RUN npm install
# If you're using bun, run the following instead:
# RUN bun install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Build the app
RUN npm run build
# If you're using bun, run the following instead:
# RUN bun build

# Step 7: Use Nginx to serve the build output
FROM nginx:alpine

# Step 8: Copy the build output from the previous build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 (default for Nginx)
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
