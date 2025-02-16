//start of my code

var confLocs;
var confTheta;

let cameraSpeedSlider;
let confettiSlider;
let cubeHeightSlider; 
let waveSpeedSlider;

let drawCubes = true;
let randomMotion = false;

let cameraXSlider, cameraYSlider, cameraZSlider;
let cameraXLabel, cameraYLabel, cameraZLabel;

let colors = [];
let numColors = 360; // Number of colors in the rainbow
let gradientIndex = 0;

function setup() {

    createCanvas(900, 800, WEBGL);
    camera(800, -600, 800, 0, 0, 0, 0, 1, 0); 

    ambientLight(50);
    directionalLight(255, 0, 0, 0.25, 0.25, 0);

    colorMode(HSB, 360, 100, 100);
    // Generate the rainbow colors
    for (let i = 0; i < numColors; i++)
    {
        colors.push(color(i, 100, 100));
    }

    // Buttons
    cubeButton = createButton('Toggle Shape');
    cubeButton.mousePressed(toggleShape);
    cubeButton.position(10, 330);

    randomMotionButton = createButton('Shake');
    randomMotionButton.mousePressed(toggleRandomMotion);
    randomMotionButton.position(10, 370);

    resetPositionButton = createButton('Reset All');
    resetPositionButton.mousePressed(resetPosition);
    resetPositionButton.position(10, 410);

    // Create sliders for camera position
    cameraSpeedSlider = createSlider(0, 0.1, 0.01, 0.001);
    cameraSpeedSlider.position(10, 10);
    cameraSpeedSlider.style('width', '80px');  

    confettiSlider = createSlider(0, 5000, 500); 
    confettiSlider.position(10, 50);
    confettiSlider.style('width', '80px');

    cameraXSlider = createSlider(-5000, 5000, -0, 100);
    cameraXSlider.position(10, 90);
    cameraXSlider.style('width', '80px');

    cameraYSlider = createSlider(-5000, 5000, -600, 100);
    cameraYSlider.position(10, 130);
    cameraYSlider.style('width', '80px');

    cameraZSlider = createSlider(-5000, 5000, -0, 100);
    cameraZSlider.position(10, 170);
    cameraZSlider.style('width', '80px');

    cubeHeightSlider = createSlider(10, 500, 100);
    cubeHeightSlider.position(10, 210);
    cubeHeightSlider.style('width', '80px');

    waveSpeedSlider = createSlider(0, 5, 1, 0.05);
    waveSpeedSlider.position(10, 250);
    waveSpeedSlider.style('width', '80px');

    sizeSlider = createSlider(400, 1200, 400);
    sizeSlider.position(10, 290);
    sizeSlider.style('width', '80px');

    // Create labels for camera position sliders
    rotationSpeedLabel = createP('Rotation Speed');
    rotationSpeedLabel.position(100, -5);

    confettiLabel = createP('No. of Confetti');
    confettiLabel.position(100, 35);

    cameraXLabel = createP('X Camera Position');
    cameraXLabel.position(100, 75);

    cameraYLabel = createP('Y Camera Position');
    cameraYLabel.position(100, 115);

    cameraZLabel = createP('Z Camera Position');
    cameraZLabel.position(100, 155);

    sizeLabel = createP('Height/Diameter');
    sizeLabel.position(100, 195);

    waveSpeedLabel = createP('Wave Speed');
    waveSpeedLabel.position(100, 235);

    sizeLabel = createP('Size');
    sizeLabel.position(100, 275);

    confLocs = [];
    confTheta = [];

    for (var i = 0; i < 1000; i++)
    {
        random(-500,500);
        var a = random(-500,500);
        var b = random(-800,0);
        var c = random(-500,500);
        confLocs.push(createVector(a,b,c));
        confTheta.push(random(0,360));
    }

}

function confetti()
{
    let numConfetti = map(confettiSlider.value(), 0, 5000, 0, 1000);
    
    for (var i = 0; i < numConfetti; i++)
    {
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15,15);

        confLocs[i].y += 1;
        confTheta[i] += 10;

        if (confLocs[i].y > 0)
        {
            confLocs[i].y = -800;
        }
        pop();
    }

}

function draw()
{
    // Calculate the background color
    let bgColor = colors[gradientIndex];

    // Set the background to the calculated color
    background(bgColor);

    // Increment the index for the next color in the rainbow
    gradientIndex = (gradientIndex + 1) % numColors;
        
    angleMode(DEGREES);

    let cameraSpeed = cameraSpeedSlider.value()*100;
    let cubeHeight = cubeHeightSlider.value();
    let waveSpeed = waveSpeedSlider.value();
    let size = sizeSlider.value();

    let xLoc = cos(frameCount*cameraSpeed) * height;  
    let zLoc = sin(frameCount*cameraSpeed) * height;

    // Update camera position based on slider values
    let cameraX = cameraXSlider.value();
    let cameraY = cameraYSlider.value();
    let cameraZ = cameraZSlider.value();

    camera(cameraX + xLoc, cameraY, cameraZ + zLoc, 0, 0, 0, 0, 1, 0);
    stroke(0);
    strokeWeight(2);

    for (var x = -size; x < size; x += 50)
    {
        for (var z = -size; z < size; z += 50)
        {
            push();
            if(randomMotion)
            {
                // Add randomness with noise
                translate(random(-10,10), random(-10,10), random(-10,10));
            }
            translate(x, 0, z);
            var distance = dist(0,0,x,z) + frameCount;
            var length = map(sin(distance * waveSpeed), -1, 1, cubeHeight*0.5, cubeHeight*5);
            if (drawCubes)
            {
                // Draw cubes
                box(50, length, 50);  
            } else
            {
                // Draw ellipses
                sphere(length);
            }
            pop();
        }
    }
    normalMaterial();
    // ambientMaterial(250); 
    confetti();
}

function toggleShape()
{
    drawCubes = !drawCubes; 
}

function toggleRandomMotion()
{
    randomMotion = !randomMotion;
}

function resetPosition()
{
    // Reset camera sliders
  cameraSpeedSlider.value(0.01);
  cameraXSlider.value(0);
  cameraYSlider.value(-600);
  cameraZSlider.value(0);

  // Reset other sliders to their default values
  confettiSlider.value(500);
  cubeHeightSlider.value(100);
  waveSpeedSlider.value(1);
  sizeSlider.value(400);

  // Reset other parameters to their default values
  drawCubes = true;
  randomMotion = false;
}


//end of my code