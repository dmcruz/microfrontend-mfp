const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: ['react', 'react-dom'],
    }),
  ]
}

module.exports = merge(commonConfig, devConfig);