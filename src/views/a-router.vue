<template>
  <div>
    <h1>Welcome to a-router</h1>
    <button @click="show">活动规则</button>
  </div>
</template>

<script>
  import DemoDialog from '../components/demo-dialog.vue'

  export default {
    methods: {
      show() {
        this.$open(DemoDialog, {
          listeners: {}
        })
      }
    }
  }
</script>