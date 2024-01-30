// 文件上传【form-data，文件唯一hash，进度条，多文件】
(function () {
  const upload = document.querySelector('#upload1')
  const upload_inp = upload.querySelector('input.form-control')
  const upload_button_select = upload.querySelector('label.btn-primary')
  const upload_button_upload = upload.querySelector('button.btn-success')
  const upload_tip = upload.querySelector('small.text-muted')
  const upload_list = upload.querySelector('ul.list-group')
  const upload_progress = upload.querySelector('.progress')
  const upload_progress_bar = upload_progress.querySelector('.progress-bar')
  // 存文件对象
  let _files = []

  const changeDisabel = flag => {
    if (flag) {
      upload_button_select.classList.add('disable')
      upload_button_upload.classList.add('loading')
      upload_progress.style.display = 'flex'
      return
    }
    upload_button_select.classList.remove('disable')
    upload_button_upload.classList.remove('loading')
  }

  // 文件读取成为 buffer
  const changeBuffer = file => {
    return new Promise(resolve => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = ev => {
        const buffer = ev.target.result
        const spark = new SparkMD5.ArrayBuffer()
        spark.append(buffer)
        const hash = spark.end()
        const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1]

        resolve({
          buffer, hash, suffix, filename: `${hash}.${suffix}`
        })
      }
    })
  }

  // 修改进度条
  const changeProgress = proArr => {
    let loaded = total = 0

    proArr.forEach(item => {
      loaded += item.loaded
      total += item.total
    })

    upload_progress_bar.style.width = (loaded / total * 100).toFixed(2) + '%'
  }

  // 上传文件到服务器
  upload_button_upload.addEventListener('click', async function () {
    if (!_files.length === 0) {
      alert('请先选择上传文件~')
      return
    }
    changeDisabel(true)

    // 总的 progress
    const progressArr = new Map()
    // 循环发送请求
    const upload_list_arr = Array.from(upload_list.querySelectorAll('li'))
    _files = _files.map(async item => {
      // 当前 li 和 span
      const curLi = upload_list_arr.find(li => li.getAttribute('key') === item.key)
      const curSpan = curLi ? curLi.querySelector('span:nth-last-child(1)') : null

      // 生产文件的 hash名称
      const {filename} = await changeBuffer(item.file)

      // 把文件传递给服务器：FormData / Base64
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('filename', filename || item.filename)

      // axios
      return instance.post('/upload', formData, {
        // 文件上传进度回调函数 xhr.upload.onprogress
        onUploadProgress(e) {
          curSpan.innerHTML = `${(e.loaded / e.total * 100).toFixed(2)}%`

          progressArr.set(item.key, e)
          changeProgress(progressArr)
        }
      }).then(data => {
        if (+data.code === 0) {
          // alert(`文件上传成功，通过${data.servicePath}访问资源`)
          return
        }

        return Promise.reject(data.codeText)
      })
      //   .catch(error => {
      //   alert('文件上传失败，请稍后再试~')
      // }).finally(() => {
      //   clearHandle()
      // })
    })

    Promise.all(_files).then(() => {
      alert(`所有文件上传成功`)
    }).catch(err => {
      alert('文件上传失败，请稍后再试~')
    }).finally(() => {
      clearHandle()
      changeDisabel(false)
    })
  })

  const clearHandle = () => {
    upload_tip.style.display = 'block'
    upload_list.style.display = 'none'
    upload_list.innerHTML = ``
  }
// 移除按钮的点击事件
  upload_list.addEventListener('click', function (e) {
    const target = e.target
    if (target.tagName === 'SPAN') {
      const curLi = target.parentNode
      const key = curLi.getAttribute('key')
      upload_list.removeChild(curLi)
      _files = _files.filter(item => item.ley !== key)
      // 已经没有了
      if (_files.length === 0) {
        clearHandle()
      }
    }
  })

  const checkFile = file => {
    // 限制文件上传的格式 [方案1]
    if (!/(jpg|jpeg|png)/i.test(file.type)) {
      alert(file.name + '的 type:' + upload_tip.innerHTML)
      return false
    }

    // 限制文件上传大小不超过 50MB
    if (file.size > 50 * 1024 * 1024) {
      alert(file.name + '的 size:' + upload_tip.innerHTML)
      return false
    }

    return true
  }

// 获取唯一值
  const creatRandom = () => {
    const random = Math.random() * new Date()
    // toString(16) 变成 16 进制
    return random.toString(16).replace('.', '')
  }

// 监听用户选择文件的操作
  upload_inp.addEventListener('change', function () {
    // 获取选中文件对象
    // name:文件名
    // size:文件大小
    // type:文件的 MIME 类型
    _files = Array.from(upload_inp.files)
    if (_files.length === 0) return

    // 给每一项设置一个唯一，根据这个值进行增删
    _files = _files.map(file => {
      return {
        file,
        filename: file.name,
        key: creatRandom()
      }
    })

    let str = ``
    _files.forEach((item, index) => {
      if (checkFile(item.file)) {
        str += `<li key="${item.key}" class="list-group-item d-flex justify-content-between align-items-center">
            文件${item}：${item.filename}<span class="badge bg-primary rounded-pill">移除</span>
        </li>`
      }
    })

    // 显示上传的文件
    upload_tip.style.display = 'none'
    upload_list.style.display = 'block'
    upload_list.innerHTML = str
  })
})
();

// 文件上传【base64，缩略图处理（只适合图片），大文件断点续传】
(function () {
  const upload = document.querySelector('#upload2')
  const upload_inp = upload.querySelector('input.form-control')
  const upload_button_select = upload.querySelector('label.btn-primary')
  const upload_tip = upload.querySelector('small.text-muted')
  const upload_abbre = upload.querySelector('.img-wrap')
  const upload_abbre_img = upload.querySelector('img.img-thumbnail')
  const upload_ing = upload.querySelector('.upload-ing')
  const upload_percent = upload_ing.querySelector('.percent')
  let isRun = false

  // 文件读取成为 buffer
  const changeBuffer = file => {
    return new Promise(resolve => {
      // console.time('test');
      //
      // const fileReader = new FileReader()
      // fileReader.readAsArrayBuffer(file)
      // fileReader.onload = e => {
      //   const buffer = e.target.result
      //   const spark = new SparkMD5.ArrayBuffer()
      //   spark.append(buffer)
      //   const hash = spark.end()
      //   const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1]
      //
      //   console.timeEnd('test');
      //   resolve({
      //     buffer, hash, suffix, filename: `${hash}.${suffix}`
      //   })
      // }

      // 使用 web Worker 防止页面假死
      const work = new Worker('./js/work.js')
      work.postMessage(file)
      work.onmessage = e => {
        console.timeEnd('test');
        resolve(e.data)
      }
    })
  }

  // 实现文件上传
  const uploadFile = async file => {
    if (isRun) return
    isRun = true

    // 限制文件上传的格式 [方案1]
    if (!/(jpg|jpeg|png)/i.test(file.type)) {
      // alert(file.name + '的 type:' + upload_tip.innerHTML)
      // return false
    }

    // 使用二进制头部限制文件类型[方案2] , 比如jpg:255216 png:13780
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = function (e) {
      const result = new Uint8Array(e.target.result)

      if (result.join('').indexOf('255216') === 0) {
        console.log('jpg文件')
      } else if (result.join('').indexOf('13780') === 0) {
        console.log('png文件')
      }
    }

    // 限制文件上传大小不超过 50MB
    if (file.size > 50 * 1024 * 1024) {
      // alert(upload_tip.innerHTML)
      // return false
    }

    changeDisabel(true)

    // 大文件
    if (file.size > 5 * 1024 * 1024) {
      // 生产文件的 hash名称
      const {filename, suffix, hash} = await changeBuffer(file)

      // 已存上传的切片 和 数据
      let already = []
      let data = null

      // 获取已上传的切片
      try {
        data = await instance.post('/getData', {hash, suffix}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        if (+data.code === 0) {
          already = data.fileList
        }
      } catch (err) {
      }

      // 实现文件切片处理【固定数量 & 固定大小】, 使用 file.slice 进行切片
      let maxSize = 1024 * 100 // 最大切片大小
      let count = Math.ceil(file.size / maxSize) // 切片数量
      if (count > 100) {
        maxSize = file.size / 100
        count = 100
      }

      // 开始切片
      let index = 0
      const chunks = []
      while (index < count) {
        chunks.push({
          hash: hash,
          file: file.slice(index * maxSize, (index + 1) * maxSize),
          filename: `${hash}_${index + 1}.${suffix}`
        })
        index++
      }

      // 上传成功的处理
      index = 0
      const complate = async () => {
        // 管控进度条
        index++
        upload_percent.innerHTML = `${(index / count * 100).toFixed(2)}%`

        // 所有切片都上传成功了，我们合并切片
        if (index < count) return
        upload_percent.innerHTML = `100%`

        try {
          data = await instance.post('/getData', {hash, count}, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          if (+data.code === 0) {
            alert(`文件上传成功，通过${data.servicePath}访问资源`)
            return
          }
          throw data.codeText
        } catch (err) {
          alert('切片合并失败，请稍后再试')
        } finally {
          changeDisabel(false)
          isRun = false
        }
      }

      chunks.forEach(chunk => {
        // 已经上传的无需再上传
        if (already.length > 0 && already.includes(chunk.filename)) {
          complate()
          return
        }
        const formData = new FormData()
        formData.append('file', chunk.file)
        formData.append('filename', chunk.filename)
        formData.append('hash', chunk.hash)

        instance.post('/upload', formData).then(data => {
          if (+data.code === 0) {
            complate()
            return
          }
          return Promise.reject(data.codeText)
        }).catch(err => {
          console.log('当前切片上传失败，请稍后再试')
        })
      })
    } else {
      // 小文件图片
      const base64 = await changeBase64(file)
      // 文件预览，就是显示 base64
      upload_abbre_img.src = base64

      try {
        const data = await instance.post('/upload', {
          file: encodeURIComponent(base64),
          filename: file.name
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        if (+data.code === 0) {
          alert(`文件上传成功，通过${data.servicePath}访问资源`)
          return
        }

        throw data.codeText
      } catch (err) {
        alert('文件上传失败，请稍后再试')
      } finally {
        changeDisabel(false)
        isRun = false
      }
    }
  }

  const changeDisabel = flag => {
    if (flag) {
      upload_button_select.classList.add('loading')
      upload_abbre.style.display = 'none'
      upload_ing.style.display = 'flex'
      return
    }
    upload_button_select.classList.remove('loading')
    upload_abbre.style.display = 'block'
    upload_ing.style.display = 'none'
  }

  // 文件读取成为 base64
  const changeBase64 = file => {
    return new Promise(resolve => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = ev => {
        resolve(ev.target.result)
      }
    })
  }

  // 拖拽 dragenter dragleave dragover drop
  // upload.addEventListener('dragenter', function () {
  // })
  // upload.addEventListener('dragleave', function () {
  // })
  upload.addEventListener('dragover', function (e) {
    e.preventDefault()
  })
  upload.addEventListener('drop', function (e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return

    uploadFile(file)
  })

  // 监听用户选择文件的操作
  upload_inp.addEventListener('change', async function () {
    const file = upload_inp.files[0]
    if (!file) return

    uploadFile(file)
  })
})();