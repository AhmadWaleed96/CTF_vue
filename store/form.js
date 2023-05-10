export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getFormDetails({ commit }, { vm, config }) {
    try {
      const { data } = await this.$repositories.form.getFormDetails(vm, config)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async saveFormDetails({ commit }, dto) {
    try {
      const { data } = await this.$repositories.form.saveFormDetails(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async deleteFormDetails({ commit }, dto) {
    try {
      const { data } = await this.$repositories.form.deleteFormDetails(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async printForm({ commit }, dto) {
    try {
      const { data } = await this.$repositories.form.printForm(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
}