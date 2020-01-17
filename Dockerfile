FROM node:latest
RUN mkdir -p /usr/src/centmovies
WORKDIR /usr/src/centmovies
COPY package.json /usr/src/centmovies
RUN npm install
COPY . /usr/src/centmovies
EXPOSE 4001
CMD ["npm", "start"]