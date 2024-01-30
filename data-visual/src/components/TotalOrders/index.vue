<template>
  <common-card title="累计订单量" :value="orderToday">
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{orderLastDay}}</span>
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
      return this.orderTrend.length > 0 ? {
        xAxis: { // x 轴
          type: 'category',
          show: false,
          boundaryGap: false // 使得左右边界的空隙变为 0
        },
        yAxis: { // y 轴
          show: false
        },
        series: [{ // 图形系列
          type: 'line',
          data: this.orderTrend,
          areaStyle: { // 设置面积样式
            color: 'purple'
          },
          lineStyle: { // 设置线条样式
            width: 0
          },
          itemStyle: { // 设置线条数据样式
            opacity: 0
          },
          smooth: true // 设置线条光滑
        }],
        grid: { // 布局
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      } : null
    }
  }
}
</script>

<style></style>
