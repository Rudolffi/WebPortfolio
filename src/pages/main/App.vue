<template>
  <div id="app">
    <Tausta/>
    <Navbar/>
    <Information/>
    <projects/>
    <Socials/>
  </div>
</template>

<script>

import Information from '../../components/Information.vue'
import Navbar from '../../components/Navbar.vue'
import Tausta from '../../components/Tausta.vue'
import projects from '../../components/projects.vue'
import Socials from '../../components/Socials.vue'
import EditButton from '../../components/EditButton.vue'

export default {
  name: 'App',
  components: {
    Information,
    Navbar,
    projects,
    Tausta,
    Socials,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #44c7b0;
  background-color: rgba(30, 30, 30, 0);
}
</style>
