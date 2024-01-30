<template>
    <m-choose-area @change="changeArea">1</m-choose-area>
</template>

<script lang="ts" setup>
const changeArea = (val: any) => {
    console.log(val)
}
</script>