import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods'
import ShopComment from '../pages/Shop/ShopComment'
import ShopInfo from '../pages/Shop/ShopInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      redirect: '/shop/goods',
      children: [
      {
        path: '/shop/goods',
        name: 'goods',
        component: ShopGoods
      },
      {
        path: '/shop/comment',
        component: ShopComment
      },
      {
        path: '/shop/info',
        component: ShopInfo
      }]
    }
  ]
})
