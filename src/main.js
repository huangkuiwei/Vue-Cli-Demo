import './style.css'
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Layer from './plugins/layer'
import Toast from './plugins/toast'
import ModalDialog from './plugins/components/modal-dialog.vue'

Vue.use(Layer);
Vue.use(Toast);

Vue.component('modal-dialog', ModalDialog);

new (Vue.extend(App))({router}).$mount('#app');