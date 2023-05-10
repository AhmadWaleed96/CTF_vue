import { MENU } from '../constants'

export default ($axios) => ({
  async getMenu(dto) {
    return await $axios.post(MENU.GET_MENU, dto);
  },
  async addRemoveToFavorite(vm) {
    return await $axios.post(MENU.ADD_REMOVE_TO_FAVORITE, vm);
  },
})

