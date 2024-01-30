<template>
    <div class="header">
        <span @click="toggle">
            <el-icon v-if="collapse">
                <el-icon-expand />
            </el-icon>
            <el-icon v-else>
                <el-icon-fold />
            </el-icon>
        </span>
    </div>
</template>

<script lang='ts' setup>
const props = defineProps<{
    collapse: boolean
}>()
const emits = defineEmits(['update:collapse'])
const toggle = () => {
    console.log(!props.collapse)
    // 修改父组件的数据
    emits('update:collapse', !props.collapse)
}
</script>

<style scoped>
.header {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
}
</style>