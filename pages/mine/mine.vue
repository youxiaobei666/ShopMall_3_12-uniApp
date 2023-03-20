<template>
	<view class="cover" style="background-color: #fff;width: 100vw;height: 44vh;z-index: -1;position: absolute;top: 0%;left: 0;"></view>
	<!-- 用户信息 -->
	<view class="user-info">
		<view class="left">
			<view class="user-image"><image class="image" src="https://profile-avatar.csdnimg.cn/f8b65c8eebc443ef9c409c179a2d8e51_m0_66492535.jpg!2" mode=""></image></view>
			<view class="info">
				<view class="name">
					游小北
				</view>
				<view class="more-info">
					更新资料
				</view>
			</view>
		</view>
		<view class="text">
			<uni-icons type="gift-filled" color="red"></uni-icons>
				拼团返现金
		</view>
	</view>
	<!-- 卡片 -->
	<view class="card">
		<view class="name">
			省钱月卡
		</view>
		<view class="discount">
			<view class="btn">
				你还有120元券未领取
			</view>
			<uni-icons type="forward" color='orangered'></uni-icons>
		</view>
	</view>
	<!-- order -->
	<view class="order">
		<!-- header -->
		<view class="header">
			<view class="text">
				我的订单
			</view>
			<view class="more">
				<view class="all">
					查看全部
				</view>
				<uni-icons type="forward"></uni-icons>
			</view>
		</view>
		<!-- main -->
		<view class="main">
			<view class="item" v-for="(item,index) in mainList" :key="index">
				<uni-icons size="24" :type="item.type"></uni-icons>
				<view class="text">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
	<!-- 钱包 -->
	<view class="wallet">
		<view class="text">
			个人钱包
		</view>
		<view class="btn">
			<text class="yue">查看余额</text>
			<uni-icons type="forward"></uni-icons>
		</view>
	</view>
	<!-- other1 -->
	<view class="other1">
		<view class="item" v-for="(item,index) in other1List" :key="index">
			<view class="image-box">
				<image class="image" :src="item.icon" mode="aspectFit"></image>
			</view>
			<view class="text">
				{{item.text}}
			</view>
		</view>
	</view>
	<!-- show -->
	<view class="show-container">
		<!-- header -->
		<view class="header">
			<uni-icons type="fire-filled" color="red"></uni-icons>
			为您推荐
		</view>
		<!-- main -->
		<view class="show">
			<view class="item" v-for="(item,index) in showList" :key="index">
				<!-- img -->
				<view class="image-box">
					<image  class="image" :src="item.goods_small_logo" mode=""></image>
				</view>
				<!-- text -->
				<view class="text">
					<text class="price">¥{{item.goods_price}}</text>{{item.goods_name}}
				</view>
				
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
import { onShow } from '@dcloudio/uni-app'
import tabbarInfo from '../../utils/tabbar_info.js'

// 数据
const mainList = ref([
	{
		text: "待付款",
		type: 'wallet'
	},
	{
		text: "待分享",
		type: 'redo'
	},
	{
		text: '待发货',
		type: 'calendar'
	},
	{
		text: '待收货',
		type: 'paperplane'
	},
	{
		text: '评价',
		type: 'starhalf'
	}
])
const other1List = ref([
	{
		text: '优惠券',
		icon: '../../static/imags/discount.png'
	},
	{
		text: '店铺收藏',
		icon: '../../static/imags/like.png'
	},{
		text: '店铺关注',
		icon: '../../static/imags/subs.png'
	},{
		text: '浏览历史',
		icon: '../../static/imags/history.png'
	},{
		text: '退款售后',
		icon: '../../static/imags/after.png'
	},
])

const showList = JSON.parse(uni.getStorageSync('goodsList'))

/**
 * onShow
 */
onShow(() => {
	tabbarInfo() // 购物车图标
})
</script>

<style lang="scss">
.user-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	width: 100%;
	padding: 10px;
	height: 100px;
	box-sizing: border-box;
	.left {
		display: flex;
		align-items: center;
		.user-image {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			.image {
				width: 100%;
				height: 100%;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			margin-left: 10px;
			.name {
				font-size: 18px;
			}
			.more-info {
				font-size: 12px;
				color: #fff;
				background-color: #1296db;
				width: 80px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 10px;
			}
			
		}
	}
	.text {
		border: #8a8a8a solid 1px;
		height: 30px;
		width: 100px;
		background-color: #red;
		border-radius: 20px;
		display: flex;
		align-items: center;
		font-size: 14px;
		
		justify-content: center;
	} 
}

.card {
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	width: 95%;
	height: 60px;
	// border: #1296db solid 1px;
	box-sizing: border-box;
	margin: 10px;
	background-color: #ffc6dd;
	border-radius: 5px;
	box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
	padding-right: 5px;
	.name {
		margin-left: 10px;
		color: #fff;
	}
	.discount {
		display: flex;
		align-items: center;
		.btn {
			background-color: #fff;
			color: orangered;
			font-weight: 300;
			font-size: 12px;
			height: 30px;
			width: 120px;
			border-radius: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 5px;
			margin-right: 5px;
		}
	}
}

.order {
	height: 116px;
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 0 10px;
	.header {
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.text {
			
		}
		.more {
			display: flex;
			align-items: center;
			font-weight: 400;
			font-size: 12px;
			.all {
				position: relative;
				top: -1px;
			}
		}
	}
	.main {
		display: flex;
		margin-top: 10px;
		.item {
			width: 20%;
			height: 80px;
			text-align: center;
			font-size: 14px;
			.text {
				margin-top: 5px;
			}
		}
	}
}

.wallet {
	display: flex;
	width: 100%;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	background-color: #fff;
	height: 50px;
	.btn {
		.yue {
			font-size: 13px;
			position: relative;
			top: -1px;
		}
	}
}

.other1 {
	display: flex;
	margin-top: 10px;
	width: 100%;
	height: 100px;
	.item {
		width: 20%;
		height: 80px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 5px;
		.image-box {
			width: 35px;
			height: 40px;
			padding: 4px;
			.image {
				width: 100%;
				height: 100%;
			}
		}
		.text {
			font-size: 14px;
			margin-top: 2px;
		}
		
	}
}

.show-container {
	.header {
		text-align: center;
		width: 100%;
		background-color: #fff;
		height: 30px;
		line-height: 30px;
		color: #1296db;
	}
	.show {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 50%;
			height: 200px;
			padding: 5px;
			// margin: 5px;
			box-sizing: border-box;
			background-color: #fff;
			.image-box {
				width: 100%;
				height: 83%;
				.image {
					width: 100%;
					height: 100%;
				}
				
			}
			.text {
				// height: 30px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				.price {
					color: red;
					// font-size: 14px;
				}
			}
		}
	}
}
</style>
