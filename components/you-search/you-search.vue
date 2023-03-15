<template>
	<view class="big-box">
		<view class="search-container" @click="toSearchPage()">
			<uni-icons type="search" size="18px"></uni-icons> 
			<view class="text">
				搜索
			</view>
		</view>
	</view>
</template>

<script setup>
// 	去搜索页的方法
const toSearchPage = ()=>{
	uni.navigateTo({
		url:'/subPackage/search-page/search-page'
	})
}
</script>

<style lang="scss">
	.big-box {
		width: 100%;
		height: 50px;
		// border: red solid 2px;
		position: sticky;
		top: 0;
		z-index: 1024;
		background-color: #1296db;
		display: flex;
		justify-content: center;
		align-items: center;
	}
.search-container {
	background-color: #f5f5f5;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 95%;
	border: #1296db solid 1px;
	height: 40px;
	border-radius: 20px;
	// margin: 10px;
	box-sizing: border-box;
	.text {
		margin-left: 5px;
		font-weight: 400;
		color: #333;
		position: relative;
		top: -1px;
	}
}
</style>