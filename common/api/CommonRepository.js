import { COMMON } from '../constants'

export default ($axios) => ({
  async getDataDropdownList(dto) {
    return await $axios.post(COMMON.GET_DATA_DROPDOWM_LIST, dto);
  },
  async getSystemInfo() {
    return await $axios.post(COMMON.GET_SYSTEM_INFO);
  },
})

