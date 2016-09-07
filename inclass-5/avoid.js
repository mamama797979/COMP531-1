	//design the pattern of button escaping
	var escape = function(){
		var docHeight = $(document).height(),
	        docWidth = $(document).width(),
	        $button = $('#btn'),
	        btnWidth = $button.width(),
	        btnHeight = $button.height(),
	        heightMax = docHeight - btnHeight,
	        widthMax = docWidth - btnWidth;
	    //change the postion of the button by css
	    $button.css({
	        left: Math.floor( Math.random() * widthMax ),
	        top: Math.floor( Math.random() * heightMax )
	    });
	}
	//when the mouse approch the button, it escapes
	$('#btn').hover(function(e) {
		if(e.shiftKey) {
			return false;
		}
		escape();
	});
	//there are two state when the btn is clicked
	$('#btn').click(function() {
		var state = document.getElementById('btn');
		var congrats = document.getElementById('hidden');

		if(state.innerHTML == "Click Me") {
			/*inline-block enables multiple lines!*/
			congrats.style.display = 'inline-block';
			state.innerHTML = "Play Again";
		}
		else if(state.innerHTML == "Play Again") {
			congrats.style.display = 'none';
			//start over the game
			escape();
			state.innerHTML = "Click Me";
		}
	});
	$('#tips').click(function() {
		alert("press shiftKey to stop the button.");
	})
