
function spinMino(CW){	
	
	var netClone = [[0, 0], [0, 0], [0, 0]];
	// Copy the minoNet for SRS logic tests.
	for (var i = 0; i < 3; i++){
		for (var j = 0; j<2; j++){
			netClone[i][j] = minoNet[i][j];
		}
	}

	if (CW){
		for (var i = 0; i < 3; i++){
			var newX = netClone[i][1] * -1;
			var newY = netClone[i][0];
			netClone[i][0] = newX;
			netClone[i][1] = newY;
		}	
		
		if (SRS(netClone, CW)){
			minoNet = netClone;
			rotation = (rotation + 1) % 4;
		}
	}
	else {
		for (var i = 0; i < 3; i++){
			var newX = netClone[i][1];
			var newY = netClone[i][0] * -1;
			netClone[i][0] = newX;
			netClone[i][1] = newY;
		}
		
		if (SRS(netClone, CW)){
			minoNet = netClone;
			rotation = (rotation + 3) % 4;
		}
	}
	return;
	
}

function offsetTest(dX, dY, net){
	if (validMove(dX, dY, net)){
		minoX += dX;
		minoY += dY;
		return true;
	}
}

function SRS(net, CW){

	var offsets = [ ];
	if ( minoKey == 1){ // Gross I piece offsets.
		if(CW){
			/*
				offsets = [ [], [], [], [], [] ];
			*/ 
			if        (rotation == 0){ // Offsets of CW rotation from spawn state.
				offsets = [ [1, 0], [-1, 0], [2, 0], [-1, 1], [2, -2] ];
			
			} else if (rotation == 1){ // Offsets of CW rotation from 1 CW state.
				offsets = [ [0, 1], [-1, 1], [2, 1], [-1, -1], [2, 2] ];

			} else if (rotation == 2){
				offsets = [ [-1, 0], [1, 0], [-2, 0], [1, -1], [-2, 2] ];
					
			} else if (rotation == 3){
				offsets = [ [0, -1], [1, -1], [-2, -1], [1, 1], [-2, -2] ];
			}
		} // CCW Rotations
		else{	
			if   (rotation == 0){
				offsets = [ [0, 1], [-1, 1], [2, 1], [-1, -1], [2, 2] ];
				
			} else if (rotation == 1){
				offsets = [ [-1, 0], [1, 0], [-2, 0], [1, -1], [-2, 2] ];
				
			} else if (rotation == 2){
				offsets = [ [0, -1], [1, -1], [-2, -1], [1, 1], [-2, -2] ];
					
			} else if (rotation == 3){
				offsets = [ [1, 0], [-1, 0], [2, 0], [-1, 1], [2, -2] ];
				
			}
		}
	}	
	
	else if (minoKey == 4){ // Less gross O piece offsets.
		if(CW){
			if        (rotation == 0){
				minoY--;
			} else if (rotation == 1){
				minoX++;
			} else if (rotation == 2){
				minoY++;
			} else if (rotation == 3){
				minoX--;
			}

		}
		else{
			if   (rotation == 0){
				minoX++;
			} else if (rotation == 1){
				minoY++;
			} else if (rotation == 2){
				minoX--;
			} else if (rotation == 3){
				minoY--;
			}
		}
		return true;
	}
	// J L S T Z offsets.
	else if (CW){	
		if (rotation == 0){ // Offsets of CW rotation from spawn state.
			offsets = [ [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2] ];
			
		} else if (rotation == 1){ // Offsets of CW rotation from 1 CW state.
			offsets = [ [0, 0], [1, 0], [1, 1], [0, -2], [1, -2] ];
			
		} else if (rotation == 2){ // Offsets of CW rotation from 2 CW state.
			offsets = [ [0, 0], [1, 0], [1, -1], [0, 2], [1, 2] ];
			
		} else if (rotation == 3){ // Offsets of CW rotation from 3 CW state.
			offsets = [ [0, 0], [-1, 0], [-1 ,1], [0, -2], [-1, -2] ];
			
			}
		}

	else { // CCW Rotation offsets
		if (rotation == 0){ // Offsets of CCW rotation from spawn state.
			offsets = [ [0, 0], [1, 0], [1, -1], [0, 2], [1, 2] ];
			
		} else if (rotation == 1){ // Offsets of CCW rotation from 1 CCW state.
			offsets = [ [0, 0], [1, 0], [1, 1], [0, -2], [1, -2] ];
			
		} else if (rotation == 2){ // Offsets of CCW rotation from 2 CCW state.
			offsets = [ [0, 0], [-1, 0], [-1, -1], [0, 2], [-1 ,2] ];
				
		} else if (rotation == 3){ // Offsets of CCW rotation from 3 CCW state.
			offsets = [ [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2] ];
			
			}
		}
				for ( var i = 0; i < offsets.length; i++){
					console.log(offsets);
					console.log(offsets.length);
					if ( offsetTest( offsets[i][0], offsets[i][1], net) ) return true;
				}
				return false;	
}

function drawSRSGhost(net, dX, dY){


}