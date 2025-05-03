# Stage 1: Build frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Setup backend and serve frontend
FROM node:18
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend ./backend

# Copy built frontend into backend folder
COPY --from=frontend-builder /app/frontend/dist ./backend/dist

# Set working directory to backend and expose port
WORKDIR /app/backend
EXPOSE 5000

CMD ["node", "server.js"]
