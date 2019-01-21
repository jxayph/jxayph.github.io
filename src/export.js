function boardComp(){
	/*
	Save board into 37 b64 characters.
	
	*/
	var exportString = '';
	
	for (var i = 0; i < 37; i++){
		var sum = 0;
		for (var j = 0; j < 6; j++){
			var n = j + 6*exportString.length; // looking at the nth bit on the board.
			if (getBlock(n)) sum += Math.pow(2, j); // Add 2^j to the sum, rep. of binary counting.
		}
		exportString += decTob64(sum);
	}
	
	// Remove all the leading empty space.
	var leadingZeros = 0;
	while (exportString[leadingZeros]=='A')
		leadingZeros++;
	
	exportString = exportString.slice(leadingZeros,exportString.length);
	return exportString;
}

function colourComp(){
	/*
		Save board into 44 bits, preserving colour.
	*/
	
	var exportString = '';
	
	for (var i = 0; i < 44; i++){
		var sum = 0;
		for (var j = 0; j < 5; j++){
			var n = j + 5 * exportString.length;
			sum += getBlock(n) * Math.pow(9, j); // Add the board value multiplied by 9^j, rep of base59049 counting.
		}
		exportString += decTob59049(sum);
	}
	
	// Remove all the leading empty space.
	var leadingZeros = 0;
	while (exportString.charCodeAt(leadingZeros)== 0)
		leadingZeros++;
	
	exportString = exportString.slice(leadingZeros,exportString.length);
	return exportString;
}

function decTob59049(n){ // Use unicode values 0-59048
	return String.fromCharCode(n);
}

function getBlock(n){
	var numCol = 10;
	
	var r = Math.floor(n / numCol);
	var c = n % numCol;
	
	return board[c][r];
}

function decTob64(n){
	
	// Take a decimal number in [0,63] and assign it to a b64 character.
	if (n >=0 && n <26){
		return String.fromCharCode('A'.charCodeAt(0) + n); // [A,Z] make up indices [0,25]
		
	} else if (n >25 && n <52){
		return String.fromCharCode('a'.charCodeAt(0) + n % 26); // [a,z] make up indices [26,51]
		
	} else if ( n > 51 && n < 62){
		return n%52; // [0,9] make up indices [52,61]
		
	} else if (n == 62)
		return '+' // [+] represents index 62
	
	else return '/' // [/] represents index 63.
}

function b64ToBin(n){
	/*
	Convert a b64 number into a 6-bit binary array.
	*/
	var output = [0, 0, 0, 0, 0, 0];
	var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	var decVal = 0;
	
	while(decVal <64 && key[decVal] != n ) decVal++;
	
	for (var i = 5; i > -1; i--){
		var exp = Math.pow(2, i);
		if (decVal >= exp){ // If the bit should be set
			output[i] = 1; // Set the bit
			decVal -= exp; // Subtract the set bit from the value.
		}
	}
	return output;
}

function loadBoard(inString){
	initializeBoard();
	var n = 0;
	n += (37 - inString.length); // Skip the whitespace.
	
	for (var i = 0; n + i < 37; i++){
			
		var bits = b64ToBin(inString[i]); // Get the 6 bits from the b64 char.
		var boardIdx = 6 * (n + i);
		for (var j = 0; j < 6; j++){
			
			var numCol = 10;
			var x = (boardIdx + j) % numCol;
			var y = Math.floor((boardIdx + j) / numCol);
			
			if(bits[j] != 0 && boardIdx + j < 221) board[x][y] = 8;
		}
		
	}
	return;
}

function loadColourBoard(inString){
	initializeBoard();
	var n = 0;
	n += (44 - inString.length); // Skip whitespace.
	
	for (var i = 0; n + i < 44; i++){
		var boardChunkCode = inString.charCodeAt(i); // Reading the unicode character that stores 5 blocks.
		var boardIdx = 5 * (n+i);
		
		for (var j = 0; j < 5; j++){ 
			var numCol = 10;
			var x = (boardIdx +j) % numCol;
			var y = Math.floor( (boardIdx + j) / numCol);
			
			var base = 9;
			
			var blockCode = boardChunkCode % base;
			boardChunkCode -=blockCode
			boardChunkCode = boardChunkCode / base;
			board[x][y] = blockCode;	
		}
	}
	return;
}

function charTest(n1, n2){
	for (var i = n1; i < n2;i++){
		console.log(i + ": " + String.fromCharCode(i));
	}
}


