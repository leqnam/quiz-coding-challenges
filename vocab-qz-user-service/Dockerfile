FROM node:18-alpine As development
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
# COPY --chown=node .npmrc ./
RUN node -v && npm -v
RUN npm install
# Bundle app source code
COPY --chown=node . .
RUN npm run build

# Base image for production
FROM node:18-alpine As production
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
# Copy the bundled code
COPY --from=development /home/node/app/dist ./dist

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3001 NODE_ENV=production
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]