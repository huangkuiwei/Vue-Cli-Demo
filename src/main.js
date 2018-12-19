import Vue from 'vue'
import App from './app.vue'
import router from './router'
import MyPlugin from './plugin/myPlugin'

Vue.use(MyPlugin);

new (Vue.extend(App))({router}).$mount('#app');