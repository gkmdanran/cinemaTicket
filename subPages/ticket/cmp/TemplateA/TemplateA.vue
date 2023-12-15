<template>
  <view class="TemplateA">
    <canvas class="canvas" canvas-id="TemplateA" id="TemplateA"></canvas>
    <image class="pic" :src="ticketUrl" mode="widthFix"></image>
    <CommonForm
      ref="form"
      @save="handleSave"
      :form="ticketInfo"
      :formSetting="formSetting"
    >
    </CommonForm>
  </view>
</template>

<script>
import { drawText } from "../../../../util/common.js";
import CommonForm from "../CommonForm/CommonForm.vue";
export default {
  name: "TemplateA",
  components: {
    CommonForm,
  },
  props: {
    ticketInfo: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      ticketUrl: "",
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
      },
    };
  },
  methods: {
    //打开抽屉
    showDrawer() {
      this.$refs["form"].showDrawer();
    },
    //保存预览
    handleSave(form) {
      this.$emit("save", form);
    },
    //生成图片
    createImage() {
      uni.canvasToTempFilePath(
        {
          quality: 1,
          canvasId: "TemplateA",
          success: (res) => {
            if (res.tempFilePath) {
              this.ticketUrl = res.tempFilePath.replace(/[\r\n]/g, "");
            }
          },
          complete: () => {
            this.loading = false;
            uni.hideLoading();
          },
        },
        this
      );
    },
    //绘制canvas
    drawTemplate() {
      if (this.loading) return;
      const width = 900;
      const leftOffset = 30;
      const rightOffset = width - leftOffset;
      const ctx = uni.createCanvasContext("TemplateA", this);
      ctx.setTextAlign("left");
      ctx.font = "normal normal 36px Arial";
      //票根
      ctx.beginPath();
      ctx.setFillStyle("#fff");
      ctx.fillRect(0, 0, width, 2550);
      //海报
      ctx.beginPath();
      ctx.setFillStyle("#f1f1f1");
      ctx.fillRect(0, 0, width, 1260);
      ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 900, 1260);
      //副标题
      ctx.beginPath();
      ctx.setFontSize(36);
      ctx.setFillStyle("#191919");
      ctx.fillText(this.ticketInfo.subTitle, leftOffset, 1410);
      //虚线
      const dashYarr = [1440, 1656];
      dashYarr.forEach((item) => {
        ctx.beginPath();
        ctx.setLineDash([24, 18], 12);
        ctx.moveTo(leftOffset, item);
        ctx.lineTo(rightOffset, item);
        ctx.setLineWidth(6);
        ctx.setStrokeStyle("#7d7e7b");
        ctx.stroke();
      });
      //详情
      const detailH = 60;
      const detailArr = [
        `${this.ticketInfo.duration} 分钟`,
        this.ticketInfo.kinds,
        `${this.ticketInfo.releaseTime} 上映`,
      ];
      detailArr.forEach((item, index) => {
        ctx.beginPath();
        ctx.setFontSize(36);
        ctx.setFillStyle("#4d4d4d");
        ctx.fillText(item, leftOffset, 1500 + index * detailH);
      });
      //票信息
      const infoWidth = (width - 2 * leftOffset) / 3;
      const InfoLabelArr = [
        {
          txt: "CINEMA/影院:",
          x: leftOffset,
          y: 1740,
        },
        {
          txt: "HALL/影厅:",
          x: leftOffset,
          y: 1890,
        },
        {
          txt: "SEAT/座位:",
          x: leftOffset + infoWidth,
          y: 1890,
        },
        {
          txt: "PRICE/票价:",
          x: leftOffset + infoWidth * 2,
          y: 1890,
        },
        {
          txt: "DATE/日期:",
          x: leftOffset,
          y: 2070,
        },
        {
          txt: "TIME/时间:",
          x: leftOffset + infoWidth,
          y: 2070,
        },
      ];
      InfoLabelArr.forEach((item) => {
        ctx.beginPath();
        ctx.setFontSize(39);
        ctx.setFillStyle("#928d89");
        ctx.fillText(item.txt, item.x, item.y);
      });
      const InfoCntArr = [
        {
          txt: this.ticketInfo.cinema,
          x: leftOffset,
          y: 1800,
        },
        {
          txt: this.ticketInfo.hall,
          x: leftOffset,
          y: 1950,
        },
        {
          txt: this.ticketInfo.seat.split("/")[0],
          x: leftOffset + infoWidth,
          y: 1950,
        },
        {
          txt: `￥ ${this.ticketInfo.price}`,
          x: leftOffset + infoWidth * 2,
          y: 1950,
        },
        {
          txt: this.ticketInfo.dateTime.split(" ")[0],
          x: leftOffset,
          y: 2130,
        },
        {
          txt: this.ticketInfo.dateTime.split(" ")[1],
          x: leftOffset + infoWidth,
          y: 2130,
        },
      ];
      InfoCntArr.forEach((item, index) => {
        ctx.beginPath();
        ctx.setFontSize(36);
        ctx.setFillStyle("#928d89");
        if (index === 0) {
          ctx.fillText(item.txt, item.x, item.y);
        } else {
          drawText(ctx, item.txt, item.x, item.y, infoWidth - 15);
        }
      });
      if (this.ticketInfo.seat.split("/")[1]) {
        ctx.beginPath();
        ctx.setFontSize(36);
        ctx.setFillStyle("#928d89");
        ctx.fillText(
          this.ticketInfo.seat.split("/")[1],
          leftOffset + infoWidth,
          666 * 3
        );
      }
      //虚线
      ctx.beginPath();
      ctx.setLineDash([30, 15], 15);
      ctx.moveTo(0, 2250);
      ctx.lineTo(width, 2250);
      ctx.setLineWidth(9);
      ctx.setStrokeStyle("#000000");
      ctx.stroke();
      //左打孔点
      ctx.beginPath();
      ctx.arc(0, 2250, 24, 0, 1080, false);
      ctx.setFillStyle("#000000");
      ctx.fill();
      //右打孔点
      ctx.beginPath();
      ctx.arc(width, 2250, 24, 0, 1080, false);
      ctx.setFillStyle("#000000");
      ctx.fill();
      //主标题
      ctx.beginPath();
      ctx.font = "normal bold 48px Arial";
      ctx.setFontSize(48);
      ctx.setFillStyle("#000000");
      ctx.fillText(this.ticketInfo.mainTitle, leftOffset, 1350);
      //感谢
      ctx.beginPath();
      ctx.font = "normal bold 48px Arial";
      ctx.setTextAlign("center");
      ctx.setFontSize(48);
      ctx.setFillStyle("#000000");
      ctx.fillText("THANK YOU FOR WATCHING", 450, 2340);
      //留念日期
      ctx.beginPath();
      ctx.font = "normal bold 42px Arial";
      ctx.setTextAlign("center");
      ctx.setFontSize(42);
      ctx.setFillStyle("#000000");
      ctx.fillText(
        `${this.ticketInfo.dateTime
          .split(" ")[0]
          .split("-")
          .join("/")} 观影留念`,
        150 * 3,
        810 * 3
      );
      //已放映
      ctx.beginPath();
      ctx.drawImage('/static/finish.png', 630, 2280, 240, 240);
      ctx.draw();
      this.loading = true;
      uni.showLoading({
        title: "生成中...",
        mask: true,
      });
      setTimeout(() => {
        this.createImage();
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.TemplateA {
  position: relative;
  .canvas {
    position: absolute;
    top: -9999px;
    width: 900px;
    height: 2550px;
  }
  .pic {
    display: block;
    margin: 0 auto;
    margin-top: 20rpx;
    width: 360rpx;
    height: 1020rpx;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
  }
}
</style>
