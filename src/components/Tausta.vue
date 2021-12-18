<template>
  <canvas id="gamecanvas"></canvas>
</template>

<script>
import * as pallo from '../pallot/canvas.js';
export default {
  name: "Tausta",
  mounted() {
    pallo.init();
    // custom event detector
    this.$root.$on('myEvent', (text) => {
      pallo.update();
    })
  },
}
</script>

<style scoped>
@import './../css/tausta.css';
</style>