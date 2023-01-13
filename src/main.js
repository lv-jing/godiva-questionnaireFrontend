import Vue from 'vue'
import App from './App.vue'
// import 'vant/lib/index.css';
import api from './api';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/g-base.css'

Vue.config.productionTip = false
Vue.prototype.$api = api; // 将api挂载到vue的原型上，便于全局调用
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
