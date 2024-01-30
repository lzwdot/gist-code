<template>
    <div>
        <choose-icon title="选择图标" v-model:visiable="visiable">选择图标</choose-icon>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visiable = ref<boolean>(false)
</script>