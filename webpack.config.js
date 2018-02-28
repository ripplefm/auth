const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MjmlPlugin = require('tde-webpack-mjml-plugin');
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';

const extractSassPlugin = new ExtractTextPlugin({
  filename: '[name].bundle.css'
});

const copyImagesPlugin = new CopyPlugin([
  { from: './src/public/images', to: 'images' }
]);

const renderMjmlPlugin = new MjmlPlugin(path.join('views', 'mjml'), {
  outputPath: path.join('views', 'emails')
});

const plugins = [extractSassPlugin, copyImagesPlugin, renderMjmlPlugin];

if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ warnings: false }));
}

module.exports = {
  entry: {
    app: ['./src/public/js/index.js', './src/public/stylesheets/main.scss']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'public')
  },
  devtool: production ? false : 'inline-source-map',
  module: {
    rules: [
      {
        test: /.scss$/,
        use: extractSassPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins
};
