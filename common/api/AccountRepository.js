import { ACCOUNT } from '../constants'

export default ($axios) => ({
  async login(vm) {
    return await $axios.post(ACCOUNT.LOGIN, vm);
  },
  async forgotPassword(vm) {
    return await $axios.post(ACCOUNT.FORGOT_PASSWORD, vm);
  },
  async sendEmailForActivation() {
    return await $axios.post(ACCOUNT.SEND_EMAIL_FOR_ACTIVATION);
  },
  async addActivationCode(vm) {
    return await $axios.post(ACCOUNT.ADD_ACTIVATION_CODE, vm);
  },
  async generateActivationCode(vm) {
    return await $axios.post(ACCOUNT.GENERATE_ACTIVATION_CODE, vm);
  },
  async sendSMSCode() {
    return await $axios.post(ACCOUNT.SEND_SMS_CODE);
  },
  async reSendSMSCode(vm) {
    return await $axios.post(ACCOUNT.RESEND_SMS_CODE, vm);
  },
  async confirmSMSCode(vm) {
    return await $axios.post(ACCOUNT.CONFIRM_SMS_CODE, vm);
  },
  async getAuthenticator() {
    return await $axios.get(ACCOUNT.GET_AUTHENTICATOR);
  },
  async checkAuthenticator(vm) {
    return await $axios.post(ACCOUNT.CHECK_AUTHENTICATOR,vm);
  },
})