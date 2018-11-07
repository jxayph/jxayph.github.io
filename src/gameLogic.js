
function validMove(dX,dY, net){
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

function inBounds(x, y){
	return ( (x >= 0 && x < 10)&&( y >= 0 && y < 20) );
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
    HDDelay = 0;
	if (HDDelay != 0) return;
	saveState();
	
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
	
	for (var row = 19; row >=0; row--){
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
		board[col] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
}



