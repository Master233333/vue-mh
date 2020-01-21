const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin');

module.exports = merge(config, {
  mode: 'production',
  entry: {
    'index': './src/index.ts',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new DropConsoleWebpackPlugin({
      drop_log: true,
      drop_info: true,
      drop_warn: false,
      drop_error: false,
    }),
  ],
});
