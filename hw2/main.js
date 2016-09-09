	var idx = Math.floor(Math.random()*12);
	interval1 = (Math.floor(Math.random()*5)+1)*1000;
	document.getElementById("spn1").innerHTML = interval1 / 1000;
	interval2 = (Math.floor(Math.random()*5)+1)*1000;
	document.getElementById("spn2").innerHTML = interval2 / 1000;
	interval3 = (Math.floor(Math.random()*5)+1)*1000;
	document.getElementById("spn3").innerHTML = interval3 / 1000;
	interval4 = (Math.floor(Math.random()*5)+1)*1000;
	document.getElementById("spn4").innerHTML = interval4 / 1000;
	interval5 = (Math.floor(Math.random()*5)+1)*1000;
	document.getElementById("spn5").innerHTML = interval5 / 1000;
	interval6 = (Math.floor(Math.random()*5)+1)*1000;
	document.getElementById("spn6").innerHTML = interval6 / 1000;
	var images = [
		'img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg',
		'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg', 
	];
	//
	function pause(){
		clearInterval(interval)
	}
	//
	var el1 = document.getElementById("image1");
	var btn1 = document.getElementById("btn1");
	timer1 = setInterval(function() {		
		el1.src = images[idx++ % images.length]
	}, interval1)

	var el2 = document.getElementById("image2");
	var btn2 = document.getElementById("btn2");
	timer2 = setInterval(function() {		
		el2.src = images[idx++ % images.length]
	}, interval2)

	var el3 = document.getElementById("image3");
	var btn3 = document.getElementById("btn3");
	timer3 = setInterval(function() {		
		el3.src = images[idx++ % images.length]
	}, interval3)

	var el4 = document.getElementById("image4");
	var btn4 = document.getElementById("btn4");
	timer4 = setInterval(function() {		
		el4.src = images[idx++ % images.length]
	}, interval4)

	var el5 = document.getElementById("image5");
	var btn5 = document.getElementById("btn5");
	timer5 = setInterval(function() {		
		el5.src = images[idx++ % images.length]
	}, interval5)

	var el6 = document.getElementById("image6");
	var btn6 = document.getElementById("btn6");
	timer6 = setInterval(function() {		
		el6.src = images[idx++ % images.length]
	}, interval6)
	//
	$('#btn1').click(function() {
		if(btn1.innerHTML == "Stop") {
			clearInterval(timer1);
			btn1.innerHTML = "Start";
		}
		else if(btn1.innerHTML == "Start"){
			interval1 = (Math.floor(Math.random()*5)+1)*1000;
			clearInterval(timer1);
			timer1 = setInterval(function() {		
				el1.src = images[idx++ % images.length]
			}, interval1);
			document.getElementById("spn1").innerHTML = interval1 / 1000;
			btn1.innerHTML = "Stop";			
		}
	});
	$('#btn2').click(function() {
		if(btn2.innerHTML == "Stop") {
			clearInterval(timer2);
			btn2.innerHTML = "Start";
		}
		else if(btn2.innerHTML == "Start"){
			interval2 = (Math.floor(Math.random()*5)+1)*1000;
			clearInterval(timer2);
			timer2 = setInterval(function() {		
				el2.src = images[idx++ % images.length]
			}, interval2);
			document.getElementById("spn2").innerHTML = interval2 / 1000;
			btn2.innerHTML = "Stop";			
		}
	});
	$('#btn3').click(function() {
		if(btn3.innerHTML == "Stop") {
			clearInterval(timer3);
			btn3.innerHTML = "Start";
		}
		else if(btn3.innerHTML == "Start"){
			interval3 = (Math.floor(Math.random()*5)+1)*1000;
			clearInterval(timer3);
			timer3 = setInterval(function() {		
				el3.src = images[idx++ % images.length]
			}, interval3);
			document.getElementById("spn3").innerHTML = interval3 / 1000;
			btn3.innerHTML = "Stop";			
		}
	});
	$('#btn4').click(function() {
		if(btn4.innerHTML == "Stop") {
			clearInterval(timer4);
			btn4.innerHTML = "Start";
		}
		else if(btn4.innerHTML == "Start"){
			interval4 = (Math.floor(Math.random()*5)+1)*1000;
			clearInterval(timer4);
			timer4 = setInterval(function() {		
				el4.src = images[idx++ % images.length]
			}, interval4);
			document.getElementById("spn4").innerHTML = interval4 / 1000;
			btn4.innerHTML = "Stop";			
		}
	});
	$('#btn5').click(function() {
		if(btn5.innerHTML == "Stop") {
			clearInterval(timer5);
			btn5.innerHTML = "Start";
		}
		else if(btn5.innerHTML == "Start"){
			interval5 = (Math.floor(Math.random()*5)+1)*1000;
			clearInterval(timer5);
			timer5 = setInterval(function() {		
				el5.src = images[idx++ % images.length]
			}, interval5);
			document.getElementById("spn5").innerHTML = interval5 / 1000;
			btn5.innerHTML = "Stop";			
		}
	});
	$('#btn6').click(function() {
		if(btn6.innerHTML == "Stop") {
			clearInterval(timer6);
			btn6.innerHTML = "Start";
		}
		else if(btn6.innerHTML == "Start"){
			interval6 = (Math.floor(Math.random()*5)+1)*1000;
			clearInterval(timer6);
			timer6 = setInterval(function() {		
				el6.src = images[idx++ % images.length]
			}, interval6);
			document.getElementById("spn6").innerHTML = interval6 / 1000;
			btn6.innerHTML = "Stop";			
		}
	});
