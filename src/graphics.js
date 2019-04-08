var blinkCounter = 0; // Red blinker for the menu

function draw(keyBinds, drawState){	
	drawBackground();
	drawBoard();
	drawButtons();
	
	if (drawState.ghost && !detailStepping && !bitByBit) drawGhost();
	
	drawMino();
	drawGrid();
	
	if (detailStepping && minoKey != 4) drawSRSGhost();
	
	drawUI(drawState);
	
	if (controlsMenu){
		blinkCounter++;
		drawSetControlsDisplay(keyBinds);	
	}
	
}

function drawBox(x, y, width, height, borderWidth, clr1, clr2){
	drawRect(x,y,width, height, clr1);
	drawRect(x + borderWidth,y + borderWidth, width - 2*borderWidth, height - 2*borderWidth, clr2);
}

function drawGrid(){
	
	var xOffset = 80;
	var yOffset = 0;

	for (var i = 2; i < 23; i++){
		drawRect(0 + xOffset,i*25, 250,1,"black")
	}
	
	for (var i = 0; i < 11; i++){
		drawRect(i*25 + xOffset, 50, 1, 500, "black")
	}
	
}

function drawBoard(){
	var xOffset = 80;
	var yOffset = 0;
	
	drawRect(xOffset,0,251,550, "#283234");
	
	for (var row = 0; row < 22; row++){
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

function drawUI(drawState){	
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
	
	// Control scheme
	
	canvasContext.font = "15px Arial";
	canvasContext.fillText("Detailed SRS Toggle |  " + drawState.SRS, 10, 570);
	canvasContext.fillText("Cleaered Lines |  " + clearedLines, 10, 590);
	canvasContext.fillText("I,J,L,O,S,T,Z", 10, 680);
	canvasContext.fillText(minoCount, 10, 695);	
}

function drawMino(){

	var xOffset = 80;
	var yOffset = 0;
	var x = minoX*25 + xOffset;
	var y = minoY*25 + yOffset;
	
	for (var n = 0; n < 3; n++){
		drawRect(x + 25 * minoNet[n][0], y + 25 * minoNet[n][1], 25, 25, colourKey(minoKey));
	}
	drawRect(x, y, 25, 25, "Black");
	if(bitByBit && holdDrop) drawRect(x, y, 25, 25, "White");
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

function drawSRSGhost(){
	
	var dX = detailOffsets[detailStage][0];
	var dY = detailOffsets[detailStage][1];
	
	
	canvasContext.font = "15px Arial";
	canvasContext.fillText("Testing offset " + (detailStage), 300, 575);
	canvasContext.fillText("dX: " + dX + " dY: " + -1*dY, 300, 590);
	canvasContext.fillText("Press ENTER to skip", 300, 605);
	
	
	var xOffset = 80;
	var yOffset = 0;
	var x = (minoX+dX)*25 + xOffset;
	var y = (minoY+dY)*25 + yOffset;
	if (validBlock(minoX + dX, minoY + dY) ) drawRect(x, y, 25, 25, "lightgreen");
	else drawRect(x, y, 25, 25, "darkred");
	for (var n = 0; n < 3; n++){
		if (validBlock(minoX + dX + detailNetClone[n][0], minoY + dY + detailNetClone[n][1])) drawRect(x + 25 * (detailNetClone[n][0]), y + 25 * (detailNetClone[n][1]), 25, 25, "lightgreen");
		else drawRect(x + 25 * (detailNetClone[n][0]), y + 25 * (detailNetClone[n][1]), 25, 25, "darkred");
	}
}

function drawButtons(){
	for (var i = 0; i < buttons.length; i++){
		buttons[i].draw();
	}
}

function drawControlsMenu(keyBinds){
	
	var keyBindNames = ["Move left ",
						"Move right",
						"Soft drop ",
						"Move up   ",
						"Rotate CCW",
						"Rotate CW ",
						"Hold mino ",
						"Hard drop ",
						"Undo      ",
						"Redo      ",
						"Bag editor",
						"SRS detail",
						"Show ghost",
						"Reset game",
						"Build mode"];//[0-14]
						
	var x = 100;
	var y = 20;
	var width = 210;
	var height = keyBindNames.length*30 + 61
	
	
	
	drawRect(x, y, width, height, "Black");
	drawRect(x + 2, y+2, width - 4, height - 4, "White");
	
	
	// Draw the highlight on a menu item, flash on/off every second.
	if(Math.floor(blinkCounter/30)%2==0)
		drawRect(x + 2 + 129*setKeyBind, y + 31 + 30*keyBindIndex, 10, 29, "red");
	
	canvasContext.font = "25px Arial";
	drawRect(x, y + 30, width, 2, "Black");
	canvasContext.fillText("Controls :", x + 10, y + 25);
	
	canvasContext.font = "10px Arial";
	canvasContext.fillText("Right arrow to", x + 130, y + 15);
	canvasContext.fillText("assign key", x + 130, y + 25);
	canvasContext.font = "18px Arial";	
	
						
						
	var dY = 30;
	for (var i = 0; i < keyBindNames.length; i++){
		drawRect(x, y + 60 + i*dY, width, 1, "Black");
		canvasContext.fillText(keyBindNames[i], x + 20, y + 55 + i*dY);
		canvasContext.fillText(getKeyNameFromCode(keyBinds[i]), x + 140, y + 55 + i*dY);
		
	}
	
	drawRect (x + 130, y + 30, 1, height - 60, "Black");
	
	canvasContext.fillText("Press Esc to exit", x + 35, y + height - 10);	
	
}

function getKeyNameFromCode(keyCode){
	if (( keyCode > 64 && keyCode < 91) || ( keyCode > 47 && keyCode < 58) ){
		return String.fromCharCode(keyCode);
	}
	var keyDict = {
		13: "Return",
		16: "Shift",
		17: "Ctrl",
		18: "Alt",
		27: "Esc",
		32: "Space",
		33: "Pg Up",
		34: "Pg Dn",
		35: "End",
		36: "Home",
		37: "Left",
		38: "Up",
		39: "Right",
		40: "Down",
		45: "Insert",
		46: "Del",	
		113: "F2",
		115: "F4"		
		}
		
	return (keyDict[keyCode]);
/*
	<  - > 188
	>  - > 190
	?  - > 191
	;  - > 186
	'  - > 222
	\  - > 220
	[  - > 219
	]  - > 221
	-  - > 189
	=  - > 187
	*/
	
	
}


function drawSetControlsDisplay(keyBinds){
	drawControlsMenu(keyBinds);
	
	
	// A box overlaying the playfield.
	/*
	canvasContext.font="15px Arial";
	canvasContext.fillStyle = "black";
	
	canvasContext.fillText("Press the key you would ", 120, 50 );
	canvasContext.fillText("like to bind to:", 150, 70 );
	
	var textX = x + width / 2 - 4*keyBindNames[changeIndex].length;
	console.log(keyBindNames[changeIndex]);
	canvasContext.fillText(keyBindNames[changeIndex], textX, 100 );
	*/
}
