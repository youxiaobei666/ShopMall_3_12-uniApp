<template>
	<!-- 头部滚动 -->
	<scroll-view scroll-x="true" show-scrollbar="false" class="header">
		<view enable-flex="true" v-for="(item, index) in headerList" :key="index" :id="index" @click="tapHeader" :class="['header-item', item.active === 'yes' ? 'active' : '']">
			{{ item.name }}
		</view>
	</scroll-view>
	<!-- 卡片，领券 -->
	<uni-card class="card" title="领更多好券" extra="前往领券" :thumbnail="iconUrl">
		<text class="text">领取更多好券，请前往领券中心</text>
		<uni-icons class="icon1" color="#1296db" type="forward"></uni-icons>
	</uni-card>
	<!-- card-item -->
	<view class="card-item" v-for="(item,index) in dataList" :key="index">
		<!-- newGET -->
		<view class="image">
			<image class="icon" src="../../static/imags/getNew.png" mode=""></image>
		</view>
		<!-- 左 -->
		<view class="left">
			<text>¥</text>
			<text class="price">{{item.price}}</text>
		</view>
		<!-- 中 -->
		<view class="center">
			{{item.text}}
			<view class="time">
				<text style="font-size: 14px;">仅剩 </text>
				<text style="font-size: 16px; font-weight: 800;">{{item.time}}</text>
			</view>
		</view>
		<!-- 右 -->
		<view class="right">
			<view class="btn">
				立即使用
			</view>
		</view>
	</view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import tabbarInfo from '../../utils/tabbar_info.js'
// 定义数据：header
const headerList = ref([
	{
		name: '全部',
		active: 'yes'
	},
	{
		name: '即将过期',
		active: 'no'
	},
	{
		name: '平台券',
		active: 'no'
	},
	{
		name: '店铺券',
		active: 'no'
	},
	{
		name: '专属券',
		active: 'no'
	}
])

const dataList = ref([
	{
		price: 19,
		text: '每日拼团商品的专属优惠券，请在当日使用',
		time: '12:22:00'
	},{
		price: 46,
		text: '仅限电子商品和数码商品使用，请注意',
		time: '09:20:10'
	},{
		price: '5',
		text: '仅限生鲜和果蔬商品使用，请注意',
		time: '1:33:50'
	},{
		price: 10,
		text: '通用优惠券，可在任何时间使用',
		time: '不限'
	},{
		price: 30,
		text: '新用户专属无门槛优惠券',
		time: '08:28:17'
	},
	
])
// 头部点击事件

// 头部点击
const tapHeader = e => {
	const index = e.target.id // 获取对应索引
	headerList.value.forEach(item => (item.active = 'no')) // 清空
	headerList.value[index].active = 'yes' // 给点击的加active
}

// 优惠券icon
const iconUrl = 'https://pic4.zhimg.com/80/v2-cae0590fac497c6bd364065a0d3877f5_qhd.jpg'

/**
 * onShow
 */
onShow(() => {
	tabbarInfo() // 购物车图标
})
</script>

<style lang="scss">
.header {
	position: sticky;
	top: 0;
	z-index: 10025;
	width: 100%;
	height: 50px;
	// border: red solid 2px;
	box-sizing: border-box;
	white-space: nowrap; // 横向滚动必须添加这个属性
	background-color: #fff;

	.header-item {
		// padding: 15px;
		text-align: center;
		box-sizing: border-box;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		display: inline-block;
		height: 100%;
		width: 80px;
		line-height: 50px;
		margin: 0 10px;
	}
	.active {
		// background-color: #1296db;
		border-bottom: #1296db solid 2px;
	}
}
.card {
	.text {
		color: #1296db;
	}
	.icon1 {
		position: absolute;
		right: 14px;
	}
}
.card-item {
	display: flex;
	position: relative;
	justify-content: space-around;
	align-items: center;
	width: 92%;
	height: 120px;
	// border: #1296db solid 1px;
	box-sizing: border-box;
	margin: 15px;
	background-color: #ffffff;
	border-radius: 5px;
	box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
	.image {
		position: absolute;
		left: 0;
		top: 0;
		width: 50px;
		height: 50px;
		z-index: 1024;
		.icon {
			width: 100%;
			height: 100%;
			z-index: 1024;
		}
	}
	.left {
		color: #f1bf42;
		font-size: 30px;
		height: 100px;
		width: 110px;
		line-height: 100px;
		padding-left: 10px;
		.uni-card__content {
			height: 100px;
		}
		.price {
			font-size: 40px;
			font-weight: 800;
			padding-left: 5px;
		}
	}
	.center {
		// border: #1296db solid 2px;
		width: 200px;
		height: 60%;
		display: flex;
		font-size: 14px;
		flex-direction: column;
		justify-content: space-between;
		.time {
			color: red;
		}
	}
	.right {
		// border: #1296db solid 2px;
		width: 100px;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 10px;
		.btn {
			background-color: #1296db;
			width: 80px;
			height: 34px;
			border-radius: 5px;
			display: flex;
			justify-content:center;
			align-items: center;
			color: #fff;
			
		}
	}
}
</style>
