	$(window).load(function(){
		document.getElementById('sts_hdl').innerHTML = "Learning JavaScript!";
	})
	$("#lbl_add_img").click(function(){
		$("#btn_add_img").css("visibility","visible")
		$("#btn_add_img").css("display","inline");
	})
	$('#btn_update').click(function() {
		let new_sts = document.getElementById('txt_update').value
		document.getElementById('sts_hdl').innerHTML = new_sts
	}) 
	$('#btn_logout').click(function() {
		window.location.href = 'index.html'
	});
	$('#btn_profile').click(function() {
		window.location.href = 'profile.html'
	})
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
