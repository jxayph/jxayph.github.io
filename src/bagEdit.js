function bagEditor(){
	
	// A box overlaying the playfield.
	drawRect(20, 20, 210, 410, "Black");
	drawRect(22, 22, 206, 406, "White");
	
	canvasContext.font="15px Arial";
	canvasContext.fillStyle = "black";
	// Drawing the UI.
	printLegalPieces();
	printRequests();
}

function printLegalPieces(){

	// Get the remaining part of the current bag. The ones among these
	// that are not in the reqBag are the ones we are allowed to choose.
	
	var candidates = [0, 1, 2, 3, 4, 5, 6];
	var legalPieces = ""
	var numLegal = 0;
	for (var i = 0; i < 7; i++){
	
		if ( legalPiece(candidates[i]) ){ // If our candidate is legal...
			numLegal++;
			if(legalPieces.length == 0){ // If it's the beginning of the string
				legalPieces = nameKey(candidates[i] + 1);
			}
			else { // Else separate the values with a comma.
			 
				legalPieces += ", " + nameKey(candidates[i] + 1);
			}
		}
	}
	canvasContext.fillText("Press the associated key", 40, 50 );
	canvasContext.fillText("to next request one of:", 50, 70 );	
	canvasContext.fillText(legalPieces, 105 - 5 * numLegal, 90);
	
	canvasContext.fillText("Press enter to end the request.", 25, 400);
}

function legalPiece(mino){
	// If we're still looking inside the first bag
	/*
		Let's say bag has 11. That means first bag is elements indexed 7, 8, 9, 10.
		Index this arbitrarily as 
		[bag.length - 1 - (bag.length % 7) ---> bag.length - 1]
	*/
	
	if (reqBag.length < bag.length % 7){
		// If it's in the reqBag it's not legal.
		for ( var i = 0; i < reqBag.length; i++){
			if ( reqBag[i] == mino){
				return false;
			}
		}
		// If it's not in the first bag it's not legal.
		// [0,1,2,3,4,5,6,0,1,2,3]
		// idx from 7->10
		var legal = false;
		var startIdx = bag.length - bag.length % 7
		//if bag is 11, i from 0 -> 3
		for ( var i = startIdx; i < bag.length; i++){
			if (mino == bag[i]){
				legal = true;
			}	
		}
		return legal;
	}
	
	//---

	// Not legal if it's within the current bag being requested.
	var startIdx = (bag.length % 7) + Math.floor ((reqBag.length - (bag.length % 7)) / 7) * 7
	for ( var i = startIdx; i < reqBag.length; i++){
		if (reqBag[i] == mino){
			return false;
		}
	}
	
	return true;
	
}

function printRequests(){
	// Showing the player which pieces they've requested.
	
	canvasContext.fillText("You have requested: ", 30, 110 );
	
	var offset = 0;
	var reqBagIdx = 0;
	while (reqBagIdx < reqBag.length){
		line = "";
		var i = 0;
		for (; i < 10 && reqBagIdx < reqBag.length; i++){
			if( reqBagIdx != 0 && reqBagIdx % 10 != 0) line += ", ";
			line += nameKey(reqBag[reqBagIdx] + 1);
			reqBagIdx++;
		}
		canvasContext.fillText(line, 100 - 5 * i, 130 + 20*offset);
		offset++;
	}
	
}

function addToBag(mino){
	if( reqBag.length >= bag.length % 7){ // If our requests surpass our current bag
		
		var startIdx = (bag.length % 7) + Math.floor ((reqBag.length - (bag.length % 7)) / 7) * 7

		// Don't add the mino if it's within the next requested bag.
		for ( var i = startIdx; i < reqBag.length; i++){
			if (reqBag[i] == mino){
				return;
			}
		}
		reqBag.push(mino);
		return
	}
	else { // If our requests lie strictly within the current bag.
		// Check to see if the requested mino is already in the requested bag.	
		for ( var i = 0; i < reqBag.length; i++){
			if (mino == reqBag[i]){
				return;
			}
		}
		
		// Check to see if the requested mino is within the current bag.
		var legalMino = false;
		for (var i = 0; i < bag.length % 7; i++){
			if (bag[bag.length - i - 1] == mino){
				legalMino = true;
			}		
		}
		
		if(legalMino){
			reqBag.push(mino);
		}
	}	
}

function endBagEdit(){
	
	// Filling out the bag.
	var fillArray = []
	for( var fillMino = 0; fillMino < 7; fillMino++){
		if (legalPiece(fillMino)){
			console.log(fillMino);
			fillArray.push(fillMino);
		}
	}
	
	fillArray = shuffleArray(fillArray);
	reqBag = reqBag.concat(fillArray);
	
	// Adding the reqBag to the end.
	var i = reqBag.length - 1;
	bag = [reqBag[i]];
	for (i--; i >=0; i--){
		bag.push(reqBag[i]);
	}
	
	
	if( bag.length < 5){
		// Extend the array with a new bag.
		bag = shuffleBag().concat(bag);
	}
		
	reqBag = [];
	bagEdit = false;

}

