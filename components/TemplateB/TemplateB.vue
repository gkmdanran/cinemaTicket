<template>
	<view class="TemplateB">
		<canvas class="canvas" canvas-id="TemplateB" id="TemplateB"></canvas>
		<view class="wrap">
			<image :src="ticketUrl" mode="widthFix" :style="{width:'300px'}"></image>
		</view>
		<CommonForm ref="form" @save="handleSave" :form="ticketInfo" :formSetting="formSetting">
		</CommonForm>
	</view>
</template>

<script>
	import {
		drawText,
		fillRoundRect,
		drawRoundRectPath
	} from '../../util/common.js'
	export default {
		name: "TemplateB",
		props: {
			ticketInfo: {
				type: Object,
			}
		},
		data() {
			return {
				colorMap: {
					'grey': {
						bg1: '#3d5265',
						bg2: '#cbcfd3',
						bg3: '#324252',
					},
					'green': {
						bg1: '#296067',
						bg2: '#e3e8e8',
						bg3: '#224d53',
					},
					'blue': {
						bg1: '#1e324a',
						bg2: '#d3d6db',
						bg3: '#17283a',
					},
					'brown': {
						bg1: '#67633e',
						bg2: '#d7d7cf',
						bg3: '#534f32',
					},
					'red': {
						bg1: '#572723',
						bg2: '#b39e9d',
						bg3: '#461e1c',
					},

				},
				loading: false,
				ticketUrl: '',
				formSetting: {
					lang: true,
					bigImg: true,
					mainTitle: true,
					duration: true,
					cinema: true,
					hall: true,
					seat: true,
					dateTime: true,
					color: true
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
					canvasId: 'TemplateB',
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
			drawTicketPannel(cxt, width, height, radius) {
				cxt.save();
				cxt.translate(10, 470);
				cxt.beginPath(0);
				cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
				cxt.lineTo(radius, height);
				cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
				cxt.lineTo(0, 160)
				cxt.arc(0, 152, 8, 0.5 * Math.PI, 1.5 * Math.PI, true)
				cxt.lineTo(0, radius);
				cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
				cxt.lineTo(width - radius, 0);
				cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
				cxt.lineTo(width, 144)
				cxt.arc(width, 152, 8, 1.5 * Math.PI, 0.5 * Math.PI, true)
				cxt.lineTo(width, height - radius);
				cxt.setStrokeStyle('#fff');
				cxt.stroke();
				cxt.closePath();
				cxt.setFillStyle('#fff')
				cxt.fill();
				cxt.restore();
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
				const width = 300
				const mainColor = this.colorMap[this.ticketInfo.color] || 'grey'
				const ctx = uni.createCanvasContext('TemplateB', this);
				ctx.clearRect(0, 0, width, 720)
				ctx.setTextAlign('left')
				ctx.font = 'normal normal 12px Arial'
				//票根
				ctx.beginPath();
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, width, 720);
				//海报
				ctx.beginPath();
				ctx.setFillStyle('#f1f1f1')
				ctx.fillRect(0, 0, width, 420);
				ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 300, 420)
				//票边框
				ctx.beginPath();
				const grd = ctx.createLinearGradient(0, 420, 0, 720)
				grd.addColorStop(0, mainColor.bg1)
				grd.addColorStop(1, mainColor.bg2)
				ctx.setFillStyle(grd)
				ctx.fillRect(0, 420, 300, 300)
				//影院
				ctx.beginPath();
				fillRoundRect(ctx, 10, 430, width - 20, 60, 6, mainColor.bg3)
				ctx.beginPath();
				ctx.setFontSize(14)
				ctx.setFillStyle('#fff')
				ctx.setGlobalAlpha(0.8)
				ctx.fillText(this.ticketInfo.cinema, 20, 455);
				ctx.setGlobalAlpha(1)
				//信息详情
				this.drawTicketPannel(ctx, width - 20, 240, 8)
				//上半圆
				ctx.beginPath();
				ctx.arc(150, 460, 20, 0.1 * Math.PI, 0.9 * Math.PI, false);
				ctx.setFillStyle(mainColor.bg3)
				ctx.fill();
				//标题
				ctx.beginPath();
				ctx.font = 'normal bold 16px Arial'
				ctx.setFontSize(16)
				ctx.setFillStyle('#222222')
				ctx.fillText(this.ticketInfo.mainTitle, 20, 515);
				//类型
				ctx.beginPath();
				ctx.font = 'normal normal 14px Arial'
				ctx.setFontSize(13)
				ctx.setFillStyle('#202020')
				ctx.fillText(`${this.ticketInfo.lang} 1张`, 20, 540);
				//日期
				ctx.beginPath();
				ctx.setFontSize(12)
				ctx.setFillStyle('#686868')
				ctx.fillText(this.ticketInfo.dateTime.split(' ')[0], 20, 575);
				//时间
				ctx.beginPath();
				ctx.font = 'normal bold 13px Arial'
				ctx.setFontSize(13)
				ctx.setFillStyle('#333333')
				ctx.fillText(`${this.ticketInfo.dateTime.split(' ')[1]}~${this.getEndTime()}`, 20, 595);
				//影厅
				ctx.beginPath();
				ctx.font = 'normal normal 13px Arial'
				ctx.setFontSize(12)
				ctx.setFillStyle('#777777')
				ctx.fillText(this.ticketInfo.hall, 120, 575);
				//座位
				ctx.beginPath();
				ctx.setFontSize(12)
				ctx.setFillStyle('#333333')
				ctx.fillText(this.ticketInfo.seat, 120, 595);
				//虚线
				ctx.save();
				ctx.beginPath();
				ctx.setLineDash([8, 6], 4);
				ctx.moveTo(20, 622);
				ctx.lineTo(280, 622);
				ctx.setStrokeStyle('#7d7e7b')
				ctx.stroke();
				ctx.closePath()
				ctx.restore()

				//感谢
				ctx.beginPath();
				ctx.font = 'normal bold 16px Arial'
				ctx.setTextAlign('center')
				ctx.setFontSize(16)
				ctx.setFillStyle('#000000')
				ctx.fillText('THANK YOU FOR WATCHING', 150, 650);
				//留念日期
				ctx.beginPath();
				ctx.font = 'normal bold 14px Arial'
				ctx.setTextAlign('center')
				ctx.setFontSize(14)
				ctx.setFillStyle('#000000')
				ctx.fillText(`${this.ticketInfo.dateTime.split(' ')[0].split('-').join('/')} 观影留念`, 150, 680);
				//已放映
				ctx.beginPath();
				ctx.drawImage(this.ticketInfo.finishIcon, 210, 635, 70, 70)

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
	.TemplateB {
		position: relative;

		.canvas {
			top: -720px;
			width: 300px;
			height: 720px;
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
