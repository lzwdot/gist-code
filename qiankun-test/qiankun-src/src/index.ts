/**
 * @author Kuitos
 * @since 2019-04-25
 */

// registerMicroApps, start 这两个方法最重要
// loadMicroApp 加载组件，动态加载应用
export { loadMicroApp, registerMicroApps, start } from './apis';
// 全局通信的方法，内置了一个发布订阅系统 rxjs redux
export { initGlobalState } from './globalState'; // 更新状态，监听状态变化
export { getCurrentRunningApp as __internalGetCurrentRunningApp } from './sandbox';
export * from './errorHandler';
export * from './effects';
export * from './interfaces';
export { prefetchImmediately as prefetchApps } from './prefetch';
