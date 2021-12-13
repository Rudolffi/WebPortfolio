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
        <textarea placeholder="Project Description" type="text" name="descr" v-model="descr"/>
      </section>
      <section>
        <label>Thumbnail</label>
        <div class="input-output">
          <img v-if="logo.display" v-bind:src="logo.src" id="pic">
          <button v-if="logo.display" type="button" class="removeButton" @click="removeImage()">Remove</button>
          <label id="dropFile" v-bind:class="[logo.display ? 'fileUpload-small' : 'fileUpload']" for="file"><p><span class="selectFile">Choose a file </span><span> or drag it here.</span></p></label>
          <input v-bind:accept="this.validFileExtensions" type="file" id="file" name="file">
        </div>
      </section>
      <section>
        <label>Images</label>
        <div class="input-output">
          <label id="dropFiles" class="fileUpload" for="files"><p><span class="selectFile">Choose a file(s)</span> or drag it here.</p></label>
          <input multiple v-bind:accept="this.validFileExtensions" type="file" id="files" name="files">
          <ul id="listOfImages" v-for="images in projectImages" :key="images.id">
            <li class="tooltip"><button type="button" class="removeButton" @click="removeFile(images)">Remove</button>{{images.name}}<span><img v-bind:src="images.src"></span></li>
          </ul>
        </div>
      </section>
      <button v-if="!editmode" type="submit">Add Project</button>
      <button class="updateButton" v-if="editmode" type="button" @click="updateProject">Update Project</button>
      <button class="removeButton" v-if="editmode" type="button" @click="deleteProject">Delete Project</button>
    </article>
    <input type="hidden" name="id" v-model="projectId"/>
  </form>
</template>

<script>
export default {
  name: "projectForm",
  data: function () {
    return {
      postAddress : 'http://localhost:5000/api/projects',
      getAddress : 'http://localhost:5000/api/projects',
      projectImages: [],
      validFileExtensions : [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
      projectId : -1,
      editmode : false,
      title : '',
      link : '',
      descr : '',
      files : document.createElement('input'),
      file : document.createElement('input'),
      dT : new DataTransfer(),
      fD : new DataTransfer(),
      logo : {
        src : '',
        display : false,
      },
    }
  },
  methods: {
    async deleteProject() {
      let form = document.getElementById("project");
      let vm = this;
      const res = await fetch(this.postAddress, {
        method: 'DELETE',
        // pass in the information from our form
        body: {
          id : vm.projectId
        },
      }).then(function(res){
        vm.projectImages = [];
        vm.logo.src = '';
        vm.logo.display = false;
        form.reset();
      }).catch(function(res){
      });
    },
    async updateProject() {
      let form = document.getElementById("project");
      let vm = this;
      const res = await fetch(this.postAddress, {
        method: 'PUT',
        // pass in the information from our form
        body: new FormData(form),
      }).then(function(res){
        vm.projectImages = [];
        vm.logo.src = '';
        vm.logo.display = false;
        form.reset();
      }).catch(function(res){
      });
    },
    async submitForm() {
      let form = document.getElementById("project");
      let vm = this;
      const res = await fetch(this.postAddress, {
        method: 'POST',
        // pass in the information from our form
        body: new FormData(form),
      }).then(function(res){
        vm.projectImages = [];
        vm.logo.src = '';
        vm.logo.display = false;
        form.reset();
      }).catch(function(res){

      });
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
    },
    validateFile : function (fileName){
      let blnValid = false;
      if (fileName.length > 0) {
        for (let j = 0; j < this.validFileExtensions.length; j++) {
          let sCurExtension = this.validFileExtensions[j];
          if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
          }
        }
      }
      if (!blnValid) {
        alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + this.validFileExtensions.join(", "));
        return false;
      }
      return true;
    }
  },
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if(params.id >= 0){
      console.log("Vanha projekti: " + params.id);
      this.editmode = true;
      fetch(this.getAddress).then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
      });
    } else {
      this.editmode = false;
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
        if(vm.validateFile(dt.files[i].name)){
          vm.dT.items.add(dt.files[i]);
        }
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
      if(vm.validateFile(e.dataTransfer.files[0].name)){
        vm.fD = new DataTransfer();
        for (let i = 0; i < e.dataTransfer.files.length; i++){
          vm.fD.items.add(e.dataTransfer.files[i]);
        }
        vm.logo.src = URL.createObjectURL(e.dataTransfer.files[0]);
        vm.logo.display = true;
      }
      vm.file.files = vm.fD.files;
    });
    vm.file.addEventListener('change', function(e) {
      if(vm.validateFile(e.target.files[0].name)){
        vm.fD = new DataTransfer();
        for (let i = 0; i < e.target.files.length; i++){
          vm.fD.items.add(e.target.files[i]);
        }
        vm.logo.src = URL.createObjectURL(e.target.files[0]);
        vm.logo.display = true;
      }
      vm.file.files = vm.fD.files;
    });
    vm.files.addEventListener("change", function (e) {
      const dt = e.target;
      for (let i = 0; i < dt.files.length; i++){
        if(vm.validateFile(dt.files[i].name)){
          vm.dT.items.add(dt.files[i]);
        }
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