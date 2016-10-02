'use strict'


var createApp = function(canvas) { 
	//set the frame
	var requestAnimationFrame =  
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 1);
  };
  canvas.setAttribute('width',screen.width);
  canvas.setAttribute('height',screen.height);
	var context = canvas.getContext("2d");
	var floor = canvas.height/5

  var warship = {
    location: 0,
    speed: 30
  }

  var submarines = {
    location : Array.apply(null, Array(10)).map(function(x, i) {return 0}),
    speed : Array.apply(null, Array(10)).map(function(x, i) {return Math.random() * 200 + 100}),
    depth : Array.apply(null, Array(10)).map(function(x, i) {return Math.random() * 200 + 50}),
    broke : Array.apply(null, Array(10)).map(function(x, i) {return false}),
    count : 10
  }

  var bomb = {
    location: -10,
    depth : -25,
    load : true,
    drop : false,
    collide : false,
    count : 0
  }

  var spark = {
    location : 0,
    depth : 0,
    time: 0
  }
	//draw ground
	var drawGround = function(canvas,context){
		var grad = context.createLinearGradient(0,floor,0,canvas.height)
		grad.addColorStop(0, "blue")
		grad.addColorStop(1, "black")
		context.fillStyle=grad
		context.fillRect(0, floor, canvas.width, canvas.height)
	}


  //collisionTest
  var collisionTest = function(submarines, bomb, spark) {
    submarines.location.forEach(function(location_val, index){
      if(bomb.location >= location_val && bomb.location <= location_val + 100 
        && bomb.depth + 70 >= submarines.depth[index] 
        && bomb.depth + 70 <= submarines.depth[index] + 40
        && !bomb.collide) {
            spark.location = bomb.location;
            spark.depth = bomb.depth;
            var img_spark = document.getElementById("spark");
            context.drawImage(img_spark, spark.location, floor + spark.depth);
            spark.time++;
            if(spark.time > 5) {
              bomb.collide = true;
              submarines.broke[index] = true;
              submarines.count--;
            }
      }
    })
  }

      //keydown event listener
      document.body.addEventListener('keydown', function(e) {
          if (e.which === 37) {
            if(warship.location >= 0)  warship.location -= warship.speed;
          }
          if(e.which === 39) {
            if(warship.location < canvas.width - 150) warship.location += warship.speed
          }
      });

      document.body.addEventListener('keyup', function(e) {
          if(e.which === 32) {
            if(bomb.load){
              bomb.drop = true;
              bomb.depth = -25; 
              bomb.location = warship.location + 75;
              bomb.count++;
            }
          }
      });

      document.body.addEventListener('click', function(e) {
          
            if(bomb.load){
              bomb.drop = true;
              bomb.depth = -25; 
              bomb.location = warship.location + 75;
              bomb.count++;
            }
          
      });


    //Animate function
    function Animate(canvas, context, startTime, warship, submarines, bomb, spark){
    	// update
    	var time = (new Date()).getTime() - startTime

      //clear
    	context.clearRect(0, 0, canvas.width, canvas.height);
    	
    	//draw ground
    	drawGround(canvas,context)
      
      //draw bomb
      if(bomb.drop) {        
        bomb.depth += 3;
        bomb.load = false;
      }
      if(bomb.depth > canvas.height - floor) {       
        bomb.drop = false;
        bomb.load = true;
        bomb.collide = false;
        spark.time = 0;
      }
      
      var img_bomb = document.getElementById("bomb");
      if(!bomb.collide)   context.drawImage(img_bomb, bomb.location, floor + bomb.depth);

      //draw warship
      var img_warship = document.getElementById("warship");
      context.drawImage(img_warship, warship.location, floor-50);

      //draw submarine
      var img_submarine = document.getElementById("submarine");
      submarines.speed.forEach(function (speed_val, index){
        if(!submarines.broke[index]){
          if(time / 1000 <= 90)
            submarines.location[index] = speed_val * time / 1000 % canvas.width;
          if(time / 1000 > 90)
            submarines.location[index] = (speed_val + 100) * time / 1000 % canvas.width;
          context.drawImage(img_submarine, submarines.location[index], floor+submarines.depth[index]);
        }
        if(submarines.broke[index]) {
          submarines.location[index] = -10;
          submarines.depth[index] = -10;
        }
      });
      //alert to speed up
      if(Math.floor(time / 1000) == 90)
        window.alert("You are too slow! The submarines' speed will increase!")

      collisionTest(submarines, bomb, spark);

      //output
      document.getElementById("bomb_used").innerHTML = bomb.count;
      document.getElementById("submarine_left").innerHTML = submarines.count;
      document.getElementById("time_used").innerHTML = Math.floor(time / 1000);
    	// request new frame
        requestAnimationFrame(function() {
          if(submarines.count > 0) {
        	   Animate(canvas, context, startTime, warship, submarines, bomb, spark);
          }
          else {
            window.alert('Congrats! You win!');
          }
        });
    }    
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        Animate(canvas, context, startTime, warship, submarines, bomb, spark);
    }, 0);

}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
  document.getElementById("restart").onclick = function() {
    window.location.reload();
  }
}





