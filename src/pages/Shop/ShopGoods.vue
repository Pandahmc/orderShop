<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <!-- 左侧的菜单对应的是食物分类列表-->
        <ul>
         <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index===currentIndex}" @click="menuItemHandler(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" @increment="incrementTotal"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart :selectFood="selectFood" ref="shopCart"/>
    </div>
    <FoodInfo ref="foodInfo" :food="food"/>
  </div>
</template>
<script>
import FoodData from '../../assets/json/foodData.json'
import BScroll from 'better-scroll'
import CartControl from '../../components/CartControl/CartControl'
import FoodInfo from '../../components/FoodInfo/FoodInfo'
import ShopCart from '../../components/ShopCart/ShopCart'
export default {
  data () {
    return {
      goods: [],
      scrollY: 0,  // 右侧滑动的 Y 轴坐标，越往下数值越小（滑动过程中实时变化）
      tops: [],    // 包含右侧所有分类li的 top 值组成的数组（列表第一次显示后就不再变化）
      food:{}
    }
  },
  created() {
    this.goods = FoodData.goods
    this.$nextTick(() => {   // 列表数据更新显示后执行
      this._initScroll()
      this._initTops()
    })
  },
  computed: {
    // 计算得到当前分类的下标
    currentIndex() {
      for(let i=0; i<this.tops.length; i++){
        let preIndex = this.tops[i]
        let nextIndex = this.tops[i+1]
        if(this.scrollY >= preIndex && this.scrollY < nextIndex){
          return i
        }
      }
    },
    //加入购物车的food
    selectFood() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    // 初始化滚动
    _initScroll() {   // 列表显示之后创建
      this.menuScroll = new BScroll('.menu-wrapper',{
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper',{
        click: true,
        probeType: 3  //实时的派发scroll事件
      })
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on('scroll',({x,y}) => {
        this.scrollY = Math.abs(y)
      })
    },

    //初始化tops
    _initTops() {
      let top = 0
      this.tops.push(top)
      //找到所有分类的li 的top值
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      for(let i=0; i<lis.length; i++){
        let item = lis[i]
        top += item.clientHeight
        this.tops.push(top)
      }
    },

    // 使右侧列表滑动到对应的位置
    menuItemHandler(index) {
      // console.log(index)
      let y = this.tops[index]   //先得到目标位置的scrollY值
      this.foodsScroll.scrollTo(0, -y, 300)  //然后平滑更新右侧列表
    },

    //显示FoodInfo组件
    showFood(food){
      this.food = food
      return this.$refs.foodInfo.toggleShow()
    },

    incrementTotal(target) {
      this.$refs.shopCart.drop(target)
    }
  },
  components: {
    CartControl,
    FoodInfo,
    ShopCart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/css.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 15px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 8px
</style>