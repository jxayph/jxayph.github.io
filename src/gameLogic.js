function move(){
	var moved = false;
	var DASFrames = 7;
	var instantDAS = false;
	if (holdX==1 && (DASLeft == 0 || DASLeft > DASFrames)){
		while( instantDAS && DASLeft > DASFrames && validMove(-1, 0, minoNet)) minoX--;
		if (validMove(-1, 0, minoNet)){
			minoX--;
			moved = true;
		}
	}
	if (holdX==2 && (DASRight == 0 || DASRight > DASFrames)){
		while( instantDAS && DASRight > DASFrames && validMove(1, 0, minoNet)) minoX++;
		if (validMove(1, 0, minoNet)){
			minoX++;
			moved = true;
		}
	}
	if (holdUp && (DASUp == 0 || DASUp > DASFrames)){
		while( instantDAS && DASUp > DASFrames && validMove(0, 1, minoNet)) minoY++;
		if (validMove(0, 1, minoNet)){
			minoY++;
			moved = true;
		}
	}
	if (holdDown && (DASDown == 0 || DASDown > DASFrames)){
		while( instantDAS && DASDown > DASFrames && validMove(0, -1, minoNet)) minoY--;
		if (validMove(0, -1, minoNet)){
			minoY--;
			moved = true;
		}
	}
	
	if(holdDrop && bitByBit && moved){
		if(board[minoX][minoY] == 0) board[minoX][minoY] = 8;
		else board[minoX][minoY] = 0;
		return;	
	}
	
	if (holdLeft) DASLeft++;
	if (holdRight) DASRight++;
	if (holdUp) DASUp++;
	if (holdDown) DASDown++;
}
function validMove(dX,dY, net){
	if( bitByBit  && inBounds(minoX + dX, minoY + dY)) return true;
	if (!inBounds(minoX + dX, minoY + dY) || board[minoX + dX][minoY + dY]){
		return false;
	}
	else{
		
		for (var i = 0; i < 3; i++){
			var x = minoX + dX + net[i][0];
			var y = minoY + dY + net[i][1];
			if(!inBounds(x,y) || board[x][y]) return false;
		}
	}
	return true;
}

function resetGame(){
	initializeBoard();
	bag = shuffleBag();
	holdMino = 8;
	
	eventLog = [];
	redoLog  = [];
	
	minoCount = [0, 0, 0, 0, 0, 0, 0,]
	chooseMino();
}

function inBounds(x, y){
	return ( (x >= 0 && x < 10)&&( y >= 0 && y < 22) );
}

function validBlock(x, y){
	if (inBounds(x, y) && (board[x][y] == 0)) return true;
	else return false;
}

function shuffleArray(candidates){

	for (var i = 0; i < candidates.length; i++){
		var maxIdx = candidates.length - i;
		var rIdx = Math.floor(Math.random() * maxIdx);
		var temp = candidates[rIdx];
		candidates[rIdx] = candidates[maxIdx - 1];
		candidates[maxIdx - 1] = temp;
	}
	return candidates;
}

function shuffleBag(){

	return shuffleArray([0, 1, 2, 3, 4, 5, 6]);
}

function hardDrop(){
	
	console.log(HDDelay);
	
    //HDDelay = 0;
	if (HDDelay > 0) return;
	saveState();
	
	
	if(bitByBit){
		if(board[minoX][minoY] == 0) board[minoX][minoY] = 8;
		else board[minoX][minoY] = 0;
		return;
	}
	
	var dropped = false;
	
	while(!dropped){ // Check to see if the mino is at the bottom.
		dropped = true;
		if(validMove(0,1, minoNet)){
			dropped = false;
			minoY++;
		}
	}

	board[minoX][minoY] = minoKey;
	for (var i = 0; i < 3; i++){
		board[minoX + minoNet[i][0]][minoY + minoNet[i][1]] = minoKey;
	}
	
	minoCount[minoKey - 1]++; // Debug info
	clearLines();
	chooseMino();
}

function chooseMino(){
	spawnMino( bag.pop() );
	
	if( bag.length < 5){
		// Extend the array with a new bag.
		bag = shuffleBag().concat(bag);
		}
}

function hold(){
	if (holdMino == 8){ // If the hold is empty, simply set the hold and spawn a new mino.
		holdMino = minoKey;
		chooseMino();
	}else{ // Otherwise, we need to swap the minos.
		var temp = minoKey;
		minoKey = holdMino;
		spawnMino(minoKey - 1);
		holdMino = temp;
	}
	return;
}

function clearLines(){
	// For every row in the board check if it's ready to clear
	
	for (var row = 21; row >=0; row--){
		var complete = true;
		
		for(var col = 0; col < 10; col++){
			if (board[col][row] == 0){
				complete = false;
				
			}
		}
		
		if (complete){
			shiftDown(row);
			row++;
		}
		
	}
	return;
}

function shiftDown(row){
	// Starting at the row where we cleared the line, copy the board above down.
	for (; row > 0; row--){
		for (var col = 0; col < 10; col++){
			board[col][row] = board[col][row - 1];
		}
	}
	
	for (var col = 0; col < 10; col++){
		board[col][0] = 0;
	}
}

function initializeBoard(){
	for (var col = 0; col < 10; col++){
		board[col] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
}



