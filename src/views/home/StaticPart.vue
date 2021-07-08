<template>
  <div class="position">
    <i class="position__gps iconfont icon-gps"></i>
    <span class="position__text">
      北京理工大学国防科技园2号楼10层
    </span>
    <i class="position__bell iconfont icon-bell"></i>
  </div>
  <div class="serach">
    <i class="search__icon iconfont icon-search"></i>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="banner" />
  </div>
  <ul class="icons">
    <li v-for="(item, index) in iconList" :key="index" class="icons__item">
      <img :src="item.imgUrl" :alt="item.title" class="icons__item__img" />
      <p class="icons__item__text">
        {{ item.title }}
      </p>
    </li>
  </ul>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        title: '菜市场'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        title: '水果店'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        title: '鲜花绿植'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        title: '医药健康'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        title: '家居时尚'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        title: '烘培蛋糕'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        title: '签到'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        title: '大牌免运'
      },
      {
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        title: '红包套餐'
      }
    ]
    return {
      iconList
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/variables.scss';
@import '@/style/mixins.scss';

.position {
  display: flex;
  justify-content: space-between;
  padding: 0.16rem 0;
  color: $theme-textcolor;
  .iconfont {
    font-size: 0.2rem;
  }
  .position__text {
    flex: 1;
    padding-left: 0.08rem;
    font-size: 0.16rem;
    @include ellipsis;
  }
  .position__gps {
    position: relative;
    top: -0.02rem;
  }
}
.serach {
  box-sizing: border-box;
  margin: 0 0 0.12rem 0;
  height: 0.32rem;
  line-height: 0.32rem;
  font-size: 0.14rem;
  color: #b7b7b7;
  background: #f5f5f5;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    font-size: 0.16rem;
    padding: 0 0.08rem 0 0.16rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  img {
    width: 100%;
    vertical-align: center;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin: 0.16rem 0 0 0;
  padding: 0;
  list-style: none;
  &__item {
    width: 20%;
    text-align: center;
    &__img {
      width: 0.4rem;
      height: 0.4rem;
    }
    &__text {
      margin: 0.06rem 0 0.16rem 0;
      color: $theme-textcolor;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $theme-bgColor;
}
</style>
