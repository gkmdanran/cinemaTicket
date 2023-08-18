<template>
	<div class="form-c">
		<ksp-cropper v-if="showCrop" :mode="cropMode" :width="300" :height="cropMode==='ratio'?420:filmHeight"
			:maxWidth="1024" :maxHeight="1024" :url="filmImg" @cancel="cancelCrop" @ok="confirmCrop" />
		<ksp-cropper v-if="showTicketCrop" :mode="cropMode" :width="300" :height="cropMode==='ratio'?450:ticketHeight"
			:maxWidth="1024" :maxHeight="1024" :url="ticketImg" @cancel="cancelTicketCrop" @ok="confirmTicketCrop" />
		<uni-drawer ref="drawer" mode="right" :width="getDeviceWidth()" :maskClick="false">
			<scroll-view scroll-y="true" class="scroll-y">
				<view class="form">
					<uni-forms label-align="right" label-width="90px">
						<uni-forms-item label="等比裁剪:" name="cropMode">
							<uni-data-checkbox style="height:100%" v-model="cropMode" :localdata="[{
								text: '是',
								value: 'ratio'
							}, {
								text: '否',
								value: 'free'
							}]"></uni-data-checkbox>
							<view class="tips">推荐使用等比裁剪</view>
						</uni-forms-item>
					</uni-forms>
					<uni-forms label-align="right" label-width="90px">
						<uni-forms-item label="海报:" name="filmImg">
							<image :src="filmImg" mode="widthFix" @click="cropImg" show-menu-by-longpress>
							</image>
							<button size="mini" type="primary" @click="selectImg">更换海报</button>
						</uni-forms-item>
					</uni-forms>
					<uni-forms label-align="right" label-width="90px">
						<uni-forms-item label="电影票截图:" name="ticketImg">
							<image :src="ticketImg" mode="widthFix" @click="cropTicketImg" show-menu-by-longpress>
							</image>
							<button size="mini" type="primary" @click="selectTicketImg">更换截图</button>
						</uni-forms-item>
					</uni-forms>
					<div class="tips" style="text-align: center;margin-bottom: 15px;">通过旋转和非等比裁剪或许能做横版票根</div>
					<view class="btn-area">
						<button @click="cancel">取 消</button>
						<button type="primary" @click="save">预 览</button>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</div>
</template>

<script>
	import kspCropper from '../ksp-cropper/ksp-cropper.vue'
	export default {
		name: "FormC",
		components: {
			kspCropper,
		},
		props: {
			form: {
				type: Object,
			},
		},
		data() {
			return {
				showCrop: false,
				showTicketCrop: false,
				filmImg: '',
				ticketImg: '',
				preFilmImg: '',
				preTicketImg: '',
				ticketHeight: 450,
				filmHeight: 420,
				cropMode: 'ratio'
			};
		},
		methods: {
			//打开抽屉
			showDrawer() {
				this.$refs['drawer'].open()
			},
			//选择图片
			selectImg(rsp) {
				uni.chooseImage({
					count: 1,
					success: (rst) => {
						this.preFilmImg = this.filmImg
						this.filmImg = rst.tempFilePaths[0];
						this.showCrop = true
					}
				});
			},
			selectTicketImg(rsp) {
				uni.chooseImage({
					count: 1,
					success: (rst) => {
						this.preTicketImg = this.ticketImg
						this.ticketImg = rst.tempFilePaths[0];
						this.showTicketCrop = true
					}
				});
			},
			cropImg() {
				this.preFilmImg = this.filmImg
				this.showCrop = true
			},
			cropTicketImg() {
				this.preTicketImg = this.ticketImg
				this.showTicketCrop = true
			},
			//确认裁剪
			confirmCrop(ev) {
				this.filmImg = ev.path;
				uni.getImageInfo({
					src: this.filmImg,
					success: (film) => {
						this.filmHeight = Math.floor(film.height * 300 / film.width)
					},
				});
				this.showCrop = false
			},
			confirmTicketCrop(ev) {
				this.ticketImg = ev.path;
				uni.getImageInfo({
					src: this.ticketImg,
					success: (ticket) => {
						this.ticketHeight = ticket.height * 300 / ticket.width
					},
				});
				this.showTicketCrop = false
			},
			//取消裁剪
			cancelCrop() {
				this.filmImg = this.preFilmImg
				this.showCrop = false
			},
			cancelTicketCrop() {
				this.ticketImg = this.preTicketImg
				this.showTicketCrop = false
			},
			//取消
			cancel() {
				this.$refs['drawer'].close()
			},
			//保存
			save() {
				let form = {
					filmImg: this.filmImg,
					ticketImg: this.ticketImg,
					filmHeight: this.filmHeight,
					ticketHeight: this.ticketHeight
				}
				this.$emit('save', JSON.parse(JSON.stringify(form)))
				this.$refs['drawer'].close()
			},
			getDeviceWidth() {
				return uni.getSystemInfoSync().windowWidth
			}
		},
		mounted() {
			this.ticketImg = this.form.ticketImg
			this.filmImg = this.form.filmImg
		}
	}
</script>

<style scoped lang="less">
	.form-c {
		.tips {
			color: #ccc;
			font-size: 12px;
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
