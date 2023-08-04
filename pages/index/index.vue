<template>
	<view class="index-contaioner">
		<view class="banner">
			<button type="primary" size="mini" v-for="item in templateList" :key="item.id"
				@click="makeTicket(item.id)">{{item.name}}</button>
		</view>
		<view class="tips" @click="showDialog">如有疑问请联系作者，wx: <text
				style="color:#e06c75;margin-left: 5px;">gkmdanran</text></view>
		<uni-popup ref="wxDialog" type="dialog">
			<image src="../../static/me.jpg" mode="widthFix" show-menu-by-longpress></image>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				templateList: [{
					id: 'TemplateB',
					name: '简约版',
				}, {
					id: 'TemplateA',
					name: '详细版',
				}, ]

			}
		},
		methods: {
			showDialog() {
				this.$refs.wxDialog.open()
			},
			makeTicket(id) {
				uni.navigateTo({
					url: `/subPages/ticket/ticket?id=${id}`
				});
			},
			copy(type) {
				if (type == 'zfb') {
					uni.setClipboardData({
						data: '816139694',
						success: function() {
							uni.showToast({
								title: '复制成功！请打开支付宝粘贴搜索后领取',
								icon: 'none'
							})
						}
					})
				} else if (type === 'ele') {
					uni.setClipboardData({
						data: '0復制此段 2:/＄dmmrORR＄~.👉饿了么App👈【快來領外賣紅包，最高20元，人人都有哦~】',
						success: function() {
							uni.showToast({
								title: '领取成功！请打开饿了么使用',
								icon: 'none'
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-contaioner {
		padding: 10px;

		.banner {
			display: flex;
			justify-content: space-between;
			margin- top: 40px;
			;
		}

		.btns {
			display: flex;
			justify-content: space-between;
		}

		.saoma {
			font-size: 14px;
			margin-top: 20px;
			text-align: center;
			color: red;
			margin-bottom: 10px;
		}

		.tips {
			height: 30px;
			line-height: 30px;
			margin-top: 80px;
			text-align: center;
			font-size: 12px;
			color: #ccc1b9;
		}

		image {
			width: 200px !important;
		}
	}
</style>
