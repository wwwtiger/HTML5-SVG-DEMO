
2012-5-10

��ʾ��HTML5��SVG��CANVAS��ϵĹ��ܣ�����SVG PATH���ո���������û����룬��CANVAS��Ϊ��Ч�Ļ�������ͼƬ����ʾ
��Ҫ������
��̬���ɰ������������ߵ�SVG·���ַ���
������ʽ����SVG PATH�ַ���������Ч�Ľ���CANVAS CLIP
�϶�����ת��ͨ��ת����������SVG��CANVAS��ͬ��11

7-4
���IE9+��ʹ��page-������offset�������Ƕ������Ҫѭ������������offsetXY

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

���߶�ͳһ��page - canvas��offsetLeft������ʹ��layer���Ƽ���

˳�����Ӽ����򵥵�����Ч��