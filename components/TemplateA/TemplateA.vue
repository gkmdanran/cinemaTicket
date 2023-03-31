<template>
	<div class="TemplateA">
		<canvas style="width: 300px; height: 850px;margin: 0 auto;background-color: #fff;" canvas-id="TemplateA"
			id="TemplateA"></canvas>
	</div>
</template>

<script>
	export default {
		name: "TemplateA",
		props: {
			ticketInfo: {
				type: Object,
				default: function() {
					return {
						bigImg: '/static/lldq.jpg',
						mainTitle: '流浪地球2',
						subTitle: 'The Wandering Earth II',
						duration: 147,
						kinds: ['科幻', '冒险', '灾难'],
						releaseTime: '2023-01-22',
						cinema: '幸福蓝海国际影城绿宝店',
						hell: '6号-口味王厅',
						seat: '5排9座',
						price: 52,
						dateTime: '2022-12-11',
						
					}
				}
			}
		},
		data() {
			return {
				ticketUrl: '',
			};
		},
		methods: {
			createImage() {
				uni.canvasToTempFilePath({
					quality: 1,
					canvasId: 'TemplateA',
					complete: (res) => {
						console.log(res)
						if (res.tempFilePath) {
							this.ticketUrl = res.tempFilePath.replace(/[\r\n]/g, '');
							this.$emit('getUrl', this.ticketUrl)
						}
					},

				}, this)
			},
			drawText(ctx, str, leftWidth, initHeight, canvasWidth) {
				let lineWidth = 0;
				let lastSubStrIndex = 0; //每次开始截取的字符串的索引
				for (let i = 0; i < str.length; i++) {
					lineWidth += ctx.measureText(str[i]).width;
					if (lineWidth > canvasWidth) {
						ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
						initHeight += 16; //22为 文字大小20 + 2
						lineWidth = 0;
						lastSubStrIndex = i;
					}
					if (i == str.length - 1) { //绘制剩余部分
						ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
					}
				}

			},
			drawTemplate() {
				const width = 300
				const leftOffset = 10
				const rightOffset = width - leftOffset
				const ctx = uni.createCanvasContext('TemplateA', this);
				ctx.setFillStyle('#f1f1f1')
				ctx.fillRect(0, 0, width, 420);
				ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 300, 420)
				//副标题
				ctx.setFontSize(12)
				ctx.setFillStyle('#191919')
				ctx.fillText(this.ticketInfo.subTitle, leftOffset, 470);
				//虚线
				const dashYarr = [480, 552]
				dashYarr.forEach(item => {
					ctx.setLineDash([8, 6], 4);
					ctx.beginPath();
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
					this.ticketInfo.kinds.join('/'),
					`${this.ticketInfo.releaseTime} 上映`
				]
				detailArr.forEach((item, index) => {
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
						txt: 'HELL/影厅:',
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
						txt: this.ticketInfo.hell,
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
					ctx.setFontSize(12)
					ctx.setFillStyle('#928d89')
					if (index === 0) {
						ctx.fillText(item.txt, item.x, item.y)
					} else {
						this.drawText(ctx, item.txt, item.x, item.y, infoWidth - 5)
					}
				})
				//虚线
				ctx.setLineDash([10, 5], 5);
				ctx.beginPath();
				ctx.moveTo(0, 750);
				ctx.lineTo(width, 750);
				ctx.setLineWidth(3)
				ctx.setStrokeStyle('#000000')
				ctx.stroke();
				//打孔点
				ctx.beginPath();
				ctx.arc(0, 750, 8, 0, 360, false);
				ctx.arc(width, 750, 8, 0, 360, false);
				ctx.setFillStyle('#000000')
				ctx.fill();
				//底部虚线
				ctx.setLineDash([10, 5], 5);
				ctx.beginPath();
				ctx.moveTo(0, 850);
				ctx.lineTo(width, 850);
				ctx.setStrokeStyle('#7d7e7b')
				ctx.stroke();
				//thank
				ctx.setFontSize(14)
				ctx.setTextAlign('center')
				ctx.setFillStyle('#000000')
				ctx.fillText(`${this.ticketInfo.dateTime.split(' ')[0]} 观影留念`, 150, 810);
				ctx.font = 'normal bold 16px Arial,sans-serif '
				ctx.setFillStyle('#000000')
				ctx.fillText('THANK YOU FOR WATCHING', 150, 780);
				//主标题
				ctx.setTextAlign('left')
				ctx.setFontSize(16)
				ctx.setFillStyle('#000000')
				ctx.fillText(this.ticketInfo.mainTitle, leftOffset, 450);
				ctx.draw()
			}
		},
		mounted() {
			this.drawTemplate()
		}
	}
</script>
