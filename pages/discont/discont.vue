<template>
	<view>
		优惠券
	</view>
</template>

<script setup>
	import { onShow } from '@dcloudio/uni-app'
	import tabbarInfo from '../../utils/tabbar_info.js'
	/**
	 * onShow
	 */
	onShow(()=>{
		tabbarInfo()// 购物车图标
	})
</script>

<style lang="scss">

</style>
