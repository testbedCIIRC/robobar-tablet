<template>
  <nav :class="{'drink-group-chosen': drinkGroupChosen}">
    <button class="drinkGroupButton" @click="setDrinkGroup(drinkGroupEnum.coffeeDrinks); hideDrinkGroupIcons()" :class="{activated: drinkGroup === drinkGroupEnum.coffeeDrinks}">
      <div class="icons"><CoffeeIconSvg /></div>
      <div class="text"><span>Coffee</span></div>
    </button>
    <button class="drinkGroupButton" @click="setDrinkGroup(drinkGroupEnum.softDrinks); hideDrinkGroupIcons()" :class="{activated: drinkGroup === drinkGroupEnum.softDrinks}">
      <div class="icons"><SoftDrinkIconSvg /></div>
      <div class="text"><span>Soft drinks</span></div>
    </button>
    <button class="drinkGroupButton" @click="setDrinkGroup(drinkGroupEnum.alcoholicDrinks); hideDrinkGroupIcons()" :class="{activated: drinkGroup === drinkGroupEnum.alcoholicDrinks}">
      <div class="icons"><AlcoholIconSvg /></div>
      <div class="text"><span>Alcohol</span></div>
    </button>
  </nav>
</template>

<script>
import CoffeeIconSvg from '@/components/svg-components/CoffeeIconSvg.vue';
import SoftDrinkIconSvg from '@/components/svg-components/SoftDrinkIconSvg.vue';
import AlcoholIconSvg from '@/components/svg-components/AlcoholIconSvg.vue';

export default {
    name: "DrinkGroupChoice",
    props: {
        drinkGroupEnum: {
          type: Object,
          default: () => {return Object();}
        }
    },
    data() {
      return {
        drinkGroup: "none",
        drinkGroupChosen: false,
      }
    },
    components: {
     CoffeeIconSvg,
     SoftDrinkIconSvg,
     AlcoholIconSvg,
    }, methods: {
      setDrinkGroup(chosenDrinkGroup) {
        this.drinkGroup = chosenDrinkGroup;
        console.log(this.drinkGroup);
        this.$emit('filterDrinkTypesByGroup', this.drinkGroup);
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
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}

.hidden {
  display: none;
}

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
    gap: 3vh;

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
