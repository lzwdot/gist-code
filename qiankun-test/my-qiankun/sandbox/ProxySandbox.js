// 代理沙箱

class ProxySandbox {
  proxyWin = {} // 代理 window 
  isActive = false // 激活状态

  constructor() {
    // 运行时创建一个假的 window 空对象
    const fakeWin = Object.create(null)
    // 通过 proxy 代理
    this.proxyWin = new Proxy(fakeWin, {
      set: (target, prop, value, receiver) => {
        // 把修改的值直接存到 target 上，这样不用维护还原之前值的过程
        target[prop] = value
      },
      get: (target, prop, receiver) => {
        // 返回值
        return prop in target ? target[prop] : window[prop]
      }
    })
  }

  /**
  * 挂载状态 
  */
  mount() {
    this.isActive = true
  }

  /**
   * 卸载状态 
   */
  unmount() {
    this.isActive = false
  }
}

const subApp1 = new ProxySandbox()
const subApp2 = new ProxySandbox()
// 测试

window.city = 'Beijing'
subApp1.mount()
subApp2.mount()
console.log('01===>', window.city) // 01===> Beijing
// 修改 proxyWin，而不是直接修改 window
subApp1.proxyWin.city = 'Shanghai01'
subApp2.proxyWin.city = 'Shanghai02'
console.log('02===>', window.city, subApp1.proxyWin.city, subApp2.proxyWin.city) // 02===> Beijing Shanghai01 Shanghai02

subApp1.unmount()
subApp2.unmount()
console.log('03===>', window.city, subApp1.proxyWin.city, subApp2.proxyWin.city) // 03===> Beijing Shanghai01 Shanghai02