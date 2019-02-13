<template>
  <div>
    <h1>Welcome to a-router</h1>
    <button @click="show">活动规则</button>
    <button @click="toast">toast</button>
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
      },
      toast() {
        this.$toast('呵呵呵').then(() => {
          this.$toast('哈哈哈')
        })
      }
    }
  }
</script>