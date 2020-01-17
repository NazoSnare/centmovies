FROM node:latest
RUN mkdir -p /centmovies
WORKDIR /centmovies
COPY package.json /centmovies
RUN npm install
COPY . /centmovies
EXPOSE 4001
CMD ["npm", "start"]