<template>
  <div>
    <button @click="$router.push('/post/2')">按钮</button>
    {{id}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id
      }
    }
  }
</script>

<style scoped>

</style>