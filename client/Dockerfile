# //TODO: Stage 1: development
# Base on offical Node.js Alpine image
FROM node:16-alpine as development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json .

# Install dependencies
RUN yarn install && yarn cache clean

# Copy all files
COPY . .

# Build app
RUN yarn build

# //TODO: Stage 2: production
# Base on offical Nginx Alpine image
FROM nginx:1.21.5-alpine

COPY --from=development /app/out /usr/share/nginx/html

COPY --from=development /app/nginx.conf /etc/nginx/conf.d/default.conf

# Run yarn start script with Nginx when container starts
CMD [ "nginx", "-g", "daemon off;" ]