var webpack = require('webpack');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

module.exports = {
  entry: glob.sync('./src/*.js'),
  output: {
    filename: "index.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },
  resolve:{
    extensions:['','.js','.json']
  }
};