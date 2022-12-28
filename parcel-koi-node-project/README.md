# parcel-koi.dump

This repo is following Foyzul Karim Advanced Node.js & Express Playlist

## Links

- https://github.com/foyzulkarim/parcelkoi
- https://youtube.com/playlist?list=PLEYpvDF6qy8avZ212mzmQ7VPSNHDZ1CNf
- https://github.com/shihab4t/parcel-koi.dump

## Tech Stacks

- Backend
  - Node.js
  - Express.js
  - MongoDB
  - Jest
- Frontend
  - React
  - Bulma
- Host
  - Docker
  - Kubernetes

## Application Flow

- Request -> Process Header Middleware -> Execute
  - Success -> Response Data -> Response
  - Handle Error -> Response Error -> Response

## Logging System

- Console
- File
- Mongo
- ElasticSearch

## Notes

1. up and running the express server
2. configure the express server
3. handle the routes of the server
- use directory import
- user async await import { handleErrors } from './middlewares/handleError'; it function
- 3 layer architecture
    - userController -> controller layer: process the http requests
    - userService -> service layer: process the object and send to data layer
    - mongoose wrapper -> data layer: process the data and get/set it to database

## Application Layers

- Server Layers: App config, Server config
  -> Services Layers: Bushiness Logic
    -> Data Layers: Mongoose
      -> Database or External Service Layers

## Controllers Layer Testing

```
get:
api response status should return 200
 body - array of users


post: status code should return 201
response body should return saved id

status should be 400 when username not sent
status should be 400 when username less than 3 characters
status should be 400 when username greater than 30 characters

model should have createdAt property when it is saved properly

put: status code should return 200
response body should return updated id


delete: status code should return 200
response body should return string a message

status code should return 400 when param is not specified 
```
