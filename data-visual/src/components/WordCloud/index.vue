<template>
  <ve-wordcloud :data="chartData" :settings="chartSettings" height="100%"/>
</template>

<script>
export default {
  data () {
    return {
      chartData: {
        columns: ['name', 'value'],
        rows: [
          {
            name: '可视化1',
            value: 100 * Math.random()
          },
          {
            name: '可视化2',
            value: 100 * Math.random()
          },
          {
            name: '可视化3',
            value: 100 * Math.random()
          },
          {
            name: '可视化4',
            value: 100 * Math.random()
          },
          {
            name: '可视化5',
            value: 100 * Math.random()
          }
        ]
      },
      chartSettings: {
        color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
      }
    }
  }
}
</script>

<style>

</style>
