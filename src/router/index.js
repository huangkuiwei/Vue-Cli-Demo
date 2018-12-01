import Vue from 'vue'
import VueRouter from 'vue-router'
import ARouter from '@views/a-router.vue'
import BRouter from '@views/b-router.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/a-router',
    component: ARouter
  },
  {
    path: '/b-router',
    component: BRouter
  }
];

export default new VueRouter({
  routes
})