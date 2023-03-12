<template>
	<view class="home-container">
		zhuye
	</view>
</template>

<script setup>
import {ref} from 'vue'
import {onReady} from '@dcloudio/uni-app'
const a = ref('123')
onReady(()=>{
	console.log("show");
})
</script>

<style scoped>
.home-container {
	display: flex;
	flex-direction: column;
}
</style>
