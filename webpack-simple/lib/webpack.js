const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')

module.exports = class webpack {
  constructor(options) {
    // console.log(options)
    const {entry, output} = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  run() {
    const info = this.parse(this.entry)

    // 输出依赖图谱
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const {yilai} = item

      for (let j in yilai) {
        this.modules.push(this.parse(yilai[j]))
      }
    }

    // 数据结构转换 arr->obj
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = item
    })

    this.file(obj)
  }

  parse(entryFile) {
    // 读取入口文件
    const content = fs.readFileSync(entryFile, 'utf-8')

    // 解析内容为 ast 树
    const ast = parser.parse(content, {sourceType: 'module'})

    // 过滤 ast 树
    const dirname = path.dirname(entryFile)

    //分析依赖 以及依赖路径
    // 内容处理
    const yilai = {}
    traverse(ast, {
      ImportDeclaration({node}) {
        const newPathName = './' + path.join(dirname, node.source.value)
        yilai[node.source.value] = newPathName
      }
    })

    // ast 转 js
    const {code} = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return {
      entryFile,
      yilai,
      code
    }
  }

  file(code) {
    // 生产文件，放入到 dist 的目录
    const filePath = path.join(this.output.path, this.output.filename)

    // 生产 bundle 文件内容
    const newCode = JSON.stringify(code)

    const bundle = `(function (modules) {
      function require(module) {
        function pathRequire(relaPath) {
          // relaPath: ./a.js -> ./src/a.js
          return require(modules[module].yilai[relaPath])
        }
        const exports = {};
        (function (require,exports, code) {
          eval(code)
        })(pathRequire,exports, modules[module].code)
        
        return exports
      }

      require('${this.entry}')
    })(${newCode})`

    // webpackBootstrap
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}
