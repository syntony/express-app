FROM node:alpine

# Env
ENV TIME_ZONE=Europe/Kiev

# Set the timezone in docker
#RUN apk --update add tzdata \
#   && cp /usr/share/zoneinfo/Europe/Kiev /etc/localtime \
#   && echo "Europe/Kiev" > /etc/timezone \
#   && apk del tzdata

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json ./
COPY yarn.lock ./

# Install all Packages
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN yarn install

# Copy all other source code to work directory
ADD . /usr/src/app

# Build
RUN yarn build

EXPOSE 3000
CMD [ "yarn start" ]