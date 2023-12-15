<template>
  <view class="TemplateB">
    <canvas class="canvas" canvas-id="TemplateB" id="TemplateB"></canvas>
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
import { fillRoundRect } from "../../../../util/common.js";
import CommonForm from "../CommonForm/CommonForm.vue";
export default {
  name: "TemplateB",
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
        lang: true,
        bigImg: true,
        mainTitle: true,
        duration: true,
        cinema: true,
        hall: true,
        seat: true,
        dateTime: true,
        deepColor: true,
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
          canvasId: "TemplateB",
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
    drawTicketPannel(cxt, width, height, radius) {
      cxt.save();
      cxt.translate(30, 1410);
      cxt.beginPath(0);
      cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
      cxt.lineTo(radius, height);
      cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
      cxt.lineTo(0, 480);
      cxt.arc(0, 456, 24, 0.5 * Math.PI, 1.5 * Math.PI, true);
      cxt.lineTo(0, radius);
      cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
      cxt.lineTo(width - radius, 0);
      cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
      cxt.lineTo(width, 432);
      cxt.arc(width, 456, 24, 1.5 * Math.PI, 0.5 * Math.PI, true);
      cxt.lineTo(width, height - radius);
      cxt.setStrokeStyle("#fff");
      cxt.stroke();
      cxt.closePath();
      cxt.setFillStyle("#fff");
      cxt.fill();
      cxt.restore();
    },
    getEndTime() {
      const startTime = this.ticketInfo.dateTime.split(" ")[1];
      const startH = Number(startTime.split(":")[0]);
      const startM = Number(startTime.split(":")[1]);
      const endTime = startH * 60 + startM + Number(this.ticketInfo.duration);
      const endH =
        parseInt(endTime / 60) >= 24
          ? parseInt(endTime / 60) - 24
          : parseInt(endTime / 60);
      const endM = endTime % 60;
      const formatH = endH < 10 ? `0${endH}` : endH;
      const formatM = endM < 10 ? `0${endM}` : endM;
      return `${formatH}:${formatM}`;
    },
    //绘制canvas
    drawTemplate() {
      if (this.loading) return;
      const width = 900;
      const ctx = uni.createCanvasContext("TemplateB", this);
      ctx.setTextAlign("left");
      ctx.font = "normal normal 36px Arial";
      //票根
      ctx.beginPath();
      ctx.setFillStyle("#fff");
      ctx.fillRect(0, 0, width, 2160);
      //海报
      ctx.beginPath();
      ctx.setFillStyle("#f1f1f1");
      ctx.fillRect(0, 0, width, 1260);
      ctx.drawImage(this.ticketInfo.bigImg, 0, 0, 900, 1260);
      //票边框
      ctx.beginPath();
      const grd = ctx.createLinearGradient(0, 1260, 0, 2400);
      grd.addColorStop(0, this.ticketInfo.deepColor);
      grd.addColorStop(1, "#f5f5f5");
      ctx.setFillStyle(grd);
      ctx.fillRect(0, 1260, 900, 900);
      //影院
      ctx.beginPath();
      fillRoundRect(
        ctx,
        30,
        1290,
        width - 60,
        180,
        18,
        this.ticketInfo.shallowColor
      );
      ctx.beginPath();
      ctx.setFontSize(42);
      ctx.setFillStyle("#fff");
      ctx.setGlobalAlpha(0.8);
      ctx.fillText(this.ticketInfo.cinema, 60, 1365);
      ctx.setGlobalAlpha(1);
      //信息详情
      this.drawTicketPannel(ctx, width - 60, 720, 24);
      //上半圆
      ctx.beginPath();
      ctx.arc(450, 1380, 60, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.setFillStyle(this.ticketInfo.shallowColor);
      ctx.fill();
      //类型
      ctx.beginPath();
      ctx.setFontSize(39);
      ctx.setFillStyle("#202020");
      ctx.fillText(
        `${this.ticketInfo.lang} ${this.ticketInfo.seat.split("/").length}张`,
        60,
        1620
      );
      //日期
      ctx.beginPath();
      ctx.setFontSize(36);
      ctx.setFillStyle("#686868");
      ctx.fillText(this.ticketInfo.dateTime.split(" ")[0], 60, 1725);
      //影厅
      ctx.beginPath();
      ctx.setFontSize(36);
      ctx.setFillStyle("#777777");
      ctx.fillText(this.ticketInfo.hall, 360, 1725);
      //座位
      ctx.beginPath();
      ctx.setFontSize(36);
      ctx.setFillStyle("#333333");
      ctx.fillText(this.ticketInfo.seat.split("/").join(" / "), 360, 1785);
      //虚线
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([24, 15], 12);
      ctx.setLineWidth(3);
      ctx.moveTo(60, 1866);
      ctx.lineTo(840, 1866);
      ctx.setStrokeStyle("#7d7e7b");
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      //标题
      ctx.beginPath();
      ctx.font = "normal bold 48px Arial";
      ctx.setFontSize(48);
      ctx.setFillStyle("#222222");
      ctx.fillText(this.ticketInfo.mainTitle, 60, 1545);
      //时间
      ctx.beginPath();
      ctx.font = "normal bold 39px Arial";
      ctx.setFontSize(39);
      ctx.setFillStyle("#333333");
      ctx.fillText(
        `${this.ticketInfo.dateTime.split(" ")[1]}~${this.getEndTime()}`,
        60,
        1785
      );
      //感谢
      ctx.beginPath();
      ctx.font = "normal bold 48px Arial";
      ctx.setTextAlign("center");
      ctx.setFontSize(48);
      ctx.setFillStyle("#000000");
      ctx.fillText("THANK YOU FOR WATCHING", 450, 1950);
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
        450,
        2040
      );
      //已放映
      ctx.beginPath();
      ctx.drawImage("/static/finish.png", 630, 1905, 210, 210);

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
.TemplateB {
  position: relative;

  .canvas {
    position: absolute;
    top: -9999px;
    width: 900px;
    height: 2160px;
  }
  .pic {
    display: block;
    margin: 0 auto;
    margin-top: 20rpx;
    width: 360rpx;
    height: 864rpx;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
  }
}
</style>
