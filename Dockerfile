# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /mangahay-fe

# Install dependencies
# Use COPY for package.json and package-lock.json separately for better caching
COPY package*.json ./
RUN npm ci --force

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /mangahay-fe

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production --force

# Copy the build artifacts from the builder stage
COPY --from=builder /mangahay-fe/.next ./.next
COPY --from=builder /mangahay-fe/public ./public
COPY --from=builder /mangahay-fe/node_modules ./node_modules
COPY --from=builder /mangahay-fe/package.json ./package.json

# Expose the application port
EXPOSE 3001

# Start the Next.js application
CMD ["npm", "run", "start"]
