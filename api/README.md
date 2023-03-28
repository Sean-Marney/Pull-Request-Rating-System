# Getting Started

- [Installing NPM Packages](#installing-npm-packages)
- [Setting up Environment Variables](#setting-up-environment-variables)
- [Available Commands](#available-scripts)

## Installing NPM Packages

### _Step 1_

Change directory to `/api` :

```
cd /api
```

### _Step 2_

Run the following command to install the required dependencies:

```
npm i
```

##### Installed NPM Packages

- `express` package - Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org/). **Learn more [here](https://www.npmjs.com/package/express)**
- `cors` package - CORS is a node.js package for providing a [Connect](http://www.senchalabs.org/connect/)/[Express](http://expressjs.com/) middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options. **Learn more [here](https://www.npmjs.com/package/cors)** -`dotenv` package - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). **Learn more [here](https://www.npmjs.com/package/dotenv)**
- `nodemon` package - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. **Learn more [here](https://www.npmjs.com/package/nodemon)**
- `mongoose` package - Mongoose client for Node.js with focus on storage [much more](https://mongoosejs.com/docs/). **Learn more [here](https://www.npmjs.com/package/mongoose)**
- `axios` package - Axios is a JavaScript library that provides an easy-to-use interface for creating HTTP requests from a web browser or Node.js environment. It can be used to send and recieve data from a variety of HTTP-based endpoints, such as REST APIs. **Learn more [here](https://www.npmjs.com/package/axios)**
- `bcrypt` package - A library to help in hashing passwords **Learn more [here](https://www.npmjs.com/package/bcrypt)**
- `jsonwebtoken` package - Package to generate JSON Web Token (JWT) which is a compact, URL-safe means of representing claims to be transferred between two parties. **Learn more [here](https://www.npmjs.com/package/jsonwebtoken)**
- `body-parser` package - Body Parser is a middleware library for Node.js/Express web applications that allows for parsing of incoming request bodies in a middleware before the handlers. **Learn more [here](https://www.npmjs.com/package/body-parser)**
- `express-async-handler` package - Express Async Handler is a middleware utility for Express applications that simplifies error handling in asynchronous route handlers. **Learn more [here](https://www.npmjs.com/package/express-async-handler)**
- `mathjs` package - Mathjs is a JavaScript library that provides a comprehensive set of mathematical functions/utlities to use in web applications and Node.js projects. **Learn more [here](https://www.npmjs.com/package/mathjs)**
- `mocha` package - Mocha is a JavaScript framework that runs on Node.js and in the browser, which helps create asynchronous tests. **Learn more [here](https://www.npmjs.com/package/mocha)**
- `supertest` package - Supertest is a Node.js library that provides a high-level abstraction for testing HTTP servers, allowing developers to simulate HTTP requests to a server without actually running it. **Learn more [here](https://www.npmjs.com/package/supertest)**
- `chai` package - Chai is an assertion library for JavaScript, often used with Mocha, to provide a set of functions for making assertions about the values and behaviours of code, allowing developers to write clear and expressive tests. **Learn more [here](https://www.npmjs.com/package/chai)**
- `chai-http` package - Chai HTTP is a plugin for the Chai library that provides a set of functions for making HTTP requests and assertions. **Learn more [here](https://www.npmjs.com/package/chai-http)**
- `sinon` package - Sinon is a JavaScript library for mocking objects/test spies, and for stubbing and mocking functions and objects in unit tests. **Learn more [here](https://www.npmjs.com/package/sinon)**
- `sinon-chai` package - Sinon-Chai is a plugin that integrates the Sinon library with the Chai assertion library, providing a set of Chai assertions that can be used to asert the behaviour of functions and methods that have been stubbed, mocked, or spied using Sinon. **Learn more [here](https://www.npmjs.com/package/sinon-chai)**
- `mongodb-memory-server` package - MongoDB Memory Server is a Node.js library that provides an in-memory instance of MongoDB for use in automated tests. It allows developers to test MongoDB related code without an external MongoDB server for more isolated tests. **Learn more [here](https://www.npmjs.com/package/mongodb-memory-server)**
- `nyc` package - Nyc is a command-line tool and Node.js module that provides code coverage analysis for JavaScript applications, often used with testing frameworks like Mocha. **Learn more [here](https://www.npmjs.com/package/nyc)**

## Setting up Environment Variables

### _Step 1_

Create a new file in `/api` called `.env`

```
├── api/
│   ├── config/
│   ├── .env <–––
│   ├── index.js
│   └── ...
├── ui/
└── ...
```

_This is where you will store your environment variables._

### _Step 2_

Add you environment variables:

```
PORT=8000
MONGO_URI='mongodb://localhost:27017' (check yours on MongoDB Compass)
```

## Available Commands

In the `/api` directory, you can run:

### `npm run build`

- Builds the server for production to the `dist` folder.
- It correctly bundles JavaScript in production mode and optimizes the build for the best performance.
- Your app is ready to be deployed!

### `npm start`

- Runs the server in the development mode.
- Open [http://localhost:8000](http://localhost:8000) to view it in Postman or in the browser.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

### `npm install`

##### (or `npm i`)

- Installs the required dependencies for development.


## Deployment

- The API is deployed on an EC2 instance. The code is passed to an S3 bucket which then syncs to the EC2 instance. In the pipeline, we ssh into the machine and then reload the server.
- The api route is http://13.48.23.250:8000/
