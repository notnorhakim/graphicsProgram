//vector of images
var imgs = [];
//average image
var avgImg;
//number of images
var numOfImages = 30;

//start of my code

//random index for diplay on the left
let randomIndex = 0; 

//check if all images are loaded
var loadCounter = 0;
//////////////////////////////////////////////////////////
//preload runs before setup once
function preload() {
    //loop through images
    for (var i=0; i<numOfImages;i++){
        var img = loadImage("assets/" + i + ".jpg",imageloadSuccess);
        //add to images vector imgs
        imgs.push(img);
    }
}

//callback function for when images are loaded
function imageloadSuccess(){
    //increment loadCounter
    loadCounter++;
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(2*imgs[0].width, imgs[0].height);
    pixelDensity(1);
    //create average image with same size as other images
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        //display random image on the left
        randomIndex = floor(random(imgs.length)); 
        loop();
        console.log("clicked");
    }
}

function draw() {
    background(125);
    //check if all images are loaded
    if(loadCounter != numOfImages){
        console.log("loading");
        return;
    }
    console.log("All images loaded!");
    var img = averageFace(imgs);
    //display random image on the left
    image(imgs[randomIndex], 0, 0);
    //display average image on the right
    image(img, imgs[0].width, 0, imgs[0].width, imgs[0].height);
    push();
    fill(255); 
    noStroke();
    text("Press left arrow keys to change between faces", 100, 480,500,32); 
    pop();
    noLoop();
}

function averageFace(images){
    console.log("Average Face");
    //load pixels for all images
    for(var i=0;i<images.length;i++){
        images[i].loadPixels();
    }
    //load pixels for average image
    avgImg.loadPixels();
    for(var y=0; y<avgImg.height; y++){
        for(var x=0; x<avgImg.width; x++){
            //get pixel index for x,y coordinates
            var pixelIndex = ((avgImg.width*y)+x)*4;
            //get average of all images for this pixel
            var r = 0;
            var g = 0;
            var b = 0;
            for(var i=0; i<images.length; i++){
                var img = images[i];
                r += img.pixels[pixelIndex+0];
                g += img.pixels[pixelIndex+1];
                b += img.pixels[pixelIndex+2];
            }
            //set average pixel value for average image
            avgImg.pixels[pixelIndex+0] = r/images.length;
            avgImg.pixels[pixelIndex+1] = g/images.length;
            avgImg.pixels[pixelIndex+2] = b/images.length;
            avgImg.pixels[pixelIndex+3] = 255
        }
    }
    //update pixels for average image
    avgImg.updatePixels();
    return avgImg;
}

//end of my code

