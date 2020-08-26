

export const state = () => ({
  currentBootcamp: null
})

export const mutations = {
  SET_CURRENT_BOOTCAMP(state, bootcamp) {
    state.currentBootcamp = bootcamp
  }
}
