// 动态创建 style
// 把 source 塞进 style
// 把 style 放进文件 head 中

module.exports = function (source) {
  return `
    const tag = document.createElement('style')
    tag.innerHTML = ${source}
    document.head.appendChild(tag)
  `
}