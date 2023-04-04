<template>
	<view class="index-contaioner">
		<button type="primary" @click="makeTicket">制 作</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			makeTicket() {
				uni.navigateTo({
					url: '/pages/ticket/ticket'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-contaioner {
		padding: 10px;

		button {
			margin-top: 80px
		}
	}
</style>
