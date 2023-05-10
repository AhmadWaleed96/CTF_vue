import Vue from 'vue'

const eventBus = {}

eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}
// export default (ctx, inject) => {
//   inject('eventBus', eventBus)
// }
Vue.use(eventBus)