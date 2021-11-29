<template>
  <div id="app">
    <Navbar/>
    <Information/>
    <Tausta/>
  </div>
</template>

<script>

import Information from './components/Information.vue'
import Navbar from './components/Navbar.vue'

import Tausta from './components/Tausta.vue'

export default {
  name: 'App',
  components: {
    Information,

    Navbar,
    Tausta
  },
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
