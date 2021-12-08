<template>
  <div id="app">
    <Tausta/>
    <Navbar/>
    <Information/>
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
  color: #2c3e50;
  background-color: rgba(30, 30, 30, 0);
}
</style>
