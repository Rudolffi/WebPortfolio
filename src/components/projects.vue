<template>
  <div>
    <div id="projectbox">
      <div>
        <h1 id="project-head" class="projectHeader">Projects</h1>
        <a class="projectHeader addButton" v-if="editmode" v-bind:href="'/new'" >Add new</a>
      </div>
      <article class="artic" v-for="project in projects" :key="project._id">
        <section class="sec">
          <h2 class="title">{{project.title}}</h2>
          <a class="editButton" v-if="editmode" v-bind:href="'/new?id=' + project._id" >Edit</a>
        </section>
        <section class="sectwo">
          <img @load="handleLoad" class="pic" v-bind:src="project.logo">
          <div class="descc">
            <p class="desc">{{project.descr}}</p>
          </div>
        </section>
        <section v-if="project.images.length > 0">
          <h4 class="title innerTitle">Images</h4>
          <div class="buttonBox" >
            <button @click="scrollHorizontal(project.title, -1)"  class="fa fa-angle-left"></button>
            <div v-bind:id="project.title" class="screenShots">
              <a v-for="(image , index) in project.images" :key="index" class="box" v-bind:href="image" v-bind:data-lightbox="project.title" data-title="">
                <img @load="handleLoad" class="screenShot" v-bind:src="image">
              </a>
            </div>
            <button @click="scrollHorizontal(project.title, 1)" class="fa fa-angle-right"></button>
          </div>
        </section>
        <section class="projectLink">
          <h4 class="title innerTitle">Link to Project</h4>
          <p  class="cut-text">Link:  <a target="_blank" v-bind:href="project.repo" >{{project.repo}}</a></p>
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
      getAddress : "api/projects",
      imgAddress : "api/files/",
      editmode : false,
      projects: [
      ],
    }
  },
  methods : {
    // Scroll for images in div
    scrollHorizontal : function (idname, direction){
      let screenShots = document.getElementById(idname);
      screenShots.scroll({
        top: 0,
        left: screenShots.scrollLeft + (screenShots.offsetWidth * direction),
        behavior: 'smooth'
      });
    },
    // when image loads emit event for canvas update (big problems with canvas)
    handleLoad : function () {
      this.$root.$emit('myEvent', 'update');
    }
  },
  // Fetch projects and projects images
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    if(params.edit == 'true' || params.edit == true ){
      this.editmode = true;
    } else {
      this.editmode = false;
    }
    let vm = this;
    let JSON = fetch(this.getAddress).then(function(response) {
      vm.projects = [];
      return response.json();
    }).then(function(json) {
      for(let i = 0; i < json.length; i++){
        // NULL/Undefined checks
        if(json[i]._id == null || json[i]._id == undefined){
          continue;
        }
        if(json[i].title == null || json[i].title == undefined){
          continue;
        }
        if(json[i].descr == null || json[i].descr == undefined){
          continue;
        }

        let thumbnail = '';
        if(json[i].thumb_id == null || json[i].thumb_id == undefined){
          thumbnail = require('../assets/notfound.png');
          console.log("thumbnail: " + thumbnail);
        } else {
          thumbnail = vm.imgAddress + json[i].thumb_id;
        }

        let imageLinks = [];
        for(let j = 0; j < json[i].pics_id.length; j++){
          imageLinks = [...imageLinks, vm.imgAddress + json[i].pics_id[j]];
        }
        // all project details for display. Vue handles display
        vm.projects = [...vm.projects, {
          _id : json[i]._id,
          title : json[i].title,
          descr : json[i].descr,
          repo : json[i].repo,
          logo : thumbnail,
          images : imageLinks,
        }]
      }
      this.$root.$emit('myEvent', 'update');
    });
  }
}
</script>

<style scoped>
@import './../css/projects.css';
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
@import "../dist/css/lightbox.min.css";
</style>