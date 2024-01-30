const path = require('path')
const UploadSourceMapWebpackPlugin = require('../../h3_manager/hcloud-monitor-sdk/src/plugins/uploadSourceMapWebpackPlugin');

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    },
    publicPath: '/',
    port: 8080
  },
  // webpack
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack(config) {
    config.resolve.alias.comps = path.join(__dirname, 'src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = '开发'
    } else {
      config.name = '生产'
    }
    config.plugins.push(
      new UploadSourceMapWebpackPlugin({ apiKey: 'eb21f9a0a85d11ecb9287db133539515', env: process.env.VUE_APP_ENV }),
    )
  },
  // 还是 webpack
  chainWebpack(config) {
    // icon-svg

  }
}