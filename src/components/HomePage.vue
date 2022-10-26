<template>
  <div class="content">
    <div class="logos">
          <img id="ricaip-logo" src="@/assets/RGB_RICAIP_WHITE_crop.svg" alt="Ricaip logo">
          <img id="ciirc-logo" src="@/assets/logo_CIIRC_zkratka_negativ.svg" alt="CIIRC logo">
          <img id="pilsner-logo" src="@/assets/Pilsner_Urquell_logo_bile.svg" alt="Pilsner logo">
    </div>
    <!-- <h1>ORDER A DRINK!</h1> -->
    <svg :class="{hidden: !drinkTypesLoaded}" class="pulsing tapCircle" @click="changeScreen('DrinkOrderConfigurator')" viewBox="0 0 100 100">
        <circle stroke="white" stroke-width="2%" cx="50%" cy="50%" r="49%" fill="white"></circle>
        <text class="black" x="50%" y="66%" dominant-baseline="middle" text-anchor="middle">
            TAP
        </text>
        <text class="black" x="50%" y="80%" dominant-baseline="middle" text-anchor="middle">
            HERE
        </text>
        <TapHandIconSvg width="50%" x="25%" y="-15%" :white="!flipFlopSwitch ? true : false" />
    </svg>
    <!-- <div>{{ drinkTypesLoaded }}</div> -->
    <svg :class="{hidden: drinkTypesLoaded}" class="loadingCircle rotating" viewBox="0 0 100 100" >
        <path d="M 98 50 A 48 48 0 0 1 50 98" stroke-width="2%" stroke="white"/>
        <text x="50%" y="66%" dominant-baseline="middle" text-anchor="middle">
            TAP
        </text>
    </svg>
    <div></div>
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
            default: false,
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
    methods: {
        changeScreen(newScreen) {
            this.$emit('changeScreen', newScreen);
        },
        startFlashing() {
            const $tapSvg = document.getElementsByClassName("tapCircle")[0];
            const $tapSvgWhiteArray = $tapSvg.getElementsByClassName("white");
            const $tapSvgBlackArray = $tapSvg.getElementsByClassName("black");

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
@import 'src/variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.hidden {
    display: none;
}

@keyframes rotating {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.rotating {
    animation: rotating 2s linear infinite;
}

@keyframes pulsing {
    10% {
        transform: scale(1);
    }
    40% {
        transform: scale(1.2);
    }
    60% {
        transform: scale(1.2);
    }
    90% {
        transform: scale(1);
    }
}

.pulsing {
    animation: pulsing 2s ease infinite;
}

.content {
    @media only screen and (min-width: $min-screen-size-split) {
        width: 60%;
        height: 90vh;
        margin-top: 5vh;
    }

    @media only screen and (max-width: $max-screen-size-split) {
        width: 90%;
        height: 90vh;
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
        @media only screen and (min-width: $min-screen-size-split) {
            width: 30%;
        }

        @media only screen and (max-width: $max-screen-size-split) {
            width: 50%;
        }
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
