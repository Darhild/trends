FROM node:12
WORKDIR /app
COPY build ./build
COPY index.js package.json package-lock.json ./
RUN npm ci --only=production
ARG NODE_ENV
ENV PORT="80" \
    TZ=Europe/Moscow \
    NODE_ENV=${NODE_ENV}
CMD ["node", "."]
