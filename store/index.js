import { createStore } from 'vuex'
import cart from './cart/cart.js'

const store = createStore({
	state: {
	},
	modules: {
		cart
	}
})

export default store 