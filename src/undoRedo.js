
function saveState(){
	// Reset the redoLog to nothing since we're branching off
	redoLog = [];
	
	// Push the gamestate to the eventLog. eventLog is limited to the last 96 moves.
	if(eventLog.length > 96){
		eventLog.shift();
	}
	eventLog.push( new GameState());

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
	
	
	var gameState = eventLog.pop();
	minoKey = gameState.mino;
	spawnMino(minoKey - 1);
	holdMino = gameState.holdMino;
	board = gameState.board;
	bag = gameState.bag;
	
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
