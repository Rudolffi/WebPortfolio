<template>
  <div id="information">
    <h1 class="header">Ryhmä 8</h1>
    <div class="big_box">
      <div id="boxone">
        <h3 class="boxtitle">About</h3>
        <p class="para">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ab blanditiis maiores quas voluptatibus. Alias consequatur
        esse et illum incidunt nam nisi pariatur quae rem unde? Beatae
        facilis incidunt voluptatem voluptatibus!
        </p>
      </div>
      <div id="boxtwo">
        <h3 class="skills-boxtitle">Skills</h3>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Information"
}
</script>

<style scoped>
@import './../css/information.css';
</style>