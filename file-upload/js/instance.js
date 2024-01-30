// 公共部分信息
let instance = axios.create() // 独立的 axios 实例
instance.defaults.baseURL = 'http://localhost:8888'
instance.defaults.headers['Content-Type'] = 'multipart/form-data'
instance.defaults.transformRequest = (data, headers) => {
  const contentType = headers['Content-Type']

  if (contentType === 'application/x-www-form-urlencoded') {
    // Qs.stringify(data) : {a:1,b:2} -> a=1&b=2
    return Qs.stringify(data)
  }

  return data
}
instance.interceptors.response.use(res => {
  return res.data
}, error => {
  // 统一错误提示
  return Promise.reject(error)
})