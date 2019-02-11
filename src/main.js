import Vue from 'vue'
import App from './app.vue'
import router from './router'

new (Vue.extend(App))({router}).$mount('#app');