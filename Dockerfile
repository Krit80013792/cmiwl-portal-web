# Stage 1: Install dependencies
FROM node:22-alpine AS deps

# Install necessary packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies without modifying lock file
RUN npm install --frozen-lockfile

# Stage 2: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all application files
COPY . .

# Copy node_modules from the previous stage
COPY --from=deps /app/node_modules ./node_modules

ARG BUILDCOMMAND=build

# Build the application and install production dependencies
RUN npm run "$BUILDCOMMAND" && npm install --production --ignore-scripts --prefer-offline

# Stage 3: Create a minimal runtime image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create a user and group for running the application
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Permiss
RUN mkdir -p /app/public/cmi && chown -R nextjs:nodejs /app/public/cmi
RUN ln -s /media /app/public/cmi

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]