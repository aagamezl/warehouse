FROM node:16.16-alpine

# Create Directory for the Container
WORKDIR /usr/src/app

# Install app dependencies
# COPY package*.json ./

# Copy all other source code to work directory
COPY --chown=node:node . /usr/src/app

# Run npm and install modules
RUN npm ci --only=production

# Copy all other source code to work directory
# ADD . /usr/src/app

# Run the container with node user
USER node

# Expose application port
EXPOSE 3000

# Run start command
CMD ["npm", "run", "start"]
