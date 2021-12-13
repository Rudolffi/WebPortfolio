<template>
  <canvas id="gamecanvas"></canvas>
</template>

<script>
import * as pallo from '../pallot/canvas.js';
export default {
  name: "Tausta",
  mounted() {
    pallo.init();
    this.$root.$on('myEvent', (text) => { // here you need to use the arrow function
      this.message = text;
      pallo.update();
    })
  },
}
//import '../pallot/canvas.js'
</script>

<style scoped>
@import './../css/tausta.css';
</style>