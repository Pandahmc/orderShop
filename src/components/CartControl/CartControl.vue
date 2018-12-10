<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-jian" v-show="food.count>0" @click.stop="decreaseCart()"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-jia"  @click.stop="addCart($event)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  methods: {
    addCart(event){
      this.$store.dispatch('addCount',{food:this.food})
      this.$emit('increment', event.target);
    },
    decreaseCart(event){
      this.$store.dispatch('decreaseCount',{food:this.food})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/css.styl"
  .cartcontrol
    font-size: 0
    .icon-jian
      display: inline-block
      padding 6px
      line-height 24px
      font-size 20px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jia
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 23px
      color $green
</style>