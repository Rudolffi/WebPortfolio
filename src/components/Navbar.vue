<template>
<div>
  <li>
    <img class="icon cancel-btn" id="light" src="../assets/ruksi.png" alt="Hampparimenu">
  </li>
  <ul id="nav">
    <h3 class="head">
      Portfolio
    </h3>
    <div class="navbar">

    <li class="navitem">
      <a href="#" id="one" class="navlink">About</a>
    </li>
    <li class="navitem">
      <a href="#" id="two" class="navlink">Skills</a>
    </li>
    <li class="navitem">
      <a href="#" id="three" class="navlink">Projects</a>
    </li>
    </div>
  <div>
    <!-- <img class="light-icon" id="menu-btn" src="../assets/hamppari.png" alt="Hampparimenu"> -->
    <img class="icon" id="menu-btn" src="../assets/hamppari.png" alt="Hampparimenu">
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
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector(".navbar");
    const cancelBtn = document.querySelector(".cancel-btn");

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
      cancelBtn.classList.add("active");
    }

    cancelBtn.onclick = ()=> {
      menu.classList.remove("active");
      menuBtn.classList.remove("hide");
      cancelBtn.classList.remove("active");
    }
  }
}


</script>

<style scoped>
@import './../css/navbar.css';
</style>