<template>
  <div class="modal-dialog">
    <span class="close" v-if="cancelable" @click="close">+</span>
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="body">
      <slot/>
    </div>
    <div class="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['cancelable', 'closeLayer'],
    methods: {
      close() {
        this.closeLayer()
      }
    }
  }
</script>

<style scoped>
  .modal-dialog {
    width: 70%;
    max-width: 80%;
    max-height: 80%;
    background: #ffffff;
    position: relative;
  }
  .modal-dialog > span {
    position: absolute;
    transform: rotate(45deg);
    height: 1.8rem;
    width: 1.8rem;
    font-size: 1.8rem;
    right: 0;
    border-radius: 50%;
    background: #00000030;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>