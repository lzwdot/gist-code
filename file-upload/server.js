const express = require('express')
const app = express()
const multer = require('multer')
const bodyParser = require('body-parser')
const sparkMD5 = require('spark-md5')

//引入 path 和 fs
const path = require('path')
const fs = require('fs')

const upload = multer({dest: './uploads/'})
const sleep = () => new Promise(resolve => {
  setTimeout(resolve, 1000)
})

app.use(upload.any())
app.use(bodyParser.urlencoded({extended: false, limit: '2100000kb'}))

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post('/getData', async function (req, res) {
  const body = req.body
  if (body.hash && body.suffix) {
    const newDir = path.join(__dirname, `/uploads/${body.hash}`)
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir)
    }

    const files = fs.readdirSync(newDir)
    res.send({
      code: 0,
      codeText: '请求成功',
      fileList: files
    })
  } else if (body.hash && body.count) {
    const newDir = path.join(__dirname, `/uploads/${body.hash}`)
    const files = fs.readdirSync(newDir)
    const extname = path.extname(files[0])
    const newFile = newDir + extname

    files.sort((a, b) => {
      const reg = /_(\d+)/
      return reg.exec(a)[1] - reg.exec(b)[1]
    }).forEach(file => {
      fs.appendFileSync(newFile, fs.readFileSync(newDir + '/' + file))
      fs.unlinkSync(newDir + '/' + file)
    })

    fs.rmdirSync(newDir)
    res.send({
      code: 0,
      codeText: '合并成功',
      originalFilename: body.filename,
      servicePath: 'http://localhost:8888/uploads/' + body.hash + extname
    })
  }
})

app.post('/upload', function (req, res) {
  // 处理 multipart/form-data 方式
  if (req.files) {
    const file = req.files[0]
    const body = req.body
    // 拿到后缀名
    let extname = path.extname(file.originalname);
    //拼接新的文件路径，文件加上后缀名
    let newPath = file.path + extname;

    if (body.hash && body.filename) {
      const newDir = `uploads/${body.hash}`
      newPath = `${newDir}/${body.filename}`
    }

    //重命名
    fs.rename(file.path, newPath, async function (err) {
      // await sleep()

      if (err) {
        res.send({
          code: 1,
          codeText: err
        })
      } else {
        res.send({
          code: 0,
          codeText: '上传成功',
          originalFilename: file.originalname,
          servicePath: 'http://localhost:8888/' + newPath
        })
      }
    })
  } else if (req.body) { // 处理  application/x-www-form-urlencoded 方式
    const body = req.body
    //过滤data:URL
    const base64Data = decodeURIComponent(body.file).replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = Buffer.from(base64Data, 'base64');
    // 利用扩展生产唯一 md5 名字
    const spark = new sparkMD5.ArrayBuffer()
    spark.append(base64Data)
    // 拿到后缀名
    const extname = path.extname(body.filename);
    // 新路径
    const newPath = '/uploads/' + spark.end() + extname
    // base64 写入文件
    fs.writeFile(path.join(__dirname) + newPath, dataBuffer, async function (err) {
      // await sleep()

      if (err) {
        res.send({
          code: 1,
          codeText: err
        })
      } else {
        res.send({
          code: 0,
          codeText: '上传成功',
          originalFilename: body.filename,
          servicePath: 'http://localhost:8888' + newPath
        })
      }
    })
  }
})


app.listen(8888, function () {
  console.log('Server is running at http://localhost:8888');
})