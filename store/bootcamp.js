

export const state = () => ({
  singleBootcamp: null,
  bootcamps: null,
})

export const mutations = {
  SET_SINGLE_BOOTCAMP(state, bootcamp) {
    state.singleBootcamp = bootcamp
  },
  SET_BOOTCAMPS(state, bootcamps) {
    state.bootcamps = bootcamps
  }
}
