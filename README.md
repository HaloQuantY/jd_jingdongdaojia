## 仿京东到家项目

目前使用技术

- vue.js
- vue-router

#### 首页和登录页面静态

##### views文件夹下目录

```
│  
├─home
│      Docker.vue
│      Home.vue
│      Nearby.vue
│      StaticPart.vue
│      
├─login
│      Login.vue
│      
└─logup
        Logup.vue
```

- home首页
  - StaticPart 页面中静态部分组件 之后预计不会有后端数据交互
  - Nearby 附近商家组件 首页中主要交互部分
  - Docker组件 底部导航栏 未来可以放在components中
- login登陆页面
- logup注册页面



##### 页面路由

```javascript
// router下index.js路由文件
const routes = [
  // 路由表部分
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // 异步加载组件
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/logup',
    name: 'Logup',
    component: () => import('@/views/logup/Logup.vue'),
  }
]
```

```javascript
// App.vue实现页面结构和路由
<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>
```



##### 路由守卫实现基础登录验证

```javascript
// router下index.js路由文件
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    // 路由独享守卫, 每次跳转到该路径时执行此回调
    beforeEnter (to, from, next) {
      const { ifLogin } = localStorage
      ifLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/logup',
    name: 'Logup',
    component: () => import('@/views/logup/Logup.vue'),
    beforeEnter (to, from, next) {
      const { ifLogin } = localStorage
      ifLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫, 每次路径跳转都会执行回调
router.beforeEach((to, from, next) => {
  const { ifLogin } = localStorage
  // localStorage获得登录信息 如果未登录则跳转到登录页面
  ifLogin || to.name === 'Login' || to.name === 'Logup' ? next() : next({ name: 'Login' })
})

export default router

```

