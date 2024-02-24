FROM node:20.10.0

WORKDIR /base

RUN chmod -R 755 ./

COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./src ./src/

RUN npm install --unsafe-perm --legacy-peer-deps

EXPOSE 3000

CMD [ "npm", "run", "start:dev"]

