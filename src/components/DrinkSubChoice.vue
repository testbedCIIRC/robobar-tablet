<template>
  <div class="lg:gap-4 gap-16 h-[70vh]
    flex flex-col justify-between items-center">
    <div class="w-full mt-16
                relative">
      <div class="absolute left-5 h-[180%] top-[-10%]
      flex flex-col justify-center items-center gap-4" @click="cancelOrder()">
        <svg class="h-2/3 stroke-white stroke-[8]" viewBox="0 0 100 100">
          <line x1="0" y1="0" x2="100" y2="100" />
          <line x1="100" y1="0" x2="0" y2="100" />
        </svg>
        <span class="text-2xl text-center">CANCEL<br/>ORDER</span>
      </div>
      <h1 class="pg-header">
        NEW ORDER
      </h1>
    </div>
    <div 
      id="drink-sub-choice" 
      class="gridContainer" 
      v-if="Array.isArray(availableOptions)" 
      :style="{display: availableOptions.length < 2 ? 'none' : 'grid'}">
  
      <button 
        class="drinkGroupButton" 
        v-for="(option, index) in availableOptions" 
        :key="index" @click="selectSubChoice(option.value);">
  
        <div class="text">
          <span>
            {{ option.label }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>
<!-- <template v-if="activeSubChoice !== undefined">
  
</template> -->

<script>
import { useOrderStore } from '@/stores/order';
import { useDrinkStore } from '@/stores/drink';

export default {
    name: "DrinkSubChoice",
    components: {
    },
    data() {
      return {
        orderStore: null,
        drinkStore: null,
        optionLabel: null,
        availableOptions: null
      }
    },
    mounted() {
      this.orderStore = useOrderStore();
      this.drinkStore = useDrinkStore();

      this.showChoiceOptions();
      
    },
    methods: {
      showChoiceOptions() {
        const drinkId = this.orderStore.drinkId;
        if (this.drinkStore.drinkTypes[drinkId].drinkGroups.alcohol)
          this.orderStore.useLargeGlass = true;
        if (this.drinkStore.drinkTypes[drinkId].iceOption
          && this.orderStore.useIce === null) {

            this.optionLabel = "ice";
            this.availableOptions = this.drinkStore.iceOptions;
        } else if (this.drinkStore.drinkTypes[drinkId].volumeOption
          && this.orderStore.useLargeGlass === null) {

            this.optionLabel = "volume";
            this.availableOptions = this.drinkStore.volumeOptions;
        } else {
          this.$emit("changeScreen", "DrinkOrderProcessing");
        }
      },
      selectSubChoice(optionValue) {
        if (this.optionLabel == "ice") {
          this.orderStore.useIce = optionValue;
        } else if (this.optionLabel == "volume") {
          this.orderStore.useLargeGlass = optionValue;
        } else {
          throw Error(`Invalid option label received: ${optionValue}!`);
        }

        this.showChoiceOptions();
      },
      cancelOrder() {
        this.orderStore.setDefaultOrder();
        this.$emit('changeScreen', 'HomePage');
      }
    },
}
</script>

<style lang="scss" scoped>
@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}
.gridContainer {
  @apply w-full h-24 sm:h-48 grid grid-rows-1 grid-cols-2 gap-4 justify-stretch;
  
  button {
    @apply text-2xl sm:text-5xl h-full rounded-lg
    border border-white;
    @include sizedBoxShadow()
  }
}
</style>