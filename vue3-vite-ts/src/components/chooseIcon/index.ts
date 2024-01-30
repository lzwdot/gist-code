import { App } from 'vue'
import chooseIcon from './src/index.vue'

// 使组件可以通过 use 的形式使用
export default {
    install(app: App) {
        app.component('m-choose-icon',chooseIcon)
    }
}