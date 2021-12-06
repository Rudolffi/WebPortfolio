<template>
  <form id="project" @submit.prevent="submitForm" enctype="multipart/form-data" action="#" method="post">
    <article>
      <section>
        <label>Title</label>
        <input placeholder="Project Title" type="text" name="title"/>
      </section>
      <section>
        <label>Link</label>
        <input placeholder="Project Web-page" type="url" autocomplete="url" name="repo"/>
      </section>
      <section>
        <label>Description</label>
        <textarea placeholder="Project Description" type="text" name="descr"/>
      </section>
      <section>
        <label>Logo</label>
        <div class="input-output">
          <img src="" id="pic">
          <label id="dropFile" class="fileUpload" for="file"><span class="selectFile">Choose a file</span><span> or drag it here.</span> </label>
          <input accept="image/*" type="file" id="file" name="file">
        </div>
      </section>
      <section>
        <label>Images</label>
        <div class="input-output">
          <label id="dropFiles" class="fileUpload" for="files"><p><span class="selectFile">Choose a file(s)</span> or drag it here.</p></label>
          <input multiple accept="image/*" type="file" id="files" name="file">
          <ul id="listOfImages" v-for="images in projectImages" :key="images.id">
          </ul>
        </div>
      </section>
      <button type="submit">Add Project</button>
    </article>
  </form>
</template>

<script>
export default {
  name: "projectForm",
  data: function () {
    return {
      projectImages: Array,
    }
  },
  methods: {
    async submitForm() {
      let form = document.getElementById("project");
      const res = await fetch('http://localhost:8081/api/db', {
        method: 'POST',
        // pass in the information from our form
        body: new FormData(form),
      }).then(function(res){
        console.log(res)
        form.reset();
        let list = document.getElementById('listOfImages');
        list.innerHTML = '';
      }).catch(function(res){
        console.log(res) });
    },
    addImagesList : function (files){
      let list = document.getElementById('listOfImages');
      list.innerHTML = '';
      for (let i = 0; i < files.length; i++){
        let button = document.createElement('button');

        let li = document.createElement('li');
        li.classList.add('tooltip');
        li.appendChild(document.createTextNode(files[i].name));
        let image = document.createElement('img');
        image.src = URL.createObjectURL(files[i]);
        let span = document.createElement('span');
        span.appendChild(image);
        li.appendChild(span);
        list.appendChild(li);
      }
    }
  },
  mounted() {
    let files = document.getElementById("files");
    let file = document.getElementById("file");
    let dragAndDropFile = document.getElementById("dropFile");
    let dragAndDropFiles = document.getElementById("dropFiles");
    let image = document.getElementById('pic');
    image.addEventListener('load', function(e) {
      dragAndDropFile.className = 'fileUpload-small';
      console.log("Image change!!!!");
    });
    let vm = this;
    let dT = new DataTransfer();
    dragAndDropFiles.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    dragAndDropFiles.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();
      const dt = e.dataTransfer;
      for (let i = 0; i < dt.files.length; i++){
        dT.items.add(dt.files[i]);
      }
      files.files = dT.files;
      vm.addImagesList(files.files);
    });
    dragAndDropFile.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    dragAndDropFile.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log(e.dataTransfer.files);
      files.files = e.dataTransfer.files;
      image.style.display = 'block';
      image.src = URL.createObjectURL(e.dataTransfer.files[0]);
    });
    file.addEventListener('change', function(e) {
      image.style.display = 'block';
      image.src = URL.createObjectURL(e.target.files[0]);
    });
    files.addEventListener("change", function (e) {
      const dt = e.target;
      for (let i = 0; i < dt.files.length; i++){
        dT.items.add(dt.files[i]);
      }
      files.files = dT.files;
      vm.addImagesList(files.files);
    })
  }
}
</script>

<style scoped>

@import './../css/form.css';
@import './../css/formTooltip.css';
</style>