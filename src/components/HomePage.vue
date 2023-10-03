<template>
    <div class="lg:gap-4 gap-16 h-[70vh] sm:h-[80vh]
    flex flex-col justify-between items-center">
        <div class="w-full
            flex flex-col justify-evenly items-center gap-8">
            <div class="w-full
            flex flex-row justify-center items-center gap-8 flex-nowrap">
                <img class="w-1/3 md:w-48" src="@/assets/RGB_RICAIP_WHITE_crop.svg" alt="Ricaip logo">
                <img class="w-1/12 md:w-24" src="@/assets/logo_CIIRC_zkratka_negativ.svg" alt="CIIRC logo">
                <img class="w-1/3 md:w-44 md:h-20" src="@/assets/Pilsner_Urquell_logo_bile.svg" alt="Pilsner logo">
            </div>
            <div class="w-full
                flex flex-row justify-center gap-8 flex-nowrap">
                <img class="w-1/4 md:w-48" src="@/assets/Coca-cola-white.svg" alt="Coca cola logo">
                <img class="w-1/4 md:w-48" src="@/assets/costa-we-are-serving.svg" alt="Costa Coffee logo">
            </div>
        </div>
        <h1 class="pg-header">
            ORDER A DRINK!
        </h1>
        <svg v-if="drinkStore !== null && drinkStore.drinkTypes !== null"
        class="w-1/2 relative pulsing"
        @click="changeScreen('DrinkGroupChoice')" 
        viewBox="0 0 100 100">
            <circle stroke="white" stroke-width="2%" class="white" cx="50%" cy="50%" r="49%" fill="white"></circle>
            <!-- <image x="25%" y="6%" dominant-baseline="middle" href="tap_hand_icon.svg"/>  -->
            <text class="text-[15px] font-black" x="50%" y="66%" dominant-baseline="middle" text-anchor="middle">
                TAP
            </text>
            <text class="text-[15px] font-black" x="50%" y="80%" dominant-baseline="middle" text-anchor="middle">
                HERE
            </text>
            <TapHandIconSvg width="50%" x="25%" y="-15%" fill="#000"/>
        </svg>
        <svg v-else
        class="w-1/2 relative rotating" viewBox="0 0 100 100">
            <path id="loading-arc" stroke="#fff" stroke-width="2"/>
        </svg>
    </div>
</template>

<script>
import TapHandIconSvg from './svg-components/TapHandIconSvg.vue';
import { useOrderStore } from '@/stores/order';
import { useDrinkStore } from '@/stores/drink';
import { describeArc } from '@/scripts/part-circle';

export default {
    name: 'HomePage',
    components: {
        TapHandIconSvg
    },
    data() {
        return {
            drinkStore: null,
        }
    },
    beforeMount() {
        this.drinkStore = useDrinkStore();
        let orderStore = useOrderStore();
        orderStore.setDefaultOrder();
    },
    async mounted() {
        if (this.drinkStore === null || this.drinkStore.drinkTypes === null) {
            document.getElementById("loading-arc")
                .setAttribute("d", describeArc(50, 50, 47, 0, 60));
        }

        await this.drinkStore.requestNewDrinkTypes();
    },
    methods: {
        changeScreen(newScreen) {
            this.$emit('changeScreen', newScreen);
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.rotating {
    animation: rotating 1s linear infinite;
    stroke-linecap: round;
}

@keyframes rotating {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}
.pulsing {
    animation: pulsing 1s ease infinite;
}

@keyframes pulsing {
    10% {
        transform: scale(1);
    }
    40% {
        transform: scale(1.1);
    }
    60% {
        transform: scale(1.1);
    }
    90% {
        transform: scale(1);
    }
}
</style>
