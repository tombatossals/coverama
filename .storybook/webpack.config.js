const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = json.version;

module.exports = {
  resolve: {
    root: [
      path.resolve(__dirname, '../src/frontend'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }, {
        test: /\.scss$/,
        loader: `style-loader!css-loader?modules&localIdentName=[local]__[hash:base64:5]
                !sass-loader`,
      }, {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },
  sassLoader: {
    modules: true,
    includePaths: [
      path.resolve(__dirname, '../src/frontend'),
    ],
  },
};
