<template>
  <div class="content">
    <div class="logos">
          <img id="ricaip-logo" src="@/assets/RGB_RICAIP_WHITE_crop.svg" alt="Ricaip logo">
          <img id="ciirc-logo" src="@/assets/logo_CIIRC_zkratka_negativ.svg" alt="CIIRC logo">
          <img id="pilsner-logo" src="@/assets/Pilsner_Urquell_logo_bile.svg" alt="Pilsner logo">
    </div>
    <h1>ORDER A DRINK!</h1>
    
    <svg class="tapCircle" @click="changeScreen('DrinkGroupChoice')" viewBox="0 0 100 100">
        <circle stroke="white" stroke-width="2%" class="white" cx="50%" cy="50%" r="49%" fill="white"></circle>
        <!-- <image x="25%" y="6%" dominant-baseline="middle" href="tap_hand_icon.svg"/>  -->
        <text class="black" x="50%" y="66%" dominant-baseline="middle" text-anchor="middle">
            TAP
        </text>
        <text class="black" x="50%" y="80%" dominant-baseline="middle" text-anchor="middle">
            HERE
        </text>
        <TapHandIconSvg width="50%" x="25%" y="-15%" :white="!flipFlopSwitch ? true : false" />
    </svg>
  </div>
</template>

<script>
import TapHandIconSvg from './svg-components/TapHandIconSvg.vue';

export default {
    name: 'HomePage',
    components: {
        TapHandIconSvg
    },
    props: {
    // msg: String,
    },
    data() {
        return {
            flashingInterval: Number,
            flipFlopSwitch: Boolean
        }
    },
    mounted: function() {
        this.startFlashing();
    },
    methods: {
        changeScreen(newScreen) {
            this.$emit('changeScreen', newScreen);
        },
        startFlashing() {
            const $tapSvg = document.getElementsByClassName("tapCircle")[0];
            const $tapSvgWhiteArray = $tapSvg.getElementsByClassName("white");
            const $tapSvgBlackArray = $tapSvg.getElementsByClassName("black");
            // const $tapSvgImage = $tapSvg.getElementsByTagName("image")[0];

            this.flashingInterval = setInterval(() => {
                this.flipFlopSwitch = (this.flipFlopSwitch === false);

                for (const $elem of $tapSvgWhiteArray) {
                    if (this.flipFlopSwitch) {
                        $elem.style.fill = "white";
                    } else {
                        $elem.style.fill = "black";
                    }
                }

                for (const $elem of $tapSvgBlackArray) {
                    if (this.flipFlopSwitch) {
                        $elem.style.fill = "black";
                    } else {
                        $elem.style.fill = "white";
                    }
                }
            }, 500);
        },
        stopFlashing() {
            clearInterval(this.flashingInterval);
        }
    },
    beforeUnmount() {
        this.stopFlashing();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.content {
    @media only screen and (min-width: 992px) {
        width: 60%;
        height: 75vh;
        margin-top: 5vh;
    }

    @media only screen and (max-width: 991px) {
        width: 90%;
        height: 75vh;
        margin-top: 5vh;
    }
    // position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    
    .logos {
        align-self: flex-start;
        width: 100%;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        @media only screen and (max-width: 425px) {
            #ricaip-logo {
                width: 33%;
            }

            #ciirc-logo {
                width: 15%;
            }

            #pilsner-logo {
                width: 33%;
            }
        }
        @media only screen and (min-width: 425px) {
            #ricaip-logo {
                width: 22%;
            }

            #ciirc-logo {
                width: 10%;
            }

            #pilsner-logo {
                width: 22%;
            }
        }
    }

    h1 {
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
    }

    .tapCircle {
        width: 50%;
        aspect-ratio: 1/1;
        position: relative;

        text {
            font-family: Inter, sans-serif;
            font-size: 15px;
            font-weight: 1000;
        }
    }
}
</style>
