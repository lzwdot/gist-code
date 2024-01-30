
function format (v) {
  // return v.toLocaleString()
  return `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
}

function wrapperMoney (o, k) {
  return o && o[k] ? `￥ ${format(o[k])}` : '￥ 0.00'
}

function wrapperNumber (o, k) {
  return o && o[k] ? format(o[k]) : 0
}

function wrapperOriginNumber (o, k) {
  return o && o[k] ? o[k] : 0
}

function wrapperArray (o, k) {
  return o && o[k] ? o[k] : []
}

function wrapperPercentage (o, k) {
  return o && o[k] ? `${o[k]} %` : 0
}

export default {
  computed: {
    reportData () {
      return this.getReportData()
    },
    salesToday () {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay () {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    orderToday () {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay () {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend () {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    orderUser () {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate () {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend () {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis () {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },
    userToday () {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userTodayNumber () {
      return wrapperOriginNumber(this.reportData, 'userToday')
    },
    userLastMonth () {
      return wrapperOriginNumber(this.reportData, 'userLastMonth')
    },
    userGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'userGrowthLastMonth')
    }
  },
  inject: ['getReportData', 'getMapData', 'getWordCloud']
}
