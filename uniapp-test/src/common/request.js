import { requestUrl } from "./config";

export default {
  get(obj = {}) {
    return uni.request(Object.assign(obj, {
      url: requestUrl + (obj.url || ''),
      header: {
        ...obj.header,
        token: uni.getStorageSync('token') || ''
      },
    }))
  },

  post(obj = {}) {
    return uni.request(Object.assign(obj, {
      url: requestUrl + (obj.url || ''),
      header: {
        ...obj.header,
        token: uni.getStorageSync('token') || ''
      },
      method: 'POST'
    }))
  },
}