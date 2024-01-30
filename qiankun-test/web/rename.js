const fs = require('fs');
const path = require('path');
var stat = fs.stat;

var copy = function (src, dst) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    // console.log(paths)
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      var readable;
      var writable;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }

        if (st.isFile() && (path.includes('index.html') || path.includes('entry.js'))) {
          readable = fs.createReadStream(_src);//创建读取流
          writable = fs.createWriteStream(_dst);//创建写入流
          readable.pipe(writable);
        } 
        // else if (st.isDirectory()) {
        //   copy(_src, _dst);
        // }
      });
    });
  });
}

const buildDir = path.join(__dirname, '../dist/web-dist');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir)
}

// console.log(__dirname)
// console.log(buildDir)
copy(__dirname, buildDir)