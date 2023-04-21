const path = require("path");
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
