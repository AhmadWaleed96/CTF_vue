import { FORM } from '../constants'

export default ($axios) => ({
  async getFormDetails(vm, config) {
    return await $axios.post(FORM.GET_FORM_DETAILS, vm, config);
  },
  async saveFormDetails(dto) {
    return await $axios.post(FORM.SAVE_FORM_DETAILS, dto);
  },
  async deleteFormDetails(dto) {
    return await $axios.post(FORM.DELETE_FORM_DETAILS, dto);
  },
  async printForm(dto) {
    return await $axios.post(FORM.PRINT_FORM, dto);
  },
})