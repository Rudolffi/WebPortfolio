<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>

import HelloWorld from '../../components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log("APUA");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}
</style>
