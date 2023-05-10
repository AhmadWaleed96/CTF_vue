export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getReportLayout({ commit }, reportID) {
    try {
      const { data } = await this.$repositories.reports.getReportLayout(reportID)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async saveReportLayout({ commit }, vm) {
    try {
      const { data } = await this.$repositories.reports.saveReportLayout(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async deleteReportLayout({ commit }, vm) {
    try {
      const { data } = await this.$repositories.reports.deleteReportLayout(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async getReportInfoByFormID({ commit }, formID) {
    try {
      const { data } = await this.$repositories.reports.getReportInfoByFormID(formID)
      return data
    } 
    catch (e) {
      return e
    }
  },
}