import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentBootcamp: null
})

export const mutations = {
  SET_CURRENT_BOOTCAMP(state, bootcamp) {
    state.currentBootcamp = bootcamp
  }
}
