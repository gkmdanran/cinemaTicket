<template>
	<view class="picture">
		<div class="wrap" v-if="ticketUrl">
			<image :src="ticketUrl" mode="widthFix" show-menu-by-longpress></image>
		</div>
		<div class="tips">长按票根，保存图片至本地相册</div>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="残忍拒绝" confirmText="狠狠支持" title="一个小请求" content="z hi怤保搜索 816201194 领取大红包(小程序创作不易,动动小手支持作者一下吧~)"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
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
			dialogConfirm(){
				uni.setClipboardData({
				    data: '复制 816139694 da.开z hi怤保去搜索， ho ng.笣哪里来， ho ng.笣飞来', 
				    success: function () {
						uni.showToast({
							title:'复制成功，记得搜索哟',
							icon:'none'
						})
				    }
				})
			}
		},
		onLoad() {
			this.$refs.alertDialog.open()
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
