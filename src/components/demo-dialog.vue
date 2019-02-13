<template>
  <modal-dialog>
    <h1 slot="header">活动规则</h1>
    <button @click="close">我知道了</button>
  </modal-dialog>
</template>

<script>
  export default {
    methods: {
      close(){
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>