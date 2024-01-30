<template>
  <div>
    <el-select clearable v-model="province" placeholder="请选择省份">
      <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      style="margin:0 10px"
      v-model="city"
      placeholder="请选择城市"
    >
      <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
    <el-select clearable :disabled="!province || !city" v-model="area" placeholder="请选择区域">
      <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ar } from "element-plus/lib/locale";
import { computed, ref, watch } from "vue";
import allAreas from '../lib/pca-code.json'

export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}
export interface Data {
  name: string,
  code: string
}

const province = ref<string>('') // 省份
const city = ref<string>('') // 城市
const area = ref<string>('') // 区域

const areas = ref(allAreas) // 所有省市区数据
// 城市下拉框
const selectCity = ref<AreaItem[]>([])
// 区域下拉框
const selectArea = ref<AreaItem[]>([])

// 分发事件给父组件
const emits = defineEmits(['change'])

// 监听省份的变化
watch(() => province.value, val => {
  if (val) {
    selectCity.value = areas.value.find(item => item.code === province.value)!.children!
  }
  city.value = ''
  area.value = ''
})
// 监听城市的变化
watch(() => city.value, val => {
  if (val) {
    selectArea.value = selectCity.value.find(item => item.code === city.value)!.children!
  }
  area.value = ''
})
// 监听区域的变化
watch(() => area.value, val => {
  if (!val) return

  const provinceData: Data = {
    code: province.value,
    name: province.value && allAreas.find(item => item.code === province.value)!.name
  }
  const cityData: Data = {
    code: city.value,
    name: city.value && selectCity.value && selectCity.value.find(item => item.code === city.value)!.name
  }
  const areaData: Data = {
    code: val,
    name: val && selectArea.value.find(item => item.code === val)!.name
  }

  emits('change', {
    province: provinceData,
    city: cityData,
    area: areaData
  })
})
</script>