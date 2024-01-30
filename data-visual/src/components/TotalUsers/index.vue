<template>
  <common-card title="累计用户数" :value="userToday">
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比 </span>
        <span class="emphasis">{{userGrowthLastDay}}</span>
        <div class="increase"></div>
        <span style="margin-left: 10px">月同比 </span>
        <span class="emphasis">{{userGrowthLastMonth}}</span>
        <div class="increase"></div>
      </div>
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
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: 'value', // 设置 x 轴为值
          show: false
        },
        yAxis: {
          type: 'category', // 设置 y 轴为类型,
          show: false
        },
        series: [
          {
            name: '上月平台用户数',
            type: 'bar',
            stack: '总量', // 这个可以把两个图合并重叠
            data: [this.userLastMonth],
            barWidth: 10,
            itemStyle: {
              color: '#45c946' // 设置图形颜色
            }
          },
          {
            name: '今平台用户数',
            type: 'bar',
            stack: '总量', // 这个可以把两个图合并重叠
            data: [this.userTodayNumber],
            itemStyle: {
              color: '#eee' // 设置图形颜色
            }
          },
          {
            type: 'custom', // 自定义图形，三角形
            stack: '总量', // 这个可以把两个图合并重叠
            data: [this.userLastMonth],
            renderItem: (params, api) => {
              const value = api.value(0)
              const endPoint = api.coord([value, 0])

              return {
                type: 'group', // 使用分组的话，多个图形一起绘制
                position: endPoint, // 绘制坐标点
                children: [
                  { // 上面的三角形
                    type: 'path', // 可以使用 svg 路径
                    shape: { // 具体 svg 图形
                      d: 'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z',
                      x: -5,
                      y: -20,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  },
                  { // 下面的三角形
                    type: 'path', // 可以使用 svg 路径
                    shape: { // 具体 svg 图形
                      d: 'M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z',
                      x: -5,
                      y: 10,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.total-users-footer {
  display: flex;
  align-items: center;
}
</style>
