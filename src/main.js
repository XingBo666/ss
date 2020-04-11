import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Axios.defaults.baseURL = "http://localhost:8080"
/*
axios.interceptors.request.use(function (config) {
	let token = sessionStorage.getItem('authorization') || 1;
	if (token) {
		config.headers['Authorization'] = token;
	}
	return config;
})
*/
Axios.defaults.headers.common['Authentication'] = 1;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
