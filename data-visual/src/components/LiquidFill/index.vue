<template>
  <ve-liquidfill :data="chartData" height="100%" :settings="chatSettings"/>
</template>

<script>
function getColor (val) {
  return val > 0 && val <= 0.5 ? 'rgba(97,216,0,.7)'
    : val > 0.5 && val <= 0.8 ? 'rgba(204,178,26,.7)'
      : val > 0.8 ? 'rgba(241,47,28,.7)' : '#c7c7cb'
}
export default {
  data () {
    return {
      chartData: {
        columns: ['title', 'percent'],
        rows: [
          {
            title: 'rate',
            percent: 0.1899
          }
        ]
      },
      chatSettings: {}
    }
  },
  mounted () {
    this.chatSettings = {
      seriesMap: {
        rate: {
          // 参考 https://www.npmjs.com/package/echarts-liquidfill
          radius: '80%',
          label: {
            formatter: (v) => { // 文字格式
              return `${Math.floor(v.data.value * 100)}%`
            },
            textStyle: { // 文字样式
              fontSize: 36,
              fontWeight: 'normal',
              color: '#999'
            },
            position: ['50%', '50%'], // 位置
            insideColor: '#fff' // 水位溢到文字时的颜色
          },
          outline: { // 外围的样式
            itemStyle: {
              borderColor: '#aaa4a4',
              borderWidth: 1,
              color: 'none',
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            borderDistance: 0 // 外围到内圈的距离
          },
          backgroundStyle: { // 背景样色
            color: '#fff'
          },
          itemStyle: { // 整体的样式
            shadowColor: '#fff',
            shadowBlur: 0
          },
          amplitude: 8, // 波纹的曲线度
          color: [getColor(this.chartData.rows[0].percent)] // 水波的颜色
        }
      }
    }
  }
}
</script>

<style></style>
