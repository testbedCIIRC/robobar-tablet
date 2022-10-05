<template>
  <div class="content">
    <h1>
      YOUR ORDER IS <br/> IN THE QUEUE
    </h1>
    <div>
      <h2>
        Your order number:
      </h2>
      <div class="order-number">
        123
      </div>
    </div>
    <!-- <h2>
      Approximate queue wait time:
    </h2>
    <div class="order-number">
      12 m 34 s
    </div> -->
    <!-- <div class="button-div"><button>Confirm</button></div> -->
    <button @click="goToHomePage();">Confirm</button>
  </div>
</template>

<script>
export default {
  name: 'DrinkOrderConclusion',
  props: {
    msg: String
  },
  methods: {
    goToHomePage() {
      this.$emit('changeScreen', 'HomePage');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@mixin sizedBoxShadow($shadow-size: 1vw) {
  box-shadow: 0 $shadow-size #ffffff;
}
.content {
    @media only screen and (min-width: 992px) {
        width: 60%;
        min-height: 90vh;
        margin-top: 5vh;
    }

    @media only screen and (max-width: 991px) {
        width: 90%;
        min-height: 90vh;
        margin-top: 5vh;
    }
 
    // position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: center;
    gap: 3vh;

    h1 {
        margin-top: 0;
        text-align: center;
        @media only screen and (min-width: 992px) {
            font-size: 4vw;
        }
        @media only screen and (max-width: 991px) {
            font-size: 7.5vw;
        }
    }
    h2 {
        // margin: 0;
        text-align: center;
        @media only screen and (min-width: 992px) {
            font-size: 3vw;
        }
        @media only screen and (max-width: 991px) {
            font-size: 6vw;
        }
    }
    .order-number {
      text-align: center;
      font-size: 20vw;
    }
    button {
      @media only screen and (min-width: 992px) {
          @include sizedBoxShadow(calc(0.5vw));
          // font-size: .6rem;
          width: 50%;
          height: 10vw;
      }

      @media only screen and (max-width: 991px) {
          @include sizedBoxShadow(calc(1vw));
          // font-size: .4rem;
          width: 50%;
          height: 15vw;
      }
      align-self: center;
      margin-top: 2vh;
      font-size: .6rem;
      vertical-align: middle;
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
