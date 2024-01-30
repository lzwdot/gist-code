
// 快照沙箱优化版

class LegacySandbox {
  modifyPropsMap = new Map() // 所有更新的所有属性
  originPropsMap = new Map() // window 自带的原有属性
  addedPropsMap = new Map() // 新增的属性
  proxyWin = {} // 代理 window

  constructor() {
    // 运行时创建一个假的 window 空对象
    const fakeWin = Object.create(null)
    // 通过 proxy 优化 window 对象的遍历
    this.proxyWin = new Proxy(fakeWin, {
      set: (target, prop, value, receiver) => {
        const winVal = window[prop]
        // 不是 window 自带属性，那就是新增的
        if (!window.hasOwnProperty(prop)) {
          this.addedPropsMap.set(prop, value)
        } else if (!this.originPropsMap.has(prop)) {
          // 保存 window 自带的属性值
          this.originPropsMap.set(prop, winVal)
        }
        // 记录当前所有修改
        this.modifyPropsMap.set(prop, value)
        window[prop] = value
      },
      get: (target, prop, receiver) => {
        return window[prop]
      }
    })
  }

  setPropVal(prop, value, isDelete) {
    if (!value && isDelete) {
      delete window[prop]
    } else {
      window[prop] = value
    }
  }

  /**
  * 挂载状态 
  */
  mount() {
    // 恢复上一次该子应用运行时，对 window 上做的所有修改
    this.modifyPropsMap.forEach((val, prop) => {
      this.setPropVal(prop, val)
    })
  }

  /**
   * 卸载状态 
   */
  unmount() {
    // 还原 window 自带属性的值
    this.originPropsMap.forEach((val, prop) => {
      this.setPropVal(prop, val)
    })

    // 删除子应用运行期间，window 新增的属性值
    this.addedPropsMap.forEach((val, prop) => {
      this.setPropVal(prop, null, true)
    })
  }
}

const subApp = new LegacySandbox()
// 测试
window.city = 'Beijing'
subApp.mount()
console.log('01===>', window.city) // 01===> Beijing
// 修改 proxyWin，而不是直接修改 window
subApp.proxyWin.city = 'Shanghai'
console.log('02===>', window.city) // 02===> Shanghai

subApp.unmount()
console.log('03===>', window.city) // 03===> Beijing



