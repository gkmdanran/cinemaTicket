<template>
	<view class="TemplateA">
		<canvas class="canvas" canvas-id="TemplateA" id="TemplateA"></canvas>
		<view class="wrap">
			<image :src="ticketUrl" mode="widthFix"></image>
		</view>
		<uni-drawer ref="drawer" mode="right" :width="320" :maskClick="false">
			<scroll-view scroll-y="true" class="scroll-y">
				<view class="form">
					<uni-forms :modelValue="ticketInfo" label-align="right" label-width="90px">
						<uni-forms-item label="海报:" name="bigImg">
							<image :src="ticketInfo.bigImg" mode="widthFix"></image>
							<button size="mini" type="primary" @click="selectImg">更换海报</button>
						</uni-forms-item>
						<uni-forms-item label="标题:" name="mainTitle">
							<uni-easyinput type="text" v-model="ticketInfo.mainTitle" placeholder="例:流浪地球2"
								maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="副标题:" name="subTitle">
							<uni-easyinput type="text" v-model="ticketInfo.subTitle"
								placeholder="例:The Wandering Earth II" maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="时长(分钟):" name="duration">
							<uni-easyinput type="number" v-model="ticketInfo.duration" maxlength="8" />
						</uni-forms-item>
						<uni-forms-item label="分类:" name="kinds">
							<uni-easyinput type="text" v-model="ticketInfo.kinds" placeholder="例:科幻/冒险/灾难"
								maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="上映日期:" name="releaseTime">
							<uni-datetime-picker type="date" :clear-icon="false" v-model="ticketInfo.releaseTime" />
						</uni-forms-item>
						<uni-forms-item label="影院:" name="cinema">
							<uni-easyinput type="text" v-model="ticketInfo.cinema" placeholder="例:幸福蓝海国际影城"
								maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="影厅:" name="hell">
							<uni-easyinput type="text" v-model="ticketInfo.hell" placeholder="例:5号全景声厅"
								maxlength="18" />
						</uni-forms-item>
						<uni-forms-item label="座位:" name="seat">
							<uni-easyinput type="text" v-model="ticketInfo.seat" placeholder="例:5拍14座" maxlength="16" />
						</uni-forms-item>
						<uni-forms-item label="票价(￥):" name="price">
							<uni-easyinput type="digit" v-model="ticketInfo.price" maxlength="8" />
						</uni-forms-item>
						<uni-forms-item label="放映时间:" name="dateTime">
							<uni-datetime-picker type="datetime" :clear-icon="false" v-model="ticketInfo.dateTime"
								hide-second />
						</uni-forms-item>
					</uni-forms>
					<view class="btn-area">
						<button type="primary" @click="cancel">取 消</button>
						<button @click="save">预 览</button>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
		<ksp-cropper v-if="showCrop" mode="ratio" :width="300" :height="420" :maxWidth="1024" :maxHeight="1024"
			:url="ticketInfo.bigImg" @cancel="oncancel" @ok="onok" />
	</view>
</template>

<script>
	export default {
		name: "TemplateA",
		data() {
			return {
				showCrop: false,
				preBigImg: '',
				ticketUrl: '',
				preTicket: {},
				ticketInfo: {
					bigImg: '../../static/lldq.jpg',
					mainTitle: '流浪地球2',
					subTitle: 'The Wandering Earth II',
					duration: 147,
					kinds: '科幻/冒险/灾难',
					releaseTime: '2023-01-22',
					cinema: '幸福蓝海国际影城',
					hell: '5号全景声厅',
					seat: '5排14座',
					price: '52.00',
					dateTime: '2023-01-23 14:10',
				}
			}
		},
		methods: {
			selectImg(rsp) {
				uni.chooseImage({
					count: 1,
					success: (rst) => {
						this.preBigImg = this.ticketInfo.bigImg
						this.ticketInfo.bigImg = rst.tempFilePaths[0];
						this.showCrop = true
					}
				});
			},
			onok(ev) {
				this.ticketInfo.bigImg = ev.path;
				this.showCrop = false
			},
			oncancel() {
				this.ticketInfo.bigImg = this.preBigImg
				this.showCrop = false
			},
			showDrawer() {
				this.preTicket = JSON.parse(JSON.stringify(this.ticketInfo))
				this.$refs['drawer'].open()
			},
			cancel() {
				this.ticketInfo = JSON.parse(JSON.stringify(this.preTicket))
				this.$refs['drawer'].close()
			},
			save() {
				this.$refs['drawer'].close()
				this.drawTemplate()
			},
			createImage() {
				uni.canvasToTempFilePath({
					quality: 1,
					canvasId: 'TemplateA',
					complete: (res) => {
						if (res.tempFilePath) {
							this.ticketUrl = res.tempFilePath.replace(/[\r\n]/g, '');
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
				//票根
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, width, 850);
				//海报
				ctx.setFillStyle('#f1f1f1')
				ctx.fillRect(0, 0, width, 420);
				ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 300, 420)
				//主标题
				ctx.setFontSize(16)
				ctx.setFillStyle('#000000')
				ctx.fillText(this.ticketInfo.mainTitle, leftOffset, 450);
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
					this.ticketInfo.kinds,
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
				ctx.setFillStyle('#000000')
				ctx.fillText('THANK YOU FOR WATCHING', 150, 780);
				ctx.setTextAlign('left')
				ctx.draw(false, () => {
					this.createImage()
				})
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
			left: 50%;
			margin-left: -150px;
			width: 300px;
			display: flex;

			image {
				width: 300px !important;
			}
		}

		.scroll-y {
			height: 100%;

			.form {
				padding-right: 15px;
				padding-top: 20px;

				image {
					width: 100px !important;
					margin-right: 10px;
				}

				.btn-area {
					height: 80px;
					display: flex;
					justify-content: space-between;

					button {
						width: 100px;
						height: 36px;
						line-height: 36px;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
