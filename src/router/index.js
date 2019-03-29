import Vue from 'vue'
import VueRouter from 'vue-router'
import ARouter from '@views/a-router.vue'
import Detail from '@views/detail.vue'
import Post from '@views/post.vue'
import NotFound from '@views/not-found.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/a-router'
  },
  {
    path: '/a-router',
    component: ARouter
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/post/:id',
    component: Post
  },
  {
    path: '*',
    component: NotFound
  }
];

export default new VueRouter({
  routes
})