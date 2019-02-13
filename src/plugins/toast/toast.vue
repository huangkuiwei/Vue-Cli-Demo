<template>
  <span>{{message}}</span>
</template>

<script>
  export default {
    props: ['message']
  }
</script>

<style scoped>
  span {
    position: fixed;
    background: #00000090;
    border-radius: .5rem;
    padding: .1rem .5rem;
  }
</style>