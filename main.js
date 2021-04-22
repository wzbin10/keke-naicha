import Vue from 'vue'
import App from './App'

import store from './store'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
Vue.use(ElementUI);

const app = new Vue({
	store,
    ...App
})
app.$mount()
