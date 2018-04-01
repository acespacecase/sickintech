const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const javascript = {
  test: /\.(js)$/, 
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] } 
  }],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const uglify = new webpack.optimize.UglifyJsPlugin({ 
  compress: { warnings: false }
});

const config = {
  entry: {
    App: './public/javascripts/site.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    // new webpack.ProvidePlugin({
    //   $: "jquery", // Used for Bootstrap JavaScript components
    //   jQuery: "jquery", // Used for Bootstrap JavaScript components
    //   Popper: ["popper.js", "default"] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
    // })
  ]
};

process.noDeprecation = true;

module.exports = config;

// code from Wes Bos