const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const glob = require('glob')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))


  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    const pageName = match[1]

    entry[pageName] = entryFile
    htmlWebpackPlugins.push(new htmlWebpackPlugin({
      template: path.join(__dirname, `./src/${pageName}/index.html`),
      filename: `${pageName}/index.html`,
      chunks: `[${pageName}]` // 对应 entry 里的: index/list
    }))
  })

  return {
    entry, htmlWebpackPlugins
  }
}

const {entry, htmlWebpackPlugins} = setMPA()
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './mpa'), // 输出的文件目录，必须是绝对路径
    filename: 'js/[name]-[chunkhash:8].js', // 输出的文件名称, 多出口 name 对应 entry 里的: index/list
    assetModuleFilename: 'images/[hash][ext][query]' // webpack 5.x 图片等资源输出目录
  },
  mode: 'development', // none development production
  // loader
  module: {
    rules: [
      //...
      {
        test: /\.css$/,
        // 多个 loader 情况下，执行顺序是自后往前的
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset/resource', // webpack 5.0 的用法 相当于 url-loader
      },
      {
        test: /\.(woff|woff2|svg|eot)$/,
        // webpack 5.0 的用法 相当于 file-loader
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
    ]
  },

  // plugin
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new miniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:4].css'
    })
  ]
}