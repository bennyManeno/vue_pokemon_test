import Vue from 'vue'
import App from './App.vue'
import * as Bootstrap from 'bootstrap'


Vue.config.productionTip = false
Vue.use(Bootstrap)


new Vue({
  render: h => h(App),
}).$mount('#app')
