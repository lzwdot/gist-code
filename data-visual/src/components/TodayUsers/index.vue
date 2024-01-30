<template>
  <common-card title="今日交易用户数" :value="orderUser">
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">{{returnRate}}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions () {
      return {
        color: ['#3398db'],
        tooltip: {},
        series: [{ // 图形系列
          name: '用户实时交易量',
          type: 'bar',
          data: this.orderUserTrend,
          barWidth: '60%'
        }],
        xAxis: {
          type: 'category',
          data: this.orderUserTrendAxis
        },
        yAxis: {
          show: false
        },
        grid: { // 布局
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    }
  }
}
</script>

<style></style>
