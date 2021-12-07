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
      <div class="example-box">
        <img class="jscode" src="../assets/example.png" alt="JavaScript koodia" style="opacity: 0.9">
        <div class="htmlcode-box"><img  src="../assets/htmlkoodi.png" alt="Html koodia" style="opacity: 0.9"></div>
        <img  src="../assets/csscode.png" alt="Css koodia" style="opacity: 0.9">

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