// loader 是一个函数
//! 不可以是箭头函数
// 必须有返回值，返回一个 str buffer
// 支持配置 this.query
// 如何返回多个信息 this.callback
// 如何处理异步 this.async
// 如何处理多个 loader
module.exports = function (source) {
  console.log(this.query)
  return source.replace(/hello/g, 'hi')
}