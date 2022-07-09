FROM node:16-alpine3.16

# Set the UID/GID of the "node" user to the IDs of the user using this Dockerfile
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN echo $USER_UID:$USER_GID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        apk --no-cache add shadow \
        && groupmod --gid $USER_GID node \
        && usermod --uid $USER_UID --gid $USER_GID node \
        && chown -R $USER_UID:$USER_GID /home/node; \
    fi
RUN apk --no-cache add postgresql-client

RUN mkdir /app && chown node:node /app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN mkdir -p node_modules && chown -R node:node node_modules

USER node

RUN npm install --no-save

COPY . ./

EXPOSE 3001

CMD ["npm", "start"]
