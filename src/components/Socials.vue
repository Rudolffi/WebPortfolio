<template>
  <footer class="socials-box">
  <div class="wrapper">
    <div class="social-button facebook">
      <div class="social-icon">
        <i class="fab fa-facebook-f"></i>
      </div>
      <span>Facebook</span>
    </div>
    <div class="social-button linkedin">
      <div class="social-icon">
        <i class="fab fa-linkedin"></i>
      </div>
      <span>Linkedin</span>
    </div>
    <div class="social-button instagram">
      <div class="social-icon">
        <i class="fab fa-instagram"></i>
      </div>
      <span>Instagram</span>
    </div>
    <div class="social-button github">
      <div class="social-icon">
        <i class="fab fa-github"></i>
      </div>
      <span>GitHub</span>
    </div>
  </div>
    <p class="email">Arnold@Terminator.com </p>
    <a id="login" href="/login">Login</a>

  </footer>
</template>

<script>
export default {
  name: "Socials",
  mounted() {
    const linkedIn = document.querySelector(".linkedin");
    const facebook = document.querySelector(".facebook");
    const instagram = document.querySelector(".instagram");
    const github = document.querySelector(".github");

    linkedIn.onclick = ()=> {
      window.open('https://www.linkedin.com/');
    }
    facebook.onclick = ()=> {
      window.open('https://fi-fi.facebook.com/');
    }
    instagram.onclick = ()=> {
      window.open('https://www.instagram.com/');
    }
    github.onclick = ()=> {
      window.open('https://github.com/');
    }
  }
}
</script>

<style scoped>
@import './../css/socials.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css';
</style>