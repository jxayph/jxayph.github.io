// Gamestate globals
var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

var holdX = 0; // [0,1,2] = [neutral, L, R] 
var DASLeft = 0;
var DASRight = 0;
var DASUp = 0;
var DASDown = 0;
var holdDrop = false;


var mouseX = 0;
var mouseY = 0;

var controlsMenu = false;

var keyBindIndex = 0;
var setKeyBind = false;

function keyPress(e, mino, keyBinds, drawState){
	
	if(controlsMenu){
		blinkCounter = 0;
		if(setKeyBind){ // Setting keybinds.
			console.log("Set key " + e.keyCode);
			keyBinds[keyBindIndex] = e.keyCode;
			setKeyBind = false;
			return;
		}
		
		if(e.keyCode == 27){ // Escape key
			saveKeyBinds(30*365, keyBinds);			
			controlsMenu = false;
		} else if (e.keyCode == 38){ // menu down
			keyBindIndex = (keyBindIndex + keyBinds.length - 1) % keyBinds.length;
		} else if (e.keyCode == 40){ // menu up
			keyBindIndex = (keyBindIndex + keyBinds.length + 1) % keyBinds.length;
		} else if (e.keyCode == 39){ // Right arrow, navigates to set key
			setKeyBind = true;
		}
		return;
	}
	
	if (detailStepping){ // Detailed SRS walkthrough
		if (e.keyCode == 13) detailStage = detailOffsets.length -1
		stepThroughSRS();
		return;
	}
	if(bagEdit){ //TODO: Backspace to remove from bag
		       if (e.keyCode == 49 || e.keyCode == 73){
			addToBag(0);
		
		} else if (e.keyCode == 50 || e.keyCode == 74){
			addToBag(1);
		
		} else if (e.keyCode == 51 || e.keyCode == 76){
			addToBag(2);
		
		} else if (e.keyCode == 52 || e.keyCode == 79){
			addToBag(3);
		
		} else if (e.keyCode == 53 || e.keyCode == 83){
			addToBag(4);
		
		} else if (e.keyCode == 54 || e.keyCode == 84){
			addToBag(5);
		
		} else if (e.keyCode == 55 || e.keyCode == 90){
			addToBag(6);
		} else if (e.keyCode == 13){ // Enter is pressed, terminate bagEdit.
			endBagEdit();
		} else if(e.keyCode == 27){
			cancelBagEdit();
		}
		return ;
	}
	
	if(e.keyCode > 48 && e.keyCode < 56){ // Keys 1-7 spawn minos.
		mino.spawnMino(e.keyCode - 48);
	}

	// Numbers 1-7 spawn minos. //TODO: REMOVE AND CONVERT TO OBJECT
	if (e.keyCode == 49){
		spawnMino(0);
		
	} else if (e.keyCode == 50){
		spawnMino(1);
		
	} else if (e.keyCode == 51){
		spawnMino(2);
		
	} else if (e.keyCode == 52){
		spawnMino(3);
		
	} else if (e.keyCode == 53){
		spawnMino(4);
		
	} else if (e.keyCode == 54){
		spawnMino(5);
		
	} else if (e.keyCode == 55){
		spawnMino(6);
		
	// Arrow keys move the minos by default. keybinds[0-6]
	} else if (e.keyCode == keyBinds[0]){
		holdX = 1;
		holdLeft = true;
	
	} else if (e.keyCode == keyBinds[1]){
		holdRight = true;
		holdX = 2;

	} else if (e.keyCode == keyBinds[2]){
		holdUp = true;
	
	} else if (e.keyCode == keyBinds[3]){
		holdDown = true;
	
	} else if (e.keyCode == keyBinds[4]){ // z and x for rotations by default.
		if(drawState.SRS) detailedSpinMino(false);
		else spinMino(false);
	
	} else if (e.keyCode == keyBinds[5]){
		if (drawState.SRS) detailedSpinMino(true);
		else spinMino(true);
	
	} else if (e.keyCode == keyBinds[6]){ // shift for hold
		hold();
	
	} else if (e.keyCode == keyBinds[7]){ // space bar for harddrop
		hardDrop();
		
		if(!holdDrop){ // Set a delay after the first hardDrop.
			holdDrop = true;
		}
	
	} else if (e.keyCode == keyBinds[8]){//q, w for undo redo
		undo();
	
	} else if (e.keyCode == keyBinds[9]){
		redo();
	
	} else if (e.keyCode == keyBinds[10]){
		bagEdit = true;
	
	} else if (e.keyCode == keyBinds[11]){
		drawState.SRS = !drawState.SRS;
	
	} else if (e.keyCode == keyBinds[12]){
		drawState.ghost = !drawState.ghost;
		
	} else if (e.keyCode == 192){
		setControls();
	
	} else if (e.keyCode == keyBinds[13]){
		resetGame();
		
	} else if (e.keyCode == keyBinds[14]){
		bitByBit = !bitByBit;
		if(bitByBit){
			minoNet = [[0,0],[0,0],[0,0]];
		}
		if(!bitByBit){
			spawnMino(minoKey - 1);
		}
	}else {
		//console.log(e.keyCode); // remove after
	
	}
	return;
	
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loadKeyBinds(keyBinds){
	var cookieControls = getCookie("keyBinds");
	
	if(cookieControls != ""){
		var savedKeyBinds = cookieControls.split(',');
		
		for (var i = 0; i < savedKeyBinds.length; i++){ // Do it like this so as to not overwrite keybinds added in future updates.
			keyBinds[i] = savedKeyBinds[i]
		}
	} else {
		saveKeyBinds(30*365);
	}
	
}

function saveKeyBinds(days, keyBinds){ // will want to call this on initialization

	// Set the cookie
	var d = new Date();
	d.setTime(d.getTime() + days*24*60*60*1000);
    var expires = "expires="+ d.toUTCString();
	
	
    document.cookie = "keyBinds =" + keyBinds + ";" + expires + ";path=/";
}

function keyUnpress(e, mino, keyBinds){
	if (e.keyCode == keyBinds[0]){
		if(holdX == 1){
			if(holdRight) holdX = 2;
			else holdX = 0;
		}
		holdLeft = false;
		DASLeft = 0;
	} else if (e.keyCode == keyBinds[1]){
		if(holdX == 2){
			if (holdLeft) holdX = 1;
			else holdX = 0;
		}		
		holdRight = false;
		DASRight = 0;
	} else if (e.keyCode == keyBinds[2]){
		holdUp = false;
		DASUp = 0;
	} else if (e.keyCode == keyBinds[3]){
		holdDown = false;
		DASDown = 0;
	} else if (e.keyCode == keyBinds[7]){
		holdDrop = false;
	}
	
}




function onClick(e){ // lacking support; remove?
	console.log(mouseX);
	console.log(mouseY);
	
	for( var i = 0; i < buttons.length; i++){
		if (buttons[i].testClick()) return;
	}
	
}
function calculateMousePos(e){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = e.clientX - rect.left - root.scrollLeft;
	var mouseY = e.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function setControls(){
	// Initializes variable state for setting controls. Logic happens else2h
		
	var keyBindIndex = 0;
	var setKeyBind = false;
	blinkCounter = 0;
	
	
	controlsMenu = true;
}

