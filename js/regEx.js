
var reg = /,/g;				//��·���ַ���
var mainReg = /[MLCQZ][^MLCQZ]*/g;	//�ҵ�ÿ����ͼ����
var numReg = /\s*\d+\s*/g;              //�ҵ����ֲ���

//ʹ��������ʽ�õ��ַ��������������	
function  execReg(reg,str)
{
	var list = [];
	do
	{
		var result =  reg.exec(str);
		if(result == null)
		{
			break;
		}
		list.push(result[0]);
		
	}while(1);
	return list;
}