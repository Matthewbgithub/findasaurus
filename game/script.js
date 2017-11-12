$(document).ready(function() {
	var x;
	var y;
	var loops = 1024;
	var maxDinos = 20;
	var drawnItems = [];
	var b = 5;
	//decides the random dino to search for
	var dinoToChoose = Math.round(Math.random() * maxDinos);
	var no = 0;

	var leftBuffer;
	var topBuffer;
	start();

	function start() {
		//adds an initial dino that is invisible
		$('.frameInner').append('<img class="dinoInFrame" style="display:none;" src="./DinoPics/dino0.png">');
		leftBuffer = ($('.dinoInFrame').width() / 2);
		topBuffer = ($('.dinoInFrame').height() / 2);
		//adds the dino to the one in the search for box
		$('#findMe').attr('src', './DinoPics/dino' + dinoToChoose + '.png');
		for (var i = 0; i < loops; i++) {
			var generated = false;
			var c = 0;
			while(!generated && c < 10) {
				x = Math.round(Math.random() * 100);
				y = Math.round(Math.random() * 100);
				//console.log("x: " + x + ", y: " + y);
				generated = decideDinosaur(x, y, i);
				//console.log("Dinasour was generated: " + generated);
				c++;
			}
		}
		var outOfBounds = true;
		while(outOfBounds) {
			x = Math.round(Math.random() * 100);
			y = Math.round(Math.random() * 100);
			outOfBounds = findIfOutOfBounds(x, y);
			if(!outOfBounds) {
				generateDinosaur(x, y, dinoToChoose);
			}
		}
	}
	//Randomly generate coordinates

	function decideDinosaur(x, y, i) {
		function checkNoTooLarge() {
			if (no > maxDinos) {
				no = 0;
			}
		}
		if (i > no) {
			no++;
			checkNoTooLarge();
			if (no == dinoToChoose) {
				no++;
			}
			checkNoTooLarge();
		}

		var outOfBounds = findIfOutOfBounds(x, y);


		var tooClose = false;
		//console.log("Current drawnItems: " + drawnItems);
		for(var j = 0; j < drawnItems.length; j++) {
			coord = [drawnItems[j][0], drawnItems[j][1]];
			//console.log("Current coord: " + coord);
			if(x < coord[0] + b && x > coord[0] - b && y < coord[1] + b && y > coord[1] -  b) {
				tooClose = true;
			}
		}
		
		if(tooClose || outOfBounds) {
			return false;
		} else {
			generateDinosaur(x, y, no);
			return true;
		}
	}

	function findIfOutOfBounds(x, y) {
		if (y < x + 40 && y > x - 20) {
			if(y < x + 100 && y > 100 - x + 10) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	function generateDinosaur(x, y, d) {
		var string = '<img dino="'+d+'"style="left: calc( ' + Math.round(x) + '% - '+leftBuffer+'px ); top: calc( ' + Math.round(y) + '% - '+topBuffer+'px );" class="dinoInFrame" src="./DinoPics/dino'+d+'.png">';
		//console.log("tag: " + string);
		$('.frameInner').append(string);
		var coord = [];	
		coord.push(x); coord.push(y);
		//console.log("New coord: " + coord);
		drawnItems.push(coord);
		//console.log("Updated drawnItems: " + drawnItems);
	}
	$('[dino="' + dinoToChoose + '"]').on('click', function() {
		$(this).addClass('winner');
		win();
	})
	function win(){
		stop();
	}
});
