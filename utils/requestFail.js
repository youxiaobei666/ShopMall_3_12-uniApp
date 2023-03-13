/**
 * 请求失败了的模块
 */ 
const reqFail = function(){
	uni.showToast({
		title: 'ops! 请求失败...',
		duration: 2000,
		icon:"none"
	})
}

export default reqFail