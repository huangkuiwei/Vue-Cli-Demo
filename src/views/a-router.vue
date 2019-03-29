<template>
  <div>
    <h1>Welcome to a-router</h1>
    <button @click="show">活动规则</button>
    <button @click="toast">toast</button>
    <button @click="showMsg">showMsg</button>
    <button @click="showNewMsg">showNewMsg</button>
    <button @click="$store.commit('changeMsg')">{{$store.state.msg}}</button>
    <button @click="$store.commit('addNum')">{{$store.state.num}}</button>
    <button @click="getRedPackCount">获取红包数量</button>
    <editor :init="editorConfig"/>
    <button @click="$router.push('/detail?id=1')">detail</button>
    <button @click="$router.push('/post/1')">post</button>
    <button @click="$router.push('/not-found')">NotFound</button>
  </div>
</template>

<script>
  import DemoDialog from '../components/demo-dialog.vue'
  import Editor from '@tinymce/tinymce-vue'

  export default {
    data() {
      return {
        // tinymce配置
        editorConfig: {
          menubar: false,
          statusbar: false,
          plugins: 'autoresize textcolor fullscreen',
          toolbar: 'bold italic forecolor backcolor alignleft aligncenter alignright fullscreen'
        }
      }
    },
    created() {
      import('../data/test.js').then(data => {
        console.log(data)
      })
    },
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
      },
      showMsg() {
        console.log(this.$store.state.msg)
      },
      showNewMsg() {
        console.log(this.$store.getters.newMsg)
      },
      getRedPackCount() {
        this.$store.dispatch('getRedPackCount', {activityCode: 'teamredpack'})
      }
    },
    components: {
      Editor
    }
  }
</script>