<template>
  <div> {{ onError }}</div>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
  <h1>{{ count }}</h1>
  <h2>{{ double }}</h2>
  <ul>
    <li v-for="number in numbers" :key="number"><h3>{{ number }}</h3></li>
    <li>{{ person.name }}</li>
  </ul>
  <button @click="increase">+1</button>
  <h2>{{ greetings }}</h2>
  <button @click="updateGreeting">update title</button>
  <h3>x:{{ x }},y:{{ y }}</h3>
  <h3 v-if="loading"> loading...</h3>
  <!--  <img v-if="loaded" :src="result[0].url">-->
  <Modal :isOpen="modalIsOpen" @close-modal="closeModal"> my modal !!!</Modal>
  <button @click="openModal">open modal</button>
  <Suspense>
    <template #default>
<!--      <AsyncShow></AsyncShow>-->
      <DogShow></DogShow>
    </template>
    <template #fallback>
      <h3> loading...</h3>
    </template>
  </Suspense>

</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onUnmounted,
  onRenderTriggered,
  onRenderTracked,
  watch,
  onErrorCaptured
} from 'vue';

interface DataProps {
  count: number
  double: number
  increase: () => void
  numbers: number[]
  person: { name?: string }
}

interface DogResult {
  message: string
  status: string
}

interface CatResult {
  id: string
  url: string
  width: number
  height: number
}

import useMousePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";
import HelloWorld from './components/HelloWorld.vue';
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from "./components/DogShow.vue";

export default defineComponent({
  name: 'App',
  components: {
    DogShow,
    // AsyncShow,
    // HelloWorld
    Modal
  },
  setup() {
    const onError = ref(null)
    onErrorCaptured((e: any) => {
      onError.value = e
    })
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }
    onMounted(() => {
      console.log('onMounted')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onRenderTriggered(event => {
      // console.log(event)
    })
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hello'
    }

    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {}
    })
    data.numbers[0] = 5
    data.person.name = 'lzw'
    const refData = toRefs(data)

    const {x, y} = useMousePosition()
    const {
      result,
      loading,
      loaded,
      error
    } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch([greetings, () => data.count, result], (newVal, oldVal) => {
      console.log(newVal, oldVal)
      document.title = 'update' + greetings.value + data.count
      if (result.value) {
        console.log(result.value[0].url)
      }
    })
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const closeModal = () => {
      modalIsOpen.value = false
    }
    return {
      // count,
      // increase,
      // double
      // count: data.count,
      // increase: data.increase,
      // double: data.double
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      loading,
      loaded,
      result,
      modalIsOpen,
      openModal,
      closeModal,
      onError
    }
  }
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   increase() {
  //     this.count++
  //   }
  // }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
