<template>
	<view class="TemplateE">
		<canvas class="canvas" canvas-id="TemplateE" id="TemplateE"></canvas>
		<canvas class="canvas" canvas-id="TemplateE2" id="TemplateE2"></canvas>
		<view class="wrap">
			<view>正面海报：</view>
			<image :src="picUrl" mode="widthFix" :style="{width:'300px'}"></image>
			<view>反面信息：</view>
			<image :src="ticketUrl" mode="widthFix" :style="{width:'300px'}"></image>
		</view>
		<CommonForm ref="form" @save="handleSave" :form="ticketInfo" :formSetting="formSetting"
			:cropper="{width:300,height:600}">>
		</CommonForm>
	</view>
</template>

<script>
	import {
		drawText
	} from '../../../../util/common.js'
	import CommonForm from '../CommonForm/CommonForm.vue'
	export default {
		name: "TemplateE",
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
				picUrl:'',
				formSetting: {
					bigImg: true,
					mainTitle: true,
					subTitle: true,
					duration: true,
					kinds: true,
					cinema: true,
					hall: true,
					seat: true,
					dateTime: true,
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
					canvasId: 'TemplateE',
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
				uni.canvasToTempFilePath({
					quality: 1,
					canvasId: 'TemplateE2',
					success: (res) => {
						if (res.tempFilePath) {
							this.picUrl = res.tempFilePath.replace(/[\r\n]/g, '');
						}
					},
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
			drawImg() {
				const ctx = uni.createCanvasContext('TemplateE2', this);
				ctx.beginPath();
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, 300, 600);
				ctx.beginPath();
				ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 300, 600)
				ctx.draw()
			},
			//绘制canvas
			drawTemplate() {
				if (this.loading) return
				const width = 300
				const leftOffset = 25
				const rightOffset = width - leftOffset
				const ctx = uni.createCanvasContext('TemplateE', this);
				ctx.setTextAlign('left')
				ctx.font = 'normal normal 12px Arial'
				//票根
				ctx.beginPath();
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, width, 600);
				//虚线
				const dashYarr = [105, 180]
				dashYarr.forEach(item => {
					ctx.beginPath();
					ctx.setLineDash([6, 6.5], 3);
					ctx.moveTo(leftOffset, item);
					ctx.lineTo(rightOffset, item);
					ctx.setStrokeStyle('#aeaeae')
					ctx.stroke();
				})
				//时长
				ctx.beginPath();
				ctx.setFontSize(12)
				ctx.setFillStyle('#000')
				ctx.fillText(`${this.ticketInfo.duration} 分钟`, leftOffset + 5, 126);
				//分类
				ctx.beginPath();
				ctx.setFontSize(12)
				ctx.setFillStyle('#000')
				ctx.fillText(this.ticketInfo.kinds, leftOffset + 5, 148);
				//语种
				ctx.beginPath();
				ctx.setFontSize(12)
				ctx.setFillStyle('#000')
				ctx.fillText(`${this.ticketInfo.lang} ${this.ticketInfo.seat.split('/').length}张`, leftOffset + 5, 170);
				//票信息
				const infoWidth = (width - 2 * leftOffset) / 2
				const InfoCntArr = [{
						txt: this.ticketInfo.cinema,
						x: leftOffset,
						y: 242
					},
					{
						txt: this.ticketInfo.hall,
						x: leftOffset,
						y: 292
					},
					{
						txt: this.ticketInfo.seat.split('/')[0],
						x: leftOffset + 150,
						y: 292
					},
					{
						txt: `${this.ticketInfo.dateTime.split(' ')[0].split('-')[0]}年${this.ticketInfo.dateTime.split(' ')[0].split('-')[1]}月${this.ticketInfo.dateTime.split(' ')[0].split('-')[2]}日`,
						x: leftOffset,
						y: 352
					},
					{
						txt: `${this.ticketInfo.dateTime.split(' ')[1]}~${this.getEndTime()}`,
						x: leftOffset + 150,
						y: 352
					},
				]
				InfoCntArr.forEach((item, index) => {
					ctx.beginPath();
					ctx.setFontSize(14)
					ctx.setFillStyle('#2d2d2d')
					if (index === 0) {
						ctx.fillText(item.txt, item.x, item.y)
					} else {
						drawText(ctx, item.txt, item.x, item.y, infoWidth)
					}
				})
				if (this.ticketInfo.seat.split('/')[1]) {
					ctx.beginPath();
					ctx.setFontSize(14)
					ctx.setFillStyle('#2d2d2d')
					ctx.fillText(this.ticketInfo.seat.split('/')[1], leftOffset + 150, 310)
				}
				//左打孔点
				ctx.beginPath();
				ctx.arc(20, 390, 3, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//右打孔点
				ctx.beginPath();
				ctx.arc(280, 390, 3, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//分割线
				ctx.beginPath();
				ctx.setLineDash([8, 0], 0);
				ctx.moveTo(30, 390);
				ctx.lineTo(270, 390);
				ctx.setStrokeStyle('#6c6c6c')
				ctx.stroke();
				//主标题
				ctx.beginPath();
				ctx.font = 'normal bold 24px Arial'
				ctx.setFontSize(26)
				ctx.setFillStyle('#343434')
				ctx.fillText(this.ticketInfo.mainTitle, leftOffset, 65);
				//副标题
				ctx.beginPath();
				ctx.font = 'normal bold 14px Arial'
				ctx.setFontSize(14)
				ctx.setFillStyle('#343434')
				ctx.fillText(this.ticketInfo.subTitle, leftOffset, 90);
				//票信息标题
				const InfoLabelArr = [{
						txt: 'CINEMA/影院:',
						x: leftOffset,
						y: 220
					},
					{
						txt: 'HALL/影厅:',
						x: leftOffset,
						y: 270
					},
					{
						txt: 'SEAT/座位:',
						x: leftOffset + 150,
						y: 270
					},
					{
						txt: 'DATE/日期:',
						x: leftOffset,
						y: 330
					},
					{
						txt: 'TIME/时间:',
						x: leftOffset + 150,
						y: 330
					},
				]
				InfoLabelArr.forEach(item => {
					ctx.font = 'normal bold 12px Arial'
					ctx.beginPath();
					ctx.setFontSize(12)
					ctx.setFillStyle('#2d2d2d')
					ctx.fillText(item.txt, item.x, item.y);
				})
				// 二维码
				ctx.beginPath();
				ctx.drawImage('/static/gewai.png', 50, 390, 200, 184)
				//感谢
				ctx.beginPath();
				ctx.font = 'normal bold 15px Arial'
				ctx.setTextAlign('center')
				ctx.setFontSize(15)
				ctx.setFillStyle('#000000')
				ctx.fillText('THANK YOU FOR WATCHING', 150, 570);
				ctx.draw()
				this.drawImg()
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
	.TemplateE {
		position: relative;
		height: 1260px;

		.canvas {
			top: -9999px;
			width: 300px;
			height: 600px;
		}

		.wrap {
			position: absolute;
			top: 0;
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
		}

	}
</style>
