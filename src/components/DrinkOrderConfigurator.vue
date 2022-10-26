<template>
  <div id="drink-group-choice" class="content">
    <h1>
      NEW ORDER
    </h1>
    <DrinkGroupChoice @filterDrinkTypesByGroup="filterDrinkTypesByGroup" :drinkGroupEnum="drinkGroupEnum" />
    <DrinkChoice :drinkTypes="filteredDrinkTypes" @selectDrink="selectDrink" :class="{ hidden: !drinkGroupChosen }" :enabled="drinkGroup" />
    <DrinkSubChoice @selectSubChoice="selectSubChoice" :activeSubChoice="activeSubChoice" />
  </div>
</template>

<script>
import DrinkSubChoice from '@/components/DrinkSubChoice.vue';
import DrinkChoice from '@/components/drink-group-components/DrinkChoice.vue';
import DrinkGroupChoice from '@/components/DrinkGroupChoice.vue';

export default {
    name: "DrinkOrderConfigurator",
    props: {
        drinkTypes: {
          type: Array,
          default: () => {return [];}
        },
        drinkGroupEnum: {
          type: Object,
          default: () => {return Object();}
        }
    },
    data() {
      return {
        drinkGroup: "none",
        drinkGroupChosen: false,
        drinkChosen: false,
        newOrder: {
          drinkId: undefined,
          subChoices: {
            useIce: undefined,
            useLargeGlass: undefined,
          },
        },
        activeSubChoice: {
          key: undefined,
          availableOptions: undefined,
        },
        filteredDrinkTypes: [],
      }
    },
    components: {
    DrinkSubChoice,
    DrinkChoice,
    DrinkGroupChoice
}, methods: {
      selectSubChoice(optionValue) {
        // this.$emit('changeScreen', 'DrinkOrderConclusion');
        this.newOrder.subChoices[this.activeSubChoice.key] = optionValue;
        if (this.activeSubChoice.key == "useIce" && this.drinkTypes[this.newOrder.drinkId].volumeOption) {
          this.activeSubChoice.key = "useLargeGlass";
          this.activeSubChoice.availableOptions = [
            { label: '250 ML', value: false, id: 0 },
            { label: '400 ML', value: true, id: 1 },
          ];
        } else {
          this.$emit('makeOrder', this.newOrder);
        }
      },
      selectDrink(drinkId) {
        this.drinkChosen = true;
        this.newOrder.drinkId = drinkId;

        const $nav = document.getElementsByTagName("nav")[0];
        const $groupDrink = document.getElementsByClassName("drinkGridContainer")[0];
        $nav.style.display = "none";
        $groupDrink.style.display = "none";

        if (this.drinkTypes[drinkId].iceOption) {
          this.activeSubChoice.key = "useIce";
          this.activeSubChoice.availableOptions = [
            { label: 'WITHOUT ICE', value: false, id: 0 },
            { label: 'WITH ICE', value: true, id: 1 },
          ];
          this.newOrder.subChoices.useIce = false;
        } else if (this.drinkTypes[drinkId].volumeOption) {
          this.activeSubChoice.key = "useLargeGlass";
          this.activeSubChoice.availableOptions = [
            { label: '250 ML', value: false, id: 0 },
            { label: '400 ML', value: true, id: 1 },
          ];
        } else {
          this.newOrder.subChoices.useIce = false;
          this.newOrder.subChoices.useLargeGlass = false;
          this.$emit('makeOrder', this.newOrder);
        }
      },
      filterDrinkTypesByGroup(group) {
        this.drinkGroup = group;
        this.filteredDrinkTypes = Array();

        this.drinkGroupChosen = true;

        this.drinkTypes.forEach((drinkType) => {
          if (drinkType.drinkGroups) {
            if (drinkType.drinkGroups.alcohol && group === this.drinkGroupEnum.alcoholicDrinks) {
              this.filteredDrinkTypes.push(drinkType);
            } else if (drinkType.drinkGroups.coffee && group === this.drinkGroupEnum.coffeeDrinks) {
              this.filteredDrinkTypes.push(drinkType);
            } else if (drinkType.drinkGroups.soft && group === this.drinkGroupEnum.softDrinks) {
              this.filteredDrinkTypes.push(drinkType);
            }
          }
        });
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}

.hidden {
  display: none;
}

.content > * + * { margin-top: 3vh;}

.content {
    @media only screen and (min-width: 992px) {
        width: 60%;
        min-height: 75vh;
        margin-top: 5vh;
    }

    @media only screen and (max-width: 991px) {
        width: 90%;
        min-height: 75vh;
        margin-top: 5vh;
    }
    // position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: center;
    // gap: 3vh;

    h1 {
        text-align: center;
        @media only screen and (min-width: 992px) {
            font-size: 4vw;
        }
        @media only screen and (max-width: 991px) {
            font-size: 7.5vw;
        }
    }

    nav {
      width: 100%;
      // height: 30%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5vw;
      justify-items: stretch;
      @media only screen and (min-width: 992px) {
          height: 10vw;
      }
      @media only screen and (max-width: 991px) {
          height: 35vw;
      }
      // transition-property: height;
      // transition-duration: 0.3s;
      // svg {
      //   max-height: 60%;
      //   max-width: 30%;
      //   vertical-align: middle;
      // }
    }

    .drink-group-chosen {
      height: 10%;
      @media only screen and (min-width: 992px) {
          height: 8vw;
      }
      @media only screen and (max-width: 991px) {
          height: 13vw;
      }
      button {
        padding: 0;
        min-height: 0;
        height: 100%;
      }
    }

    button {
      @media only screen and (min-width: 992px) {
          @include sizedBoxShadow(calc(0.5vw));
          // font-size: .6rem;
          height: 20vw;
      }

      @media only screen and (max-width: 991px) {
          @include sizedBoxShadow(calc(1vw));
          // font-size: .4rem;
          height: 35vw;
      }
      font-size: .6rem;
      vertical-align: middle;
      padding: 10% 0 0 0;
      border-radius: 10px;
      background-color: #000;
      border: 2px solid #ffffff;
      @include sizedBoxShadow;
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
      overflow: hidden;
      // text-overflow: ellipsis;

      display: flex;
      flex-flow: column nowrap;
      // row-gap: 0.4rem;
      justify-content: center;
      align-items: stretch;

      .icons {
        flex-basis: 50%;
        height: 50%;
        // max-height: 60%;
        // max-width: 100%;
        // margin: auto;
        overflow: hidden;
        font-size: 0.8em;
        svg {
          // width: 100%;
          // width:auto;
          height: 90%;
          width: 90%;
          // max-height: 7vw;
          // max-height: 100%;
        }
      }

      .text {
        // width: 100%;
        // height: 20%;
        flex-basis: 35%;
        position: relative;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          text-align: center;
          margin: auto;
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
}
</style>
