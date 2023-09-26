<template>
  <div class="lg:gap-4 gap-16 h-full
    flex flex-col justify-between items-center">
    <h1 class="pg-header mt-16 mb-0">
      NEW ORDER
    </h1>
    <nav class="w-full mt-32 h-48 sm:h-96
    flex flex-row justify-between gap-2 sm:gap-4 items-stretch" :class="{'drink-group-chosen': drinkGroupChosen}">
      <button 
        class="drinkGroupButton" 
        @click="setDrinkGroup(this.drinkStore.drinkGroupEnum.coffeeDrinks); hideDrinkGroupIcons()"
        :class="{activated: drinkGroup === this.drinkStore.drinkGroupEnum.coffeeDrinks}">
        
        <div class="icons"><CoffeeIconSvg /></div>
        <div class="text"><span>Coffee</span></div>
      </button>
      <button 
        class="drinkGroupButton" 
        @click="setDrinkGroup(this.drinkStore.drinkGroupEnum.softDrinks); hideDrinkGroupIcons()" 
        :class="{activated: drinkGroup === this.drinkStore.drinkGroupEnum.softDrinks}">
        
        <div class="icons"><SoftDrinkIconSvg /></div>
        <div class="text"><span>Soft drinks</span></div>
      </button>
      <button 
        class="drinkGroupButton" 
        @click="setDrinkGroup(this.drinkStore.drinkGroupEnum.alcoholicDrinks); hideDrinkGroupIcons()" 
        :class="{activated: drinkGroup === this.drinkStore.drinkGroupEnum.alcoholicDrinks}">
  
        <div class="icons"><AlcoholIconSvg /></div>
        <div class="text"><span>Alcohol</span></div>
      </button>
    </nav>
    <GroupDrinks 
      :drinkTypes="filteredDrinkTypes" 
      @selectDrink="selectDrink"
      :class="{ hidden: !drinkGroupChosen }" 
      :enabled="drinkGroup" />
  </div>
</template>

<script>
import CoffeeIconSvg from '@/components/svg-components/CoffeeIconSvg.vue';
import SoftDrinkIconSvg from '@/components/svg-components/SoftDrinkIconSvg.vue';
import AlcoholIconSvg from '@/components/svg-components/AlcoholIconSvg.vue';
// import DrinkSubChoice from './DrinkSubChoice.vue';
import GroupDrinks from '@/components/drink-group-components/GroupDrinks.vue';
import { useOrderStore } from '@/stores/order';
import { useDrinkStore } from '@/stores/drink';

export default {
    name: "DrinkGroupChoice",
    components: {
        CoffeeIconSvg,
        SoftDrinkIconSvg,
        AlcoholIconSvg,
        // DrinkSubChoice,
        GroupDrinks,
    },
    data() {
        return {
            drinkGroup: "none",
            drinkGroupChosen: false,
            filteredDrinkTypes: [],
            orderStore: null,
            drinkStore: null,
        }
    }, 
    async beforeMount() {
        this.orderStore = useOrderStore();
        this.drinkStore = useDrinkStore();

        if (!this.drinkStore.drinkTypes) {
            await this.drinkStore.requestNewDrinkTypes();
        }
    },
    mounted() {
      // let h1 = document.getElementsByTagName("h1")[0];
      // h1.innerHTML = 'a' + this.drinkStore.drinkTypes;
      // console.log(h1.innerHTML);
    },
    methods: {
        selectDrink(drinkId) {
            this.orderStore.drinkId = drinkId;

            this.$emit("changeScreen", "DrinkSubChoice");
        },
        setDrinkGroup(drinkGroupId) {
            this.drinkGroup = drinkGroupId;
            this.filteredDrinkTypes = this.getFilteredDrinkTypes(drinkGroupId);
            console.log(this.filteredDrinkTypes);
        },
        getFilteredDrinkTypes(drinkGroupId) {
            let filteredDrinkTypes = Array();
            this.drinkStore.drinkTypes.forEach((drinkType) => {
                if (drinkType.drinkGroups) {
                    if (drinkType.drinkGroups.alcohol 
                        && drinkGroupId === this.drinkStore.drinkGroupEnum.alcoholicDrinks) {
                            filteredDrinkTypes.push(drinkType);
                    } else if (drinkType.drinkGroups.coffee 
                        && drinkGroupId === this.drinkStore.drinkGroupEnum.coffeeDrinks) {
                            filteredDrinkTypes.push(drinkType);
                    } else if (drinkType.drinkGroups.soft 
                        && drinkGroupId === this.drinkStore.drinkGroupEnum.softDrinks) {
                            filteredDrinkTypes.push(drinkType);
                    }
                }
            });

            return filteredDrinkTypes;
        },
        hideDrinkGroupIcons() {
            const $nav = document.getElementsByTagName("nav")[0];
            const $navButtonSvgArray = $nav.getElementsByClassName("icons");
            for(const $elem of $navButtonSvgArray) {
            $elem.style.display = "none";
            }
            this.drinkGroupChosen = true;
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}
.hidden {
  display: none;
}

.drink-group-chosen {
  @apply h-fit mt-0;

  .text {
    @apply my-4;
  }
}

button {
  @apply text-2xl sm:text-5xl;
}

.drinkGroupButton {
  @apply w-full py-4 rounded-lg overflow-hidden
  border border-white
  flex flex-col justify-center items-center;
  @include sizedBoxShadow;
  
  .text {
    @apply h-16 sm:h-32 mt-4 
    flex flex-col justify-center overflow-hidden;
  }
}

.icons {
  @apply w-2/3;
  // max-height: 60%;
  // max-width: 100%;
  // margin: auto;
  overflow: hidden;
}

button.activated {
  color: #000;
  background-color: #fff;
}

</style>
