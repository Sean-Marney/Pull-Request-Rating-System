module.exports = {
  // I have no idea if any of this is correct
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
