onmessage = function (e) {
  importScripts('../node_modules/spark-md5/spark-md5.min.js');

  const file = e.data
  const fileReader = new FileReader()

  fileReader.readAsArrayBuffer(file)
  fileReader.onload = ev => {
    const buffer = ev.target.result
    const spark = new SparkMD5.ArrayBuffer()
    spark.append(buffer)
    const hash = spark.end()
    const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1]

    postMessage({
      buffer, hash, suffix, filename: `${hash}.${suffix}`
    })
  }
}
