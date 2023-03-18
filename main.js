// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入数据请求的第三方包 
import { $http } from '@escook/request-miniprogram'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app
	}
}
// #endif
