export default {
	namespace: true,
	state: {
		goodsList: JSON.parse(uni.getStorageSync('goodsList') || '[]')
	},
	mutations: {
		// 添加
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
		// 添加
		addGoods(state, payload) {
			payload = parseInt(payload)
			const id = state.goodsList.findIndex(item => item.goods_id === payload) // 成功获取id
			state.goodsList[id].goods_count++
		},
		// 减少
		decGoods(state, payload) {
			payload = parseInt(payload)
			const id = state.goodsList.findIndex(item => item.goods_id === payload) // 成功获取id
			state.goodsList[id].goods_count--
		}
	},
	getters: {
		// 总数
		totalCount(state) {
			let totalCount = 0
			state.goodsList.forEach(item => totalCount += item.goods_count)
			return totalCount
		},
		// 总价
		totalPrice(state) {
			let totalPrice = 0
			state.goodsList.forEach(item => totalPrice += item.goods_count * item.goods_price)
			return totalPrice
		}
	}
}
