

export const state = () => ({
  singleBootcamp: null,
  bootcamps: null,
  bootcampByUserId: null,
})

export const actions = {
  async fetchBootcampByUserId({commit}, userId) {
    let responseBootcampByUserId = await this.$axios.$get(`/api/v1/bootcamps/user/${userId}`);
    commit('SET_BOOTCAMP_BY_USER_ID', responseBootcampByUserId.data);
    return responseBootcampByUserId.data;
  }
}

export const mutations = {
  SET_SINGLE_BOOTCAMP(state, bootcamp) {
    state.singleBootcamp = bootcamp
  },
  SET_BOOTCAMPS(state, bootcamps) {
    state.bootcamps = bootcamps
  },
  SET_BOOTCAMP_BY_USER_ID(state, bootcampByUserId) {
    state.bootcampByUserId = bootcampByUserId
  }
}
