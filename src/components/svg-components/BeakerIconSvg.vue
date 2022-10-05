<template>
<svg :class="{white: isWhite}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
    <path
     d="m 80.25,3 h -65 C 15.181,3 15.111,3.002 15.042,3.006 11.698,3.192 8.457,4.272 5.67,6.13 4.383,6.988 3.755,8.548 4.088,10.058 c 0.333,1.51 1.56,2.661 3.088,2.898 C 9.682,13.344 11.5,15.465 11.5,18 V 79.25 C 11.5,86.832 17.668,93 25.25,93 h 42.5 C 75.332,93 81.5,86.832 81.5,79.25 V 19.731 c 0,-3.987 0.751,-7.886 2.232,-11.589 C 84.194,6.987 84.053,5.677 83.355,4.647 82.658,3.617 81.494,3 80.25,3 Z M 76,19.731 V 79.25 c 0,3.446 -4.804,8.25 -8.25,8.25 H 23.25 C 19.804,87.5 17,82.696 17,79.25 V 18 C 17,15.198 14.101,10.601 12.552,8.5 H 77.115 C 76.374,11.511 76,16.599 76,19.731 Z"
     stroke="none"
     id="path301"
     sodipodi:nodetypes="sscsscssssssccsssssssccs" /><path
     d="m 54,73 h 15 v 5 H 54 Z"
     stroke="none"
     id="path303" /><path
     d="m 54,63 h 15 v 5 H 54 Z"
     stroke="none"
     id="path305" /><path
     d="m 54,53 h 15 v 5 H 54 Z"
     stroke="none"
     id="path307" /><path
     d="m 54,43 h 15 v 5 H 54 Z"
     stroke="none"
     id="path309" /><path
     d="m 54,33 h 15 v 5 H 54 Z"
     stroke="none"
     id="path311" /><path
     d="m 54,23 h 15 v 5 H 54 Z"
     stroke="none"
     id="path313" />
</svg>
</template>

<script>
export default {
    name: 'BeakerIconSvg',
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