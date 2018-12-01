<template>
  <div>
    <p>Hello Vue.js</p>
    <button @click="$router.push('/a-router')">a-router</button>
    <button @click="$router.push('/b-router')">b-router</button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>