<template>
  <div id="information">
    <h1 class="header">Arnold Schwarzenegger</h1>
    <div id="main-box"  class="big_box">
      <div id="about-box">
        <h3 id="about-title" class="boxtitle">About</h3>
        <p class="para">
          I dreamed to be a movie star as a teenager.
          My first lead role was in the film Hercules in New York (1970).
          I performed a role appropriate to my being as a Greek demigod,
          which was also repeatedly performed in films by my role model Reg Park. For the movie
          I used the artist name Arnold Strong. My
          voice was dubbed as I could not speak English clearly. However the 1990
          DVD release includes my own voice. The film was not a success,
          and it has always been considered miserable. <br> <br> <br>
          That’s why I quit the acting and turned to coding. I am at the moment
          Studying at Metropolia University of Applied Sciences as an ICT engineer
          for second year and I can't wait for the christmas holidays :). <br> <br>
          I will be back.
        </p>
      </div>
      <div id="about-picturebox">
        <canvas id="about-arnoldpicture"></canvas>
      </div>
    </div>

    <div id="main-skills"></div>
    <div class="big_box">
      <div id="skills-motherbox">
        <div class="skills-box">
          <h3 class="boxtitle">Skills</h3>
        </div>
        <div class="skills-bar">
          <div class="bar">
            <div class="info">
              <div><img class="logo" src="../assets/htmllogo.png" alt="Html Logo"><span>HTML</span></div>
            </div>
            <div class="progress-line html"><span></span></div>
          </div>
          <div class="bar">
            <div class="info">
              <div><img class="logo" src="../assets/csslogo.png" alt="Css Logo"><span>CSS</span></div>
            </div>
            <div class="progress-line css"><span></span></div>
          </div>
          <div class="bar">
            <div class="info">
              <div><img class="logo" src="../assets/javalogo.png" alt="Java Logo"><span>JAVA</span></div>
            </div>
            <div class="progress-line java"><span></span></div>
          </div>
          <div class="bar">
            <div class="info">
              <div><img class="logo" src="../assets/javascriptlogo.png" alt="JavaScript Logo"><span>JS</span></div>
            </div>
            <div class="progress-line js"><span></span></div>
          </div>
        </div>
      </div>
      <div id="example-box">
      </div>
    </div>
  </div>
</template>

<script>
import * as arnold from '../pallot/arnold.js';
import * as koodit from '../pallot/koodit.js';
export default {
  name: "Information",
  methods: {
  },
  mounted() {
    arnold.init();
    window.addEventListener('scroll', startCodeAnimate);
    window.addEventListener('scroll', startSkillsAnimate);
    let animateCount = 0;
    let skillsCount = 0;

    function elementInViewport2(el) {
      let top = el.offsetTop;
      let left = el.offsetLeft;
      let width = el.offsetWidth;
      let height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
          top < (window.pageYOffset + window.innerHeight) &&
          left < (window.pageXOffset + window.innerWidth) &&
          (top + height) > window.pageYOffset &&
          (left + width) > window.pageXOffset
      );
    }

    function startCodeAnimate () {
      if (elementInViewport2(document.getElementById('example-box')) && animateCount < 1) {
        koodit.init();
        animateCount++;
      }
    }
    function startSkillsAnimate () {
      if (elementInViewport2(document.getElementById('skills-motherbox')) && skillsCount < 1) {
        const cssElem = document.querySelector(".skills-bar .bar .progress-line.css");
        const javaElem = document.querySelector(".skills-bar .bar .progress-line.java");
        const jsElem = document.querySelector(".skills-bar .bar .progress-line.js");
        const htmlElem = document.querySelector(".skills-bar .bar .progress-line.html");
        const spanCssElem = document.querySelector(".bar .progress-line.css span");
        const spanJavaElem = document.querySelector(".bar .progress-line.java span");
        const spanJsElem = document.querySelector(".bar .progress-line.js span");
        const spanHtmlElem = document.querySelector(".bar .progress-line.html span");
        cssElem.classList.add('start');
        javaElem.classList.add('start');
        jsElem.classList.add('start');
        htmlElem.classList.add('start');
        spanCssElem.classList.add('start');
        spanJavaElem.classList.add('start');
        spanJsElem.classList.add('start');
        spanHtmlElem.classList.add('start');
      }
    }
  }
}

</script>

<style scoped>
@import './../css/information.css';
@import './../css/keyWords.css';
</style>