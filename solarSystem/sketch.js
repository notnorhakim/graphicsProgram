var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(200);
    speed = frameCount;
    
    translate(width/2, height/2);
    push();
    rotate (radians(speed/3));
    text ("sun", 110, 0);
    celestialObj(color(255,150,0), 200); // SUN

    // translate first, then rotate to make the earth rotate around the sun with all sides facing the sun
    translate(300, 0);
    rotate (radians(speed));
    colorReset();
    text ("earth", 50, 0);
    celestialObj(color("blue"), 80); // EARTH
    
    push();

    rotate (radians(speed * 1/2));
    translate(55, 10);
    colorReset();
    text ("moon 2", 15, 0);
    celestialObj(color("red"), 15); // MOON2

    pop();

    //rotate first, then translate to make the moon rotate around the earth with one side facing the earth
    //make the moon rotate opposite the earth
    rotate (radians(-speed * 2));
    translate(100, 0);
    colorReset();
    text ("moon 1", 20, 0);
    celestialObj(color("white"), 30); // MOON1

    
    rotate (radians(-speed * 2));
    translate(23, 0);
    colorReset();
    text ("asteroid", 5, 0);
    celestialObj(color("red"), 2); // asteroid 

    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

//rest the color of the stroke after drawing the celestial object
function colorReset(){
    strokeWeight(0.1);
    fill(0);
    stroke(0);
}