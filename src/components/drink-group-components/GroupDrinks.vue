<template>
  <div class="drinkGridContainer" >
    <template v-for="drinkType in drinkTypes" :key="drinkType.id">
      <button class="drinkGroupButton" v-if="drinkType.enabled" @click="selectDrink(drinkType.id);" >
        <div class="text"><span>{{ drinkType.name }}</span></div>
        <template v-if="drinkType.parameters !== undefined && drinkType.parameters.showParameters">
          <div class="icons">
            <template v-if="drinkType.parameters.coffeeStrength !== undefined && drinkType.parameters.coffeeStrength > 0"><CoffeeBeanIconSvg v-for="n in drinkType.parameters.coffeeStrength" :key="n">{{n}}</CoffeeBeanIconSvg></template>
            <template v-if="drinkType.parameters.coffeeStrength > 0 && drinkType.parameters.volumeInMl > 0 && drinkType.parameters.milkPercentage > 0">, </template>
            <template v-if="drinkType.parameters.volumeInMl !== undefined && drinkType.parameters.volumeInMl > 0"><BeakerIconSvg /> {{ drinkType.parameters.volumeInMl }}ml</template>
            <template v-if="drinkType.parameters.volumeInMl > 0 && drinkType.parameters.milkPercentage > 0">, </template>
            <template v-if="drinkType.parameters.milkPercentage !== undefined && drinkType.parameters.milkPercentage > 0"><MilkIconSvg /> {{ drinkType.parameters.milkPercentage }} %</template>
          </div>
        </template>
      </button>
    </template>
  </div>
</template>

<script>
import CoffeeBeanIconSvg from '@/components/svg-components/CoffeeBeanIconSvg.vue';
import BeakerIconSvg from '@/components/svg-components/BeakerIconSvg.vue';
import MilkIconSvg from '@/components/svg-components/MilkIconSvg.vue';

export default {
    name: "GroupDrinks",
    methods: {
      selectDrink(drinkId) {
        this.$emit('selectDrink', drinkId);
      },
    },
    props: {
      drinkTypes: {
        type: Array,
        default: () => {
          return [];
        }
      },
      drinks: {
        type: Object,
        default: () => {
          return {
            rowCount: 3,
            columnCount: 2,
            buttons: [
              {
                id: 1,
                label: 'Choice 1',
                parameters: {
                  // strength: 2,
                  // milkPerc: 30,
                  volumeInMl: 150,
                  choices: [
                    {
                      id: 1,
                      label: '300 ml',
                    },
                    {
                      id: 2,
                      label: '500 ml',
                    }
                  ]
                }
              },
              {
                id: 2,
                label: 'Choice 2',
                parameters: {
                  // strength: 3,
                  // milkPerc: 30,
                  // volumeInMl: 150,
                }
              },
            ]
          }
        }
      }
    },
    components: {
      CoffeeBeanIconSvg,
      BeakerIconSvg,
      MilkIconSvg
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}
.drinkGridContainer {
  width: 100%;
  height: 60%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 1.5vw;
  // row-gap: 1.5vw;
  justify-items: stretch;
  @media only screen and (min-width: 992px) {
    row-gap: 2vw;
  }

  @media only screen and (max-width: 991px) {
    row-gap: 2.5vw;
  }
  
  button {
    font-size: 0.6rem;
    @media only screen and (min-width: 992px) {
        // font-size: 3vw;
        height: 8vw;
        @include sizedBoxShadow(0.5vw);
    }

    @media only screen and (max-width: 991px) {
        // font-size: 5vw;
        height: 20vw;
        @include sizedBoxShadow;
    }
    padding: 1vw 0 0 0;
    row-gap: 0.2rem;
    width: 100%;
    height: 100%;
    // background-color: salmon;
    border-radius: 10px;
    // margin: auto;
    // position: relative;
    background-color: #000;
    border: #ffffff;
    border-width: 2px;
    border-style: solid;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: stretch;

    .icons {
      flex-basis: 40%;
      height: 40%;
      // height: 100px;
      // max-height: 60%;
      // max-width: 100%;
      // margin: auto;
      overflow: hidden;
      text-transform: none;
      font-size: 0.7em;
      svg {
        // position: absolute;
        // margin: auto;
        // max-width: 15%;
        height: 40%;
        // width:10%;

        // min-width: 30px;
        // height: 100%;
        // margin: 0 0.5% 0 0.5%;
        fill: white;
        font-size: 40px;
        vertical-align: middle;
        margin-left: 1%;
      }
    }

    .text {
      flex-basis: 40%;
      // position: relative;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      
      span {
        // position: absolute;
        // top: 60%;
        // left: 50%;
        // transform: translate(-50%,-50%);
        text-align: center;
        // margin: auto;
      }
    }
  }
}

button.activated {
  color: #000;
  background-color: #fff;
}
button:active {
  @media only screen and (min-width: 992px) {
      @include sizedBoxShadow(calc(0.5vw - 4px));
  }

  @media only screen and (max-width: 991px) {
      @include sizedBoxShadow(calc(1vw - 4px));
  }
  transform: translateY(4px);
}
</style>
