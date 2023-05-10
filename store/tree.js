export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getTree ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.tree.getTree(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async refreshTree ({ commit }, vm) {
    try {
      const { data } = await this.$repositories.tree.refreshTree(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async rowInserting ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.tree.rowInserting(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async rowUpdating ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.tree.rowUpdating(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async rowDeleting ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.tree.rowDeleting(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async treeBatchActions ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.tree.treeBatchActions(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
}