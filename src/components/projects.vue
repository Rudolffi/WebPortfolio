<template>
  <div >
    <div id="projectbox">
      <h1 class="projectHeader">Projects</h1>
      <article class="artic" v-for="project in projects" :key="project.id">
        <section class="sec">
          <h2 class="title">{{project.title}}</h2>
        </section>
        <section class="sectwo">
          <img class="pic" v-bind:src="project.logo">
          <p class="desc">{{project.descr}}</p>
        </section>
        <section v-if="project.images.length > 0">
          <h4 class="title innerTitle">Images</h4>
          <div class="buttonBox" >
            <button @click="scrollHorizontal(-1)"  class="fa fa-angle-left"></button>
            <div id="images" class="screenShots">
              <a v-for="(image , index) in project.images" :key="index" class="box" v-bind:href="image" v-bind:data-lightbox="project.title" data-title="">
                <img  class="screenShot" v-bind:src="image">
              </a>
            </div>
            <button @click="scrollHorizontal(1)" class="fa fa-angle-right"></button>
          </div>
        </section>
        <section class="projectLink">
          <h4 class="title innerTitle">Link to Project</h4>
          <p  class="cut-text">Link:  <a v-bind:href="project.link" >{{project.link}}</a></p>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import '../dist/js/lightbox-plus-jquery.min.js';
export default {
  name: "projects",
  data: function () {
    return {
      screenShots : null,
      projects: [
        {
          "id" : 0,
          "title" : "Testi Projekti 0",
          "link" : "https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll",
          "descr" : "Commodi deleniti ea in. Aperiam aspernatur dolorum eos eum fugit iste laudantium maiores maxime nemo nobis non\n      odit omnis pariatur provident quae, quia quibusdam repudiandae sed sequi temporibus ut veritatis!",
          "logo" : "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/Planet.png",
          "images" : ["https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg","https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/revontulet_1.jpg", "https://users.metropolia.fi/~leevikos/digimedia/Viikko_3/img/taustakuva.jpg"]
        },
        {
          "id" : 1,
          "link" : "https://www.google.com/search?q=google&client=opera&hs=fYd&sxsrf=AOaemvIvnzqzfnQ17N0KVUbX5mel7aHHlw:1638960193027&source=lnms&tbm=isch&sa=X&ved=2ahUKEwirquzAgtT0AhVCSvEDHW29AKcQ_AUoAXoECAIQAw&biw=1536&bih=723&dpr=1.25",
          "title" : "Tasdasdasdf wafaw f",
          "descr" : "Commodi deleniti ea in. Aperiam aspernatur dolorum eos eum fugit iste laudantium maiores maxime nemo nobis non\n      odit omnis pariatur provident quae, quia quibusdam repudiandae sed sequi temporibus ut veritatis!",
          "logo" : "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
          "images" : []
        },
        {
          "id" : 2,
          "links" : "https://users.metropolia.fi/~leevikos/snake/",
          "title" : "Tasdasdasdf wafaw f",
          "descr" : "Commodi deleniti ea in. Aperiam aspernatur dolorum eos eum fugit iste laudantium maiores maxime nemo nobis non\n      odit omnis pariatur provident quae, quia quibusdam repudiandae sed sequi temporibus ut veritatis!",
          "logo" : "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
          "images" : []
        }
      ],
    }
  },
  methods : {
    scrollHorizontal : function (direction){
      console.log(this.screenShots.scrollLeft);
      console.log(this.screenShots.offsetWidth);
      //this.screenShots.scroll(this.screenShots.scrollLeft + (this.screenShots.width * direction) , 0);
      this.screenShots.scroll({
        top: 0,
        left: this.screenShots.scrollLeft + (this.screenShots.offsetWidth * direction),
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    this.screenShots = document.getElementById('images');
  }
}
</script>

<style scoped>
@import './../css/projects.css';
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
@import "../dist/css/lightbox.min.css";
</style>