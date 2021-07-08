<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{ docker__item: true, 'docker__item--active': index === 0 }"
      :key="item.iconCode"
    >
      <i class="docker__icon iconfont" v-html="item.iconCode"></i>
      <div class="docker__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      {
        iconCode: '&#xe60d;',
        text: '首页'
      },
      {
        iconCode: '&#xe60b;',
        text: '购物车'
      },
      {
        iconCode: '&#xe60c;',
        text: '订单'
      },
      {
        iconCode: '&#xe607;',
        text: '我的'
      }
    ]

    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
@import '@/style/mixins.scss';

.docker {
  box-sizing: border-box;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 0.18rem;
  width: 100%;
  height: 0.49rem;
  color: $theme-textcolor;
  background-color: #fff;
  border-top: 0.01rem solid $theme-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    .docker__icon {
      display: block;
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    .docker__title {
      font-size: 0.1rem;
    }
  }
  &__item--active {
    color: #1fa4fc;
  }
}
</style>
