<template>
  <div id="app">
    <!-- 只显示可视区域-->
    <!-- 1、列表每一项多高，算出一个滚动条来-->
    <!-- 2、variable 这个高度不一定多高了 -->
    <VirtualList :size="100" :remain="8" :items="items" :variable="true">
      <Item slot-scope="{item}" :item="item"></Item>
    </VirtualList>
  </div>
</template>

<script>

import VirtualList from './components/virtual-list'
import Item from './components/item'
import mock from 'mockjs'

let items = []
for (let i = 0; i < 10000; i++) {
  items.push({id: i, value: mock.Random.sentence(5, 50)})
}

export default {
  name: 'App',
  components: {
    VirtualList,
    Item
  },
  data() {
    return {items}
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
