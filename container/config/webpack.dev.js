const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      }
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig);