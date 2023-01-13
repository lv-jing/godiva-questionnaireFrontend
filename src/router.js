import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: {
        render: h => h('p', '欢迎进入NPS系统！')
      },
    },
    {
      path: '/index',
      component: {
        render: h => h('router-view')
      },
      children: [
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          component: () => import('./components/index/List')
        },
        {
          path: 'add',
          component: () => import('./components/index/Add')
        },
        {
          path: 'edit',
          component: () => import('./components/index/Edit')
        },
        {
          path: 'preview',
          component: () => import('./components/index/Preview')
        },
      ]
    },
    {
      path: '/record',
      component: {
        render: h => h('router-view')
      },
      children: [
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          component: () => import('./components/record/List')
        },
        {
          path: 'chart',
          name: 'recordchart',
          component: () => import('./components/record/Chart')
        },
      ]
    },
    {
      path: '/keyword',
      component: {
        render: h => h('router-view')
      },
      children: [
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          component: () => import('./components/keyword/List')
        },
        {
          path: 'add',
          component: () => import('./components/keyword/Add')
        },
        {
          path: 'edit',
          component: () => import('./components/keyword/Edit')
        },
        {
          path: 'materiallist',
          component: () => import('./components/keyword/MaterialList')
        },
      ]
    },
  ]
})