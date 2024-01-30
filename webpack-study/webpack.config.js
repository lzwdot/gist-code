const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const texWebpackPlugin = require('./myPlugins/txt-webpack-plugin')

// 默认配置
module.exports = {
  // 入口 单页面应用（默认） 多页面应用
  // entry: './src/index.js',

  // 多入口 对应 多出口
  // entry 支持 字符串，对象，数组
  // 字符串 和 数组 是对象的单页面应用
  // 对象 可以是单页面应用，也可以多页面应用
  entry: {
    index: './src/index.js',
    list: './src/list.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'), // 输出的文件目录，必须是绝对路径
    filename: '[name]-[chunkhash:8].js', // 输出的文件名称, 多出口 name 对应 entry 里的: index/a
    assetModuleFilename: 'images/[hash][ext][query]' // webpack 5.x 图片等资源输出目录
  },
  mode: 'development', // none development production
  resolveLoader: {
    modules: ['node_modules', './myLoaders'] // 在配置的目录下寻找 module
  },
  // loader
  module: {
    rules: [
      //...
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        // 多个 loader 情况下，执行顺序是自后往前的
        use: ['style-loader', 'css-loader'],
      },
      // {
      //       //   test: /\.jpg$/,
      //       //   use: ''
      //       // }
      //...
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      // {
      //   test: /\.less$/,
      //   use: ['css-loader', 'postcss-loader', 'less-loader']
      // },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        include: path.resolve(__dirname, './src'),
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     name: '[name].[ext]',
        //     public: '../images', // css 中添加资源的目录
        //     outputPath: 'images', // 输出目录
        //     limit: 8192, // 字节，小于 8K 的图片转 base64
        //   }
        // },// 还是使用 webpack 4.x 的方法
        type: 'asset/resource', // webpack 5.0 的用法 相当于 url-loader
      },
      {
        test: /\.(woff|woff2|svg|eot)$/,
        include: path.resolve(__dirname, './src'),
        // 使用 webpack 4.x 的方法
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name].[ext]',
        //     public: '../fonts', // css 中添加资源的目录
        //     outputPath: 'fonts', // 输出目录
        //   }
        // },
        // webpack 5.0 的用法 相当于 file-loader
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     'replace-loader',
      //     {
      //       loader: 'replace-async-loader',
      //       options: {
      //         info: 'lzw'
      //       }
      //     }
      //   ]
      // }

      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  // 生产环境是否开启，根据具体需要，一把如果有监控系统，建议开启
  devtool: 'inline-source-map', //  source-map 打包比较慢 https://webpack.docschina.org/configuration/devtool/#root
  devServer: {
    port: 8080, // 端口
    open: true, // 自动打开浏览器
    proxy: { // 代理访问
      '/api': {
        target: 'http://localhost:8090/'
      }
    }
  },
  // plugin
  plugins: [
    new texWebpackPlugin(),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'] // 对应 entry 中的 index
    }),
    new htmlWebpackPlugin({
      template: './src/list.html',
      filename: 'list.html',
      chunks: ['list'] // 对应 entry 中的 list
    }),
    new miniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:4].css'
    })
  ]
}