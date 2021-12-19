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

    // Sivustolle scroll tapahtumakuuntelijat
    window.onscroll = function() {stickyNavbar()};
    window.onscroll = function () {scrollFunction()};

    //Haetaan tarvittavat elementit domista
    const navbar = document.getElementById("nav");
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector(".navbar");
    const cancelBtn = document.querySelector(".cancel-btn");
    const myButton = document.getElementById("myBtn");
    const navlinks = document.getElementsByClassName("navlink");


    // Haetaan navbarin asema
    let sticky = navbar.offsetTop;


    // Funktio: Sivustoa scrollattaessa navbar tarttuu sivun yläreunaan mukaan.
    function stickyNavbar() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }

    // Hampparimenua klikatessa laitetaan hamppari-iconi piiloon ja avataan sivumenu
    menuBtn.onclick = ()=> {
      menu.classList.add("active");
      menuBtn.classList.add("hide");
      cancelBtn.classList.add("active");
    }

    // Ruksia klikatessa laitetaan sivumenu piiloon
    cancelBtn.onclick = ()=> {
      menu.classList.remove("active");
      menuBtn.classList.remove("hide");
      cancelBtn.classList.remove("active");
    }

    // Klikatessa jotain nappulaa sivumenussa, menee sivumenu piiloon
    for (let i = 0; i < navlinks.length; i++){
      navlinks[i].onclick = () => {
        menu.classList.remove("active");
        menuBtn.classList.remove("hide");
        cancelBtn.classList.remove("active");
      }
    }

    // Jos sivusto on scrollattuna tarpeeksi alas, lisätään back to top nappula
    function scrollFunction() {
      if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        myButton.style.display = "block";
      } else {
        myButton.style.display = "none";
      }
    }

    // Back to top nappulaa klikatessa palataan takaisin sivun yläreunaan
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