<template>
  <component 
    class="w-11/12 lg:w-1/3 py-4"
    :is="currentPage"
    @changeScreen="changeScreen($event)" 
    v-bind="{'newScreen':'HomePage'}">
  </component>
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import DrinkGroupChoice from  '@/components/DrinkGroupChoice.vue'
import DrinkOrderConclusion from '@/components/DrinkOrderConclusion.vue'
import DrinkOrderProcessing from '@/components/DrinkOrderProcessing.vue'
import DrinkSubChoice from './components/DrinkSubChoice.vue'
import { useDrinkStore } from '@/stores/drink'

export default {
  name: 'App',
  components: {
      HomePage,
      DrinkGroupChoice,
      DrinkOrderConclusion,
      DrinkOrderProcessing,
      DrinkSubChoice
  },
  data() {
    return {
      currentPage: 'HomePage',
      drinkStore: null,
    }
  },
  async mounted() {
    this.drinkStore = useDrinkStore();
    await this.drinkStore.requestNewDrinkTypes();
    
    // TODO: periodic PLC/OPC status update
  },
  methods: {
    changeScreen(newScreenName) {
      this.currentPage = newScreenName;

    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

html, body {
  margin: 0;
  // overflow: scroll;
  background-color: rgb(0, 0, 0);
  user-select: none;
  touch-action: pan-y;
}

#app {
  // @apply h-[70vh];
  font-family: Inter, sans-serif;
  color: #ffffff;
  // width: 100%;
  // height: 1vw;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
}

.pg-header {
  @apply text-4xl sm:text-7xl text-center;
}

span, button {
  font-family: Inter, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}
</style>
