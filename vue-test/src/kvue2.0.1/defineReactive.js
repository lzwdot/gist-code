// 数据响应式
function defineReactive(obj, key, val) {
  // 递归下
  observe(obj[key])

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key)
        // 如果 newVal 是对象，做响应式处理
        observe(newVal)
        val = newVal
      }
    }
  })
}

// 遍历 obj, 对所有属性做响应式
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }

  // 所有 key 实现响应式
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

// 数组 array ，push/pop/shift/unshift... 使用 defineProperty 拦截不到

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 10
  }
}

observe(obj)

// const obj = {}
// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'fooooooo'
//

obj.baz = {
  a: 10
}
obj.baz.a = 11
obj.baz.a

set(obj, 'xyz', '11')
obj.xyz
obj.xyz = 222