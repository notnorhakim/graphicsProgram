
/*
Commentary:





*/






function setup()
{
    createCanvas(500, 500);
    background(255);
}

function draw()
{
    background(255);
    var noOfDots = map(mouseX, 0, width, 5, 30);
    var size = width/noOfDots;

    for (var x = 0; x < noOfDots; x++)
    {
      for (var y = 0; y < noOfDots; y++)
      {
        // your code here
        var pos_x = size * x + size/2;
        var pos_y = size * y + size/2;
        var dot_size = size/2;
        // console.log("x: " + x +  " y: " + y + " " + pos_x + " " + pos_y + " " + phase_x + " " + phase_y);

        //noise 
        var offset = 10;
        var c1 = ((x+frameCount)/offset);
        var c2 = ((y+frameCount)/offset);
        var c3 = (frameCount/offset);
        var colour = color(noise(c1)*255,noise(c2)*255,noise(c3)*255);

        //wave
        var tfactor = 100;
        var tx = (x+frameCount)/tfactor;
        var ty = (y+frameCount)/tfactor;
        var pfactor = 50;
        var phase_x = noise(tx) * pfactor + map(mouseX, 0, width, -50, 50);
        var phase_y = noise(ty+1000)*pfactor;
        
        wave(pos_x, pos_y, dot_size,colour, phase_x, phase_y);
        
      }
    }

    
}


function wave(pos_x, pos_y, dot_size,colour, phase_x, phase_y) 
{
 // your code here
  push();
  translate(pos_x, pos_y);
  fill(colour);
  var rfactor = 10; //rotation factor this is to control the speed of rotation
  rotate((phase_x + phase_y)/rfactor); //this is to make the rotation of the ellipse
 translate(phase_x, phase_y);

 
 // Draw star shape
 var radius1 = dot_size / 2; // Outer radius
 var radius2 = radius1 / 2; // Inner radius
 var npoints = 5; // Number of points on the star
 var angle = TWO_PI / npoints;
 var halfAngle = angle / 2;

 beginShape();
 for (var a = 0; a < TWO_PI; a += angle) {
   var sx = cos(a) * radius1;
   var sy = sin(a) * radius1;
   vertex(sx, sy);
   sx = cos(a + halfAngle) * radius2;
   sy = sin(a + halfAngle) * radius2;
   vertex(sx, sy);
 }
 endShape(CLOSE);
 
 pop();
}
