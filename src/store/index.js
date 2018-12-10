import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopName: "",
    shopImg: ""
  },
  mutations: {
    add(state, { food }) {
      if (!food.count) { // 第一次增加
        Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
      } else {
        food.count++
      }
    },
    decrease(state,{food}) {
      if(food.count) {
      	food.count--
      }
    }
  },
  actions: {
    addCount({ commit }, { food }) {
      commit("add", { food })
    },
    decreaseCount({ commit }, { food }) {
      commit("decrease", { food })
    }
  }
})
