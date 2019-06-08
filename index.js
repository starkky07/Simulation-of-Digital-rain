var symbolSize = 18;
var fadeInterval = 1.6;
var streams = [];
function setup( ) {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );    
    //for black background
    background(0, 150);
    var x = 0;
    var y = random(-2000, 0);
    for(var i =0; i<= width/ symbolSize; i++) {
    	stream = new Stream();
    	stream.generateSymbols(x,y);
    	streams.push(stream);
    	x += symbolSize;
    }
 	textSize(symbolSize);


}
function draw() {
	background(0);
	streams.forEach(function(stream){
		stream.render();
	});

}
function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;
    this.switchInterval = round(random(2, 20));
    this.first = first;
    this.opacity = opacity;
    this.setToRandomSymbol = function() {
    	var charType = round(random(0, 5));
    
    	if(frameCount % this.switchInterval == 0){
    		if(charType > 2){
    			this.value = String.fromCharCode(
	    		//characters Unicode Range "Katakana"
	    		0x30A0 + round(random(0, 96))
    		)} else {
    			this.value = String.fromCharCode(
	    		//characters Unicode Range "Katakana"
	    		0x3B1 + round(random(0, 9))
    			)}
    	};
    }
    
    this.rain = function() {
    	this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
    
}

function Stream () {
	this.symbols = []
	this.totalSymbols = round(random(5, 30));
	this.speed = random(5,20);

	this.generateSymbols = function(x, y) {
		var first = round(random(0,2)) == 1;
		var opacity = 255;
		for( var i =0; i < this.totalSymbols; i++) {
				symbol = new Symbol(x, y, this.speed, first, opacity);
				symbol.setToRandomSymbol();
				this.symbols.push(symbol);
				opacity -= (255 / this.totalSymbols) / fadeInterval;
  			    y -= symbolSize;
				first= false;
			}
	}

	this.render = function(){

    	this.symbols.forEach(function(symbol){
    	if(symbol.first){
    		fill(140, 255, 170, symbol.opacity);
    	}
    	else {
    		fill(0,255,70, symbol.opacity);
    	}
    	
    	text(symbol.value , symbol.x , symbol.y);
    	symbol.rain();
    	symbol.setToRandomSymbol();
    	});
    	
    }
}


$(function() {  
    var glower = $('.glow');
    window.setInterval(function() {  
        glower.toggleClass('active');
    }, 1000);
}); 