import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name: '默认页',
      component: () => import('../views/Root.vue')
    },
    {
      path: '/dialog',
      name: '对话框',
      component: () => import('../views/Dialog.vue')
    },
    {
      path: '/taskpane',
      name: '任务窗格',
      component: () => import('../views/TaskPane.vue')
    }
  ]
})

export default router
