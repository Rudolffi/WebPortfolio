<template>
  <canvas id="gamecanvas"></canvas>
</template>

<script>
export default {
  name: "Tausta",

  mounted() {
    /*
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = './pallot/canvas.js';
    document.body.appendChild(s);
     */
  },
}
</script>

<style scoped>
  #gamecanvas{
    width: 100%;
    height: 100%;
  }
</style>