<template>
	<view class="ticket">
		<TemplateA ref="templateA"></TemplateA>
		<view class="btn-area">
			<button type="primary" @click="createImage">生成票根</button>
			<button @click="showDrawer">编辑票根</button>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="取消" confirmText="同意" title="告知" content="此小程序仅供娱乐,不可商用!"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
			showDrawer() {
				this.$refs['templateA'].showDrawer()
			},
			createImage() {
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				uni.setStorage({
					key: 'ticket_url',
					data: this.$refs['templateA'].ticketUrl,
					success: function() {
						uni.navigateTo({
							url: '/pages/picture/picture'
						});
					}
				});
				
			},


		},

	}
</script>



<style lang="less" scoped>
	.ticket {
		.btn-area {
			display: flex;
			justify-content: space-between;
			padding: 60rpx 0;

			button {
				width: 100px;
				height: 36px;
				line-height: 36px;
				font-size: 14px;
			}
		}
	}
</style>
