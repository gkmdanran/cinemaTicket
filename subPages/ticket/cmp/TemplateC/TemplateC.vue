<template>
	<view class="TemplateC">
		<canvas class="canvas" canvas-id="TemplateC" id="TemplateC" :style="{height:`${ticketHeight+filmHeight}px`}"></canvas>
		<view class="wrap">
			<image :src="ticketUrl" mode="widthFix" :style="{width:'300px'}"></image>
		</view>
		<FormC ref="form" @save="handleSave" :form="{filmImg:filmImg,ticketImg:ticketImg}">
		</FormC>
	</view>
</template>

<script>
	import FormC from '../FormC/FormC.vue'
	export default {
		name: "TemplateC",
		components: {
			FormC
		},

		data() {
			return {
				loading: false,
				ticketUrl: '',
				filmImg: '/static/lldq.jpg',
				ticketImg: '/static/lldq.jpg',
				filmHeight:420,
				ticketHeight:450,
			}
		},
		methods: {
			//打开抽屉
			showDrawer() {
				this.$refs['form'].showDrawer()
			},
			//保存预览
			handleSave(form) {
				this.filmImg = form.filmImg
				this.ticketImg = form.ticketImg
				this.ticketHeight=form.ticketHeight
				this.filmHeight=form.filmHeight
				console.log(form)
				this.drawTemplate()
			},
			//生成图片
			createImage() {
				uni.canvasToTempFilePath({
					quality: 1,
					canvasId: 'TemplateC',
					success: (res) => {
						if (res.tempFilePath) {
							this.ticketUrl = res.tempFilePath.replace(/[\r\n]/g, '');
						}
					},
					complete: () => {
						this.loading = false
						uni.hideLoading()
					}
				}, this)
			},
			//绘制canvas
			drawTemplate() {
				if (this.loading) return
				const width = 300
				const ctx = uni.createCanvasContext('TemplateC', this);

				//票根
				ctx.beginPath();
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, width, this.ticketHeight+this.filmHeight);
				//海报
				ctx.beginPath();
				ctx.setFillStyle('#f1f1f1')
				ctx.fillRect(0, 0, width, 420);
				ctx.drawImage(this.filmImg, 0, 0, 300, this.filmHeight)
				ctx.drawImage(this.ticketImg, 0,this.filmHeight, 300, this.ticketHeight)
				ctx.draw()
				this.loading = true
				uni.showLoading({
					title: '生成中...',
					mask: true
				});
				setTimeout(() => {
					this.createImage()
				}, 1000)
			},
		},
		mounted() {
			this.drawTemplate()
		}
	}
</script>
<style lang="less" scoped>
	.TemplateC {
		position: relative;

		.canvas {
			top: -9999px;
			width: 300px;
			height: 870px;
		}

		.wrap {
			position: absolute;
			top: 0;
			width: 100%;
			display: flex;
			justify-content: center;
		}

	}
</style>
