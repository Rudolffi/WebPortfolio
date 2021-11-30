<template>
  <div id="projectbox">
    <article>
      <section>
        <h2 class="title">Testi 1</h2>
      </section>
      <section>
        <img class="pic" src="../assets/ammattitaito.png">
        <p class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi omnis, quisquam! A dignissimos distinctio enim eveniet molestiae necessitatibus obcaecati pariatur quia sequi? Aliquam ducimus expedita inventore, minima molestiae rerum voluptas?</p>

      </section>
    </article>
    <article>
      <section>
        <h2 class="title">Testi 1</h2>
      </section>
      <section>
        <img class="pic" src="../assets/ammattitaito.png">
        <p class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi omnis, quisquam! A dignissimos distinctio enim eveniet molestiae necessitatibus obcaecati pariatur quia sequi? Aliquam ducimus expedita inventore, minima molestiae rerum voluptas?</p>
      </section>
    </article>
    <article>
      <section>
        <h2 class="title">Testi 1</h2>
      </section>
      <section>
        <img class="pic" src="../assets/ammattitaito.png">
        <p class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi omnis, quisquam! A dignissimos distinctio enim eveniet molestiae necessitatibus obcaecati pariatur quia sequi? Aliquam ducimus expedita inventore, minima molestiae rerum voluptas?</p>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: "projects"
}
</script>

<style scoped>
  #projectbox{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .pic{
    float: left;
    width: 10%;
  }
  .desc{
    text-align: left;
  }
  section{
    border: 2px solid rgb(47, 47, 47);
    display: flex; /* or inline-flex */
    flex-direction: row;
  }
  article{
    border: 2px solid rgb(47, 47, 47);
    box-shadow: 0px 0px 25px rgb(47, 47, 47);
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    padding: 2px;
    margin: 1px;
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
  }
</style>