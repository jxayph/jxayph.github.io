var eventLog=[];
var redoLog = [];
var wasHeld = false;

function saveState(){
	// Reset the redoLog to nothing since we're branching off
	redoLog = [];
	
	// Push the gamestate to the eventLog. eventLog is limited to the last 140 moves.
	if(eventLog.length > 140){
		eventLog.shift();
	}
	var newState = new GameState;
	eventLog.push(newState);
	

}

function GameState(){
	this.mino = minoKey;
	this.bag = bag.slice();
	this.holdMino = holdMino;
	this.board = Array(10);
	this.held = wasHeld;

	for (var i = 0; i < 10; i++){
		this.board[i] = board[i].slice();
	}
}
function thing(){
	loadBoard("8AfwNMYDO")
	bag=[0,1,5,5,0,6,5,0]
	spawnMino(bag.pop())
	holdMino=8;
}

function undo(){
	
	if (eventLog.length == 0) return; // Nothing to undo.
	
	redoLog.push(new GameState);
	
	var prevState = eventLog.pop();
	
	if(wasHeld){//was held
		 if (prevState.holdMino == 8 && holdMino != 8){
			bag.push(minoKey - 1);
			bag.push(holdMino - 1);
			holdMino = 8;
			minoKey = prevState.mino;
			wasHeld = false;
		 } else { // not the first hold
			hold();
			bag.push(minoKey-1);
			minoKey = prevState.mino;
		}
	} else {
		bag.push(minoKey-1);
		minoKey = prevState.mino;
	}
	spawnMino(minoKey-1);
	
	board = prevState.board;
	wasHeld = prevState.held;	

	// Debug info
	minoCount[minoKey-1]--;
	
	
}

function redo(){
	if (redoLog.length == 0) return;

	// Save state to eventLog before redoing
	eventLog.push(new GameState);
	var gameState = redoLog.pop();

	// Debug info
	minoCount[minoKey - 1]++;	
	
	// restore state.
	console.log(gameState);
	minoKey = gameState.mino;
	spawnMino(minoKey - 1);
	holdMino = gameState.holdMino;
	board = gameState.board;
	bag = gameState.bag;
	wasHeld = gameState.held;
	
	
	console.log("Was held = " + wasHeld);
}
