<template>
  <div class="logup">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="logup__img"
    />
    <div class="logup__input">
      <input
        type="text"
        class="logup__input__content"
        placeholder="请输入手机号"
      />
    </div>
    <div class="logup__input">
      <input
        type="password"
        class="logup__input__content"
        placeholder="请输入密码"
      />
    </div>
    <div class="logup__input">
      <input
        type="password"
        class="logup__input__content"
        placeholder="确认密码"
      />
    </div>
    <div class="logup__button">注册</div>
    <div class="logup__login" @click="handleLogin">已有账号去登陆</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'logup',
  setup () {
    const router = useRouter()
    const handleLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.logup {
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
  &__login {
    text-align: center;
    font-size: 0.14rem;
    color: $login-textColor;
  }
}
</style>
