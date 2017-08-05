const path = require('path')
const webpack = require('webpack')

const publicPath = path.resolve(__dirname, 'dist')

module.exports = {
  entry: {
    index: [
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    path: publicPath,
    // 组件采用UMD格式打包
    libraryTarget: 'umd',
    // 组件名称
    filename: '[name].js?[hash]',
  },
  resolve: {
    extension: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },
  plugins: [
    // 出现异常不退出进程
    new webpack.NoErrorsPlugin(),
    // 压缩
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
  ],
}
