<template>
<svg :class="{white: isWhite}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<title>Juice</title>
<g id="Juice">
<path d="M29.5,16.25a1,1,0,0,0-1.92-.58,8.91,8.91,0,0,1-5.91,5.92,1,1,0,0,0,.58,1.91A10.92,10.92,0,0,0,29.5,16.25Z"/>
<path d="M55,0H44a1,1,0,0,0-1,.83L41,12H30A11,11,0,1,0,18,24V61a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V13a1,1,0,0,0-1-1H43.07L44.84,2H55A1,1,0,0,0,55,0ZM10,13a9,9,0,0,1,9-9,8.92,8.92,0,0,1,8.92,8H19a1,1,0,0,0-1,1v8.92A8.92,8.92,0,0,1,10,13Zm36,1V61a1,1,0,0,1-1,1H21a1,1,0,0,1-1-1V14H40.69L38.75,25H23a1,1,0,0,0-1,1V56a3,3,0,0,0,3,3H41a3,3,0,0,0,3-3V26a1,1,0,0,0-1-1H40.78l1.94-11ZM36,52.17,40.43,27H42V56a1,1,0,0,1-1,1H25a1,1,0,0,1-1-1V27H38.4L34,51.83A1,1,0,0,0,36,52.17Z"/>
</g>
</svg>
</template>

<script>
export default {
    name: 'SoftDrinkIconSvg',
    props: {
        isWhite: {
            type: Boolean,
            default: true,
        }
    }
}
</script>

<style scoped>
.white {
    fill: white;
    stroke: white;
}
</style>