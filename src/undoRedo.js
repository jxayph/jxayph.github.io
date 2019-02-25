var eventLog=[];
var redoLog = [];

function saveState(){
	// Reset the redoLog to nothing since we're branching off
	redoLog = [];
	
	// Push the gamestate to the eventLog. eventLog is limited to the last 140 moves.
	if(eventLog.length > 140){
		eventLog.shift();
	}
	var newState = new GameState;
	console.log(newState.bag);
	eventLog.push(newState);
	

}

function GameState(){
	this.mino = minoKey;
	this.bag = bag.slice();
	this.holdMino = holdMino;
	this.board = Array(10);

	for (var i = 0; i < 10; i++){
		this.board[i] = board[i].slice();
	}
}

function undo(){
	
	if (eventLog.length == 0) return;
	
	// Save the current state into the redoLog.
	redoLog.push(new GameState);
	
	
	var gameState = eventLog.pop(); // Retrieve gamestate.
	
	var oldBag = gameState.bag;
	var prevHold = gameState.holdMino;
	
	bag.push(oldBag[oldBag.length-1]); // Restore the last item from the most recent bag to the restored bag.
	if(prevHold == 8 && holdMino!=8){ // Avoid losing a mino upon the first hold.
		bag.push(oldBag[oldBag.length-2]); 
	} 
	
	// Restore active mino
	console.log(minoKey);
	minoKey = gameState.mino;
	spawnMino(minoKey - 1);
	
	holdMino = gameState.holdMino;
	board = gameState.board;
	
	
	//console.log(oldBag);
	console.log(bag);
	// Debug info
	minoCount[minoKey-1]--;
	
	
}

function redo(){
	if (redoLog.length == 0) return;

	// Save state to eventLog before redoing
	eventLog.push( new GameState);
	var gameState = redoLog.pop();

	// Debug info
	minoCount[minoKey - 1]++;	
	
	// restore state.
	minoKey = gameState.mino;
	spawnMino(minoKey - 1);
	holdMino = gameState.holdMino;
	board = gameState.board;
	bag = gameState.bag;
	
	
	
}
