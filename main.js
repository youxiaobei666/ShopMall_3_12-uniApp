// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入数据请求的第三方包 
import { $http } from '@escook/request-miniprogram'


// 配置根路径	
$http.baseUrl = 'https://www.uinav.com'
// 请求之前 todo
$http.beforeRequest = function(options) {
	uni.showLoading({ // 开启loading
		title: '正在努力加载...'
	})
}
// 请求之后 todo
$http.afterRequest = function(options) {
	uni.hideLoading() // 关闭loading
}

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
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
