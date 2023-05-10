export const state = () => ({
  systemTitle:{
    // data: null,
    // succeeded: false,
  },
  recaptcha:{
    // data: null,
    // succeeded: false,
  },
})

export const getters = {
}

export const mutations = {
  SET_SYSTEM_INFO (state, systemTitle)  {
    state.systemTitle = systemTitle
  },
  SET_RECAPTCHA (state, recaptcha)  {
    state.recaptcha = recaptcha
  },
}

export const actions = {
  async getDataDropdownList ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.common.getDataDropdownList(dto)
      return data
    } catch (e) {
      return e
    }
  },
  async getSystemInfo({ commit }) {
    try {
      const { data } = await this.$repositories.common.getSystemInfo()
      commit("SET_SYSTEM_INFO",data.data.systemTitle)
      commit("SET_RECAPTCHA",data.data.recaptcha)
      return data
    } 
    catch (e) {
      return e
    }
  },
}