
function debugBag(){
	var charBag = '';
	for( var i = 0; i < bag.length;i++){
		charBag += nameKey(bag[bag.length - i - 1] + 1);
	}
	console.log(charBag);
}

function bagTest(num, mino){
	
	var countArray = [0, 0, 0, 0, 0, 0, 0];
	for ( var i = 0; i < num; i++){
		
		var test = shuffleBag();
		
		for ( var j = 0; j < test.length; j++){
			if ( test[j] == mino ){
				countArray[j] = countArray[j] + 1;
			}
		}
		
	}
	return countArray;

}