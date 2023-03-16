<template>
	<!-- 搜索框 -->
	<you-search></you-search>
	<!-- 分类 -->
	<view class="scroll-container">
		<!-- 左边部分 -->
		<scroll-view class="scroll-left" scroll-y="true" scroll :style="{ height: windowHeight + 'px' }">
			<template v-for="(item, index) in cateList" :key="index">
				<view :class="['left-item', index === defaultActive ? 'active' : '']" @click="titleTap(index)">{{ item.cat_name }}</view>
			</template>
		</scroll-view>
		<!-- 右边部分 -->
		<scroll-view class="scroll-right" scroll-y="true" scroll :style="{ height: windowHeight + 'px', width: windowWidth + 'px' }">
			<view class="right-item" v-for="(item2, index2) in cateListTwo" :key="index2">
				<view class="right-item-text">-- {{ item2.cat_name }} --</view>
				<!-- 图片部分 -->
				<view class="right-container">
					<view class="right-item-image-box" v-for="(item3, index3) in item2.children" :key="index3">
						<view class="text">{{ item3.cat_name }}</view>
						<image class="image" :src="item3.cat_icon" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import reqFail from '../../utils/requestFail.js'

// 窗口高度
const windowHeight = ref(670)
const windowWidth = ref()
// 全部分类的数组
const cateList = ref([])
// 二级分类
const cateListTwo = ref([])
// 默认选中的标题索引
const defaultActive = ref(0)

// 请求全部数据的方法
const getCateList = () => {
	uni.request({
		url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
		method: 'GET',
		success(res) {
			console.log(res.data.message)
			// 全部数据
			cateList.value = res.data.message
			// 给二级分类赋值
			cateListTwo.value = res.data.message[0].children
		},
		fail() {
			reqFail()
		}
	})
}
// 标题点击： 修改选中的索引,并且更换右侧列表数据
const titleTap = index => {
	defaultActive.value = index
	console.log()
	cateListTwo.value = cateList.value[index].children
	// 尝试获取下一个元素
	console.log(uni.createSelectorQuery('active'));
	
}

/**
 * onShow
 */
onShow(() => {
	// 样式：获取窗口高度
	windowHeight.value = uni.getSystemInfoSync().windowHeight
	windowWidth.value = uni.getSystemInfoSync().windowWidth
	console.log(windowHeight.value)
	// rq 请求：所有列表数据
	getCateList()
})
</script>

<style lang="scss">
.scroll-container {
	display: flex;
	background-color: #fff;
	.scroll-left {
		box-sizing: border-box;
		// border: #8a8a8a solid 2px;
		color: #303030;
		font-weight: 300;
		font-size: 14px;
		width: 100px;
	
		.left-item {
			box-sizing: border-box;
			height: 50px;
			width: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-left: rgba(1, 1, 1, 0) solid 4px; // 透明边框站位仿制文字移动
		    background-color: #f5f5f5;
		}
	}
	.scroll-right {
		// border: red 2px solid;
		text-align: center;
		background-color: #fff;
		.right-item {
			font-weight: 400;
			font-size: 15px;
			// border-bottom: #1296db solid 1px;
			width: 100%;
			// height: 400px;
			margin: 10px 0;
			.right-item-text {
				// border: red solid 2px;
				box-sizing: border-box;
				width: 100%;
				text-align: center;
				margin-bottom: 10px;
			}
			.right-container {
				display: flex;
				flex-wrap: wrap;
				.right-item-image-box {
					width: 33.3%;
					height: 80px;
					.text {
						font-size: 12px;
						font-weight: 300;
						margin-bottom: 10px;
					}
					.image {
						width: 50px;
						height: 50px;
					}
				}
			}
		}
	}
}
.active {
	border-left: #1296db solid 4px !important;
	background-color: #fff !important;
	color: #1296db;
	transition: .2s ease;
	
}

.active + view {
	// background-color: red;
	border-radius: 0 20px 0 0;
	overflow: hidden;
	// background-color: #1296db;
	transition: .2s ease;
}

</style>
