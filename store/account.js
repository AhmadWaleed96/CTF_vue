export const state = () => ({
  userSetting:{
    // data: null,
    // succeeded: false,
  },
})

export const getters = {
}

export const mutations = {
  SET_USER_SETTING (state, userSetting)  {
    state.userSetting = userSetting
    localStorage.userSetting =JSON.stringify(state.userSetting) 
  },
}

export const actions = {
  async login({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.login(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async forgotPassword({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.forgotPassword(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async sendEmailForActivation({ commit }) {
    try {
      const { data } = await this.$repositories.account.sendEmailForActivation()
      return data
    } 
    catch (e) {
      return e
    }
  },
  async addActivationCode({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.addActivationCode(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async generateActivationCode({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.generateActivationCode(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async sendSMSCode({ commit }) {
    try {
      const { data } = await this.$repositories.account.sendSMSCode()
      return data
    } 
    catch (e) {
      return e
    }
  },
  async reSendSMSCode({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.reSendSMSCode(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async confirmSMSCode({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.confirmSMSCode(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  async getAuthenticator({ commit }) {
    try {
      const { data } = await this.$repositories.account.getAuthenticator()
      return data
    } 
    catch (e) {
      return e
    }
  },
  async checkAuthenticator({ commit }, vm) {
    try {
      const { data } = await this.$repositories.account.checkAuthenticator(vm)
      return data
    } 
    catch (e) {
      return e
    }
  },
  setUserSetting({ commit }, data) {
    commit("SET_USER_SETTING",data)
  },
  getUserSetting({ commit }) {
    return JSON.parse(localStorage.userSetting) 
  },
}