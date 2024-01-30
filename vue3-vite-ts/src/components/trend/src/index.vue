<template>
    <div class="trend">
        <div class="text" :style="{ color: textColor }">
            <slot v-if="slots.default"></slot>
            <div v-else>{{ text }}</div>
        </div>
        <div class="icon">
            <el-icon
                :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
                v-if="type === 'up'"
            >
                <component :is="`el-icon-${toLine(upIcon)}`"></component>
            </el-icon>
            <el-icon :style="{ color: !reverseColor ? downIconColor : '#f5222d' }" v-else>
                <component :is="`el-icon-${toLine(downIcon)}`"></component>
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { toLine } from '../../../utils';

const props = defineProps({
    // 上升 up 或 下降 down
    type: {
        type: String,
        default: 'up'
    },
    // 显示文字：父组件传递的数据 或 插槽
    text: {
        type: String,
        default: '文字'
    },
    // 上升图标
    upIcon: {
        type: String,
        default: 'arrowUp'
    },
    // 下降图标
    downIcon: {
        type: String,
        default: 'arrowDown'
    },
    // 颜色反转：只反转默认颜色值
    reverseColor: {
        type: Boolean,
        default: false
    },
    // 上升的图标颜色
    upIconColor: {
        type: String,
        default: '#f5222d'
    },
    // 下降的图标颜色
    downIconColor: {
        type: String,
        default: '#52c41a'
    },
    // 上升的文字颜色
    upTextColor: {
        type: String,
        default: '#000'
    },
    // 下降的文字颜色
    downTextColor: {
        type: String,
        default: '#000'
    }
})

// 获取插槽内容
const slots = useSlots()
// 判断文字颜色
const textColor = computed(() => {
    return props.type === 'up' ? props.upTextColor : props.downTextColor
})

</script>

<style lang='scss' scoped>
.trend {
    display: flex;
    align-items: center;

    .text {
        font-size: 12px;
        margin-right: 4px;
    }
    .icon {
        svg {
            width: 0.8em;
            height: 0.8em;
        }
    }
}
</style>