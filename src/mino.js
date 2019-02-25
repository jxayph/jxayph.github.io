
var board = Array(10)
var minoX = 4;
var minoY = 0;
var	minoNet = [[-1, 0], [1, 0], [2, 0]];
var	minoKey = 1;
var holdMino = 8;
var rotation = 0;

var bag = shuffleBag();

function spawnMino(mino){
	minoX = 4;
	minoY = 1;
	rotation = 0;
	
	// I J L O S T Z
	if        (mino == 0){ // Spawn I
		minoNet = [[-1, 0], [1, 0], [2, 0]];
		minoKey = 1;
	} else if (mino == 1){ // Spawn J
		minoNet = [[-1, 0], [1, 0], [-1, -1]];	
		minoKey = 2;
	} else if (mino == 2){ // Spawn L
		minoNet = [[-1, 0], [1, 0], [1, -1]];
		minoKey = 3;
	} else if (mino == 3){ // Spawn O
		minoNet = [[1 ,0], [0 ,-1], [1, -1]];
		minoKey = 4;
	} else if (mino == 4){ // Spawn S
		minoNet = [[-1, 0], [0, -1], [1, -1]];
		minoKey = 5;
	} else if (mino == 5){ // Spawn T
		minoNet = [[-1, 0], [1, 0], [0, -1]];
		minoKey = 6;
	} else if (mino == 6){ // Spawn Z
		minoNet = [[1, 0], [0, -1], [-1, -1]];
		minoKey = 7;
		}
	bitByBit = false; // disable edit mode if enabled.
}

function nameKey(key){
	if (key == 8){
		return "Empty";
	} else if (key == 7){
		return "Z"
	} else if (key == 6){
		return "T"
	} else if (key == 5){
		return "S"
	} else if (key == 4){
		return "O"
	} else if (key == 3){
		return "L"
	} else if (key == 2){
		return "J"
	} else if (key == 1){
		return "I"
	}
}

function colourKey(number){
		if        (number == 1){
			return "Aqua";
		} else if (number == 2){
			return "Blue";
		} else if (number == 3){
			return "Orange";
		} else if (number == 4){
			return "Yellow";
		} else if (number == 5){
			return "Lime";
		} else if (number == 6){
			return "DarkViolet";
		} else if (number == 7){
			return "Red";
		} else if (number == 8){
			return "Gray";
		}
}
