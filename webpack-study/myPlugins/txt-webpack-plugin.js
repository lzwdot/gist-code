// 插件的结构
module.exports = class texWebpackPlugin {
  // apply
  apply(compiler) {
    // 钩入 hooks

    // 异步钩子使用 tapAsync
    compiler.hooks.emit.tapAsync('texWebpackPlugin', (compilation, cb) => {
      // console.log(compilation.assets)

      compilation.assets['lzw.txt'] = {
        source: function () {
          return 'hello lzw.'
        },
        size: function () {
          return 1024
        }
      }
      cb()
    })

    // 同步钩子使用 tap, 没有 cb 了
    compiler.hooks.compile.tap('texWebpackPlugin', (compilation) => {
      // console.log(compilation)
    })
  }
}