<template>
<div>
  <nav>
  <ul id="nav">
    <h3 class="head">
      Portfolio
    </h3>
    <div class="navbar">
     <li>
        <img class="icon cancel-btn" id="light" src="../assets/ruksi.png" alt="Hampparimenu">
     </li>
    <li class="navitem">
      <a href="#main-box" id="one" class="navlink">About</a>
    </li>
    <li class="navitem">
      <a href="#main-skills" id="two" class="navlink">Skills</a>
    </li>
    <li class="navitem">
      <a href="#projectbox" id="three" class="navlink">Projects</a>
    </li>
    </div>
  <div>
    <img class="icon" id="menu-btn" src="../assets/hamppari.png" alt="Hampparimenu">
    <button id="myBtn" title="Go to top" style="display: block;">
        <img src="../assets/backtotop.png" alt="Back to top nappula">
    </button>

  </div>
  </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {

    window.onscroll = function() {stickyNavbar()};
    window.onscroll = function () {scrollFunction()};


    const navbar = document.getElementById("nav");
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector(".navbar");
    const cancelBtn = document.querySelector(".cancel-btn");
    const myButton = document.getElementById("myBtn");
    const navlinks = document.getElementsByClassName("navlink");

// Get the offset position of the navbar
    let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNavbar() {
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
    for (let i = 0; i < navlinks.length; i++){
      navlinks[i].onclick = () => {
        menu.classList.remove("active");
        menuBtn.classList.remove("hide");
        cancelBtn.classList.remove("active");
      }
    }
    function scrollFunction() {
      if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        myButton.style.display = "block";
      } else {
        myButton.style.display = "none";
      }
    }
    myButton.onclick = ()=> {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }
}


</script>

<style scoped>
@import './../css/navbar.css';
</style>