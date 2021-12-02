<template>
  <form method="POST" action="http://localhost:8080/api/db">
    <article>
      <section>
        <label>Title</label>
        <input v-model="title" placeholder="Project Title" type="text" name="title"/>
      </section>
      <section>
        <label>Link</label>
        <input v-model="link" placeholder="Project Web-page" type="text" name="repo"/>
      </section>
      <section>
        <label>Description</label>
        <textarea v-model="description" placeholder="Project Description" type="text" name="descr"/>
      </section>
      <section>
        <label>Image</label>
        <input type="file"  id="file">
        <img id="pic">
      </section>
      <button type="submit">Add Project</button>
    </article>
  </form>
</template>

<script>
export default {
  name: "form",
  data(){
    return{
      title: '',
      link: '',
      description: '',
    }
  },
  methods : {
    async submitForm() {
      const res = await fetch('/backend-api', {
        method: 'POST',
        headers: {'Content-Type': 'form-data'},

        // pass in the information from our form
        body: JSON.stringify({
          title: this.title,
          link: this.link,
          description: this.description,
        })
      });
    }
  },
  mounted() {
    let files = document.getElementById("file");
    files.addEventListener("change", function (e){
      let image = document.getElementById('pic');
      image.src = URL.createObjectURL(event.target.files[0]);
    })
  }
}
</script>

<style scoped>

@import './../css/form.css';
</style>