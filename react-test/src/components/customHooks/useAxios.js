import {useState, useEffect} from "react";
import axios from "axios";

// axios 返送网络请求
function useAxios(url, config = {}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
      // 利用 axios 发送网络请求
      setLoading(true)
      axios.get(url) // 发送一个 get 请求
        .then(res => setData(res))
        .catch(err => setError(err))
        .finally(() => setLoading(false))
    },
    [url] // 只能使用值类型：a,b,c 这种，然后拼接成 const config = {a,b,c}
    //[url,config] // 如果使用 config 对象，就回出现死循环
    // 根本原因是 React 使用 Object.is 判断 依赖 是否变化
    // Object.is(1,1)  // true
    // Object.is('a','a') // true
    // Object.is({},{}) // false
    // Object.is([],[]) // false
  );

  return [loading, data, error]
}

export default useAxios