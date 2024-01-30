<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from '@/components/TopView/index.vue'
import SalesView from '@/components/SalesView/index.vue'
import MapView from '@/components/MapView/index.vue'
import BottomView from '@/components/BottomView/index.vue'

import { wordcloud, mapScatter, screenData } from '@/api/index'

export default {
  name: 'Home',
  components: { TopView, SalesView, MapView, BottomView },
  data () {
    return {
      reportData: null,
      mapData: null,
      wordCloud: null
    }
  },
  methods: {
    getReportData () {
      return this.reportData
    },
    getMapData () {
      return this.mapData
    },
    getWordCloud () {
      return this.wordCloud
    }
  },
  provide () {
    return {
      getReportData: this.getReportData,
      getMapData: this.getMapData,
      getWordCloud: this.getWordCloud
    }
  },
  mounted () {
    wordcloud().then(data => { this.wordCloud = data })
    mapScatter().then(data => { this.mapData = data })
    screenData().then(data => { this.reportData = data })
  }
}
</script>
<style scoped>
.home {
  width: 100%;
  padding: 20px;
  background: #eee;
  box-sizing: border-box;
}
</style>
