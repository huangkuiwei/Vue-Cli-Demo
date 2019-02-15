import './style.css'
import Vue from 'vue'
import App from './app.vue'
import Axios from 'axios'
import router from './router'
import store from './store'
import Layer from './plugins/layer'
import Toast from './plugins/toast'
import ModalDialog from './plugins/components/modal-dialog.vue'

Vue.use(Layer);
Vue.use(Toast);

Vue.component('modal-dialog', ModalDialog);

Vue.prototype.$http = Axios;

new (Vue.extend(App))({router, store}).$mount('#app');