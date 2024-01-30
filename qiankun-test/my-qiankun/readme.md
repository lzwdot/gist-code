## single-spa 有什么缺陷？

- 资源加载过程繁琐 需要手动处理
- 需要手动处理隔离资源（css js）

## 为什么要有 js 资源隔离机制？

- 主应用和子应用，相同的全局变量，可能发生冲突
- 子应用和子应用，相同的全局变量，可能发生冲突
- 这里的全局变量主要指 window

## qinakun 三种 js 隔离机制

- 单个子应用方案一: SnapshotSandbox 快照沙箱
- 单个子应用方案二: LegacySandbox 过气沙箱 - 对快照沙箱通过 proxy 来优化
- 同时多个子应用方案：ProxySandbox 

## SnapshotSandbox

- 劣势1：遍历 window 对象上的所有属性，性能差
- 劣势2：同一时间只能激活一个子应用

## LegacySandbox

- 优势：不需要遍历 window 所有属性，性能良好
- 劣势：同一时间只能激活一个子应用

## ProxySandbox 

- 优势：不需要遍历 window 所有属性，性能良好
- 优势：同一时间可以激活多个子应用



SnapshotSandbox（兼容性好）-> 出现了 proxy 就诞生了 LegacySandbox (淘汰) -> single-spa 支持了多应用 -> ProxySandbox 

