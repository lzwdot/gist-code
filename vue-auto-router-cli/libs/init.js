const {promisify} = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const {clone} = require('./download')
const open = require('open')

// 输出流可以引入到主进程输出流，promise api 风格
const spawn = async (...args) => {
  const options = args[args.length - 1]
  // 兼容下 window
  if (process.platform === 'win32') {
    console.log('win32')

    /**
     * options.cmd = options.cwd
     * delete options.cwd
     * 设置 shell 选项为 true 以隐式地调用 cmd
     */
    options.shell = true
  } else {
    console.log('Linux/Unix')
  }

  const {spawn} = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)

    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)

    const res = []
    proc.stdout.on('data', data => {
      res.push(data)
    })

    proc.on('close', () => {
      resolve(Buffer.concat(res).toString())
      // resolve()
    })
  })
}

module.exports = async name => {
  // 欢迎
  clear()
  const data = await figlet('welcome')
  log(data)

  // 下载
  log('克隆项目' + name)
  // await clone('github:su37josephxia/vue-template', name)

  //  安装依赖，执行 npm i
  log('安装依赖...')
  // await spawn('npm', ['install'], {cwd: `./${name}`})
  log(`
  安装完成：
  To get Start:
  ==========================
       cd ${name}
       npm run serve
  ==========================     
  `)

  // 打开浏览器
  open('http://localhost:8080')
  await spawn('npm', ['run', 'serve'], {cwd: `./${name}`})
}