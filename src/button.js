function initializeButtons(){
	buttons.push( new button(6, 100, 68, 50, controlsText, "gray", "black", setControls)); // Controls
}


function button(xPos, yPos, width, height, textFunc, inColour, outColour, clickEvent){
	this.x = xPos;
	this.y = yPos;
	this.w = width;
	this.h = height;
	this.drawText = textFunc;
	this.clr1 = outColour;
	this.clr2 = inColour;
	this.event = clickEvent;
	 
	this.draw = function(){
		drawBox( this.x, this.y, this.w, this.h, 2, this.clr1, this.clr2);
		this.drawText();
	}
	
	this.testClick = function(){
		if ( (mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)){
			this.onClick()
			return true;
		}
	}
	this.onClick = function(){
		this.event();
	};
}

function controlsText(){
	canvasContext.font="15px Arial";
	canvasContext.fillStyle = this.clr1;
	canvasContext.fillText("Controls", this.x + 6, this.y + 21);
	canvasContext.fillText("[ ~ ]", this.x + 21, this.y + 38);
}


