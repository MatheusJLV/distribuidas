const path = require('path');
const webpack = require('webpack');
const isCiBuild = !!process.env.CI
if(!isCiBuild) {
  require('dotenv').config()
}


module.exports = {
  entry: './build/public/js/main.js',
  output: {
    filename: 'prueba.js',
    path: path.resolve(__dirname, './build/public/js'),
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    crypto: 'empty',
    net: 'empty',
    tls: 'empty'
  },plugins: [
    // ... other plugins if you have any
    new webpack.DefinePlugin({
      // pull in your individual .env vars
      GOOGLE_APPLICATION_CREDENTIALS: JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    }),
  ]
};