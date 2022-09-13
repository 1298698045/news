import Vue from 'vue'
import App from './App'
import tui from './common/tui.js'
import store from './store/index.js';
import api from '@/utils/api.js';
import {https} from '@/utils/requestHttps.js';
Vue.prototype.$http = api;
Vue.config.productionTip = false
Vue.prototype.$tui = tui
App.mpType = 'app'
Vue.prototype.$store = store;
Vue.prototype.$httpWX = https;
const app = new Vue({
    ...App,
	store
})
app.$mount()
