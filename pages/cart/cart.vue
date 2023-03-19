<template>
	<!-- 主要部分 -->
	<view class="cart-container">
		<!-- 标题 -->
		<div class="title">
			<uni-icons type="shop" size="28"></uni-icons>
			<text class="text">购物车</text>
		</div>
		<!-- 列表 -->
		<scroll-view scroll-y="true" style="height: 600px;">
			<view class="cart-item" v-for="(item,index) in goodsList" :key="index">
				<!-- check -->
				<view class="check">
					<!--  循环给每个单选框渲染状态 -->
					<checkbox :checked="item.goods_state === 2 ? true : false" color="#1296db" :id="item.goods_id" @click="oneChecked"></checkbox>
				</view>
				<!-- img -->
				<view class="logo">
					<image class="image" :src="item.goods_small_logo" mode="aspectFill"></image>
				</view>
				<!-- 文本和价格、加减 -->
				<view class="right-box">
					<view class="text">
						{{item.goods_name}}
					</view>
					<div class="down-box">
						<view class="price">
							¥ {{item.goods_price}}
						</view>
						<view class="number-box">
							<button size="mini" :id="item.goods_id" @click="dec">-</button>
							{{item.goods_count}}
							<button size="mini" :id="item.goods_id" @click="add">+</button>
						</view>
					</div>
				</view>
			</view>
		</scroll-view>
		<!-- 全选合计支付 -->
		<view class="footer">
			<view class="AllCheck">
				<label> 
					<checkbox :checked='controlAllChecked' color="#1296db" @click="checkAllHandle"/><text>全选</text>
				</label>
			</view>
			<view class="total">
				合计：¥ {{totalPrice}}
			</view>
			<view class="pay-box" @click="toPay">
				结算({{totalNumber}})
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {onShow} from '@dcloudio/uni-app'
import store from '../../store/index.js'
import tabbarInfo from '../../utils/tabbar_info.js'

// 支付
const toPay = ()=>{
	// 支付
}

// 获取是否  全选的状态
const controlAllChecked = computed(()=>{
	if (store.getters.checkAll === -1) { // 只要没有state 为 2的 
		return true // 全选
	} else {
		return false
	}
})

// 主动控制 全选按钮的变化,随之控制 单选
let flagAll = true
const checkAllHandle = ()=>{
	if(flagAll === true) {
		// 把所有的state 赋值为 1 ，1是不选
		store.commit("noOneCheck")
		flagAll = !flagAll 
	} else {
		// 把所有的 state = 2,2 是选
		store.commit('allCheck')
		flagAll = !flagAll 
	}
	
}


// 商品单选函数
let flag = true
let oldId = null
const oneChecked = (e)=>{
  // 点击后清空为0
  // 再点，把原来旧值的数字放回去
  const id = parseInt(e.currentTarget.id) // 获取点击的id
  
  // 判断是不是一样的 id 
  if(id === oldId) {
	  // 一样，正常，
	  // 获取index
	  const index = store.state.cart.goodsList.findIndex(item=>item.goods_id === id)
	  store.commit('saveId',id) // id 上传 store
	  const oldVal = JSON.parse(uni.getStorageSync('goodsList'))[index].goods_count // 转为数组
	  if(flag) {
	  	   store.commit('clearCount',e.currentTarget.id) // 第一次点
	  	   flag= !flag
	  } else {
	  	 store.commit('rebackCount',oldVal)
	  	 flag= !flag
	  }
  }else {
	  flag = true
	  // 不一样，重置flag 为 true
	  const index = store.state.cart.goodsList.findIndex(item=>item.goods_id === id)
	  store.commit('saveId',id) // id 上传 store
	  const oldVal = JSON.parse(uni.getStorageSync('goodsList'))[index].goods_count // 转为数组
	  if(flag) {
	  	   store.commit('clearCount',e.currentTarget.id) // 第一次点
	  	   flag= !flag
	  } else {
	  	 store.commit('rebackCount',oldVal)
	  	 flag= !flag
	  }
  }
  
  
  oldId = id // 保存这次的id ,两次不一样重置 flag 为 true
}


// 减方法
const dec = (e)=>{
	const id = parseInt(e.currentTarget.id)
	const index = goodsList.value.findIndex(item=>item.goods_id === id)
	const countIndex = goodsList.value.findIndex(()=>goodsList.value[index].goods_count === 0) // 此id项不为零就是负一
	if(countIndex === -1) { // 不为零才能减少
		store.commit("decGoods",e.currentTarget.id)
	} else {
		return
	}
}
// 加
const add = (e)=>{
	store.commit("addGoods",e.currentTarget.id)
}

// 总数
const totalNumber = computed(()=>{
	return store.getters.totalCount
})
// 总价
const totalPrice = computed(()=>{
	return store.getters.totalPrice
})

// 获取购物车商品列表
const goodsList = computed(()=>{
	tabbarInfo()// 购物车图标,只要商品🈶️变化就更改tabar info
	return store.state.cart.goodsList
	
})

/**
 * onShow
 */
onShow(()=>{
	tabbarInfo()// 购物车图标
})
</script>

<style lang="scss">
.cart-container {
	width: 100%;
	height: auto;
	// border: red solid 2px;
	box-sizing: border-box;
	.title {
		display: flex;
		// justify-content: center;
		align-items: center;
		height: 40px;
		position: sticky;
		top: 0;
		z-index: 1024;
		background-color: #f5f5f5;
		width: 100%;
		.text {
			margin-left: 10px;
		}
	}
	.cart-item {
		width: 100%;
		height: 120px;
		// border: blue solid 1px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: #8a8a8a solid 1px;
		.radio {
			margin-left: 5px;
		}
		.logo{
			width: 100px;
			height: 100px;
			box-sizing: border-box;
			padding: 5px;
			.image {
				width: 100%;
				height: 100%;
			}
		}
		.right-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			// border: green solid 2px;
			height: 100%;
			padding: 5px;
			box-sizing: border-box;
			.text {
				font-size: 14px;
			}
			.down-box {
				display: flex;
				justify-content: space-between;
				.price {
					color: red;
					font-size: 20px;
				}
				.number-box {
					display: flex;
					font-size: 20px;
				}
			}
		}
	}
	.footer {
		// border: yellow solid 2px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		position: sticky;
		width: 100%;
		bottom: 0;
		background-color: #f5f5f5;
		.AllCheck {
			font-size: 14px;
			margin-left: 5px;
		}
		.total {
			color: red;
		}
		.pay-box {
			background-color: #1296db;
			height: 100%;
			width: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
	}
}

</style>
