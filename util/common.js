//文本换行
export function drawText(ctx, str, leftWidth, initHeight, canvasWidth) {
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
}
export function drawRoundRectPath(cxt, width, height, radius, fillColor) {
	cxt.beginPath();
	//从右下角顺时针绘制，弧度从0到1/2PI
	cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
	//矩形下边线
	cxt.lineTo(radius, height);
	//左下角圆弧，弧度从1/2PI到PI
	cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
	//矩形左边线
	cxt.lineTo(0, radius);
	//左上角圆弧，弧度从PI到3/2PI
	cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
	//上边线
	cxt.lineTo(width - radius, 0);
	//右上角圆弧
	cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
	//右边线
	cxt.lineTo(width, height - radius);
	cxt.setStrokeStyle(fillColor);
	cxt.stroke();
	cxt.closePath();
}
export function fillRoundRect(cxt, x, y, width, height, radius, fillColor) {
	//圆的直径必然要小于矩形的宽高
	if (2 * radius > width || 2 * radius > height) {
		return false;
	}
	cxt.save();
	cxt.translate(x, y);
	//绘制圆角矩形的各个边
	drawRoundRectPath(cxt, width, height, radius, fillColor);
	cxt.fillStyle = fillColor || '#fff'; //若是给定了值就用给定的值否则给予默认值
	cxt.fill();
	cxt.restore();
}
