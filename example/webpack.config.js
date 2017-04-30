var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react-pane': path.join(__dirname, '..', 'src')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, '..', 'src')
    },
    {
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }
    ]
  }
};
