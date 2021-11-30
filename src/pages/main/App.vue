<template>
  <div id="app">
    <Navbar/>
    <Information/>
    <Tausta/>
    <projects/>
  </div>
</template>

<script>

import Information from '../../components/Information.vue'
import Navbar from '../../components/Navbar.vue'
import Tausta from '../../components/Tausta.vue'
import projects from '../../components/projects.vue'
import EditButton from '../../components/EditButton.vue'

export default {
  name: 'App',
  components: {
    Information,
    Navbar,
    projects,
    Tausta,
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
  background-color: #1e1e1e;
}
</style>
