const path = require('path')
// 打包公共库工具
const terserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'add-number': './src/lib.js',
    'add-number.min': './src/lib.js',
  },
  output: {
    filename: '[name].js',
    library: 'addNumber', // 打包库文件
    libraryTarget: 'umd', // 打包库使用的方式，一般推荐 umd
    libraryExport: 'default' // 打包处理掉 'default'， 可以直接使用函数名 addNumber
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new terserWebpackPlugin({
        test: /\.min\.js$/  // 判断什么文件需要压缩
      })
    ]
  }
}