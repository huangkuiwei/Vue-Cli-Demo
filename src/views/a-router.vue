<template>
  <div>
    <h1>Welcome to a-router</h1>
    <div class="box" v-scroll.end="add">
      <p v-for="n in num">{{n}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 10
      }
    },
    methods: {
      add() {
        ++this.num
      }
    }
  }
</script>

<style scoped>
  .box {
    height: 200px;
    background: aquamarine;
    overflow: auto;
  }
</style>