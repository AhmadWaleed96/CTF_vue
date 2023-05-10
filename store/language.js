export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getLanguages ({ commit }) {
    try {
      const { data } = await this.$repositories.language.getLanguages()
      return data
    } 
    catch (e) {
      return e
    }
  },
}