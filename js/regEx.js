
var reg = /,/g;				//简化路径字符串
var mainReg = /[MLCQZ][^MLCQZ]*/g;	//找到每个画图操作
var numReg = /\s*\d+\s*/g;              //找到数字参数

//使用正则表达式得到字符串解析结果数组	
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