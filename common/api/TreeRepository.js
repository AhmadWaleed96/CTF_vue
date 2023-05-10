import { TREE } from '../constants'

export default ($axios) => ({
  async getTree(dto) {
    return await $axios.post(TREE.GET_TREE, dto);
  },
  async refreshTree(vm) {
    return await $axios.post(TREE.REFRESH_TREE, vm);
  },
  async rowInserting(dto) {
    return await $axios.post(TREE.ROW_INSERTING, dto);
  },
  async rowUpdating(dto) {
    return await $axios.post(TREE.ROW_UPDATING, dto);
  },
  async rowDeleting(dto) {
    return await $axios.post(TREE.ROW_DELETING, dto);
  },
  async treeBatchActions(dto) {
    return await $axios.post(TREE.BATCH_ACTIONS, dto);
  },
})

