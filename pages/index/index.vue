<template>
	<view class="index-contaioner">
		<image class="banner-img" src="../../static/banner.jpg" mode="widthFix"></image>

		<view class="shop-btn-area">
			<view class="shop-btn" @click="copyUrl('xhs')">
				<image src="../../static/click.png"></image>
				<view class="split"></view>
				<view class="shop-name">小红书店铺</view>
			</view>
			<view class="shop-btn" @click="copyUrl('tb')">
				<image src="../../static/click.png"></image>
				<view class="split"></view>
				<view class="shop-name">淘宝店铺</view>
			</view>
		</view>
		<view class="btn-area">
			<view class="btn" v-for="item in templateList" :key="item.id" @click="makeTicket(item.id)">{{item.name}}
			</view>
		</view>
		<view class="words">
			2023年8月18日前下单，参与小红书或料音的“关注+3连”活动，享满10张赠2张优惠。
		</view>
		<view class="tips" @click="showDialog()">
			<text>如有疑问请联系作者，wx: </text>
			<text style="color:#e06c75;margin-left: 5px;">gkmdanran&nbsp;&nbsp;点击打赏作者~</text>
		</view>

		<uni-popup ref="wxDialog" type="dialog">
			<view style="background: #fff;text-align: center;">
				<view>长按二维码保存后，扫码打赏</view>
				<image src="../../static/skm.jpg" mode="widthFix" show-menu-by-longpress class="skm-img"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				words:'',
				templateList: [{
						id: 'TemplateB',
						name: '简约版',
					}, {
						id: 'TemplateA',
						name: '详细版',
					},
					{
						id: 'TemplateC',
						name: '截图版',
					},
				]

			}
		},
		methods: {
			copyUrl(type) {
				if (type === 'xhs') {
					uni.setClipboardData({
						data: 'https://www.xiaohongshu.com/vendor/642a85e7d485a10001abd530?naviHidden=yes&xhsshare=CopyLink&appuid=59d2439d20e88f35cbe72680&apptime=1691569280',
						success: function() {
							uni.showToast({
								title: '链接复制成功！请打开浏览器粘贴网址访问小红书店铺~',
								icon: 'none'
							})
						}
					})
				} else {
					uni.setClipboardData({
						data: '57！对到为出这心们时了天起信 https://m.tb.cn/h.5XRrfJQ  CZ0001 我分享给你了一个超赞的内容，快来看看吧',
						success: function() {
							uni.showToast({
								title: '复制链接成功！请打开淘宝访问店铺~',
								icon: 'none'
							})
						}
					})
				}
			},
			showDialog(type) {
				this.$refs.wxDialog.open()
			},
			makeTicket(id) {
				uni.navigateTo({
					url: `/subPages/ticket/ticket?id=${id}`
				});
			},
		},
	}
</script>

<style lang="less" scoped>
	.index-contaioner {
		background-color: #fff;
		position: relative;
		padding-top: 10px;

		.banner-img {
			width: 100vw !important;
		}

		.words {
			position: absolute;
			top: 1190rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 90rpx;
			font-size: 24rpx;
			text-align: center;
			color: #8b9091;
		}

		.shop-btn-area {
			box-sizing: border-box;
			width: 100%;
			position: absolute;
			top: 1130rpx;
			padding: 0 110rpx;
			display: flex;
			justify-content: space-between;

			.shop-btn {
				display: flex;
				align-items: center;
				font-weight: 700;
				width: 240rpx;
				height: 60rpx;
				border-radius: 60rpx;
				background: #526977;
				color: #fff;
				font-size: 28rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					margin: 0 10rpx;
				}

				.split {
					background: #fff;
					width: 2rpx;
					height: 100%;
				}

				.shop-name {
					flex: 1;
					text-align: center;
				}
			}
		}

		.btn-area {
			box-sizing: border-box;
			width: 100%;
			position: absolute;
			top: 1400rpx;
			padding: 0 30px;
			display: flex;
			justify-content: space-between;

			.btn {
				letter-spacing: 4rpx;
				background: #526977;
				border-radius: 16rpx;
				padding: 12rpx;
				color: #fff;
				font-size: 32rpx;
			}
		}

		.tips {
			height: 30px;
			line-height: 30px;
			text-align: center;
			font-size: 12px;
			color: #ccc1b9;
		}

		.skm-img {
			width: 200px !important;
		}
	}
</style>
