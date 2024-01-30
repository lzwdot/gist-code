<template>
  <div id="container"></div>
</template>

<script>
// https://www.npmjs.com/package/echarts-liquidfill
import 'echarts-liquidfill'

export default {
  mounted () {
    const data = [
      0.68,
      0.4,
      {
        value: 0.2,
        itemStyle: {
          opacity: -1.6
        },
        emphasis: {
          itemStyle: {
            opacity: -1.9
          }
        }
      }
    ]
    const chart = this.$echarts.init(document.getElementById('container'))
    chart.setOption({
      series: [
        {
          type: 'liquidFill',
          data: data,
          color: ['red', 'blue', 'yellow']

          // waveAnimation: false,
          // animationDuration: 0,
          // animationDurationUpdate: 0
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
