<template>
	<!-- 搜索框 -->
	<view>
		<view class="search-box">
			<uni-icons type="search" size="20"></uni-icons>
			<input class="input" type="text" @input="input" focus="true" />
		</view>
	</view>
	<!-- 历史记录 -->
	<template v-if="searchList.length === 0">
		<view class="history">
			<view class="header">
				<text class="text">搜索历史</text>
				<uni-icons @click="dropHistory" type="trash" size="20"></uni-icons>
			</view>
			<view class="tags-box">
				<template v-for="(item, index) in historyList" :key="index">
					<uni-tag class="tag" :text="item" type="primary"></uni-tag>
				</template>
				<view class="noStory" v-if="historyList.length === 0">还没搜索记录哦</view>
			</view>
		</view>
	</template>
	<!-- 搜索结果 -->
	<view class="res-box" v-if="searchList.length > 0">
		<view class="res-item" v-for="(item, index) in searchList" :key="index">
			<text class="text" @click="toDetailPage(item.goods_id)">{{ item.goods_name }}</text>
			<uni-icons type="forward"></uni-icons>
		</view>
	</view>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import {onShow} from '@dcloudio/uni-app'
import reqFail from '../../utils/requestFail.js'
// 关键词
const keyWord = ref('')
// 请求的数据
const searchList = ref([])
// 搜素历史
// const distoryList = ref(['iphone14', '苹果', 'macBook'])
const historyList = ref([])

/**
 * function
 */
// 输入事件
var timerId = 0 // 计时器id
const input = e => {
	console.log(timerId);
	clearTimeout(timerId) // 每次输入重新计时
	if (e.detail.value === '') {
		searchList.value = []
	} else {
		timerId = setTimeout(() => {
			keyWord.value = e.detail.value // 0.5秒没有改变赋值给关键词
			getSearchList() // 发起请求
		}, 500);
		// 调用添加历史记录的函数
		addHistory(e.detail.value)
		// 本地存储
		uni.setStorageSync('historyList',JSON.stringify(historyList.value))
	}
}

// 请求数据
const getSearchList = () => {
	uni.request({
		url: 'https://www.uinav.com/api/public/v1/goods/search?query=' + keyWord.value,
		method: 'GET',
		success(res) {
			searchList.value = res.data.message.goods
		},
		fail() {
			reqFail()
		}
	})
}
// 跳转详情页的方法
const toDetailPage = params => {
	uni.navigateTo({
		// 跳转并传参数
		url: '/subPackage/good_detail/good_detail?goods_id=' + params
	})
}
// 删除事件
const dropHistory = () => {
	uni.showModal({
		title: '确定要删除吗',
		success(res) {
			if (res.confirm) {
				distoryList.value = []
			}
		}
	})
}
// 添加历史的方法
const addHistory = (newHis)=>{
	historyList.value.push(newHis) // 添加历史记录
	const set = new Set(historyList.value)
	historyList.value = Array.from(set)
	historyList.value.reverse() // 让最后输入的显示到最前面
}

/**
 * onShow
 */
onShow(()=>{
	historyList.value = JSON.parse(uni.getStorageSync('storyList') || '[]')
})
</script>

<style lang="scss">
.search-box {
	width: 100%;
	height: 50px;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 1024;
	background-color: #1296db;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 10px;
	box-sizing: border-box;
	.uni-icons {
		// position: absolute;
		position: relative;
		left: 10px;
		z-index: 1024;
	}
	.input {
		position: absolute;
		background-color: #fff;
		// border: red solid 2px;
		height: 40px;
		border-radius: 20px;
		box-sizing: border-box;
		width: 95%;
		// text-indent: 6em;
		padding-left: 34px;
		line-height: 40px;
	}
}

.history {
	border-bottom: #656565 solid 1px;
	.header {
		border-bottom: #656565 solid 1px;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		color: #303030;
		box-sizing: border-box;
		.text {
			font-size: 15px;
		}
	}
	.tags-box {
		display: flex;
		flex-wrap: wrap;
		padding: 5px 0px;

		.tag {
			margin: 8px 10px;
		}
		.noStory {
			margin: 20px 10px;
			color: #656565;
		}
	}
}

.res-box {
	.res-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		border-bottom: #656565 solid 1px;
		padding: 0 5px;
		color: #303030;
		.text {
			// 文字不允许换行（单行文本）
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
		}
	}
}
</style>
