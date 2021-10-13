import vNone from './v-noneData.vue'
import vDialog from './v-dialog.vue'
const components = {
  vNone,
  vDialog
}
const install = function (Vue) {
  for (const key in components) {
    Vue.component(components[key].name, components[key])
  }
}
// // 添加install方法
// const globalNoneComp = {
//   install: function (Vue) {
//     Vue.component("globalNoneComp", globalNoneComp);
//   }
// }
// // 导出
// export default globalNoneComp
if (typeof window !== 'undefined' && window.Vue) {
  install(Window.vue)
}

components.install = install

export default components
