<template>
  <div class="login">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="login__img"
    />
    <div class="login__input">
      <input
        type="text"
        class="login__input__content"
        placeholder="请输入用户名"
        v-model="userData.username"
      />
    </div>
    <div class="login__input">
      <input
        type="password"
        class="login__input__content"
        placeholder="请输入密码"
        v-model="userData.password"
      />
    </div>
    <div class="login__button" @click="handleLogin">登录</div>
    <div class="login__logup" @click="handleLogup">立即注册</div>
    <Toast v-if="ToastData.showToast" :message="ToastData.message" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast/Toast.vue'

const useLoginEffect = showToast => {
  const router = useRouter()
  const userData = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    const url = '/api/user/login'
    try {
      const result = await post(url, {
        username: userData.username,
        password: userData.password
      })
      if (result.error === 0) {
        localStorage.setItem('ifLogin', true)
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
      console.log(e)
    }
  }
  return {
    userData,
    handleLogin
  }
}

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
    const { ToastData, showToast } = useToastEffect()
    const { userData, handleLogin } = useLoginEffect(showToast)
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

<style lang="scss" scoped>
@import '@/style/variables.scss';

.login {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  bottom: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    margin: 0 0.4rem 0.16rem;
    height: 0.48rem;
    background-color: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      box-sizing: border-box;
      border: none;
      outline: none;
      padding: 0 0.16rem;
      width: 100%;
      height: 0.48rem;
      line-height: 0.24rem;
      font-size: 0.16rem;
      color: $login-textColor;
      background: none;
      &::placeholder {
        color: $login-textColor;
      }
    }
  }
  &__button {
    border: none;
    margin: 0.32rem 0.4rem 0.16rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    color: #fff;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
  }
  &__logup {
    text-align: center;
    font-size: 0.14rem;
    color: $login-textColor;
    a {
      color: $login-textColor;
      text-decoration: none;
    }
  }
}
</style>
