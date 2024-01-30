/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ASSET_TYPES = ['component','directive','filter']
  ASSET_TYPES.forEach(type => {
    // 声明静态方法  Vue.component = function(){}
    // 平时使用 Vue.component('comp',{})
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // name 的设置
          definition.name = definition.name || id
          // Vue.extend({}) => 返回组件的构造函数 Ctor
          // 就可以使用 new Ctor
          // 将传入的组件配置对象转为组件的构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 向全局的选项加入全局组件配置对象
        // components[id] = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
