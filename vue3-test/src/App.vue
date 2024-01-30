<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--    <Ref/>-->
  <!--  <toRef/>-->
  <!--  <to-refs></to-refs>-->
  <!--  <why-ref></why-ref>-->
  <!--  <why-value></why-value>-->
  <!--  <mouse-position></mouse-position>-->
  <p>{{ name }}{{ age }}</p>
  <!--  <child-->
  <!--      v-model:name="name"-->
  <!--      v-model:age="age"-->
  <!--  ></child>-->
  <!--  <watch></watch>-->
  <!--  <get-instance></get-instance>-->
  <!--  <jsx-demo></jsx-demo>-->
  <!--  或 -->
  <!--  <JsxDemo></JsxDemo>-->
  <!--  <tabs-template></tabs-template>-->
  <!--  <tabs-jsx></tabs-jsx>-->
  <!--  <scoped-slot-template></scoped-slot-template>-->
  <!--  <scoped-slot-jsx></scoped-slot-jsx>-->
  <script-setup></script-setup>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'


// import Ref from "@/components/Ref";
// import ToRef from "@/components/ToRef";
// import ToRefs from "@/components/ToRefs";
// import WhyRef from "@/components/WhyRef";
// import WhyValue from "@/components/WhyValue";
// import MousePosition from "@/components/MousePosition";

// import Child from "@/components/Child";
import {reactive, toRefs} from "vue";
// import JsxDemo from "@/components/JsxDemo.jsx";
// import Watch from "@/components/Watch";
// import GetInstance from "@/components/GetInstance";

// import TabsTemplate from './components/tabs-template/Index'
// import TabsJsx from './components/tabs-jsx/Index'
// import ScopedSlotTemplate from './components/scoped-slot-template/Index'
// import ScopedSlotJsx from './components/scoped-slot-jsx/Index'
import ScriptSetup from './components/script-setup/Index'

export default {
  name: 'App',
  components: {
    // JsxDemo,
    // GetInstance,
    // Watch
    // Child
    // MousePosition,
    // WhyValue,
    // WhyRef,
    // ToRefs,
    // ToRef,
    // Ref
    // HelloWorld,
    // TabsTemplate,
    // TabsJsx,
    // ScopedSlotTemplate,
    // ScopedSlotJsx,
    ScriptSetup
  },
  setup() {
    const state = reactive({
      name: 'lzw.',
      age: '20'
    })

    return toRefs(state)
  }
}
</script>
