<template>
<div>

  <ul id="nav">
    <h3>
      Portfolio
    </h3>
    <div class="navbar">
    <li class="navitem">
      <a href="#" class="navlink">About</a>
    </li>
    <li class="navitem">
      <a href="#" class="navlink">Skills</a>
    </li>
    <li class="navitem">
      <a href="#" class="navlink">Projects</a>
    </li>
    </div>

  </ul>
</div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

// Get the navbar
    var navbar = document.getElementById("nav");

// Get the offset position of the navbar
    var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
  }
}


</script>

<style scoped>
@import './../css/navbar.css';
</style>