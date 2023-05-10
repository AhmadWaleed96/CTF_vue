import { REPORTS } from '../constants'

export default ($axios) => ({
  async getReportLayout(reportID) {
    return await $axios.get(REPORTS.GET_REPORT_LAYOUT+"?reportID="+reportID);
  },
  async saveReportLayout(vm) {
    return await $axios.post(REPORTS.SAVE_REPORT_LAYOUT, vm);
  },
  async deleteReportLayout(vm) {
    return await $axios.post(REPORTS.DELETE_REPORT_LAYOUT, vm);
  },
  async getReportInfoByFormID(formID) {
    return await $axios.get(REPORTS.GET_REPORT_INFO_BY_FORMID+"?formID="+formID);
  },
})

