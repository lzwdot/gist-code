<template>
    <div>
        <!-- <notification :value="50"></notification>
        <notification :value="50" :max="30"></notification>
        <notification :value="50" isDot></notification>-->
        <m-notification icon="ChatSquare" :value="50">
            <template #default>
                <m-list
                    @clickItem="clickItem"
                    @clickAction="clickAction"
                    :list="list"
                    :actions="actions"
                ></m-list>
            </template>
        </m-notification>
    </div>
</template>

<script lang="ts" setup>
import { list, actions } from './data'

const clickItem = (val: any) => {
    console.log(val)
}
const clickAction = (val: any) => {
    console.log(val)
}
</script>