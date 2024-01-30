import { fetchResource } from "./fetch-resource"

const parseURL = (url) => {
  const a = document.createElement('a')
  a.href = url || ''

  return {
    origin: a.origin
  }
}

export const importHTML = async (url) => {
  const html = await fetchResource(url)
  const template = document.createElement('div')

  template.innerHTML = html
  const scripts = template.querySelectorAll('script') // 所有 script 标签
  const links = template.querySelectorAll('link') // 所有外部样式
  const styles = template.querySelectorAll('style') // 所有嵌入样式

  // 获取 style 所有代码
  function getExternalStyleSheets() {
    return Promise.all(Array.from(links).concat(Array.from(styles)).map(style => {
      const href = style.getAttribute('href')
      const { origin } = parseURL(url) // url 处理只需要 hostname      

      // style 标签内的代码片段，直接返回
      if (!href) {
        return Promise.resolve(style.innerHTML)
      } else {
        // 这里获取 link 标签 href 文件内容
        return fetchResource(
          (href.startsWith('http') || href.startsWith('//')) ? href : `${origin}/${href.replace(/^./, '')}`
        )
      }
    }))
  }  

  // 获取 script 标签所有代码
  function getExternalScripts() {
    return Promise.all(Array.from(scripts).map(script => {
      const src = script.getAttribute('src')
      const { origin } = parseURL(url) // url 处理只需要 hostname      

      // script 标签内的代码片段，直接返回
      if (!src) {
        return Promise.resolve(script.innerHTML)
      } else {
        // 这里获取 script 标签 src 文件内容
        return fetchResource(
          (src.startsWith('http') || src.startsWith('//')) ? src : `${origin}/${src.replace(/^./, '')}`
        )
      }
    }))
  }

  // 执行 js 代码
  async function execScripts() {
    const scripts = await getExternalScripts()

    /**
     * 手动构建一个 commonJS 环境，参考 umd.js 
     */
    const module = { exports: {} }
    const exports = module.exports

    scripts.forEach(code => {
      // eval 可以访问外面变量      
      eval(code)
    })

    /**
    * 返回子应用的生命周期钩子，
    * - 但使用 window[xxx] 需要知道每一个子应用的名字，比较麻烦
    * - 可以使用 module.exports 返回 
    */
    // return window['my-vue3-app-app']
    return module.exports
  }

  return {
    template,
    getExternalStyleSheets,
    getExternalScripts,
    execScripts
  }
}