import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'
import App from '../App'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')

const routes = [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [ // 二级路由，对应App.vue
    // 地址为空时，跳转home页面
    {
      path: '',
      redirect: 'home'
    },
    // 首页，城市列表页
    {
      path: '/home',
      component: home
    },
    // 当前选择城市页
    {
      path: '/city/:cityId',
      component: city
    },
    // 所有商铺列表页
    {
      path: '/msite',
      component: msite,
      meta: {
        keepAlive: true
      }
    },
  ]
}]

export default new Router({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
