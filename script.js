$(document).ready(function(){
 	var x = 50;
	var y = 50;
	var loops = 500;
	var maxDinos = 2;
	var no = 0;
	start();
	
	function start(){
		$('.frameInner').append('<img class="dinoInFrame" style="display:none;" src="./DinoPics/dino0.png">');
		for(var i = 0; i < loops; i++){
			x = Math.random()*100;
			y = Math.random()*100;
			generateDinosaur(x,y,i);
		}
	}
	function generateDinosaur(x,y,i){
		if(i>no){
			no++;
		}
		if(no > maxDinos){
			no = 0;
		}
		$('.frameInner').append('<img style="left: calc( '+x+'% - '+($('.dinoInFrame').width())/2+'px );top: calc( '+y+'% - '+($('.dinoInFrame').height())/2+'px );" class="dinoInFrame" src="./DinoPics/dino'+no+'.png">');
	}
});