<template>
	<!-- 轮播图区域 -->
	<swiper class="swiper-container" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item class="swiper-item" v-for="(item, index) in goods_info.pics" :key="index">
			<image class="image" :src="item.pics_big" @click="preview(index)" mode="aspectFill"></image>
		</swiper-item>
	</swiper>
	<!-- 介绍区域 -->
	<view class="info-container">
		<view class="price">¥{{ goods_info.goods_price }}</view>
		<view class="text">
			<view class="left">{{ goods_info.goods_name }}</view>
			<view class="icon">
				<uni-icons type="star" size="24"></uni-icons>
				<view>收藏</view>
			</view>
		</view>
		<view class="transi-price">运费：免运费</view>
	</view>
	<!-- 详情区域 -->
	<rich-text :nodes="goods_info.goods_introduce"></rich-text>
	<!-- 购物车选购底部 -->
	<view class="footer"><uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="leftAction" @buttonClick="rightAction" /></view>
</template>

<script setup>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import reqFail from '../../utils/requestFail'
import store from '../../store/index.js'

// 定义id
const goods_id = ref(null)
// 定义 数据
const goods_info = ref(null)

// 定义获取id 的方法
const getGoodId = () => {
	// 获取页面参数
	const instans = getCurrentPages() // 实例
	goods_id.value = instans[instans.length - 1].options.goods_id
}
// 定义请求数据的方法
const getDetail = () => {
	uni.request({
		url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=' + goods_id.value,
		method: 'GET',
		success(res) {
			goods_info.value = res.data.message
		},
		fail() {
			reqFail()
		}
	})
}

// 定义预览图片方法
const preview = i => {
	uni.previewImage({
		current: i,
		urls: goods_info.value.pics.map(x => {
			return x.pics_big
		})
	})
}

/**
 * 底部的购物导航
 */
const options = ref([
	// 左边的info
	{
		icon: 'shop',
		text: '店铺'
	},
	{
		icon: 'cart',
		text: '购物车',
		info: 0
	}
])
const customButtonGroup = ref([
	// 右边的info
	{
		text: '加入购物车',
		backgroundColor: '#ffa200',
		color: '#fff'
	},
	{
		text: '立即购买',
		backgroundColor: '#ff0000',
		color: '#fff'
	}
])
const leftAction = e => {
	// 左边的点击事件
	if (e.content.text === '店铺') {
		// 去商品所在的店铺
	} else {
		// 跳转购物车
		uni.switchTab({
			url: '/pages/cart/cart'
		})
	}
}
const rightAction = e => {
	if (e.content.text === '加入购物车') {
		// 获取商品数据
		let goods_id = goods_info.value.goods_id
		let goods_name = goods_info.value.goods_name
		let goods_price = goods_info.value.goods_price
		let goods_count = 1 // 每次添加都是一个
		let goods_small_logo = goods_info.value.goods_small_logo
		let goods_state = goods_info.value.goods_state
		// 组成对象
		let goodsListItem = {
			goods_id,
			goods_name,
			goods_price,
			goods_count,
			goods_small_logo,
			goods_state
		}
		// 发送给 store
		store.commit('pushList', goodsListItem)
	} else {
		// 立即购买
	}
}

// 监听并且获取info总数
const total = computed(() => {
	return store.getters.totalCount
})
watch(
	total,
	newInfo => {
		// 监听到变化，给info赋值
		options.value[1].info = newInfo	
	},
	{ immediate: true }
)

/**
 * onShow
 */
onShow(() => {
	getGoodId() // 获取 id
	getDetail() // 获取 详情
})
</script>

<style lang="scss">
.swiper-container {
	width: 100%;
	height: 400px;
	box-sizing: border-box;
	.swiper-item {
		.image {
			width: 100%;
			height: 100%;
		}
	}
}
.info-container {
	width: 100vw;
	padding: 5px;
	// height: 150px;
	// border: red solid 1px;
	.price {
		color: red;
		font-size: 24px;
	}
	.text {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;

		.icon {
			margin-left: 5px;
			width: 100px;
			font-size: 14px;
			text-align: center;
		}
	}
	.transi-price {
		font-size: 14px;
		color: rgb(65, 65, 65);
	}
}
.footer {
	height: 50px;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
}
</style>
