<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template slot="header">
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">93.634</div>
                <v-chart :options="searchUserOption"></v-chart>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">193.634</div>
                <v-chart :options="searchUserOption"></v-chart>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="180"/>
                <el-table-column prop="keyword" label="关键词" width="180"/>
                <el-table-column prop="count" label="总搜索量"/>
                <el-table-column prop="users" label="搜索用户数"/>
              </el-table>
              <el-pagination
                layout="prev,pager,next"
                :total="100"
                :page-size="4"
                background
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template slot="header">
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <el-radio-group v-model="radioSelect" size="small" class="radio-wrapper">
              <el-radio-button label="品类"></el-radio-button>
              <el-radio-button label="商品"></el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOption"></v-chart>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchUserOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          data: [100, 150, 200, 250, 200, 150, 100, 50, 100, 150],
          areaStyle: {
            color: 'rgba(95,187,255,.5)'
          },
          lineStyle: {
            color: 'rgb(95,187,255)'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      },
      searchNumberOption: {},
      tableData: [
        {
          id: 1,
          rank: 1,
          keyword: '北京',
          count: 100,
          users: 90,
          range: '90%'
        }, {
          id: 2,
          rank: 1,
          keyword: '北京',
          count: 100,
          users: 90,
          range: '90%'
        }, {
          id: 3,
          rank: 1,
          keyword: '北京',
          count: 100,
          users: 90,
          range: '90%'
        }, {
          id: 4,
          rank: 1,
          keyword: '北京',
          count: 100,
          users: 90,
          range: '90%'
        }
      ],
      radioSelect: '品类',
      categoryOption: {}
    }
  },
  methods: {
    renderPieChart () {
      const mockData = [
        {
          legendName: '粉面粥店',
          value: 67,
          percent: '15.40',
          itemStyle: {
            color: '#e7e702'
          },
          name: '粉面粥店 | 15.40%'
        },
        {
          legendName: '简餐便当',
          value: 97,
          percent: '22.30',
          itemStyle: {
            color: '#8d7fec'
          },
          name: '简餐便当 | 22.30%'
        },
        {
          legendName: '汉堡披萨',
          value: 92,
          percent: '21.15',
          itemStyle: {
            color: '#5085f2'
          },
          name: '汉堡披萨 | 21.15%'
        }
      ]
      this.categoryOption = {
        title: [
          {
            text: '品类分布',
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          },
          {
            text: '累计订单量',
            subtext: 320,
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            },
            x: '34.5%',
            y: '42.5%',
            textAlign: 'center'
          }
        ],
        series: [
          {
            name: '品类统计',
            type: 'pie',
            data: mockData,
            label: {
              normal: {
                show: true,
                position: 'outer',
                formatter: (params) => {
                  return params.data.legendName
                }
              }
            },
            center: ['35%', '50%'], // 圆心移动
            radius: ['45%', '60%'], // [内半径，外半径]
            labelLine: {
              normal: {
                length: 5, // 线段1 靠近圆圈的
                length2: 3, // 线段2 靠近文字的
                smooth: true // 圆滑一点
              }
            },
            clockwise: true, // 顺时针
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            }
          }
        ],
        legend: {
          type: 'scroll', // 可以滚动
          orient: 'vertical', // 垂直排列
          height: 250, // 固定高度后还可以滚动
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            console.log(params)
            const str = params.seriesName + '<br/>' +
              params.marker + params.data.legendName + '<br/>' +
              '数量：' + params.data.value + '<br/>' +
              '占比：' + params.data.percent + '%'
            return str
          }
        }
      }
    }
  },
  mounted () {
    this.renderPieChart()
  }
}
</script>

<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;

  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;

    &:first-of-type {
      padding-right: 10px;
    }

    &:last-of-type {
      padding-left: 10px;
    }

    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;

      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }

    .chart-wrapper {
      display: flex;
      height: 452px;
      flex-direction: column;

      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;

        .chart {
          flex: 1;
          padding: 0 10px;

          .chart-title {
            font-size: 14px;
            color: #999;
          }

          .chart-data {
            font-size: 22px;
            font-weight: 500;
            letter-spacing: 2px;
            color: #333;
          }

          .echarts {
            height: 50px;
          }
        }
      }

      .table-wrapper {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px 20px;

        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
