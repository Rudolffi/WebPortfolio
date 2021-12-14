<template>

  <form id="project" @submit.prevent="submitForm" enctype="multipart/form-data" action="#" method="post">
    <article>
      <section>
        <label>Username</label>
        <input maxlength="50" placeholder="Project Title" type="text" name="title" v-model="title" required/>
      </section>
      <section>
        <label>Password</label>
        <input placeholder="Project Web-page" type="url" autocomplete="url" name="repo" v-model="link"/>
      </section>
      <button type="submit">Login</button>
    </article>
  </form>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>

<style scoped>

</style>