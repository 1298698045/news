import Vue from 'vue'
import App from './App'
import tui from './common/tui.js'
import store from './store/index.js';
import api from '@/utils/api.js';
Vue.prototype.$http = api;
Vue.config.productionTip = false
Vue.prototype.$tui = tui
App.mpType = 'app'
Vue.prototype.$store = store;
const app = new Vue({
    ...App,
	store
})
app.$mount()
