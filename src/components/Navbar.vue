<template>
<div>
  <nav class="navbar">
    <div class="content">
      <div class="logo">Portfolio</div>
      <ul class="menu-links">
        <div class="icon cancel-btn">
          <i class="fas fa-times"></i>
        </div>
        <li id="storyLink"><a href="#story">About</a></li>
        <li id="infoLink"><a href="#info">Skills</a></li>
        <li id="rsvpLink"><a href="#rsvp">Projects</a></li>
        <!--<li id="contactLink"><a href="#contactUs">Yhteystiedot</a></li>-->
      </ul>
      <div class="icon menu-btn">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
@import './../css/navbar.css';
</style>