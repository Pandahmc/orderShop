<template>
  <div class="home">
    <!-- 首页头部 -->
    <!-- 使用 :title 来给头部组件传递数据 -->
    <HeaderTop title="外卖">
      <!-- 使用slot="left/right"指定插入的插槽位置 -->
      <span class="header_search" slot="left">
        <router-link to='/search'><i class="iconfont icon-sousuo"></i></router-link>
      </span>
      <span class="header_login" slot="right">
        <router-link to='/login' tag='span' class="header_login_text">
          登录|注册
        </router-link>
      </span>
    </HeaderTop>
    <!--首页导航轮播-->
    <nav class="home_nav">
      <Swiper />
    </nav>
    <!--首页商家列表-->
    <div class="home_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-jifen"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </div>
</template>

<script>
import Swiper from '../../components/Swiper/Swiper'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default {
  components: {
    HeaderTop,
    Swiper,
    ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/css.styl"
  .home 
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .home_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
    .home_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>