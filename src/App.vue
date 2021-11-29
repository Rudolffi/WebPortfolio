<template>
  <div id="app">
    <Navbar/>
    <Information/>
  </div>
</template>

<script>

import Information from './components/Information.vue'
import Navbar from './components/Navbar.vue'


export default {
  name: 'App',
  components: {
    Navbar,
    Information
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
}
</style>
