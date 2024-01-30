<template>
  <tabs default-active-key="1" @change="onTabsChange">
    <tab-panel key="1" title="title1">
      <div>tab panel content 1</div>
    </tab-panel>
    <tab-panel key="2" title="title1">
      <div>tab panel content 2</div>
    </tab-panel>
    <tab-panel key="3" title="title1">
      <div>tab panel content 3</div>
    </tab-panel>
  </tabs>
</template>

<script>
import TabPanel from "./TabPanel";
import Tabs from "./Tabs";

export default {
  name: "index",
  components: {TabPanel, Tabs},
  methods: {
    onTabsChange(key) {
      console.log('tab changed', key)
    }
  },
}
</script>

<style scoped>

</style>