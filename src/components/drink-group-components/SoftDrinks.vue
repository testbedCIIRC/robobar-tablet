<template>
<div class="drinkGridContainer">
  <button class="drinkGroupButton">
    <div class="text"><span>Still water</span></div>
    <div class="icons">
      <BeakerIconSvg /> 300ml or <BeakerIconSvg /> 500ml
    </div>
  </button>
  <button class="drinkGroupButton">
    <div class="text"><span>Soda</span></div>
    <div class="icons">
      <BeakerIconSvg /> 300ml or <BeakerIconSvg /> 500ml
    </div>
  </button>
  <button class="drinkGroupButton">
    <div class="text"><span>Ginger soda</span></div>
    <div class="icons">
      <BeakerIconSvg /> 300ml or <BeakerIconSvg /> 500ml
    </div>
  </button>
  <button class="drinkGroupButton">
    <div class="text"><span>Raspberry soda</span></div>
    <div class="icons">
      <BeakerIconSvg /> 300ml or <BeakerIconSvg /> 500ml
    </div>
  </button>
  <button class="drinkGroupButton">
    <div class="text"><span>Coke</span></div>
    <div class="icons">
      <BeakerIconSvg /> 300ml or <BeakerIconSvg /> 500ml
    </div>
  </button>
  <button class="drinkGroupButton">
    <div class="text"><span>Tonic</span></div>
    <div class="icons">
      <BeakerIconSvg /> 300ml or <BeakerIconSvg /> 500ml
    </div>
  </button>
</div>
</template>

<script>
import BeakerIconSvg from '../svg-components/BeakerIconSvg.vue';

export default {
    name: "SoftDrinks",
    props: {
        msg: String
    },
    components: { BeakerIconSvg }
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
  grid-template-rows: repeat(4, 1fr);
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
        min-height: 8vw;
        @include sizedBoxShadow(0.5vw);
    }

    @media only screen and (max-width: 991px) {
        // font-size: 5vw;
        min-height: 20vw;
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
      }
    }

    .text {
      flex-basis: 40%;
      // position: relative;
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
