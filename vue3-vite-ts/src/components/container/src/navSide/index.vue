<template>
    <el-menu :collapse="collapse" default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
            <el-icon>
                <el-icon-menu />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon>
               <el-icon-menu />
            </el-icon>
            <span>图标选择题</span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
               <el-icon-menu />
            </el-icon>
            <span>趋势数据</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
let props = defineProps<{
    collapse: boolean
}>()
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style> 