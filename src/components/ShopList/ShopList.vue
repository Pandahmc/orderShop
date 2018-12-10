<template lang="html">
  <div class="shop_container">
    <ul class="shop_list">
      <li class="shop_li border-1px" v-for="(shop,index) in shops" :key="index">
        <router-link :to="{name:'goods',params:{shopName:shop.name,shopImg:baseImageUrl+shop.image_path}}">
          <div class="shop_left">
            <img class="shop_img" :src="baseImageUrl+shop.image_path">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{shop.name}}</h4>
              <ul class="shop_detail_ul">
                <li class="supports" v-for="(support,index) in shop.supports">
                  {{support.icon_name}}
                </li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <Star :score="shop.rating" :size="24"></Star>
                <div class="rating_section">
                  {{shop.rating}}
                </div>
                <div class="order_section">
                  月售{{shop.recent_order_num}}单
                </div>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{shop.float_minimum_order_amount}}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{shop.float_delivery_fee}}</span>
              </p>
            </section>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- <ul v-else>
      <li v-for="item in 6" :key="item">
        <img src="./images/shop_back.svg" alt="back">
      </li>
    </ul> -->
  </div>
</template>

<script>
import ShopData from '../../assets/json/shopData.json'
import Star from '../Star/Star'

export default { 
  name: "shopList",
  data() {
    return {
      shops: [],
      baseImageUrl: "https://fuss10.elemecdn.com"
    }
  },
  components: {
    Star
  },
  created() {
    this.shops = ShopData
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/css.styl"
.shop_container
    margin-bottom 50px
    .shop_list
    .shop_li
      bottom-border-1px(#f1f1f1)
      width 100%
      >a
        clearFix()
        display flex
        box-sizing border-box
        padding 15px 8px
        width 100%
        .shop_left
          box-sizing border-box
          width 82px
          height 75px
          padding-right 10px
          .shop_img
            width 100%
            height 100%
        .shop_right
          flex 1
          .shop_detail_header
            clearFix()
            width 100%
            .shop_title
              float left
              width 200px
              color #333
              font-size 16px
              line-height 16px
              font-weight 700
              &::before
                content '品牌'
                display inline-block
                font-size 11px
                line-height 11px
                color #333
                background-color #ffd930
                padding 2px 2px
                border-radius 2px
                margin-right 5px
            .shop_detail_ul
              float right
              margin-top 3px
              .supports
                float left
                font-size 10px
                color #999
                border 1px solid #999
                padding 0 2px
                margin 0 2px
                border-radius 2px
          .shop_rating_order
            clearFix()
            width 100%
            margin-top 18px
            margin-bottom 8px
            .shop_rating_order_left
              float left
              color #ff9a0d
              .star
                float left
              .rating_section
                float left
                font-size 10px
                color #ff6000
                margin-left 4px
              .order_section
                float left
                font-size 10px
                color #666
                transform scale(.8)
          .shop_distance
            clearFix()
            width 100%
            font-size 12px
            .shop_delivery_msg
              float left
              transform-origin 0
              transform scale(.9)
              color #666
            .segmentation
              color #ccc

</style>