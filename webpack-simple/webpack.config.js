const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), // 输出的文件目录，必须是绝对路径
    filename: 'main.js' // 输出的文件名称
  },
  mode: 'development'
}