<template>
  <div id="container"></div>
</template>

<script>
// https://github.com/ecomfe/echarts-wordcloud
import 'echarts-wordcloud'

export default {
  mounted () {
    const data = [
      {
        name: '数据',
        value: 100
      },
      {
        name: '可视化',
        value: 60
      },
      {
        name: '图表',
        value: 80
      },
      {
        name: '大屏',
        value: 120
      }
    ]
    const chart = this.$echarts.init(document.getElementById('container'))
    chart.setOption({
      series: [
        {
          type: 'wordCloud',
          data: data,
          shape: 'circle', // 呈现圆，或者其他图形效果
          // Global text style
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: function () {
                // Random color
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
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
