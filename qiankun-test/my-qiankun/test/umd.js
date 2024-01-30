(function webpackUniversalModuleDefinition(root, factory) {
  /**
   * root: window
   * 
   * factory: function(){
   *  // 子应用代码
   *  return { ... } // 导出结果   
   * }
   */

  // CommonJS 规范 nodejs 
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();

  // AMD 规范，很久之前规范  
  else if (typeof define === 'function' && define.amd) define([], factory);

  // 也是 CommonJS 规范  
  else if (typeof exports === 'object') exports["my-vue3-app-app"] = factory();

  // 最后 umd 浏览器规范，window[xxx] = factory()
  else root["my-vue3-app-app"] = factory();
})(self, function () {
  // 这是子应用内部代码

  // 最后返回导出结果
  return {
    a: 1
  }
});