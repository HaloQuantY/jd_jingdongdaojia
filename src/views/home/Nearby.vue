<template>
  <ul class="nearby">
    <li class="nearby__title">附近店铺</li>
    <li
      v-for="item in itemList"
      :key="item.id"
      class="nearby__item"
    >
      <img
        class="nearby__item__img"
        :src="item.imgUrl"
        :alt="item.title"
      />
      <div class="nearby__content">
        <p class="nearby__content__title">{{item.title}}</p>
        <span
          v-for="innerItem in item.tags"
          :key="innerItem"
          class="nearby__content__tag"
        >{{innerItem}}</span>
        <p class="nearby__content__highlight">
          {{item.hightlight}}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const itemList = [
      {
        id: 0,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        hightlight: 'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        hightlight: 'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        hightlight: 'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        id: 3,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        hightlight: 'VIP尊享满89元减4元运费券（每月3张）'
      }
    ]

    return {
      itemList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
@import '@/style/mixins.scss';

.nearby {
  padding: 0;
  list-style: none;
  color: $theme-textcolor;
  &__title {
    font-size: 0.18rem;
    font-weight: bold;
  }
  &__item {
    display: flex;
    margin: 0;
    padding: 0.12rem 0 0 0;
    &__img {
      width: 0.56rem;
      height: 0.56rem;
    }
    .nearby__content {
      padding-left: 0.16rem;
      font-size: 0.13rem;
      border-bottom: 0.01rem solid $theme-bgColor;
      &__title {
        margin: 0 0 0.08rem 0;
        line-height: 0.22rem;
        font-size: 0.16rem;
      }
      &__tag {
        padding-right: 0.16rem;
      }
      &__highlight {
        margin: 0;
        padding: 0.08rem 0 0.12rem 0;
        color: #e93b3b;
      }
    }
  }
}
</style>
