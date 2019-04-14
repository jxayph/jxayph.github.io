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
	
	if (eventLog.length == 0) return;
	
	
	
	// Save the current state into the redoLog.
	redoLog.push(new GameState);
	
	var gameState = eventLog.pop(); // Retrieve previous gamestate.
	
	var prevHold = gameState.holdMino;
	var prevHeld = gameState.held;
	
	if(wasHeld && holdMino!=8){ // Undo any holds made this turn.
		var temp = holdMino;
		holdMino = minoKey;
		minoKey = temp;
		wasHeld = false;
	} else {
		wasHeld = prevHeld;
	}
	
	// Special logic for restoring the bag/hold/current minos.
	if( eventLog.length > 1 && eventLog[eventLog.length-1].holdMino == 8 && holdMino != 8){ // If we're undoing the first hold...
		console.log("case1");
		if (!prevHeld) { // If the player pressed hold twice...
			console.log("case1a");
			bag.push(gameState.mino - 1);
			bag.push(minoKey - 1);
			holdMino = 8;
			minoKey = gameState.holdMino;
		} else{
			bag.push(minoKey - 1);
			bag.push(gameState.mino - 1);
			holdMino = 8;
			minoKey = gameState.holdMino;
		}
	} else	if(prevHeld){ // If a mino was held in the last state...
		console.log("case2");
		bag.push(minoKey-1);
		minoKey = gameState.mino;
		holdMino = prevHold;
	} else{
		console.log("case3");
		bag.push(minoKey-1);
		minoKey = gameState.mino;
		holdMino = prevHold;
	}
	
	board = gameState.board;
	spawnMino(minoKey-1);
	

	// Debug info
	minoCount[minoKey-1]--; // broken
	
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
	
	
	
}
