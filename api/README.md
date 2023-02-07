# Getting Started

- [Installing NPM Packages](#installing-npm-packages)
- [Setting up Environment Variables](#setting-up-environment-variables)
- [Available Scripts](#available-scripts)

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
