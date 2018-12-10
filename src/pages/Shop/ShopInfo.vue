<template>
  <div class="shop-info">
    <div class="info-content">
      <div class="overview">
        <h1 class="title">配送信息</h1>
        <div class="desc">
          <Star :size="36" :score="info.serviceScore"></Star>
          <span class="text">({{info.ratingCount}})</span>
          <span class="text">月售{{info.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{info.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{info.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{info.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite()">
          <i class="iconfont icon-aixin" :class="{'active':favorite}"></i>
          <span>{{favoriteText}}</span>
        </div>
      </div>

      <div class="split"></div>

      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{info.bulletin}}</p>
        </div>
        <ul class="supports">
          <li class="support-item" v-for="(support, index) in info.supports"
          :key="index" :class="supportClasses[support.type]">
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="text">{{support.content}}</span>
          </li>
        </ul>
      </div>

      <div class="split"></div>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picsUL">
            <li class="pic-item" v-for="pic in info.pics">
              <img :src="pic" width="120" height="120">
            </li>
          </ul>
        </div>
      </div>

      <div class="split"></div>

      <div class="info">
        <h1 class="info-title">商家信息</h1>
        <ul class="detail">
          <li><span class="bold">品类</span> <span>{{info.category}}</span></li>
          <li><span class="bold">商家电话</span> <span>{{info.phone}}</span></li>
          <li><span class="bold">地址</span> <span>{{info.address}}</span></li>
          <li><span class="bold">营业时间</span> <span>{{info.workTime}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import FoodData from '../../assets/json/foodData.json'
import Star from '../../components/Star/Star'

export default {
  data() {
  	return {
  		info: [],
  		supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
  		favorite: false
  	}
  },
  created() {
  	this.info = FoodData.info

  	this.$nextTick(() => {
  		this._initScroll()
  	})
  },
  computed: {
  	favoriteText() {
  		return this.favorite ? '已收藏' : '收藏'
  	}
  },
  methods: {
  	toggleFavorite(event) {
  		this.favorite = !this.favorite
  		this.favoriteText
  	},
  	_initScroll() {
  		new BScroll('.shop-info',{
  			click: true
  		})

  		//动态计算ul的宽度
  		const ul = this.$refs.picsUL
  		const liWidth = 120
  		const space = 6
  		const count = this.info.pics.length
  		ul.style.width = (liWidth + space) * count - space + 'px'

  		new BScroll('.pic-wrapper',{
  			click: true,
  			scrollX: true
  		})
  	}
  },
  components: {
  	Star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/css.styl"
  .shop-info
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    background: #fff
    overflow: hidden
    .overview
      padding 16px 14px 14px
    .title
      margin-bottom 8px
      line-height 14px
      color #000
      font-size 16px
    .desc
      padding-bottom 18px
      border-bottom 1px solid #eee
      .star
        display inline-block
        vertical-align top
        margin-right 8px
      .text
        display inline-block
        vertical-align top
        margin-right 12px
        line-height 18px
        font-size 10px
        color rgb(77, 85, 93)
    .remark
      display flex
      padding-top 18px
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border none
        h2
          margin-bottom 4px
          line-height 10px
          font-size 10px
          color rgb(147, 153, 149)
        .content
          line-height 24px
          font-size 10px
          color rgb(7, 17, 27)
          .stress
            font-size 24px
    .favorite
      position absolute
      right 11px
      top 18px
      width 50px
      text-align center
      .iconfont
        display block
        margin-bottom 4px
        line-height 24px
        font-size 24px
        width 50px
        color #d4d6d9
        &.active
          color rgb(240,20,20)
      .text
        line-height 10px
        font-size 10px
        color rgb(77,85,93)
    .bulletin
      padding 18px 18px 0 18px
    .title
      margin-bottom 8px
      line-height 14px
      color rgb(7, 17, 27)
      font-size 16px
    .content-wrapper
      padding 0 12px 12px 1px
      border-bottom 1px solid #eee
      .content
        line-height 24px
        font-size 12px color rgb(240, 20, 20)
    .supports
      .support-item
        padding 5px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        &:last-child
          border-none()
        &.activity-green
          .content-tag
            background-color rgb(112, 188, 70)
        &.activity-red
          .content-tag
            background-color rgb(240, 115, 115)
        &.activity-orange
          .content-tag
            background-color: rgb(241, 136, 79)
        .content-tag
          display inline-block
          border-radius 2px
          height: 18px
          margin-right 10px
          color #fff
          font-style normal
          position relative 
          .mini-tag
            font-size 14px
        .text
          display inline-block
          font-size 12px
          line-height 16px
          color rgb(7, 17, 27)
	.pics
	  padding 18px
	  .title
	    margin-bottom 12px
	    line-height 14px
	    color rgb(7, 17, 27)
	    font-size 16px
	  .pic-wrapper
	    width 100%
	    overflow hidden
	    white-space nowrap 
	    .pic-list
	      .pic-item
	        display inline-block
	        margin-right 6px
	        width 120px
	        height 90px
	        &:last-child
	          margin 0

  .info
    padding 18px 18px 0 18px
    color rgb(7, 17, 27)
    .info-title
      padding-bottom 12px
      line-height 14px
      font-size 16px
    .detail
      margin-bottom -16px
      > li
        display flex
        justify-content space-between
        align-items center
        margin-right -10px
        padding 10px 12px 10px 0
        line-height 16px
        font-size 13px
        > .bold
          font-weight 700
          color #333
        &:last-child
          border-none()
  .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
</style>