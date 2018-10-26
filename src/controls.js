var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;



function move(){
	var DASFrames = 7;
	var instantDAS = false;
	if (holdLeft && (DASLeft == 0 || DASLeft > DASFrames)){
		while( instantDAS && DASLeft > DASFrames && validMove(-1, 0, minoNet)) minoX--;
		if (validMove(-1, 0, minoNet)) minoX--;
	}
	if (holdRight && (DASRight == 0 || DASRight > DASFrames)){	
		while( instantDAS && DASRight > DASFrames && validMove(1, 0, minoNet)) minoX++;
		if (validMove(1, 0, minoNet)) minoX++;
	}
	if (holdUp && (DASUp == 0 || DASUp > DASFrames)){
		while( instantDAS && DASUp > DASFrames && validMove(0, 1, minoNet)) minoY++;
		if (validMove(0, 1, minoNet)) minoY++;
	}
	if (holdDown && (DASDown == 0 || DASDown > DASFrames)){
		while( instantDAS && DASDown > DASFrames && validMove(0, -1, minoNet)) minoY--;
		if (validMove(0, -1, minoNet)) minoY--;
	}
	
	if (holdLeft) DASLeft++;
	if (holdRight) DASRight++;
	if (holdUp) DASUp++;
	if (holdDown) DASDown++;
}


function keyPress(e){
	if(bagEdit){
		       if (e.keyCode == 49 || e.keyCode == 73){
			addToBag(0);
		
		} else if (e.keyCode == 50 || e.keyCode == 74){
			addToBag(1);
		
		} else if (e.keyCode == 51 || e.keyCode == 76){
			addToBag(2);
		
		} else if (e.keyCode == 52 || e.keyCode == 79){
			addToBag(3);
		
		} else if (e.keyCode == 53 || e.keyCode == 83){
			addToBag(4);
		
		} else if (e.keyCode == 54 || e.keyCode == 84){
			addToBag(5);
		
		} else if (e.keyCode == 55 || e.keyCode == 90){
			addToBag(6);
		} else if (e.keyCode == 13){ // Enter is pressed, terminate bagEdit.
			endBagEdit();
		}
		return ;
	}
	

	// Numbers 1-7 spawn minos.
	if (e.keyCode == 49){
		spawnMino(0);
		
	} else if (e.keyCode == 50){
		spawnMino(1);
		
	} else if (e.keyCode == 51){
		spawnMino(2);
		
	} else if (e.keyCode == 52){
		spawnMino(3);
		
	} else if (e.keyCode == 53){
		spawnMino(4);
		
	} else if (e.keyCode == 54){
		spawnMino(5);
		
	} else if (e.keyCode == 55){
		spawnMino(6);
		
	// Arrow keys move the minos. Up to place the mino.
	} else if (e.keyCode == 37){
		holdLeft = true;
	
	} else if (e.keyCode == 39){
		holdRight = true;

	} else if (e.keyCode == 40){
		holdUp = true;
	
	} else if (e.keyCode == 38){
		holdDown = true;
	
	} else if (e.keyCode == 90){
		spinMino(false);
	
	} else if (e.keyCode == 88){
		spinMino(true);
	
	} else if (e.keyCode == 32){
		hardDrop();
		HDDelay = 5;
	
	} else if (e.keyCode == 16){
		hold();
	
	} else if (e.keyCode == 81){
		undo();
	
	} else if (e.keyCode == 87){
		redo();
	
	} else if (e.keyCode == 69){
		bagEdit = true;
	
	} else if (e.keyCode == 48){
		SRSDetail = true;
	
	} else {
		console.log(e.keyCode); // remove after
	
	}
	return;
	
}

function keyUnpress(e){
	if (e.keyCode == 37){
		holdLeft = false;
		DASLeft = 0;
	} else if (e.keyCode == 39){
		holdRight = false;
		DASRight = 0;
	} else if (e.keyCode == 40){
		holdUp = false;
		DASUp = 0;
	} else if (e.keyCode == 38){
		holdDown = false;
		DASDown = 0;
	} else if (e.keyCode == 32){
		HDDelay = 0;
	}
}
