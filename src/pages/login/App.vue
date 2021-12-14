<template>
  <div id="app">
    <Tausta/>
    <LoginForm/>
  </div>
</template>

<script>

import Tausta from '../../components/Tausta.vue'
import LoginForm from "../../components/LoginForm";

export default {
  name: 'App',
  components: {
    LoginForm,
    Tausta,
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
html {
  scroll-behavior: smooth;
}
</style>
