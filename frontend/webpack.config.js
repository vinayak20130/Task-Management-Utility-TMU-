const path = require('path-browserify');
const os = require('os-browserify/browser');

module.exports = {
  // other configurations...
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  }
};
