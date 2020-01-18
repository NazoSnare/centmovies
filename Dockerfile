FROM node:latest
RUN mkdir -p /usr/src/centmovies
WORKDIR /usr/src/centmovies
COPY package.json /usr/src/centmovies
VOLUME /mnt/c/Users/malcom.m.miya/2020/centmovies /usr/src/centmovies
RUN npm install
COPY . /usr/src/centmovies
EXPOSE 3000
CMD ["npm", "start"]