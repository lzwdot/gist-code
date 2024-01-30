const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*' // qiankun 使用 fetch 需要跨域
    },
    port:8091
  },
  configureWebpack: {   
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`, // webpack5:jsonpFunction->chunkLoadingGlobal
    }
  },

  // 打包路径
  outputDir:'../dist/vue3-dist',
  publicPath:'/vue3-dist/'
})
