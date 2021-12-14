<template>

  <form id="project" @submit.prevent="submitForm" enctype="multipart/form-data" action="#" method="post">
    <article>
      <section>
        <label>Username</label>
        <input placeholder="username" type="text" name="username" v-model="username" required/>
      </section>
      <section>
        <label>Password</label>
        <input placeholder="password" type="password" name="password" v-model="password"/>
      </section>
      <button type="submit">Login</button>
    </article>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data: function () {
    return {
      username : '',
      password : ''
    }
  },
  methods: {
    async submitForm() {
      const admin = 'Admin';
      const password = 'Juustokumina123';
      if(admin.normalize() === this.username.normalize() && password.normalize() === this.password.normalize()) {
        window.location.href = "/?edit=true";
      } else {
        alert("Wrong username or password!!");
      }
    }
  }
}
</script>

<style scoped>

</style>