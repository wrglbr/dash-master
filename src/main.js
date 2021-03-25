/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';
import Toasted from 'vue-toasted';
import VueNoty from 'vuejs-noty'
// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';
import 'vuejs-noty/dist/vuejs-noty.css';
// @import '~vuejs-noty/dist/vuejs-noty.css';

// Core
import App from './App.vue';
import router from './router/router';
import axios from 'axios';

// Layouts
import Default from '@/layouts/Default.vue';

ShardsVue.install(Vue);
window.axios = axios;

Vue.use(VueNoty);
Vue.use(Toasted);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

const authData = localStorage.getItem("auth");

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <a>.';
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app');
