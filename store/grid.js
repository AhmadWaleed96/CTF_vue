export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async getGrid ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.grid.getGrid(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async refreshGrid ({ commit }, vm) {
    try {
      const { data } = await this.$repositories.grid.refreshGrid(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async rowInserting ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.grid.rowInserting(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async rowUpdating ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.grid.rowUpdating(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async rowDeleting ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.grid.rowDeleting(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async gridBatchActions ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.grid.gridBatchActions(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async saveGridLayout ({ commit }, dto) {
    try {
      const { data } = await this.$repositories.grid.saveGridLayout(dto)
      return data
    } 
    catch (e) {
      return e
    }
  },
}