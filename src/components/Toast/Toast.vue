<template>
  <div class="toast">
    {{ message }}
  </div>
</template>

<script>
import { reactive } from 'vue'

export const useToastEffect = () => {
  const ToastData = reactive({
    message: '',
    showToast: false
  })
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
