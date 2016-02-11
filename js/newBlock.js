///
/// Block and Region class
///

function Block(row, col)
{
	//Data
	this.row = row;
	this.col = col;
	
	//Edge type
	this.topEdge = 0;
	this.rightEdge = 0;
	this.bottomEdge = 0;
	this.leftEdge = 0;
	
	this.pathObj = null;
	this.getBlockPathStr = getBlockPathStr;
}

function getBlockPathStr()
{
	var pathStr = "M ";
			
	var ox = this.col * colUnit;
	var oy = this.row * rowUnit;
	var rowPart = rowUnit / 4;
	var colPart = colUnit / 4;
	
	//Move to begin point
	pathStr = pathStr + ox + " " + oy + " ";
		
	//Top edge, y fixed to oy
	var x = ox;
	var y = oy;
	
	if(this.topEdge == 1)	//1/4开始，1/2控制，3/4结束 高度1/2
	{
		x = ox + colPart;
		var ctrlX = x + colPart;
		var ctrlY = y - 2*rowPart;
		var endX = ctrlX + colPart;
		var endY = y;
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";
				
		x = ox + colUnit;
		pathStr = pathStr + x + " " + y + " ";
	}
	else if(this.topEdge == 2) //1/2开始，3/4控制，1结束 高度1/4
	{
		x = ox + colPart * 2;
		var ctrlX = x + colPart;
		var ctrlY = y + rowPart;
		var endX = ctrlX + colPart;
		var endY = y;
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";

		x = ox + colUnit;
		pathStr = pathStr + x + " " + y + " ";
	}
	else
	{
		x = ox + colUnit;
		pathStr = pathStr + " L " + x + " " + y + " ";
	}
	
	//Right edge, x fixed to ox + colUnit;
	x = ox + colUnit;

	if(this.rightEdge == 1) //1/4开始，1/2控制，3/4结束 高度1/2
	{
		y = oy + rowPart;
		
		var ctrlX = x + 2*colPart;
		var ctrlY = y + rowPart;
		var endX = x;
		var endY = ctrlY + rowPart;  
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";
		
		y = oy + rowUnit;
		pathStr = pathStr + x + " " + y + " ";
	}
	else if(this.rightEdge == 2) //1/2开始，3/4控制，1结束 高度1/4
	{
		y = oy + rowPart * 2;
		
		var ctrlX = x - colPart;
		var ctrlY = y + rowPart;
		var endX = x;
		var endY = ctrlY + rowPart;  
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";
		
		y = oy + rowUnit;
		pathStr = pathStr + x + " " + y + " ";
	}
	else
	{
		y = oy + rowUnit;
		pathStr = pathStr + " L " + x + " " + y + " ";
	}
	
	//Bottom edge, y fixed to oy + rowUnit;
	y = oy + rowUnit;
	if(this.bottomEdge == 1) //3/4开始，1/2控制，1/4结束 高度1/2
	{
		x = ox + colUnit - colPart;
		
		var ctrlX = x - colPart;
		var ctrlY = y - 2*rowPart;
		var endX = ctrlX - colPart;
		var endY = y;
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";

		x = ox;
		pathStr = pathStr + x + " " + y + " ";
	}
	else if(this.bottomEdge == 2)//1开始，3/4控制，1/2结束 高度1/4
	{
		x = ox + colUnit;// - colPart;
		
		var ctrlX = x - colPart;
		var ctrlY = y + rowPart;
		var endX = ctrlX - colPart;
		var endY = y;
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";

		x = ox;
		pathStr = pathStr + x + " " + y + " ";
	}
	else
	{
		x = ox;
		pathStr = pathStr + " L " + x + " " + y + " ";
	}
	
	//Left edge, x fixed to ox
	x = ox;
	if(this.leftEdge == 1) //3/4开始，1/2控制，1/4结束 高度1/2
	{
		y = oy + rowUnit - rowPart;
		
		var ctrlX = x + 2*colPart;
		var ctrlY = y - rowPart;
		var endX = x;
		var endY = ctrlY - rowPart;  
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";
		
		y = oy;
		pathStr = pathStr + x + " " + y + " ";
	}
	else if(this.leftEdge == 2)//1开始，3/4控制，1/2结束 高度1/4
	{
		y = oy + rowUnit;
		
		var ctrlX = x - colPart;
		var ctrlY = y - rowPart;
		var endX = x;
		var endY = ctrlY - rowPart;  
		pathStr = pathStr + " L " + x + " " + y + " Q " + ctrlX + " " + ctrlY + " " + endX + " " + endY + " L ";

		y = oy;
		pathStr = pathStr + x + " " + y + " ";
	}
	else
	{
		y = oy;
		pathStr = pathStr + " L " + x + " " + oy + " ";
	}
	
	//alert(pathStr);
	return pathStr;
}

//==========================================
function Region()
{
	//Data
	this.blocks = []
	this.rotateFlag = 0;
	
	//Methods
	this.addBlock = addBlock;
	this.hasBlock = hasBlock; 	//Test contain one specific block or not
	this.mergeRegion = mergeRegion; 
	this.isNeighbour = isNeighbour; //Test other region has neighbour block or not
}

function addBlock(block)
{
	this.blocks[this.blocks.length] = block;
}

function hasBlock(block)
{
	for(var i = this.blocks.length-1; i>=0; i--)
	{
		if(this.blocks[i] === block)
			return true;
	}
	
	return false;
}

function mergeRegion(newRegion)
{
	if( (newRegion == null) || (newRegion.blocks == null) )
		return;
		
	var transformStr = this.blocks[0].pathObj.getAttributeNS(null,"transform");
		
	//Copy all block from new region
	for(var i = newRegion.blocks.length-1; i>=0; i--)
	{
		newRegion.blocks[i].pathObj.setAttributeNS(null, "transform", transformStr);
		this.blocks[this.blocks.length] = newRegion.blocks[i];
	}
	
	newRegion.blocks = [];
}

function isNeighbour(newRegion)
{
	if(newRegion.blocks == null)
		return false;
	
	var block1, block2;
	for(var i = this.blocks.length-1; i>=0; i--)
	{
		block1 = this.blocks[i];
		for(var j = newRegion.blocks.length-1; j>=0; j--)
		{
			block2 = newRegion.blocks[j];
			
			//Same row, previous or next col is neighbour
			if( (block1.row == block2.row) && (Math.abs(block1.col - block2.col) == 1) )
				return true;
			
			//Same col, previous or next row is neighbour
			if( (block1.col == block2.col) && (Math.abs(block1.row - block2.row) == 1) )
				return true;
		}
	}

	return false;
}

