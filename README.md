## 仿京东到家项目

目前使用技术

- vue.js
- vue-router
- axios
- fastmock

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

#### 登录注册页面数据交互

##### 改动文件

```
src -> views -> Login -> Login.vue
src -> views -> Login -> Logup.vue
```

##### 新增文件

```
src -> components -> Toast -> Toast.vue
src -> utils -> request.js
```

##### 实现功能

- 登录和注册页面和后端请求数据(使用fastmock模拟后端接口)
- 登录和注册信息错误时, 弹出错误提示框(Toast组件)

##### Login

```vue
// Login.vue
<template>
  	// 省略未修改部分, 新增绑定登录注册事件
    <div class="login__button" @click="handleLogin">登录</div>
    <div class="login__logup" @click="handleLogup">立即注册</div>
	// 使用Toast组件, v-if控制显示, message参数进行显示内容传递
    <Toast v-if="ToastData.showToast" :message="ToastData.message" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js' // 引入工具库中post函数发送post请求
import Toast, { useToastEffect } from '@/components/Toast/Toast.vue'

// 登录功能逻辑
const useLoginEffect = showToast => {
  const router = useRouter()
  // 用户数据, 两个表单项的内容双向绑定使用
  const userData = reactive({
    username: '',
    password: ''
  })
  // 处理登录事件的async回调函数
  const handleLogin = async () => {
    // fastmock模拟接口
    const url = '/api/user/login'
    try {
      // 调用post函数发送post请求
      const result = await post(url, {
        username: userData.username,
        password: userData.password
      })
      if (result.error === 0) {
        localStorage.setItem('ifLogin', true)
        router.push({ name: 'Home' })
      } else {
        // 判断接口返回error如果不为0则使用Toast组件弹出提示框
        showToast('登录失败')
      }
    } catch (e) {
      // 请求出现错误, 同样弹出提示框
      showToast('请求失败')
      console.log(e)
    }
  }
  return {
    userData,
    handleLogin
  }
}
// 注册功能逻辑(跳转到注册页面)
const useLogupEffect = () => {
  const router = useRouter()
  const handleLogup = () => {
    router.push({ name: 'Logup' })
  }
  return {
    handleLogup
  }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup () {
    // Toast提示框组件
    const { ToastData, showToast } = useToastEffect()
    // 登录相关逻辑函数, 参数为Toast组件中的showToast函数
    const { userData, handleLogin } = useLoginEffect(showToast)
    // 注册相关逻辑函数
    const { handleLogup } = useLogupEffect()

    return {
      handleLogin,
      handleLogup,
      userData,
      ToastData
    }
  }
}
</script>

```

##### 工具库中post函数

```javascript
// utils下request.js
import axios from 'axios'

// 引入axios发送请求, 封装在post函数中
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        baseURL: 'https://www.fastmock.site/mock/d81e39ea5dda1e4e79eb7f4be9ba5fc7/jd_daojia',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
```

##### Toast组件实现提示框

```vue
// components下Toast组件
<template>
  // 提示框, 显示指定内容
  <div class="toast">
    {{ message }}
  </div>
</template>

<script>
import { reactive } from 'vue'
// 和使用Toast组件相关逻辑
export const useToastEffect = () => {
  const ToastData = reactive({
    message: '',
    showToast: false
  })
  // showToast函数, 将提示框显示指定内容2秒
  const showToast = message => {
    ToastData.message = message
    ToastData.showToast = true
    setTimeout(() => {
      ToastData.showToast = false
    }, 2000)
  }
  return {
    ToastData,
    showToast
  }
}
// 接受message属性指定显示内容
export default {
  name: 'Toast',
  props: ['message']
}
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem 0.2rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
}
</style>

```





