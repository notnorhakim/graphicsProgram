////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}

function setupSpinningRect(){
  spinningRect = Bodies.rectangle(500, 300, 10, 300, {isStatic:true,angler});
  World.add(engine.world, [spinningRect]);
}

function drawSpinningRect(){

  push();
  fill("orange")
  Body.setAngle(spinningRect, angler);
  Body.setAngularVelocity(spinningRect, 0.02);
  angler += 0.1;
  drawVertices(spinningRect.vertices);
  pop();
}

////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle});
  World.add(engine.world, [propeller]);
}

////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, 0.2);
  angle += angleSpeed;
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  for (var i=birds.length-1; i>=0; i--){
    var randomColor = color(random(255), random(255), random(255)); // Generate a random RGB color
    fill(randomColor);
    drawVertices(birds[i].vertices);
    if (isOffScreen(birds[i])){
      removeFromWorld(birds[i]);
      birds.splice(i,1);
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  var numOfRows = 6;
  var numOfCols = 3;
  var size = 80;
  var startX = width-size;
  var startY = height-size;
  for (var row=0; row<numOfRows; row++)
  {
    for (var col=0; col<numOfCols; col++)
    {
      var box = Bodies.rectangle(startX-(col*size), startY-(row*size), size, size);
      World.add(engine.world, [box]);
      boxes.push(box);
      colors.push(color(0, random(50,200),0));
    }
  }
  
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  //random color for each box
  var randomColor;
  randomColor = ["red", "blue", "green", "yellow", "purple", "orange"];

  push();
  for (var i=0; i<boxes.length; i++){
    fill(randomColor[i%6]);
    drawVertices(boxes[i].vertices);
    if (isOffScreen(boxes[i])){
      removeFromWorld(boxes[i]);
      boxes.splice(i,1);
      boxesoffscreen = boxesoffscreen + 1;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  slingshotBird = Bodies.circle(180, 180, 20, {friction: 0, restitution: 0.95, mass: 10});
  slingshotConstraint = Constraint.create({
    pointA: {x: 200, y: 200},
    bodyB: slingshotBird,
    pointB: {x: 0, y: 0},
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill("orange");
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

/////////////////////////////////////////////////////////////////
function drawCountdown()
{
  var drawCountdown = 60 - Math.floor(millis()/1000);
  fill(255);
  //text at the top of the screen
  textSize(20);
  text("Push all the boxes off the screen before time runs out!", 10, 20);
  text("Time remaining: " + drawCountdown, 10, 40);
  if (drawCountdown == 0)
  {
    text("Game over!", width/2 - 80, height/2);
    noLoop();
  }
  if (boxesoffscreen == 18)
  {
    textSize(40);
    text("You win!", width/2 - 80, height/2);
    noLoop();
  }


}
