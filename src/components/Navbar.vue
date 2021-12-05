<template>
<div>

  <ul id="light-nav">
    <h3 class="light-head">
      Portfolio
    </h3>
    <div class="light-navbar">
    <li class="ligt-navitem">
      <a href="#" id="one" class="light-navlink">About</a>
    </li>
    <li class="ligt-navitem">
      <a href="#" id="two" class="light-navlink">Skills</a>
    </li>
    <li class="ligt-navitem">
      <a href="#" id="three" class="light-navlink">Projects</a>
    </li>
    </div>
  <div>
    <!-- <img class="light-icon" id="menu-btn" src="../assets/hamppari.png" alt="Hampparimenu"> -->
    <img class="light-icon" id="menu-btn" src="../assets/light-hamppari.png" alt="Hampparimenu">
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
    var navbar = document.getElementById("light-nav");
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector(".light-navbar");

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
    menuBtn.onclick = ()=> {
      menu.classList.add("active");
      menuBtn.classList.add("hide");
    }
  }
}


</script>

<style scoped>
@import './../css/navbar.css';
</style>