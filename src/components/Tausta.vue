<template>
  <canvas id="gamecanvas"></canvas>
</template>

<script>
import * as pallo from '../pallot/canvas.js';
export default {
  name: "Tausta",
  mounted() {
    pallo.init();
  },
}
//import '../pallot/canvas.js'
</script>

<style scoped>
@import './../css/tausta.css';
</style>