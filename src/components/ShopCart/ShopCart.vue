<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount > 0}">
              <i class="iconfont icon-shopping" :class="{highlight: totalCount > 0}"></i>
            </div>
            <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>

      <!-- 存放购物车小球的div -->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 显示购物车食品列表 -->
      <transition name="move">
        <div class="shopcart-list" v-show="isShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearList">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in selectFood" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="isShow" @click="toggleShow"></div>
  </div>
</template>
<script>
import FoodData from '../../assets/json/foodData.json'
import CartControl from '../CartControl/CartControl'
import BScroll from 'better-scroll'
import 'mint-ui/lib/style.css'
import { MessageBox } from 'mint-ui'

export default {
  name: 'ShopCart',
  data() {
    return {
      info: "",
      shows: true,
      //设置小球
      balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
      dropBalls: []
    }
  },
  props: {
    selectFood: Array
  },
  computed: {
  	//累计count
    totalCount() {
      let count = 0;
      this.selectFood.forEach((food) => {
        count += food.count
      })
      return count
    },
    //累计商品总价
    totalPrice() {
      let price = 0;
      this.selectFood.forEach((food) => {
        price += food.price * food.count
      })
      return price
    },
    //根据商品总价判断
    payText() {
      let minPrice = this.info.minPrice;
      if (this.totalPrice === 0) {
        return `￥${minPrice}元起送`
      }else if(this.totalPrice < minPrice){
      	return `还差￥${minPrice - this.totalPrice}元起送`
      }else{
      	return '去结算'
      }
    },
    //根据商品总价来设置购物车不同的样式和提示文字
    payClass() {
      return this.totalPrice >= this.info.minPrice ? 'enough' : 'not-enough'
    },
    isShow() {
      if(!this.totalCount) {
      	return false
      }
      let shows = !this.shows
      if(shows) {
        this.$nextTick(() => {
          if(!this.srcoll) {
          	this.scroll = new BScroll('.list-content',{
        	    click: true
            })
          }else {
          	this.scroll.refresh() // 让滚动条刷新一下: 重新统计内容的高度
          }
        })
      }
      return shows
    }
  },
  methods: {
    toggleShow(event) {
      if (!this.totalCount) {
         return
      }
      this.shows = !this.shows
    },

    //实现小球抛物线动画
    drop(el) {  //触发一次事件就会将所有小球进行遍历
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true            
          ball.el = el  //设置小球的el属性为一个dom对象 
          this.dropBalls.push(ball)
          return   //此处return终结函数,这意味着每次触发事件,dropBalls内只增加一个ball
        }
      }
    },
    beforeEnter(el) {  //购物车小球动画实现
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
	      let rect = ball.el.getBoundingClientRect() //元素相对于视口的位置
	      let x = rect.left - 32  //小球掉落X轴起点
	      let y = -(window.innerHeight - rect.top - 22) //小球掉落Y轴起点,向下为负
	      el.style.display = ''
	      el.style.webkitTransform = `translate3d(0,${y}px,0)`
	      el.style.transform = `translate3d(0,${y}px,0)`  //旋转div元素
	      // 处理内层动画
	      let inner = el.getElementsByClassName('inner-hook')[0]
	      inner.style.webkitTransform = `translate3d(${x}px,0,0)`
	      inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el, done) {   //重置小球数量  样式重置
      this.$nextTick(() => {
      	//修改数据之后立即使用这个方法，获取更新后的 DOM
	    el.style.webkitTransform = 'translate3d(0,0,0)'
	    el.style.transform = 'translate3d(0,0,0)'
	    let inner = el.getElementsByClassName('inner-hook')[0]
	    inner.style.webkitTransform = 'translate3d(0,0,0)'
	    inner.style.transform = 'translate3d(0,0,0)'
	    el.addEventListener('transitionend', done)
      });
    },
    afterEnter(el) {  //初始化小球
      let ball = this.dropBalls.shift() //把数组的第一个元素从其中删除，并返回第一个元素的值。
      if (ball) {
        ball.show = false
        el.style.display = 'none'  //隐藏小球
      }
    },    

    //清空购物车
    clearList(event) {
      MessageBox.confirm('确定清空购物车吗？').then(action => {
        this.selectFood.forEach((food) => {
          food.count = 0
        })
      },() => {})
    }
  },
  created() {
    this.info = FoodData.info
  },
  components: {
    CartControl
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../assets/stylus/css.styl"
.shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
                background $green
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background $green
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)  //贝塞尔曲线
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
</style>