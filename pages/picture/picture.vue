<template>
	<view class="picture">
		<view class="tips">长按票根，保存图片至本地相册</view>
		<view class="wrap" v-if="picUrl">
			<image :src="picUrl" mode="widthFix" class="column-img" show-menu-by-longpress></image>
		</view>
		<view class="wrap" v-if="ticketUrl">
			<image :src="ticketUrl" mode="heightFix" class="row-img" show-menu-by-longpress
				v-if="currentTemplate==='TemplateD'"></image>
			<image :src="ticketUrl" mode="widthFix" class="column-img" show-menu-by-longpress v-else></image>
		</view>
		<view class="download" v-if="ticketUrl" @click="downloadTicket">下载图片</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picUrl: '',
				ticketUrl: '',
				currentTemplate: ''
			}
		},
		methods: {
			downloadTicket() {
				if (this.picUrl) {
					uni.saveImageToPhotosAlbum({
						filePath: this.picUrl,
					})
				}
				uni.saveImageToPhotosAlbum({
					filePath: this.ticketUrl,
					success: function() {
						uni.showToast({
							title: '图片下载成功',
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad(option) {
			this.currentTemplate = option.id
			this.ticketUrl = uni.getStorageSync('ticket_url') || '';
			let form = uni.getStorageSync('ticket_form')
			if (form && this.currentTemplate === 'TemplateE') {
				this.picUrl = JSON.parse(form).bigImg
			}
		}
	}
</script>

<style lang="less" scoped>
	.picture {
		.wrap {
			width: 100%;
			overflow-y: auto;
			text-align: center;

			.column-img {
				margin: 0 auto;
				width: 300px !important;
			}

			.row-img {
				height: 300px !important;
			}
		}

		.tips {
			font-size: 14px;
			padding: 10px 0;
			text-align: center;
			color: #465a6c;
		}

		.download {
			text-align: center;
			width: 100px;
			margin: 0 auto;
			font-size: 14px;
			color: #00acff;
			padding: 5px;
			padding-bottom: 20px;
		}
	}
</style>
