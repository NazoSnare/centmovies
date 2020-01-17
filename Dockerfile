FROM node:latest
RUN mkdir -p /centmovies
WORKDIR /centmovies
COPY package.json /centmovies
RUN npm install
COPY . /centmovies
EXPOSE 3000
CMD ["npm", "start"]