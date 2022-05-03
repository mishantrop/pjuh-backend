FROM node:16.15

WORKDIR /usr/src/app

# Copy necessary files
COPY package.json package-lock.json nest-cli.json tsconfig.build.json tsconfig.json src types ./

# Install deendencies
RUN npm ci
RUN npm install glob rimraf

# Build app
RUN npm run build
