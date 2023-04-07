<template>
	<view class="TemplateA">
		<canvas class="canvas" canvas-id="TemplateA" id="TemplateA"></canvas>
		<view class="wrap">
			<image :src="ticketUrl" mode="widthFix" :style="{width:'300px'}"></image>
		</view>
		<CommonForm ref="form" @save="handleSave" :form="ticketInfo" :formSetting="formSetting">
		</CommonForm>
	</view>
</template>

<script>
	import {
		drawText
	} from '../../util/common.js'
	export default {
		name: "TemplateA",
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
					subTitle: true,
					duration: true,
					kinds: true,
					releaseTime: true,
					cinema: true,
					hall: true,
					seat: true,
					price: true,
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
					canvasId: 'TemplateA',
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
				const leftOffset = 10
				const rightOffset = width - leftOffset
				const ctx = uni.createCanvasContext('TemplateA', this);
				ctx.setTextAlign('left')
				ctx.font = 'normal normal 12px Arial'
				//票根
				ctx.beginPath();
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, width, 850);
				//海报
				ctx.beginPath();
				ctx.setFillStyle('#f1f1f1')
				ctx.fillRect(0, 0, width, 420);
				ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 300, 420)
				//副标题
				ctx.beginPath();
				ctx.setFontSize(12)
				ctx.setFillStyle('#191919')
				ctx.fillText(this.ticketInfo.subTitle, leftOffset, 470);
				//虚线
				const dashYarr = [480, 552]
				dashYarr.forEach(item => {
					ctx.beginPath();
					ctx.setLineDash([8, 6], 4);
					ctx.moveTo(leftOffset, item);
					ctx.lineTo(rightOffset, item);
					ctx.setLineWidth(2)
					ctx.setStrokeStyle('#7d7e7b')
					ctx.stroke();
				})
				//详情
				const detailH = 20
				const detailArr = [
					`${this.ticketInfo.duration} 分钟`,
					this.ticketInfo.kinds,
					`${this.ticketInfo.releaseTime} 上映`
				]
				detailArr.forEach((item, index) => {
					ctx.beginPath();
					ctx.setFontSize(12)
					ctx.setFillStyle('#4d4d4d')
					ctx.fillText(item, leftOffset, 500 + index * detailH);
				})
				//票信息
				const infoWidth = (width - 2 * leftOffset) / 3
				const InfoLabelArr = [{
						txt: 'CINEMA/影院:',
						x: leftOffset,
						y: 580
					},
					{
						txt: 'HALL/影厅:',
						x: leftOffset,
						y: 630
					},
					{
						txt: 'SEAT/座位:',
						x: leftOffset + infoWidth,
						y: 630
					},
					{
						txt: 'PRICE/票价:',
						x: leftOffset + infoWidth * 2,
						y: 630
					},
					{
						txt: 'DATE/日期:',
						x: leftOffset,
						y: 690
					},
					{
						txt: 'TIME/时间:',
						x: leftOffset + infoWidth,
						y: 690
					},
				]
				InfoLabelArr.forEach(item => {
					ctx.beginPath();
					ctx.setFontSize(13)
					ctx.setFillStyle('#928d89')
					ctx.fillText(item.txt, item.x, item.y);
				})
				const InfoCntArr = [{
						txt: this.ticketInfo.cinema,
						x: leftOffset,
						y: 600
					},
					{
						txt: this.ticketInfo.hall,
						x: leftOffset,
						y: 650
					},
					{
						txt: this.ticketInfo.seat,
						x: leftOffset + infoWidth,
						y: 650
					},
					{
						txt: `￥ ${this.ticketInfo.price}`,
						x: leftOffset + infoWidth * 2,
						y: 650
					},
					{
						txt: this.ticketInfo.dateTime.split(' ')[0],
						x: leftOffset,
						y: 710
					},
					{
						txt: this.ticketInfo.dateTime.split(' ')[1],
						x: leftOffset + infoWidth,
						y: 710
					},
				]
				InfoCntArr.forEach((item, index) => {
					ctx.beginPath();
					ctx.setFontSize(12)
					ctx.setFillStyle('#928d89')
					if (index === 0) {
						ctx.fillText(item.txt, item.x, item.y)
					} else {
						drawText(ctx, item.txt, item.x, item.y, infoWidth - 5)
					}
				})
				//虚线
				ctx.beginPath();
				ctx.setLineDash([10, 5], 5);
				ctx.moveTo(0, 750);
				ctx.lineTo(width, 750);
				ctx.setLineWidth(3)
				ctx.setStrokeStyle('#000000')
				ctx.stroke();
				//左打孔点
				ctx.beginPath();
				ctx.arc(0, 750, 8, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//右打孔点
				ctx.beginPath();
				ctx.arc(width, 750, 8, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//底部虚线
				ctx.beginPath();
				ctx.setLineDash([10, 5], 5);
				ctx.moveTo(0, 850);
				ctx.lineTo(width, 850);
				ctx.setStrokeStyle('#7d7e7b')
				ctx.stroke();
				//主标题
				ctx.beginPath();
				ctx.font = 'normal bold 16px Arial'
				ctx.setFontSize(16)
				ctx.setFillStyle('#000000')
				ctx.fillText(this.ticketInfo.mainTitle, leftOffset, 450);
				//感谢
				ctx.beginPath();
				ctx.font = 'normal bold 16px Arial'
				ctx.setTextAlign('center')
				ctx.setFontSize(16)
				ctx.setFillStyle('#000000')
				ctx.fillText('THANK YOU FOR WATCHING', 150, 780);
				//留念日期
				ctx.beginPath();
				ctx.font = 'normal bold 14px Arial'
				ctx.setTextAlign('center')
				ctx.setFontSize(14)
				ctx.setFillStyle('#000000')
				ctx.fillText(`${this.ticketInfo.dateTime.split(' ')[0].split('-').join('/')} 观影留念`, 150, 810);
				//已放映
				ctx.beginPath();
				ctx.drawImage(this.ticketInfo.finishIcon, 210, 760, 80, 80)
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
	.TemplateA {
		position: relative;

		.canvas {
			top: -850px;
			width: 300px;
			height: 850px;
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
