# uptime-monitoring-api-raw-node.js

A RESTFul API to monitor up or down time of user defined links. This is a raw node.js project without using any third party packages.

## Links

- https://youtube.com/playlist?list=PLHiZ4m8vCp9OmVWU2Qf9tZgKdyzoubOpj
- https://github.com/learnwithsumit/uptime-monitoring-api-raw-node
- https://github.com/shihab4t/uptime-monitoring-api-raw-node.js
- https://github.com/shihab4t/Software-Development/tree/main/TypeScript/Node.js-Series.Learn-with-Sumit
- https://documenter.getpostman.com/view/18985854/UVsSLNJV

# Docs

## Requirement Analysis

- Start the API Server
- Create, Edit, Delete User
- Token based authentication
- Logout Mechanism
- Set links & Up/Down
- Edit/Delete links & rate limit
- Check up/down time

## To run the app

There is no production dependencies but you can run this to better development experience

```zsh
yarn install # or with npm: npm install
```

Finally run the app in development mode

```zsh
yarn start # or with npm: npm start
```

Or in production run:

```zsh
yarn run production
```

## Schemas

### Users

```json
{
  "first_name": "Shihab",
  "last_name": "Mahamud",
  "phone": "017xxxxxxxx",
  "password": "xxxxxxx",
  "tos_agreement": true
}
```

### Token

```json
{
  "phone": "017xxxxxxxx",
  "id": "08oz1x2s6b9mcj62ffe9",
  "expire": 1647799120950
}
```

### Update Token

```json
{
  "id": "2tdcbrlntdk7enq87fb8",
  "extend": true
}
```

## RESTfull api routes

### users

- get user

```zsh
curl -X 'GET' \
'http://localhost:3000/users?phone=017xxxxxxxx'
```

- create user

```zsh
curl -X 'POST' \
'http://localhost:3000/users' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "first_name": "Shihab",
  "last_name": "Mahamud",
  "phone": "017xxxxxxxx",
  "password": "xxxxxxx",
  "tos_agreement": true
}'
```

- update user

```zsh
curl -X 'PUT' \
'http://localhost:3000/users' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "first_name": "Shihab ->",
  "last_name": "Mahamud",
  "phone": "017xxxxxxxx",
  "password": "xxxxxxx",
  "tos_agreement": true
}'
```

- delete user

```zsh
curl -X 'DELETE' \
'http://localhost:3000/users?phone=017xxxxxxxx'
```

### tokens

- get token

```zsh
curl -X 'GET' \
'http://localhost:3000/tokens?id=2tdcbrlntdk7enq87fb8'
```

- create token

```zsh
curl -X 'POST' \
'http://localhost:3000/tokens' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "phone": "017xxxxxxxx",
  "password": "xxxxxxx"
}'
```

- update token

```zsh
curl -X 'PUT' \
'http://localhost:3000/users' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "id": "2tdcbrlntdk7enq87fb8",
  "extend": true
}'
```

- delete token

```zsh
curl -X 'DELETE' \
'http://localhost:3000/tokens?id=08oz1x2s6b9mcj62ffe9'
```
