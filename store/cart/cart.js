export default {
	namespace: true,
	state: {
		goodsList: JSON.parse(uni.getStorageSync('goodsList') || '[]'),
		nowId: 0
	},
	mutations: {
		// 添加一个商品
		pushList(state, payload) {
			// 获取id 
			const id = payload.goods_id
			// 判断商品id是否存在，存在则 goods_count ++,不存在 为 undefined
			let same_item = state.goodsList.find((item) => {
				return id === item.goods_id
			})
			// 存在，数量 +1
			if (same_item) {
				same_item.goods_count++
			} else { // 不存在，push
				state.goodsList.push(payload) // push +1
			}
			// 本地存储购物车
			uni.setStorageSync('goodsList', JSON.stringify(state.goodsList))
		},
		saveId(state, id) { // 每次点击 把goods_id 暂存
			state.nowId = id
		},
		// 添加数量
		addGoods(state, payload) {
			payload = parseInt(payload)
			const index = state.goodsList.findIndex(item => item.goods_id === payload) // 成功获取 index 而不是goods_id
			state.goodsList[index].goods_count++
		},
		// 减少数量
		decGoods(state, payload) {
			payload = parseInt(payload)
			const index = state.goodsList.findIndex(item => item.goods_id === payload) // 成功获取 index 而不是goods_id
			state.goodsList[index].goods_count--
		},
		// 清空数量
		clearCount(state, payload) {
			payload = parseInt(payload)
			const index = state.goodsList.findIndex(item => item.goods_id === payload) // 成功获取 index 而不是goods_id
			state.goodsList[index].goods_count = 0 // 清空数量
			// 不选，把state -> 1
			state.goodsList[index].goods_state = 1
		},
		// 复原数量
		rebackCount(state, payload) {
			console.log(typeof(state.nowId));
			const index = state.goodsList.findIndex(item => item.goods_id === state.nowId) // 成功获取 index 而不是goods_id
			state.goodsList[index].goods_count = payload // 复原数量
			// 选，把state -> 2
			state.goodsList[index].goods_state = 2
		},
		// 单选都不选
		noOneCheck(state) {
			state.goodsList.forEach((item)=>{
				item.goods_state = 1
			})
		},
		allCheck(state) {
			state.goodsList.forEach((item)=>{
				item.goods_state = 2
			})
		}
	},
	getters: {
		// 总数
		totalCount(state) {
			let totalCount = 0
			// 先过滤state 为 1
			const filtedArr = state.goodsList.filter((item)=>{
				return item.goods_state === 2
			})
			// 算总数
			filtedArr.forEach(item => totalCount += item.goods_count)
			return totalCount
		},
		// 总价
		totalPrice(state) {
			let totalPrice = 0
			// 先过滤state 为 1
			const filtedArr = state.goodsList.filter((item)=>{
				return item.goods_state === 2
			})
			filtedArr.forEach((item )=> totalPrice += item.goods_count * item.goods_price)
			return totalPrice
		},
		checkAll(state) {
			const haveOne = state.goodsList.findIndex(item=>item.goods_state === 1) // 1 代表没选择
			return haveOne // -1 代表没找到->代表搜选中了
		}
	}
}
