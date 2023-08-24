# funtoken

# A simple login/signup node service with tests

# Running server

```sh
node ./src/server.js
```

Starts server on 0.0.0.0:3000

# Routes

/signup
/login

# Tests

Tests can be ran outside of a container or inside of one

outside of a container

```sh
npm run test
```

inside a container

```sh
npm run test-container
```

if for some reason the container does not stop you can run the following

```sh
npm run stop-container
```
