import axios from 'axios'

const service = axios.create({
  baseURL: 'https://apis.imooc.com',
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      return response.data
    } else {
      Promise.reject(new Error('请求失败'))
    }
  },
  err => Promise.reject(err)
)

export default service
