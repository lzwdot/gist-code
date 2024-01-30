
// 简易版的快照沙箱

class SnapshotSandbox {
  windowSnapshot = {} // window 的属性快照
  modifyPropsMap = {} // window 的属性修改
  /**
   * 挂载状态 
   */
  mount() {
    // 保存 window 对象上所有属性的状态
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop]
    }

    // 恢复上一次在运行该子应用时所修改过 window 上的属性
    Object.keys(this.modifyPropsMap).forEach(prop => {
      window[prop] = this.modifyPropsMap[prop]
    })
  }

  /**
   * 卸载状态 
   */
  unmount() {
    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录修改了 window 上的哪些属性
        this.modifyPropsMap[prop] = window[prop]
        // 将 window 上的属性还原至子应用运行之前的状态
        window[prop] = this.windowSnapshot[prop]
      }
    }
  }
}

const subApp = new SnapshotSandbox()
// 测试
window.city = 'Beijing'
subApp.mount()
console.log('01===>', window.city) // 01===> Beijing

window.city = 'Shanghai'
console.log('02===>', window.city) // 02===> Shanghai

subApp.unmount()
console.log('03===>', window.city) // 03===> Beijing