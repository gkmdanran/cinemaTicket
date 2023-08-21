<template>
	<view class="TemplateD">
		<canvas class="canvas" canvas-id="TemplateD" id="TemplateD"></canvas>
		<view class="wrap">
			<image :src="ticketUrl" mode="widthFix" :style="{width:'780px'}"></image>
		</view>
		<div class="tips">横板票根请左右滑动预览</div>
		<CommonForm ref="form" @save="handleSave" :form="ticketInfo" :formSetting="formSetting"
			:cropper="{width:490,height:250}">
		</CommonForm>
	</view>
</template>

<script>
	import {
		drawText
	} from '../../../../util/common.js'
	import CommonForm from '../CommonForm/CommonForm.vue'
	export default {
		name: "TemplateD",
		components: {
			CommonForm
		},
		props: {
			ticketInfo: {
				type: Object,
			}
		},
		data() {
			return {
				loading: false,
				ticketUrl: '',
				formSetting: {
					bigImg: true,
					mainTitle: true,
					subTitle: false,
					duration: true,
					kinds: false,
					releaseTime: true,
					cinema: true,
					hall: true,
					seat: true,
					price: false,
					dateTime: true,
					star: true,
				}
			}
		},
		methods: {
			//打开抽屉
			showDrawer() {
				this.$refs['form'].showDrawer()
			},
			//保存预览
			handleSave(form) {
				this.$emit('save', form)
			},
			//生成图片
			createImage() {
				uni.canvasToTempFilePath({
					quality: 1,
					canvasId: 'TemplateD',
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
			getEndTime() {
				const startTime = this.ticketInfo.dateTime.split(' ')[1]
				const startH = Number(startTime.split(':')[0])
				const startM = Number(startTime.split(':')[1])
				const endTime = startH * 60 + startM + Number(this.ticketInfo.duration)
				const endH = parseInt(endTime / 60) >= 24 ? parseInt(endTime / 60) - 24 : parseInt(endTime / 60)
				const endM = endTime % 60
				const formatH = endH < 10 ? `0${endH}` : endH
				const formatM = endM < 10 ? `0${endM}` : endM
				return `${formatH}:${formatM}`
			},
			//绘制canvas
			drawTemplate() {
				if (this.loading) return
				const ctx = uni.createCanvasContext('TemplateD', this);
				const bg = '#f5f5f5'
				const leftWidth = 550
				const leftOffset = leftWidth + 30
				ctx.beginPath();
				ctx.setFillStyle(bg)
				ctx.fillRect(0, 0, 800, 300);
				//图片
				ctx.beginPath();
				ctx.setFillStyle(bg)
				ctx.fillRect(0, 0, leftWidth, 300);
				ctx.drawImage(this.ticketInfo.bigImg, 30, 25, 490, 250)
				//缺角
				const points = [{
						x: 30,
						y: 25
					},
					{
						x: 30,
						y: 275
					},
					{
						x: 520,
						y: 25
					},
					{
						x: 520,
						y: 275
					},
				]
				points.forEach(p => {
					ctx.beginPath();
					ctx.arc(p.x, p.y, 20, 0, 360, false);
					ctx.setFillStyle(bg)
					ctx.fill();
				})
				//上打孔点
				ctx.beginPath();
				ctx.arc(leftWidth, 0, 8, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//下打孔点
				ctx.beginPath();
				ctx.arc(leftWidth, 300, 8, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//虚线
				ctx.beginPath();
				ctx.setLineDash([10, 5], 5);
				ctx.moveTo(leftWidth, 0);
				ctx.lineTo(leftWidth, 300);
				ctx.setStrokeStyle('#000000')
				ctx.stroke();
				//信息标题
				ctx.font = 'normal normal 16px Arial'
				const titleTxt = ['Cinema:', 'Hall:', 'Seat:', 'Time:', 'Rating:']
				titleTxt.forEach((item, index) => {
					ctx.beginPath();
					ctx.setFontSize(14)
					ctx.setFillStyle('#465a6c')
					ctx.fillText(item, leftOffset, 75 + index * 45);
				})
				ctx.beginPath();
				ctx.setFontSize(11)
				ctx.setFillStyle('#7d7e7b')
				ctx.fillText(`${this.ticketInfo.releaseTime} 上映`, leftOffset, 50);
				//主标题
				ctx.font = 'normal bold 15px Arial'
				ctx.beginPath();
				ctx.setFontSize(15)
				ctx.setFillStyle('#070303')
				ctx.fillText(this.ticketInfo.mainTitle, leftOffset, 35);


				//信息内容
				const cntArr = [this.ticketInfo.cinema, this.ticketInfo.hall, this.ticketInfo.seat.split('/').join(' / '),
					`${this.ticketInfo.dateTime.split(' ')[0]} ${this.ticketInfo.dateTime.split(' ')[1]}~${this.getEndTime()}`
				]
				cntArr.forEach((item, index) => {
					ctx.beginPath();
					ctx.setFontSize(12)
					ctx.setFillStyle('#070303')
					ctx.fillText(item, leftOffset, 93 + index * 45)
				})

				//评分
				let star = this.ticketInfo.star ? this.ticketInfo.star : 5
				for (let i = 0; i < star ; i++) {
					ctx.drawImage('/static/star.png', leftOffset + i * 22 - 2, 260, 20, 20)
				}

				//已放映
				ctx.beginPath();
				ctx.drawImage(this.ticketInfo.finishIcon, 700, 230, 65, 65)

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
	.TemplateD {
		position: relative;

		.canvas {
			top: -9999px;
			width: 780px;
			height: 300px;
		}

		.wrap {
			overflow-y: auto;
			position: absolute;
			top: 0;
			width: 100%;
		}
		.tips {
			padding: 5px 0;
			text-align: center;
			font-size: 14px;
			color: #465a6c;
		}

	}
</style>
