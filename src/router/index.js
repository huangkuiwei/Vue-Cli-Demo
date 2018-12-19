import Vue from 'vue'
import VueRouter from 'vue-router'
import ARouter from '@views/a-router.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/a-router'
  },
  {
    path: '/a-router',
    component: ARouter
  }
];

export default new VueRouter({
  routes
})