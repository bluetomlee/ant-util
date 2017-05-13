const glob = require('glob')

module.exports = {
  entry: glob.sync('./src/*.js'),
  output: {
    filename: 'index.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
}
