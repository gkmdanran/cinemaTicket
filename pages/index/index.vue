<template>
	<view class="index-contaioner">
		<image class="banner-img" src="../../static/banner.jpg" mode="widthFix"></image>
		<image src="../../static/copy.png" class="copy-img" @click="copyUrl('')"></image>
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
			2023年9月10日前下单，参与小红书或抖音的“关注+3连”活动，享满5张赠1张优惠。
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
				words: '',
				templateList: [{
						id: 'TemplateB',
						name: '简 约',
					}, {
						id: 'TemplateA',
						name: '详 细',
					},
					{
						id: 'TemplateC',
						name: '拼 接',
					}, {
						id: 'TemplateD',
						name: '横 版',
					},
					{
						id: 'TemplateE',
						name: '双 面',
					},
				]

			}
		},
		methods: {
			copyUrl(type) {
				if (type === 'xhs') {
					uni.setClipboardData({
						data: 'https://www.xiaohongshu.com/goods-detail/642cd3d1c299b4000165373f?xhsshare=CopyLink&appuid=5fa638fd00000000010009c6&apptime=1691573651',
						success: function() {
							uni.showToast({
								title: '链接复制成功！请打开浏览器粘贴网址访问小红书店铺~',
								icon: 'none'
							})
						}
					})
				} else if (type === 'tb') {
					uni.setClipboardData({
						data: '【淘宝】https://m.tb.cn/h.521O4Dj?tk=GvygdEjQjVh CZ3457 「收藏级别的电影票| 小红书网红定制电影票根保存电影票影迷书签」',
						success: function() {
							uni.showToast({
								title: '复制链接成功！请打开淘宝访问店铺~',
								icon: 'none'
							})
						}
					})
				} else {
					uni.setClipboardData({
						data: '1050625146',
						success: function() {
							uni.showToast({
								title: '小红书ID复制成功~',
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
				console.log(id)
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

		.banner-img {
			width: 100vw !important;
			vertical-align: middle;
		}

		.copy-img {
			position: absolute;
			width: 30rpx;
			height: 30rpx;
			top: 110rpx;
			right: 180rpx;
		}

		.words {
			position: absolute;
			top: 1155rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 0 90rpx;
			font-size: 24rpx;
			text-align: center;
			color: #8b9091;
		}

		.shop-btn-area {
			box-sizing: border-box;
			width: 100%;
			position: absolute;
			top: 1010rpx;
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
			top: 1280rpx;
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
			position: absolute;
			top: 1400rpx;
			width: 100%;
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
