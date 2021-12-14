<template>
  <div id="app">
    <FormNavbar/>
    <Tausta/>
    <projectForm/>
  </div>
</template>

<script>

import projectForm from '../../components/Form.vue'
import FormNavbar from '../../components/FormNavbar.vue'
import Tausta from '../../components/Tausta.vue'

export default {
  name: 'App',
  components: {
    Tausta,
    projectForm,
    FormNavbar
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
}
body{
  margin: 0;
  top: 0;
  left: 0;
  background-color: rgb(28,28,28);
}
</style>
