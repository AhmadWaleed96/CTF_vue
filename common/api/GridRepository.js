import { GRID } from '../constants'

export default ($axios) => ({
  async getGrid(dto) {
    return await $axios.post(GRID.GET_GRID, dto);
  },
  async refreshGrid(vm) {
    return await $axios.post(GRID.REFRESH_GRID, vm);
  },
  async rowInserting(dto) {
    return await $axios.post(GRID.ROW_INSERTING, dto);
  },
  async rowUpdating(dto) {
    return await $axios.post(GRID.ROW_UPDATING, dto);
  },
  async rowDeleting(dto) {
    return await $axios.post(GRID.ROW_DELETING, dto);
  },
  async gridBatchActions(dto) {
    return await $axios.post(GRID.BATCH_ACTIONS, dto);
  },
  async saveGridLayout(dto) {
    return await $axios.post(GRID.SAVE_GRID_LAYOUT, dto);
  },
})

