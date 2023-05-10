export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getMenu({ commit }, vm) {
    try {
      const { data } = await this.$repositories.menu.getMenu(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async addRemoveToFavorite({ commit }, vm) {
    try {
      const { data } = await this.$repositories.menu.addRemoveToFavorite(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
}