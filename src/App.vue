<template>
  <div id="app">
    <router-view/>
    <!--$route.meta.showFooter判断是否显示底部组件-->
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components: {
  	FooterGuide
  }
}
</script>

