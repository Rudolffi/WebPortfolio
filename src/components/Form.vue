<template>
  <form id="project" @submit.prevent="submitForm" enctype="multipart/form-data" action="#" method="post">
    <article>
      <section>
        <label>Title</label>
        <input placeholder="Project Title" type="text" name="title" v-model="title"/>
      </section>
      <section>
        <label>Link</label>
        <input placeholder="Project Web-page" type="url" autocomplete="url" name="repo" v-model="link"/>
      </section>
      <section>
        <label>Description</label>
        <textarea placeholder="Project Description" type="text" name="descr" v-model="descrip"/>
      </section>
      <section>
        <label>Logo</label>
        <div class="input-output">
          <img v-if="logo.display" v-bind:src="logo.src" id="pic">
          <button v-if="logo.display" type="button" class="removeButton" @click="removeImage()">Remove</button>
          <label id="dropFile" v-bind:class="[logo.display ? 'fileUpload-small' : 'fileUpload']" for="file"><p><span class="selectFile">Choose a file </span><span> or drag it here.</span></p></label>
          <input accept="image/*" type="file" id="file" name="file">
        </div>
      </section>
      <section>
        <label>Images</label>
        <div class="input-output">
          <label id="dropFiles" class="fileUpload" for="files"><p><span class="selectFile">Choose a file(s)</span> or drag it here.</p></label>
          <input multiple accept="image/*" type="file" id="files" name="files">
          <ul id="listOfImages" v-for="images in projectImages" :key="images.id">
            <li class="tooltip"><button type="button" class="removeButton" @click="removeFile(images)">Remove</button>{{images.name}}<span><img v-bind:src="images.src"></span></li>
          </ul>
        </div>
      </section>
      <button type="submit">Add Project</button>
    </article>
    <input type="hidden" name="id" v-model="projectId"/>
  </form>
</template>

<script>
export default {
  name: "projectForm",
  data: function () {
    return {
      postAddress : 'http://localhost:8081/api/db',
      getAddress : 'http://localhost:8081/api/db',
      projectImages: [],
      projectId : -1,
      title : '',
      link : '',
      descrip : '',
      files : document.createElement('input'),
      file : document.createElement('input'),
      dT : new DataTransfer(),
      logo : {
        src : '',
        display : false,
      },
    }
  },
  methods: {
    async submitForm() {
      let form = document.getElementById("project");
      let vm = this;
      const res = await fetch(this.postAddress, {
        method: 'POST',
        // pass in the information from our form
        body: new FormData(form),
      }).then(function(res){
        console.log(res);
        vm.projectImages = [];
        vm.logo.src = '';
        vm.logo.display = false;
        form.reset();
        console.log(vm.file.files);
        console.log(vm.files.files);
      }).catch(function(res){
        console.log(res) });
    },
    addImagesList : function (files){
      this.projectImages = [];
      for (let i = 0; i < files.length; i++){
        let image = {
          id : i,
          src : URL.createObjectURL(files[i]),
          name : files[i].name,
          file : files[i],
        };
        this.projectImages.push(image);
        console.log(image);
      }
    },
    removeImage : function (){
      this.file.files = new DataTransfer().files;
      this.logo.src = '';
      this.logo.display = false;
    },
    removeFile : function (image){
      this.projectImages = [];
      this.dT = new DataTransfer();
      for (let i = 0; i < this.files.files.length; i++){
        if (this.files.files[i] != image.file){
          this.dT.items.add(this.files.files[i]);
        }
      }
      this.files.files = this.dT.files;
      for (let i = 0; i < this.files.files.length; i++){
        let image = {
          id : i,
          src : URL.createObjectURL(this.files.files[i]),
          name : this.files.files[i].name,
          file : this.files.files[i],
        };
        this.projectImages.push(image);
        console.log(image);
      }
    }
  },
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if(params.id >= 0){
      console.log("Vanha projekti: " + params.id);
      fetch(this.getAddress).then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
      });
    } else {
      console.log("Uusi projekti");
    }

    let dragAndDropFile = document.getElementById("dropFile");
    let dragAndDropFiles = document.getElementById("dropFiles");

    this.files = document.getElementById("files");
    this.file = document.getElementById("file");
    let vm = this;
    dragAndDropFiles.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      dragAndDropFiles.classList.add('fileUpload-dragOver');
    });
    dragAndDropFiles.addEventListener('dragleave', function(e) {
      dragAndDropFiles.classList.remove('fileUpload-dragOver');
    });
    dragAndDropFiles.addEventListener('drop', function(e) {
      dragAndDropFiles.classList.remove('fileUpload-dragOver');
      e.stopPropagation();
      e.preventDefault();
      const dt = e.dataTransfer;
      for (let i = 0; i < dt.files.length; i++){
        vm.dT.items.add(dt.files[i]);
      }
      vm.files.files = vm.dT.files;
      vm.addImagesList(vm.files.files);
    });
    dragAndDropFile.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      dragAndDropFile.classList.add('fileUpload-dragOver');
    });
    dragAndDropFile.addEventListener('dragleave', function(e) {
      dragAndDropFile.classList.remove('fileUpload-dragOver');
    });
    dragAndDropFile.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log(e.dataTransfer.files);
      vm.files.files = e.dataTransfer.files;
      vm.logo.src = URL.createObjectURL(e.dataTransfer.files[0]);
      vm.logo.display = true;
    });
    vm.file.addEventListener('change', function(e) {
      vm.logo.src = URL.createObjectURL(e.target.files[0]);
      vm.logo.display = true;
    });
    vm.files.addEventListener("change", function (e) {
      const dt = e.target;
      for (let i = 0; i < dt.files.length; i++){
        vm.dT.items.add(dt.files[i]);
      }
      vm.files.files = vm.dT.files;
      vm.addImagesList(vm.files.files);
    })
  }
}
</script>

<style scoped>

@import './../css/form.css';
@import './../css/formTooltip.css';
</style>