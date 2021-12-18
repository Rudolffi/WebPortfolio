<template>
  <form id="project" @submit.prevent="submitForm" enctype="multipart/form-data" action="#" method="post">
    <article>
      <section>
        <label>Title</label>
        <input v-bind:maxlength="titleMaxCharacters" placeholder="Project Title" type="text" name="title" v-model="title" required/>
        <p class="count">{{title.length}}/{{titleMaxCharacters}}</p>
      </section>
      <section>
        <label>Link</label>
        <input placeholder="Project Web-page" type="url" autocomplete="url" name="repo" v-model="link" pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"/>
      </section>
      <section>
        <label>Description</label>
        <textarea v-bind:maxlength="descrMaxCharacters" placeholder="Project Description" type="text" name="descr" v-model="descr"/>
        <p class="count">{{descr.length}}/{{descrMaxCharacters}}</p>
      </section>
      <section>
        <label>Thumbnail</label>
        <div class="input-output">
          <img @load="handleLoad" v-if="logo.display" v-bind:src="logo.src" id="pic">
          <button v-if="logo.display" type="button" class="removeButton" @click="removeImage()">Remove</button>
          <label id="dropFile" v-bind:class="[logo.display ? 'fileUpload-small' : 'fileUpload']" for="file"><p><span class="selectFile">Choose a file </span><span> or drag it here.</span></p></label>
          <input v-bind:accept="this.validFileExtensions" type="file" id="file" name="file">
        </div>
        <p class="count">{{fD.files.length}}/1</p>
      </section>
      <section>
        <label>Images</label>
        <div class="input-output">
          <label id="dropFiles" class="fileUpload" for="files"><p><span class="selectFile">Choose a file(s)</span> or drag it here.</p></label>
          <input multiple v-bind:accept="this.validFileExtensions" type="file" id="files" name="files">
          <ul id="listOfImages" v-for="images in projectImages" :key="images.id">
            <li class="tooltip"><button type="button" class="removeButton" @click="removeFile(images)">Remove</button>{{images.name}}<span><img @load="handleLoad"  v-bind:src="images.src"></span></li>
          </ul>
        </div>
        <p class="count">{{projectImages.length}}/10</p>
      </section>
      <button v-if="!editmode" type="submit">Add Project</button>
      <button class="updateButton" v-if="editmode" type="button" @click="updateProject">Update Project</button>
      <button class="removeButton" v-if="editmode" type="button" @click="deleteProject">Delete Project</button>
    </article>
  </form>
</template>

<script>
export default {
  name: "projectForm",
  data: function () {
    return {
      postAddress : 'api/projects/',
      getAddress : 'api/projects/',
      imgAddress : "api/files/",
      projectImages: [],
      validFileExtensions : [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
      projectId : -1,
      editmode : false,
      title : '',
      titleMaxCharacters : 50,
      descrMaxCharacters : 500,
      link : '',
      descr : '',
      files : document.getElementById("files"),
      file : document.getElementById("file"),
      dT : new DataTransfer(),
      fD : new DataTransfer(),
      logo : {
        src : '',
        display : false,
      },
    }
  },
  methods: {
    // handle project delete quarry
    async deleteProject() {
      let form = document.getElementById("project");
      let vm = this;
      const res = await fetch(this.postAddress + this.projectId, {
        method: 'DELETE',
        body: {
          id : vm.projectId
        },
      }).then(function(res){
        vm.projectImages = [];
        vm.logo.src = '';
        vm.logo.display = false;
        vm.title = '';
        vm.link = '';
        vm.descr = '';
        form.reset();
        window.location.href = "/new";
      }).catch(function(res){
      });
    },
    // handle project update quarry
    async updateProject() {
      let form = document.getElementById("project");
      let vm = this;
      const res = await fetch(this.postAddress + this.projectId, {
        method: 'PUT',
        // pass in the information from our form
        body: new FormData(form),
      }).then(function(res){
        vm.projectImages = [];
        vm.logo.src = '';
        vm.logo.display = false;
        form.reset();
        window.location.href = "/new";
      }).catch(function(res){
      });
    },
    // handle form submit
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
    // when image loads emit event for canvas update (big problems with canvas)
    handleLoad : function () {
      this.$root.$emit('myEvent', 'update');
    },
    // add files to image list
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
    // remove image from thumbnail data
    removeImage : function (){
      this.file.files = new DataTransfer().files;
      this.fD = new DataTransfer();
      this.logo.src = '';
      this.logo.display = false;
    },
    // remove file when remove button has been pressed
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
    // validate file extension
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
  // when component is created lets check url parameters for project id:s and fetch project or create new
  created() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if(params.id != null || params.id != undefined){
      console.log("Vanha projekti: " + params.id);
      this.editmode = true;
      let vm = this;
      let JSON = fetch(this.getAddress + params.id).then(function(response) {
        return response.json();
      }).then(function(json) {
        vm.dT = new DataTransfer();
        for (let i = 0; i < json.pics_id.length; i++){
          fetch(vm.imgAddress + json.pics_id[i])
              .then(response => response.blob())
              .then(imageBlob => {
                fetch(vm.imgAddress + json.pics_id[i] + "/details").then(function(response) {
                  return response.json();
                }).then(function(jsonn) {
                  vm.dT.items.add(new File([imageBlob], jsonn.filename));
                  vm.files.files = vm.dT.files;
                  vm.addImagesList(vm.files.files);
                });
              });
        }
        if(json.thumb_id != null || json.thumb_id != undefined){
          fetch(vm.imgAddress + json.thumb_id)
              .then(response => response.blob())
              .then(imageBlob => {
                fetch(vm.imgAddress + json.thumb_id + "/details").then(function(response) {
                  return response.json();
                }).then(function(jsonn) {
                  vm.fD.items.add(new File([imageBlob], jsonn.filename));
                  vm.file.files = vm.fD.files;
                  vm.logo.src = URL.createObjectURL(vm.file.files[0]);
                  vm.logo.display = true;
                });
              });
        }
        vm.projectId = json._id;
        vm.title = json.title;
        vm.link = json.repo;
        vm.descr = json.descr;
      });
    } else {
      this.editmode = false;
    }
  },
  // sets up all listeners for drag&drops and file changes
  mounted() {

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
          if(vm.dT.files.length < 10){
            vm.dT.items.add(dt.files[i]);
          }
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
          if(vm.dT.files.length < 10){
            vm.dT.items.add(dt.files[i]);
          }
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