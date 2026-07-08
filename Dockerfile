# Stage 1: Build the client assets and install dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors first to utilize Docker layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies needed for compiling React)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Compile the Vite + React client into static production assets (dist folder)
RUN npm run build

# Prune development dependencies to keep the production image lean
RUN npm prune --production

# Stage 2: Minimalist production environment
FROM node:20-alpine

WORKDIR /app

# Copy compiled frontend assets from the build stage
COPY --from=builder /app/dist ./dist

# Copy production node_modules (pruned) and backend server files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/server ./server

# Default port configuration
EXPOSE 5000

# Set environment parameters
ENV PORT=5000
ENV NODE_ENV=production

# Start Express.js backend server
CMD ["node", "server.js"]
