import Vue from 'vue';
import Vuex from 'vuex';
import circle from './modules/circle.js';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
		circle
	}
})
export default store;