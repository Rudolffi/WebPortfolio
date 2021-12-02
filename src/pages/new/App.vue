<template>
  <div id="app">
    <Navbar/>
    <Tausta/>
    <Form/>
  </div>
</template>

<script>

import Form from '../../components/Form.vue'
import Navbar from '../../components/Navbar.vue'
import Tausta from '../../components/Tausta.vue'

export default {
  name: 'App',
  components: {
    Tausta,
    Form,
    Navbar
  },
  mounted() {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c7c2c2;
  display: inline-block;
}
</style>
