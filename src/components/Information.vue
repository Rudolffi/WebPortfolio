<template>
  <div id="information">
    <h1 class="header">Ryhmä 8</h1>
    <div class="big_box">
      <div id="about-box">
        <h3 class="boxtitle">About</h3>
        <p class="para">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ab blanditiis maiores quas voluptatibus. Alias consequatur
        esse et illum incidunt nam nisi pariatur quae rem unde? Beatae
        facilis incidunt voluptatem voluptatibus!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Aliquam assumenda, culpa deserunt distinctio doloremque
        enim in inventore libero minus nemo numquam, officiis
        pariatur quaerat, quasi ratione tenetur vel! Recusandae,
        repellat! Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Ab aperiam asperiores autem dolor ducimus eius facilis
        fuga illo illum labore libero, non nulla omnis pariatur,
        quaerat reiciendis repellat sit voluptates? Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Accusamus
        ad commodi earum, eos exercitationem maiores nam neque
        optio quam sequi? Adipisci architecto delectus eveniet
        fugiat laboriosam sunt tempora tempore, veniam. Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Ad alias
        animi, assumenda consectetur culpa cumque, delectus,
        distinctio dolor dolorem doloremque eveniet excepturi
        ipsa molestias neque numquam pariatur perspiciatis quasi repellat?
        </p>
      </div>
      <div id="about-picturebox">
        <canvas id="about-arnoldpicture"></canvas>
      </div>
    </div>

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