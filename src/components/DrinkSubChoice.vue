<template v-if="activeSubChoice !== undefined">
  <div id="drink-sub-choice" class="gridContainer" v-if="Array.isArray(activeSubChoice.availableOptions)" :style="{display: activeSubChoice.availableOptions.length < 2 ? 'none' : 'grid'}">
    <button class="drinkGroupButton" v-for="option in activeSubChoice.availableOptions" :key="option.id" @click="selectSubChoice(option.value);">
      <div class="text"><span>{{ option.label }}</span></div>
    </button>
  </div>
</template>

<script>
export default {
    name: "DrinkSubChoice",
    props: {
      activeSubChoice: {
          type: Object,
          default: () => { 
            return {
              key: undefined,
              availableOptions: undefined,
            }
          }
      },
    },
    methods: {
      selectSubChoice(optionValue) {
        this.$emit('selectSubChoice', optionValue);
      }
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}
.gridContainer {

  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 1.5vw;
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
        min-height: 8vw;
        @include sizedBoxShadow(0.5vw);
    }

    @media only screen and (max-width: 991px) {
        min-height: 20vw;
        @include sizedBoxShadow;
    }
    padding: 1vw 0 0 0;
    row-gap: 0.2rem;
    width: 100%;
    height: 100%;
    border-radius: 10px;
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
      overflow: hidden;
      text-transform: none;
      font-size: 0.7em;
      svg {
        height: 40%;
        fill: white;
        font-size: 40px;
        vertical-align: middle;
      }
    }

    .text {
      flex-basis: 50%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      span {
        text-align: center;
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