import {ref} from "vue";

export default {
  name: "Tabs",
  props: ['defaultActiveKey'],
  emits: ['change'],
  setup(props, context) {
    const children = context.slots.default()
    const titles = children.map(panel => {
      const {title, key} = panel.props || {}
      return {
        title,
        key
      }
    })

    // 当前 actKey
    const actKey = ref(props.defaultActiveKey)

    function changeActKey(key) {
      actKey.value = key
      context.emit('change', key)
    }

    // jsx
    const render = () => <>
      <div>
        {/* 渲染 buttons */}
        {titles.map(titleInfo => {
          const {title, key} = titleInfo
          return <button
            key={key}
            style={{color: actKey.value === key ? 'blue' : '#333'}}
            onClick={() => changeActKey(key)}
          >{title}</button>
        })}
      </div>

      <div>
        {children.filter(panel => {
          const {key} = panel.props || {}
          // 匹配上，则显示，否则隐藏
          return actKey.value === key ? true : false
        })}
      </div>
    </>

    return render
  }
}