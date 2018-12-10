<template lang="html">
  <swiper :options="swiperOption" class="swiper-container">
    <swiper-slide class="swiper-slide" v-for="(pages,index) in categorysArr" :key="index">
  	  <a href="javascript:" class="link_to_food" v-for="(item,index) in pages" :key="index">
  		<div class="food_container">
  		  <img :src="baseImageUrl+item.image_url" />
  		</div>
  		<span>{{item.title}}</span>
  	  </a>
    </swiper-slide>
	  <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SwiperData from '../../assets/json/swiperData.json'

export default {  
  name:"Swiper",
  data(){
  	return{
      baseImageUrl: 'https://fuss10.elemecdn.com',
  	  swiperOption: {
  	    pagination: {
  	      el: '.swiper-pagination'
  	    }
      }
  	}
  },
  components: {	    
  	swiper,
	  swiperSlide
  },
  computed: {
    categorysArr () {
      // 1.先从当前组件中得到所有食品分类的一维数组
      const categorys = SwiperData
      // 2.准备一个空的二维数组--categorysArr
      const arr = []
      // 3.准备一个小数组--pages(最大长度为8)
      let minArr = []
      // 4.遍历categorys得到处理后的二维数组catagorysArr
      categorys.forEach(data => {
        // 如果当前小数组(pages)已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的, 将小数组(pages)保存到大数组(categorysArr)中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类信息保存到小数组(pages)中
        minArr.push(data)
      })
      return arr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/css.styl"
.swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>