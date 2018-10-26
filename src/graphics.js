
function draw(){	
	drawBackground();
	drawBoard();
	if (!noGhost) drawGhost();
	drawMino();
	drawGrid();
	drawUI();
}

function drawBox(x, y, width, height, borderWidth, clr1, clr2){
	drawRect(x,y,width, height, clr1);
	drawRect(x + borderWidth,y + borderWidth, width - 2*borderWidth, height - 2*borderWidth, clr2);
}

function drawGrid(){
	
	var xOffset = 80;
	var yOffset = 0;

	for (var i = 0; i < 21; i++){
		drawRect(0 + xOffset,i*25, 250,1,"black")
	}
	
	for (var i = 0; i < 11; i++){
		drawRect(i*25 + xOffset, 0, 1, 500, "black")
	}
	
}

function drawBoard(){
	var xOffset = 80;
	var yOffset = 0;
	
	drawRect(xOffset,0,250,500, "#283234");
	
	for (var row = 0; row < 20; row++){
		for (var col = 0; col < 10; col++){
			if (board[col][row] != 0){
				drawRect(col*25 + xOffset, row*25, 25, 25, colourKey(board[col][row])); 
			}
		}		
	}
	
}

function drawRect(x, y, width, height, colour){
	canvasContext.fillStyle = colour;
	canvasContext.fillRect(x,y,width,height);
}

function drawBackground(){	
	drawRect(0,0,canvas.width,canvas.height, "lightgray");
	//drawRect(0,0,canvas.width,canvas.height, "#283234");
}

function drawUI(){	
	drawHold();
	drawPreview();
	canvasContext.fillStyle = "black";
	
	// The Next 
	/*canvasContext.fillText("Next: " + nameKey(bag[bag.length - 1] + 1) + " " + 
									  nameKey(bag[bag.length - 2] + 1) + " " + 
									  nameKey(bag[bag.length - 3] + 1) + " " + 
									  nameKey(bag[bag.length - 4] + 1) + " " + 
									  nameKey(bag[bag.length - 5] + 1), 
									  260, 130);
	*/								
	canvasContext.font="15px Arial";	
	// Detailed SRS Display
	//canvasContext.font = "20px Arial";
	//canvasContext.fillText("Detailed SRS: " + SRSDetail, 270, 80);
	// Control scheme
	
	canvasContext.font = "15px Arial";
	canvasContext.fillText("Spawn Mino - Numbers 1 -> 7 (IJLOSTZ)", 10, 525);
	canvasContext.fillText("Undo / Redo - Q, W", 10, 540);
	canvasContext.fillText("Hard Drop - Space", 10, 555);
	canvasContext.fillText("Rotate CCW / CW - Z, X", 10, 570);
	canvasContext.fillText("Hold - Left or Right Shift", 10, 585);
	canvasContext.fillText("Bag arranger - E", 10, 600);
	canvasContext.fillText("I,J,L,O,S,T,Z", 10, 630);
	canvasContext.fillText(minoCount, 10, 645);	
}

function drawMino(){

	var xOffset = 80;
	var yOffset = 0;
	var x = minoX*25 + xOffset;
	var y = minoY*25 + yOffset;
	drawRect(x, y, 25, 25, "Black");
	for (var n = 0; n < 3; n++){
		drawRect(x + 25 * minoNet[n][0], y + 25 * minoNet[n][1], 25, 25, colourKey(minoKey));
	}
}

function drawHold(){
	var tempOffset = 15;
	var x = 6;
	var y = 10+tempOffset;
	
	var scale = 68
	drawBox(x, y, scale, scale, 2,"black", "gray");
	drawMini(scale / 4, x, y, holdMino);
	
	canvasContext.fillStyle = "black";
	canvasContext.font="20px Arial";
	canvasContext.fillText("Hold:",x,y-5);
}

function drawGhost(){
	var xOffset = 80;
	var yOffset = 0;
	var bottom = false;
	var toBottom = 0;
	while(!bottom){ // Check to see if the mino is at the bottom.
		bottom = true;
		if(validMove(0,toBottom, minoNet)){
			toBottom++;
			bottom = false;
		}
	}
	toBottom--;
	var x = minoX*25 + xOffset;
	var y = (minoY + toBottom) * 25 + yOffset;
	drawRect(x, y, 25, 25, "rgb(161, 161, 120)");
	for (var n = 0; n < 3; n++){
		drawRect(x + 25 * minoNet[n][0], y + 25 * minoNet[n][1], 25, 25, "rgb(161, 161, 120)");
	}
}