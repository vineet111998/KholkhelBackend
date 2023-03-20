FROM node:16
RUN mkdir -p /home/node/app/node_modules && chown -R node /home/node/app
WORKDIR /home/node/app



ENV DATABASE_IP=162.254.35.5
ENV PORT=27017
ENV DATABASE_NAME=GameApi
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node . .
EXPOSE 8000
CMD [ "node", "index.js" ]
