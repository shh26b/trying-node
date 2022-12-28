FROM node
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn --version
RUN yarn install --frozen-lockfile
COPY . .
RUN ls -la
EXPOSE 3000
CMD ["yarn", "start"]
