import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en.js' // 引入Element UI的英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js' // 引入Element UI的中文包
import './mock' // simulation data
import './assets/css/font.css'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh', // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: Object.assign(require('./lang/zh.json'), zhLocale), // 这里需要注意一下，是如何导入多个语言包的
    en: Object.assign(require('./lang/en.json'), enLocale)
  }
})
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
