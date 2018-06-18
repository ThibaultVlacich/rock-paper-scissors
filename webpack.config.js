const path = require('path');

module.exports = {
  entry: './src/main/js/app.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: __dirname,
    filename: './src/main/resources/static/built/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000000,
          name: '[name].[hash:7].[ext]',
          outputPath: './src/main/resources/static/built/img/',
          publicPath: '/built/img/',
        },
      },
      {
        test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: './src/main/resources/static/built/fonts/',
          publicPath: '/built/fonts/',
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
  resolve: {
    alias: {
      Pages: path.resolve(__dirname, 'src/main/js/pages/'),
      Styles: path.resolve(__dirname, 'src/main/scss/'),
    },
  },
};
