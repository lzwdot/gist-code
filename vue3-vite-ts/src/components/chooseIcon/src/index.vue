<template>
    <el-button @click="handleClick" type="primary">
        <slot></slot>
    </el-button>

    <div class="choose-icon-dialog-body-height">
        <el-dialog :title="title" v-model="dialogVisiable">
            <div class="container">
                <div
                    class="item"
                    v-for="(item, index) in Object.keys(ElIcons)"
                    :key="index"
                    @click="clickItem(item)"
                >
                    <div class="icon">
                        <component :is="`el-icon-${toLine(item)}`"></component>
                    </div>
                    <div class="text">{{ item }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import * as ElIcons from '@element-plus/icons-vue'
import { ref, watch } from 'vue';
import { toLine } from '../../../utils';
import { useCopy } from '../../../hooks/useCopy'

const props = defineProps<{
    title: string // 弹框标题
    visiable: boolean // 控制弹框是否显示
}>()

const emits = defineEmits(['update:visiable'])
// 拷贝一份父组件的值，内部使用
const dialogVisiable = ref<boolean>(props.visiable)

// 点击显示弹框
const handleClick = () => {
    //  需要修改父组件的数据
    emits('update:visiable', !props.visiable)
}
// 点击复制 icon
let clickItem = (item: string) => {
    const text = `<el-icon-${toLine(item)}/>`;
    useCopy(text)
    // 隐藏弹窗
    dialogVisiable.value = false
}


// 监听 visiable 的变化
watch(() => props.visiable, val => {
    dialogVisiable.value = val
})
// 监听 dialogVisiable 的变化
watch(() => dialogVisiable.value, val => {
    emits('update:visiable', val)
})
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    height: 70px;
}

.text {
    font-size: 14px;
}

.icon {
    flex: 1;
}

svg {
    width: 2em;
    height: 2em;
}
</style>