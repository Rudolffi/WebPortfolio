<template>
  <form @submit.prevent="handleSubmit">
    <article>
      <section>
        <label>Title</label>
        <input type="text"/>
      </section>
      <section>
        <label>Description</label>
        <textarea type="text"/>
      </section>
      <section>
        <label>Image</label>
        <input type="file"  id="file">
        <img id="pic">
      </section>
      <button>Add Project</button>
    </article>
  </form>
</template>

<script>
export default {
  name: "form",
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