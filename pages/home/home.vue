<template>
	<!-- 轮播图 -->
	<swiper
		class="swiper-container"
		:indicator-dots="true"
		indicator-active-color="#de4f6b"
		indicator-color="#1296db"
		:autoplay="true"
		:interval="3000"
		:duration="1000"
		circular="true"
	>
		<swiper-item v-for="(item, index) in swiperList" :key="index">
			<navigator class="swiper-item" :url="'/subPackage/good_detail/good_detail' + item.id">
				<image class="item-img" :src="item.image_src" mode="aspectFill"></image>
			</navigator>
		</swiper-item>
	</swiper>
	<!-- 导航条 -->
	<view class="nav-list">
		<view class="nav-item" v-for="(item, index) in navList" :key="index">
			<view class="nav-img"><image class="nav-img-inner" @click="toCatePage(item.name)" :src="item.image_src"  mode="aspectFit"></image></view>
		</view>
	</view>
    
	<!-- 楼层 -->
	<view class="floor-container" v-for="(item,index) in floorList" :key="index" @click="toCatePage()">
		<view class="floor-item">
			<!-- header -->
			<view class="floor-header">
				<image class="header-image" :src="item.floor_title.image_src" mode="aspectFit"></image>
			</view>
			<!-- main -->
			<view class="floor-main">
				<view class="main-left">
					<image class="left-img" :src="item.product_list[0].image_src" mode="aspectFill"></image>
				</view>
				<view class="main-right" >
					<!-- 避免在同一个标签上同时使用 v-if > v-for -->
					<template v-for="(item2,index2) in item.product_list" :key="index2">
						<view class="right-img-box" v-if="index2>0">
							<image class="right-img" :src="item2.image_src" mode="aspectFill" ></image>
						</view>
					</template>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
import reqFail from '../../utils/requestFail.js'
import { computed, getCurrentInstance, onBeforeMount, ref } from 'vue'
import { onShow, onReady } from '@dcloudio/uni-app'

/**
 * 以下定义数据
 */
// 轮播图
const swiperList = ref([
	{
		id: 129,
		image_src: 'https://pica.zhimg.com/80/v2-4ce78bb070174b799992917633ca3e94_r.jpg'
	},
	{
		id: 395,
		image_src: 'https://pic4.zhimg.com/80/v2-891c69cd5e297d1438487d271c09f17d_r.jpg'
	},
	{
		id: 38,
		image_src: 'https://pic1.zhimg.com/80/v2-d2206c18aa10eba9e4b1ff7e8c340ef6_r.jpg'
	},
	{
		id: 4,
		image_src: 'https://pic3.zhimg.com/80/v2-68bfa4bf8c10c27e16229f8862d4b824_r.jpg'
	}
])
// 导航列表
const navList = ref()
// 楼层列表
const floorList = ref()

/**
 * 以下定义方法
 */
// 跳转'分类'的方法 swith 判断
const toCatePage = (payload)=>{
	if(payload) {
		switch (payload) {
			case '分类': uni.switchTab({
				url:'/pages/cate/cate'
			}); break;
		}
	} else {
		uni.switchTab({
			url:'/pages/cate/cate'
		})
	}
}

// 请求导航列表的数据
const getNavList = ()=>{
	uni.request({
		url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
		method: 'GET',
		success(res) {
			navList.value = res.data.message
			console.log(navList.value)
		},
		fail() {
			reqFail() // 请求失败模块
		}
	})
}
// 楼层的请求方法
const getFloorList = ()=>{
	uni.request({
		url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
		method:'GET',
		success(res) {
			console.log(res.data.message);
			floorList.value = res.data.message
			console.log(floorList.value);
		},
		fail() {
			reqFail()
		}
	})
}

/**
 * Show生命周期
 */
onShow(() => {
	/**
	 * 请求主页数据
	 */
    getNavList() // nav
	getFloorList() // floor
})
</script>

<style lang="scss">
.floor-container {
	margin: 10px;
	// width: 95%;
	height: 230px;
	box-sizing: border-box;
	.floor-item {
		// border: #1296db solid 1px;
		border-radius: 10px;
		overflow: hidden;
		height: 230px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		.floor-header {
			// border-bottom: #8a8a8a solid 1px;
			height: 30px;
			width: 100%;
			.header-image {
				width: 100%;
				height: 100%;
			}
		}
		.floor-main {
			// border: green solid 2px;
			height: 230px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			.main-left {
				// border: blue solid 2px;
				// flex: 1;
				height: 200px;
				width: 310px;
				box-sizing: border-box;
				padding: 5px;
				.left-img {
					width: 100%;
					height: 100%;
				}
			}
			.main-right {
				// border: goldenrod solid 2px;
				// flex: 2;
				height: 100%;
				width: 600px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				
				.right-img-box {
					// border: green solid 3px;
					// flex: 1;
					width: 120px;
					height: 100px;
					padding: 5px;
					box-sizing: border-box;
					.right-img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
}	
	
.nav-list {
	width: 95vw;
	height: 100px;
	margin: 10px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-around;
	.nav-item {
		flex: 1;
		width: 25%;
		height: 100%;
		// border: red solid 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		.nav-img {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.nav-img-inner {
				width: 70%;
				height: 70%;
			}
		}
	}
}

.swiper-container {
	margin: 10px;
	border-radius: 10px;
	overflow: hidden;
	height: 150px;
	.swiper-item {
		// border: red solid 2px;
		height: 150px;
		.item-img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
