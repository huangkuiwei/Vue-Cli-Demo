<template>
  <div>
    <p>Hello Vue.js</p>
    <router-view/>
  </div>
</template>

<script>
  export default {
    created(){
      console.log(WEBPACK_MODE);
    }
  }
</script>