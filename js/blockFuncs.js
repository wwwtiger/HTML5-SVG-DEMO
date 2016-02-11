var svgNS = "http://www.w3.org/2000/svg";
var xlinkNS="http://www.w3.org/1999/xlink";
var evNS = "http://www.w3.org/2001/xml-events"

var PATH_ID = "path";
var OUTLINE_ID = "outline";
var OUTLINE_STROKE = "none";
var HIGHLIGHT_OUTLINE_STROKE = "black";
var OUTLINE_STROKE_WIDTH = 1;

var imageWidth = 400;  
var imageHeight = 400; 
var MIN_MERGE_DISTANCE = 8;  //Merge distance      

var imageRow = 3;   //You can change from Row and column number from 1 to 10
var imageCol = 3;
var rowUnit;  //Height of each row
var colUnit; //Width of each column

var blocks = [];
var regions = [];
var currPath = null;
var currOverPath = null;

function roundSize()
{
	if( imageRow > 10)
		imageRow = 10;
	if( imageCol > 10 )
		imageCol = 10;
	
	imageWidth = imageWidth - imageWidth % ( imageCol * 4 );
	imageHeight = imageHeight - imageHeight % ( imageRow * 4 );
	
	rowUnit = imageHeight / imageRow;  //Row part unit
	colUnit = imageWidth / imageCol; //Col part unit
}


//为BLOCK创建SVG PATH对象
function createPathObj(block)
{
	var pathStr = block.getBlockPathStr();
	var path = document.createElementNS(svgNS, "path");
	path.setAttributeNS(null, "id", PATH_ID + "_" + block.id);
	path.setAttributeNS(null, "d", pathStr);
	path.setAttributeNS(null, "fill", "white");
	path.setAttributeNS(null, "fill-opacity", "0");
	path.setAttributeNS(null, "stroke", OUTLINE_STROKE);
	path.setAttributeNS(null, "stroke-width", 0); //OUTLINE_STROKE_WIDTH);
	path.setAttributeNS(null, "class", "block");
	path.onmousedown = function(){ 
		if(currPath != this)
		{
			currPath = this;
			this.setAttributeNS(null, "pointer-events", "none");
		}
		this.setAttributeNS(null, "stroke", "red");
		this.setAttributeNS(null, "stroke-width", 3); 
		//currPath.setAttributeNS(null, "stroke-width", 2*OUTLINE_STROKE_WIDTH);
		}; //Hammer的ondragstart有延时，因此用onmousedown代替
		
	path.onmouseup = function(){ 
		if(currPath == this) 
			this.setAttributeNS(null, "pointer-events", "all"); 
	}; 
	
	path.onmouseover = function(){
		
		this.setAttributeNS(null, "fill-opacity", "0.5"); 
		this.setAttributeNS(null, "stroke", "yellow");
		this.setAttributeNS(null, "stroke-width", 3); 
		var idStr = this.getAttributeNS(null, "id"); 
		console.log('Mouse over ' + idStr);

	}; 
	path.onmouseout = function(){ 
		this.setAttributeNS(null, "fill-opacity", "0");
		this.setAttributeNS(null, "stroke", OUTLINE_STROKE);
		this.setAttributeNS(null, "stroke-width", 0); 
	}; 
		
	return path;
}

//创建BLOCK列表
function createBlockList()
{
	//Edge type current support
	// 0: line; 1: one big circle (up or right); 2: one small circle (down or left) 
	var edgeTypeNumber = 2;
	
	//Horizontal edge [row+1][col]	vertical [row][col+1]
	//In order to simplize usage, we just use string to hold edge type
	
	var hEdges = [];
	var vEdges = [];
	
	for(var i = imageRow ; i>=0; i--)
	{
		for(var j = imageCol-1; j>=0 ; j--)
		{
			if( (i == 0) || ( i== imageRow ) )
				hEdges.push(0);
			else
				hEdges.push( ( parseInt( Math.random() * 10 )  ) % edgeTypeNumber + 1);
		}
	}
		
	for(var i = imageRow-1; i>=0; i--)
	{
		for(var j = imageCol; j>=0; j--)
		{
			if( (j == 0) || ( j == imageCol ) )
				vEdges.push(0);
			else
				vEdges.push( ( parseInt( Math.random() * 10 )  ) % edgeTypeNumber + 1);
		}
	}
	
	for(var i = imageRow-1; i>=0; i--)
	{
		for(var j = imageCol-1; j>=0; j--)
		{
			var block = new Block(i, j);
			
			//Create blocks
			block.id = "b" + i + "_" + j;
			block.topEdge = hEdges[i*imageCol + j];
			block.bottomEdge = hEdges[ (i+1)*imageCol + j];
			
			block.leftEdge = vEdges[i* (imageCol + 1) + j];
			block.rightEdge = vEdges[i* (imageCol + 1) + j + 1];
			
			block.pathObj = createPathObj(block);
			//alert(i + " " + j + ": " + block.topEdge + " " + block.rightEdge + " " + block.bottomEdge +  " " + block.leftEdge);
			blocks.push(block);
		}
	}

	//alert(blockList.length);
}

//创建REGION列表
function createRegionList()
{
	for(var i = imageRow-1; i>=0; i--)
		{
		for(var j = imageCol-1; j>=0; j--)
		{
			var id = "part_" + i + "_" + j;
				
			var region = new Region();
			region.addBlock( blocks[ i*imageCol + j ] );
			regions.push(region);
		}
	}
}

