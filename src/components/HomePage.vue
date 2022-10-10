<template>
  <div class="content">
    <div class="logos">
          <img id="ricaip-logo" src="@/assets/RGB_RICAIP_WHITE_crop.svg" alt="Ricaip logo">
          <img id="ciirc-logo" src="@/assets/logo_CIIRC_zkratka_negativ.svg" alt="CIIRC logo">
          <img id="pilsner-logo" src="@/assets/Pilsner_Urquell_logo_bile.svg" alt="Pilsner logo">
    </div>
    <h1>ORDER A DRINK!</h1>
    <svg v-if="drinkTypesLoaded" class="tapCircle" @click="changeScreen('DrinkOrderConfigurator')" viewBox="0 0 100 100">
        <circle stroke="white" stroke-width="2%" class="white" cx="50%" cy="50%" r="49%" fill="white"></circle>
        <text class="black" x="50%" y="66%" dominant-baseline="middle" text-anchor="middle">
            TAP
        </text>
        <text class="black" x="50%" y="80%" dominant-baseline="middle" text-anchor="middle">
            HERE
        </text>
        <TapHandIconSvg width="50%" x="25%" y="-15%" :white="!flipFlopSwitch ? true : false" />
    </svg>
    <svg v-else class="loadingCircle" viewBox="0 0 100 100" >
        <path d="M 98 50 A 48 48 0 0 1 50 98" stroke-width="2%" stroke="white"/>
        <text x="50%" y="66%" dominant-baseline="middle" text-anchor="middle">
            TAP
        </text>
    </svg>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import TapHandIconSvg from '@/components/svg-components/TapHandIconSvg.vue';

export default {
    name: 'HomePage',
    components: {
        TapHandIconSvg
    },
    props: {
        drinkTypesLoaded: {
            type: Boolean,
            default: () => {return false},
        },
    },
    data() {
        return {
            flashingInterval: Number,
            rotatingInterval: Number,
            flipFlopSwitch: Boolean,
            rotationAngle: Number,
        }
    },
    mounted: function() {
        if (this.drinkTypesLoaded) {
            this.startFlashing();
        } else {
            this.rotationAngle = 0;
            this.startRotating();
        }
    },
    methods: {
        changeScreen(newScreen) {
            this.$emit('changeScreen', newScreen);
        },
        startRotating() {
            const $rotatingSvg = document.getElementsByClassName("loadingCircle")[0];

            this.rotatingInterval = setInterval(() => {
                $rotatingSvg.setAttribute('transform', `rotate(${this.rotationAngle})`);
                this.rotationAngle += 5;
            }, 10);
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
        },
        stopRotating() {
            clearInterval(this.rotatingInterval);
        }
    },
    beforeUnmount() {
        this.stopFlashing();
        this.stopRotating();
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

    .tapCircle, .loadingCircle {
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
