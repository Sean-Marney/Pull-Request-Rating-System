# Getting Started with React

-   [Installing NPM Packages](#installing-npm-packages)
-   [Available Scripts](#available-scripts)

## Installing NPM Packages

### _Step 1_

Change directory to `/ui` :

```
cd /ui
```

### _Step 2_

Run the following command to install the required dependencies:

```
npm i
```

##### Installed NPM Packages

-   `react` package - React is a JavaScript library for creating user interfaces. **Learn more [here](https://www.npmjs.com/package/react)**
-   `react-dom` package - React DOM is a package that provides a bridge between React and the DOM in web browsers, allowing methods to render React components to the browser's DOM. **Learn more [here](https://www.npmjs.com/package/react-dom)**
-   `react-router-dom` package - React Router DOM is a JavaScript library that provides tools/components for implementing client-side routing in React applications, and is built on top of [react-router](https://www.npmjs.com/package/react-router). **Learn more [here](https://www.npmjs.com/package/react-router-dom)**
-   `react-scripts` package - React Scripts is a set of configuration and build scripts provided by Create React App. It includes pre-configured scripts for building, testing, and deploying a React application, as well as a development server for local development. **Learn more [here](https://www.npmjs.com/package/react-scripts)**
-   `react-cookie` package - React cookie lets to set, remove and retrieve cookies in a React application. **Learn more [here](https://www.npmjs.com/package/react-cookie)**
-   `web-vitals` package - Web Vitals is a JavaScript library that provides an easy way to measure and report key performance metrics for web pages, allowing developers to improve the user experience of their applications. **Learn more [here](https://www.npmjs.com/package/web-vitals)**
-   `axios` package - Axios is a JavaScript library that provides an easy-to-use interface for creating HTTP requests from a web browser or Node.js environment. It can be used to send and recieve data from a variety of HTTP-based endpoints, such as REST APIs. **Learn more [here](https://www.npmjs.com/package/axios)**
-   `@material-ui/core` package - Material UI is a library of React components that are designed to implement Google's Material Design principles, and includes a range of pre-made components that can be implemented. **Learn more [here](https://www.npmjs.com/package/@material-ui/core)**
-   `@material-ui/icons` package - Material UI Icons is a package that provides a collection of pre-made Material Design icons to use with Material UI. **Learn more [here](https://www.npmjs.com/package/@material-ui/icons)**
-   `@mui/icons-material` package - MUI Icons-Material is an alternative to Material UI Icons that also provides a collection of pre-made Material Design icons. **Learn more [here](https://www.npmjs.com/package/@mui/icons-material)**
-   `@mui/material` package - MUI Material is a React UI component library built on top of the Material Design system. It provides a collection of pre-designed, customisable and reusable UI components. **Learn more [here](https://www.npmjs.com/package/@mui/material)**
-   `@material-ui/lab` package - Material UI Lab is a package in the Material UI library that provides additional UI components/utilities that aren't included in Material UI Core. **Learn more [here](https://www.npmjs.com/package/@material-ui/lab)**
-   `@emotion/react` package - Emotion/react is a JavaScript package (part of the Emotion library) that provides tools for styling React components using CSS-in-JS. **Learn more [here](https://www.npmjs.com/package/@emotion/react)**
-   `@emotion/styled` package - Emotion/styled is a JavaScript package (part of the Emotion library) that allows developers to create styled custom components in React using CSS-in-JS. **Learn more [here](https://www.npmjs.com/package/@emotion/styled)**
-   `yup` package - Yup is a JavaScript library that allows developers to validate object schemas, usually to ensure data conforms to a particular format or set of requirements. **Learn more [here](https://www.npmjs.com/package/yup)**
-   `yup-password` package - Yup Password is a library that extends the functionality of the YUP validation library. It provides additional password validation capabilities. **Learn more [here](https://www.npmjs.com/package/yup-password)**
-   `moment` package - Moment is a JavaScript library which helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way. **Learn more [here](https://momentjs.com)**
-   `jest` package - Jest is a JavaScript testing framework used to test JavaScript code, originally written for React applications. It allows developers to write unit tests, integration tests, and end-to-end tests. **Learn more [here](https://www.npmjs.com/package/jest)**
-   `jest-environment-jsdom` package - Jest Environment JSDOM is an environment for Jest that allows tests to run in a browser-like environment using the JSDOM library. **Learn more [here](https://www.npmjs.com/package/jest-environment-jsdom)**
-   `react-test-renderer` package - React Test Renderer is a library for testing React components in a Jest environment. It provides a way to render React components to a virtual DOM, which can be inspected and tested using Jest's testing API. **Learn more [here](https://www.npmjs.com/package/react-test-renderer)**
-   `@testing-library/react` package - Testing Library for React is a JavaScript testing utility that provides a simple API for testing React components. It is built on top of the DOM testing library. **Learn more [here](https://www.npmjs.com/package/@testing-library/react)**
-   `@testing-library/user-event` package - User Event is a companion library to React's Testing Library. It provides utilities for simulating user events to closely re-create how a user would interact with the application. **Learn more [here](https://www.npmjs.com/package/@testing-library/user-event)**
-   `@testing-library/jest-dom` package - Jest DOM is a companion library for Jest. It provides custom Jest matchers that allow developers to test for specific DOM elements and their attributes. **Learn more [here](https://www.npmjs.com/package/@testing-library/jest-dom)**
-   `@babel/core` package - Babel Core is a JavaScript library that is part of the Babel toolchain. It is used to transpile modern JavaScript code into a version that is compatible with older browsers/environments. **Learn more [here](https://www.npmjs.com/package/@babel/core)**
-   `@babel/preset-env` package - Babel Preset-Env is a JavaScript library that is also a part of the Babel toolchain. It is used with Babel core and provides a set of pre-configured transformations based on the environment being targeted. **Learn more [here](https://www.npmjs.com/package/@babel/preset-env)**
-   `@babel/preset-react` package - Babel Preset React is a preset for babel that targets React applications and provides Babel with the necessary plugins to transform JSX syntax into standard JavaScript. **Learn more [here](https://www.npmjs.com/package/@babel/preset-react)**
-   `babel-jest` package - Babel Jest is a plugin for Jest that allows Babel to be used. **Learn more [here](https://www.npmjs.com/package/babel-jest)**

## Available Commands

In the `/ui` directory, you can run:

### `npm run build`

-   Builds the app for production to the `build` folder.
-   It correctly bundles React in production mode and optimizes the build for the best performance.
-   Your app is ready to be deployed!

### `npm start`

-   Runs the app in the development mode.
-   Open [http://13.49.102.10:3000](http://13.49.102.10:3000) to view it in the browser.
-   The page will reload if you make edits.
-   You will also see any lint errors in the console.

### `npm install`

##### (or `npm i`)

-   Installs the required dependencies for development.
