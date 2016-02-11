
2012-5-10

演示了HTML5中SVG与CANVAS结合的功能，利用SVG PATH接收复杂区域的用户输入，而CANVAS作为高效的画布进行图片的显示
主要技术：
动态生成包含贝塞尔曲线的SVG路径字符串
正则表达式解析SVG PATH字符串，并等效的进行CANVAS CLIP
拖动和旋转，通过转换矩阵做到SVG与CANVAS的同步11

7-4
针对IE9+，使用page-画布的offset（如果有嵌套则需要循环），而不是offsetXY

			if( Sys.ie == null) //For FireFox/Chrome/Safari
			{
				cx = ev.originalEvent.layerX;
				cy = ev.originalEvent.layerY;
			}	
			else //For IE9
			{
				cx = ev.originalEvent.pageX - canvas.offsetLeft;
				cy = ev.originalEvent.pageY - canvas.offsetTop;

			}

或者都统一到page - canvas的offsetLeft，而不使用layer（推荐）

顺便增加几个简单的声音效果