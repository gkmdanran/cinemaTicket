<template>
	<div class="common-form">
		<ksp-cropper v-if="showCrop" mode="ratio" :width="cropper.width" :height="cropper.height" :maxWidth="1024" :maxHeight="1024"
			:url="ticketInfo.bigImg" @cancel="cancelCrop" @ok="confirmCrop" />
		<t-color-picker ref="colorPicker" @confirm="confirm" :color="{r:63, g:84, b:102,a:1}"></t-color-picker>
		<uni-drawer ref="drawer" mode="right" :width="getDeviceWidth()" :maskClick="false">
			<scroll-view scroll-y="true" class="scroll-y">
				<view class="form">
					<uni-forms :modelValue="ticketInfo" label-align="right" label-width="90px">
						<uni-forms-item label="标题:" name="mainTitle" v-if="formSetting.mainTitle">
							<uni-easyinput type="text" v-model="ticketInfo.mainTitle" placeholder="例:流浪地球2"
								@blur="handleBlur" maxlength="99" />
							<view v-if="recommendFilm&&recommendFilm.name&&recommendFilm.id" class="recommned"
								@click="searchFilm">
								<view>
									<text>猜你想找</text><text class="name">《{{recommendFilm.name}}》</text>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="海报:" name="bigImg" v-if="formSetting.bigImg">
							<image v-if="ticketInfo.bigImg" :src="ticketInfo.bigImg" mode="widthFix" @click="cropImg" >
							</image>
							<button size="mini" type="primary" @click="selectImg">{{ticketInfo.bigImg?'更换':'上传'}}海报</button>
						</uni-forms-item>
						<uni-forms-item label="副标题:" name="subTitle" v-if="formSetting.subTitle">
							<uni-easyinput type="text" v-model="ticketInfo.subTitle"
								placeholder="例:The Wandering Earth II（建议在26个字符以内）" maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="时长(分钟):" name="duration" v-if="formSetting.duration">
							<uni-easyinput type="number" v-model="ticketInfo.duration" maxlength="8" />
						</uni-forms-item>
						<uni-forms-item label="语种:" name="lang" v-if="formSetting.lang">
							<uni-easyinput type="text" v-model="ticketInfo.lang" placeholder="例:国语2D" maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="分类:" name="kinds" v-if="formSetting.kinds">
							<uni-easyinput type="text" v-model="ticketInfo.kinds" placeholder="例:科幻/冒险/灾难"
								maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="上映日期:" name="releaseTime" v-if="formSetting.releaseTime">
							<uni-datetime-picker type="date" :clear-icon="false" v-model="ticketInfo.releaseTime"
								@change="changeReleaseTime" />
						</uni-forms-item>
						<uni-forms-item label="影院:" name="cinema" v-if="formSetting.cinema">
							<uni-easyinput type="text" v-model="ticketInfo.cinema" placeholder="例:幸福蓝海国际影城（建议在15个字符以内）"
								maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="影厅:" name="hall" v-if="formSetting.hall">
							<uni-easyinput type="text" v-model="ticketInfo.hall" placeholder="例:5号全景声厅（建议在18个字符以内）"
								maxlength="99" />
						</uni-forms-item>
						<uni-forms-item label="座位:" name="seat" v-if="formSetting.seat">
							<uni-easyinput type="text" v-model="ticketInfo.seat" placeholder="例:5排14座(多个座位/分隔,建议最多填写两个)"
								maxlength="99" />
							<view class="tips">多个座位：5排14座/5排15座</view>
						</uni-forms-item>
						<uni-forms-item label="票价(￥):" name="price" v-if="formSetting.price">
							<uni-easyinput type="digit" v-model="ticketInfo.price" maxlength="8" />
						</uni-forms-item>
						<uni-forms-item label="放映时间:" name="dateTime" v-if="formSetting.dateTime">
							<uni-datetime-picker type="datetime" :clear-icon="false" v-model="ticketInfo.dateTime"
								hide-second />
						</uni-forms-item>
						<uni-forms-item label="评分:" name="star" v-if="formSetting.star">
							<uni-rate :max="5" v-model="ticketInfo.star" />
						</uni-forms-item>
						<uni-forms-item label="主题色:" name="color" v-if="formSetting.deepColor">
							<uni-data-checkbox v-model="tmpcolor" :localdata="colorList" @change="changeColor">
							</uni-data-checkbox>
							<template  v-if="formSetting.deepColor&&tmpcolor==='self'">
								<view class="color-item">
									<text class="color-name">边框背景色:</text>
									<view class="show-color" :style="{background:`${ticketInfo.deepColor}`}"></view>
									<view class="choose" @click="choseColor('border')">选 择</view>
								</view>
								<view class="color-item">
									<text class="color-name">影院背景色:</text>
									<view class="show-color" :style="{background:`${ticketInfo.shallowColor}`}"></view>
									<view class="choose" @click="choseColor('cinema')">选 择</view>
								</view>
							</template>
						</uni-forms-item>
					</uni-forms>
					<view class="btn-area">
						<button @click="cancel">取 消</button>
						<button type="primary" @click="save">生 成</button>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</div>
</template>

<script>
	import kspCropper from '../ksp-cropper/ksp-cropper.vue'
	import tColorPicker from '../t-color-picker/t-color-picker.vue'
	export default {
		name: "CommonForm",
		components: {
			kspCropper,
			tColorPicker
		},
		props: {
			cropper:{
				type: Object,
				default: function() {
					return {
						width: 300,
						height: 420
					}
				}
			},
			form: {
				type: Object,
			},
			formSetting: {
				type: Object,
			},
		},
		data() {
			return {
				currentColorType: '',
				tmpcolor: '#324252',
				colorMap: {
					'#324252': '#3d5265',
					'#224d53': '#296067',
					'#17283a': '#1e324a',
					'#534f32': '#67633e',
					'#461e1c': '#572723',
				},
				colorList: [{
					text: '灰色',
					value: '#324252'
				}, {
					text: '绿色',
					value: '#224d53'
				}, {
					text: '蓝色',
					value: '#17283a'
				}, {
					text: '棕色',
					value: '#534f32'
				}, {
					text: '红色',
					value: '#461e1c'
				}, {
					text: '自定义',
					value: 'self'
				}],
				recommendFilm: null,
				hotFilmList: [],
				showCrop: false,
				preBigImg: '',
				preTicket: {},
				ticketInfo: {}
			};
		},
		methods: {
			changeReleaseTime(val) {
				this.ticketInfo.dateTime = val ? `${val} 12:00` : this.ticketInfo.dateTime
			},
			changeColor() {
				if (this.tmpcolor === 'self') {
					this.ticketInfo.shallowColor = '#324252'
					this.ticketInfo.deepColor = '#3d5265'
				} else {
					this.ticketInfo.shallowColor = this.tmpcolor
					this.ticketInfo.deepColor = this.colorMap[this.ticketInfo.shallowColor]
				}
			},
			choseColor(type) {
				this.currentColorType = type
				this.$refs.colorPicker.open();
			},
			confirm(e) {
				if (this.currentColorType === 'border') {
					this.ticketInfo.deepColor = e.hex
				} else if (this.currentColorType === 'cinema') {
					this.ticketInfo.shallowColor = e.hex
				}
			},
			searchFilm() {
				if (!this.recommendFilm) return
				uni.request({
					method: 'GET',
					url: `https://m.maoyan.com/ajax/detailmovie?movieId=${this.recommendFilm.id}`,
					success: (res) => {
						if (!res.data.detailMovie) return
						if (res.data.detailMovie.img) {
							uni.downloadFile({
								url: res.data.detailMovie.img,
								success: (res) => {
									this.ticketInfo.bigImg = res.tempFilePath
								}
							});
						}
						this.ticketInfo.mainTitle = this.recommendFilm.name
						this.ticketInfo.subTitle = res.data.detailMovie.enm || ''
						this.ticketInfo.duration = res.data.detailMovie.dur || ''
						this.ticketInfo.kinds = (res.data.detailMovie.cat || '').split(',').join('/')
						this.ticketInfo.releaseTime = res.data.detailMovie.rt || ''
						this.ticketInfo.dateTime = res.data.detailMovie.rt ?
							`${res.data.detailMovie.rt} 12:00` : this.ticketInfo.dateTime
					}
				});
			},
			getHotFilm() {
				uni.request({
					method: 'GET',
					url: 'https://m.maoyan.com/ajax/movieOnInfoList',
					success: (res) => {
						this.hotFilmList = res.data.movieList.map(item => ({
							id: item.id,
							name: item.nm
						}))
					}
				});
			},
			handleBlur() {
				const targetFilm = this.hotFilmList.find(item => this.ticketInfo.mainTitle && item.name.includes(this
					.ticketInfo.mainTitle))
				this.recommendFilm = targetFilm === undefined ? null : targetFilm
			},
			//打开抽屉
			showDrawer() {
				this.preTicket = JSON.parse(JSON.stringify(this.ticketInfo))
				this.$refs['drawer'].open()
			},
			//选择图片
			selectImg(rsp) {
				uni.chooseImage({
					count: 1,
					success: (rst) => {
						this.preBigImg = this.ticketInfo.bigImg
						this.ticketInfo.bigImg = rst.tempFilePaths[0];
						this.showCrop = true
					},
					fail:(err)=>{
						console.log(err)
					}
				});
			},
			cropImg() {
				this.preBigImg = this.ticketInfo.bigImg
				this.showCrop = true
			},
			//确认裁剪
			confirmCrop(ev) {
				console.log(ev)
				this.ticketInfo.bigImg = ev.path;
				this.showCrop = false
			},
			//取消裁剪
			cancelCrop() {
				this.ticketInfo.bigImg = this.preBigImg
				this.showCrop = false
			},
			//取消
			cancel() {
				this.ticketInfo = JSON.parse(JSON.stringify(this.preTicket))
				this.recommendFilm = null
				this.$refs['drawer'].close()
			},
			//保存
			save() {
				if (this.formSetting.bigImg && !this.ticketInfo.bigImg) {
					return uni.showToast({
						icon: 'none',
						title: '请上传海报'
					})
				}
				if (this.formSetting.ticketImg && !this.ticketInfo.ticketImg) {
					return uni.showToast({
						icon: 'none',
						title: '请上传电影票截图'
					})
				}
				if(this.formSetting.duration&&Number.isNaN(Number(this.ticketInfo.duration))){
					return uni.showToast({
						icon: 'none',
						title: '时长只支持数字'
					})
				}
				if(this.formSetting.price&&Number.isNaN(Number(this.ticketInfo.price))){
					return uni.showToast({
						icon: 'none',
						title: '票价只支持数字'
					})
				}
				this.$emit('save', JSON.parse(JSON.stringify(this.ticketInfo)))
				this.recommendFilm = null
				this.$refs['drawer'].close()
			},
			getDeviceWidth(){
				return uni.getSystemInfoSync().windowWidth
			}
		},
		created() {
			this.getHotFilm()
		},
		mounted() {
			this.ticketInfo = JSON.parse(JSON.stringify(this.form))
			this.preTicket = JSON.parse(JSON.stringify(this.ticketInfo))
		}
	}
</script>

<style scoped lang="less">
	.common-form {
		.tips{
			color:#ccc
		}
		.scroll-y {
			height: 100%;

			.form {
				padding-right: 15px;
				padding-top: 20px;

				.recommned {
					display: flex;
					align-items: center;
					height: 30px;
					color: #333;
					font-size: 12px;

					.name {
						color: #e04e0f;
						margin: 0 3px;
					}
				}

				.color-item {
					height: 20px;
					margin-top: 10px;
					display: flex;
					align-items: center;

					.color-name {
						color: #606266;
					}

					.show-color {
						margin-left: 5px;
						width: 15px;
						height: 15px;
					}

					.choose {
						text-align: center;
						width: 80px;
						height: 20px;
						line-height: 20px;
						color: #00a2ff;
					}
				}

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
