import store from '../store/index.js'
import {computed} from 'vue'

const tabberInfo = ()=>{
	// 获取total 
	const total = computed(()=>{
		return store.getters.totalCount
	})
	uni.setTabBarBadge({
		index: 3,
		text: total.value + ""
	})
}

export default tabberInfo