
function drawPreview(){
	var tempOffset = 25;
	var x = 340;
	var y = 10+tempOffset;
	var numPreviews = 5;
	
	var scale = 100
	drawBox(x, y, scale, scale, 2,"black", "gray");
	drawMini(scale / 4, x, y, bag[bag.length-1] + 1);
	
	y += 1.1*scale;
	scale = 78;
	
	for ( var i = 1; i < numPreviews; i++){
		drawBox(x, y, scale, scale, 2,"black", "gray");
		drawMini(scale / 4, x, y, bag[bag.length - 1 - i] + 1);
		y += 1.1 * scale;
	
	}
		
	canvasContext.fillStyle = "black";
	canvasContext.font="20px Arial";
	canvasContext.fillText("Next:",340,30);
}



function drawMini(scale, x, y, mino){
	scale *= 0.9;
	x += scale*0.2;
	y += scale*0.2;
	if(mino == 8) return;
	[x,y] = findCenter(scale, x, y, mino);
	
	
	drawRect(x, y, scale, scale, colourKey(mino));
	var thisNet = getMinoNet(mino-1);
	for (var n = 0; n < 3; n++){
		drawRect(x + scale * thisNet[n][0], y + scale * thisNet[n][1], scale, scale, colourKey(mino));
	}
}

function getMinoNet(mino){
	
	if        (mino == 0){
		return ([[-1, 0], [1, 0], [2, 0]]);
		
	} else if (mino == 1){
		return ([[-1, 0], [1, 0], [-1, -1]]);	
		
	} else if (mino == 2){
		return ([[-1, 0], [1, 0], [1, -1]]);
		
	} else if (mino == 3){
		return ([[1 ,0], [0 ,-1], [1, -1]]);
		
	} else if (mino == 4){
		return ([[-1, 0], [0, -1], [1, -1]]);
		
	} else if (mino == 5){
		return ([[-1, 0], [1, 0], [0, -1]]);
		
	} else if (mino == 6){
		return ([[1, 0], [0, -1], [-1, -1]]);
		}
}

function findCenter(scale, x, y, mino){
	mino -= 1;
	if        (mino == 0){
		return ([x + scale, y + 1.5*scale ]);
		
	} else if (mino == 1){
		return ([x + 1.5*scale, y + 2*scale]);
		
	} else if (mino == 2){
		return ([x + 1.5*scale, y + 2*scale]);
		
	} else if (mino == 3){
		return ([x + scale, y + 2*scale]);
		
	} else if (mino == 4){
		return ([x + 1.5*scale, y + 2*scale]);
		
	} else if (mino == 5){
		return ([x + 1.5*scale, y + 2*scale]);
		
	} else if (mino == 6){
		return ([x + 1.5*scale, y + 2*scale]);
		}
}

