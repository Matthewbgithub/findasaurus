$(document).ready(function(){
	var x;
	var y;
	var loops = 500;
	var maxDinos = 20;
	//decides the random dino to search for
	var dinoToChoose = Math.round(Math.random()*maxDinos);
	var no = 0;
	start();
	
	function start(){
		//adds an initial dino that is invisible
		$('.frameInner').append('<img class="dinoInFrame" style="display:none;" src="./DinoPics/dino0.png">');
		//adds the dino to the one in the search for box
		$('#findMe').attr('src','./DinoPics/dino'+dinoToChoose+'.png');
		for(var i = 0; i < loops; i++){
			x = Math.random()*100;
			y = Math.random()*100;
			generatePos();
			decideDinosaur(x,y,i);
		}
		generatePos();
		generateDinosaur(x,y,dinoToChoose);
	}
	//Randomly generate coordinates
	function generatePos(){
		while(x>0&&x<41&&y>0&&y<50){
			x = Math.random()*100;
			y = Math.random()*100;
		}
	}
	function decideDinosaur(x,y,i){
		function checkNoTooLarge(){	
			if(no > maxDinos){
				no = 0;
			}
		}
		if(i>no){
			no++;
			checkNoTooLarge();
			if(no == dinoToChoose){
				no++;
			}
			checkNoTooLarge();
		}
		generateDinosaur(x,y,no);
	}
	function generateDinosaur(x,y,d){
		$('.frameInner').append('<img dino="'+d+'" style="left: calc( '+x+'% - '+($('.dinoInFrame').width())/2+'px );top: calc( '+y+'% - '+($('.dinoInFrame').height())/2+'px );" class="dinoInFrame" src="./DinoPics/dino'+d+'.png">');
	}
	$('[dino="'+dinoToChoose+'"]').on('click',function(){
		$(this).addClass('winner');
	})
});