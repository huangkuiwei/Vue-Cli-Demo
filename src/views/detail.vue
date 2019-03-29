<template>
  <div>
    <button @click="$router.push('/detail?id=2')">按钮</button>
    {{id}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.query.id
      }
    },
    watch: {
      // 监控当前路由变化，使得页面数据更新
      $route() {
        this.id = this.$route.query.id;
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped>

</style>