import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;
let a = 133;
a = '321';
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');