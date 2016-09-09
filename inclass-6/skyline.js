'use strict'

var createApp = function(canvas) { 
	//set the frame
	window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

	var context = canvas.getContext("2d");
	var floor = canvas.height/2
	//draw ground
	var drawGround = function(canvas,context){
		var grad = context.createLinearGradient(0,floor,0,canvas.height)
		grad.addColorStop(0, "green")
		grad.addColorStop(1, "black")
		context.fillStyle=grad
		context.fillRect(0, floor, canvas.width, canvas.height)
	}
	//define a car
    var myCar = { 
    	height: 30,
     	width: 50,
     	x: 0,
     	y: floor - 30
    };

    //drawCar function
    function drawCar(myCar, context){
    	context.fillStyle = "black"
    	context.fillRect(myCar.x, floor - myCar.height, myCar.width, myCar.height)
    }
    //define a sun
    var mySun = {
    	centerX: 0,
    	centerY: canvas.height / 4,
    	radius: 30
    }
    //drawSun function
    function drawSun(mySun, context){
    	context.fillStyle = 'orange'
	    context.beginPath()
	    context.arc(mySun.centerX, mySun.centerY, mySun.radius, 0, 2 * Math.PI, false)
	    context.closePath()
	    context.fill()
    }
    
		// common size for windows
		var windowSpacing = 2, floorSpacing = 3
		var windowHeight = 5, windowWidth = 3

		// colors of buildings
		var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

		// colors of windows
		var wndColors = [ 'yellow', 'black']

		//build a building
		buildings = []
		var build = function() { 
			var x0 = Math.random()*canvas.width
			var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
			var blgHeight = Math.random()*canvas.height/2

			context.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
			context.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
			buildings.push({x:x0, y:floor-blgHeight, width:blgWidth, height:blgHeight, style:context.fillStyle})

			for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
					context.fillStyle= wndColors[Math.floor(Math.random()*wndColors.length)]
					context.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
			
		}

	
    //Animate function
    function Animate(myCar, mySun, canvas, context, startTime){
    	// update
    	var time = (new Date()).getTime() - startTime
    	var linearSpeed = 200
    	var SunSpeedX = 50
    	var SunSpeedY = 25
    	// pixels / second
    	// use mod to move back and forth
    	var newX = linearSpeed * time / 1000 % (canvas.width - myCar.width)
    	myCar.x = newX
    	//
    	var sunX = 
    	//
    	mySun.centerX = SunSpeedX * time / 1000 % canvas.width
    	if(mySun.centerX > canvas.width /2){
    		mySun.centerY = SunSpeedY * time / 1000 % (canvas.height / 4)
    	} else {
    		mySun.centerY = -SunSpeedY * time / 1000 % (canvas.height / 4) + canvas.height / 4
    	}
        //clear
    	context.clearRect(0, 0, canvas.width, canvas.height);
    	
    	//draw ground
    	drawGround(canvas,context)

		//draw sun
    	drawSun(mySun,context)

    	//buildings
    	buildings.forEach(function(building){
   		
    		context.fillStyle = building.style
    		context.fillRect(building.x, building.y, building.width, building.height)
    		for (var y = floor - floorSpacing; y > floor - building.height; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < building.width - windowWidth; x += windowSpacing + windowWidth) {
					context.fillStyle= wndColors[Math.floor(Math.random()*wndColors.length)]
					context.fillRect(building.x + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
    	})
		

    	//draw car
    	drawCar(myCar,context)
    	// request new frame
        requestAnimFrame(function() {
        	Animate(myCar, mySun, canvas, context, startTime);
        });
    }

    //
    drawGround(canvas,context)
    drawCar(myCar,context)
    drawSun(mySun, context)

    //
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        Animate(myCar, mySun, canvas, context, startTime);
    }, 1000);

    return {
			build: build
	}
	
	
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}

function increaseheight(event)
  {
  //gain the x and y coordinates of the click position
  xmouse=event.clientX
  ymouse=event.clientY

  //increase the height of building
  buildings.forEach(function(value){
  	if(xmouse>=value.x && xmouse<=value.x+value.width && ymouse>=value.y && ymouse<=value.y+value.height){
  		//make sure the building does not exceed the window
  		value.y-=20;
  		value.height+=20;
  	}
  })
  }


