<template>
	<view class="picture">
		<div class="wrap" v-if="ticketUrl">
			<image :src="ticketUrl" mode="widthFix" show-menu-by-longpress></image>
		</div>
		<div class="tips">长按票根，保存图片至本地相册</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ticketUrl: ''
			}
		},
		methods: {
		},
		onLoad() {
			this.ticketUrl = uni.getStorageSync('ticket_url') || '';
		}
	}
</script>

<style lang="less" scoped>
	.picture {
		.wrap {
			width: 100%;
			display: flex;
			margin: 20px auto;
			justify-content: center;

			image {
				width: 300px !important;
			}
		}

		.tips {
			padding-bottom: 40px;
			text-align: center;
			color: #f6cb75;
		}
	}
</style>
