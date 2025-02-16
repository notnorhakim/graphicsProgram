// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

// start of my code

var imgIn;
var buttons = [];
var sepiaEnabled = true;
var darkCornersEnabled = true;
var radialBlurEnabled = true;
var borderEnabled = true;
var noneEnabled = false;
var matrix = [
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
  [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
  createCanvas((imgIn.width * 2), imgIn.height);
  //Create buttons
  buttons[0] = createButton('No Filter');
  buttons[1] = createButton('Sepia Filter'); 
  buttons[2] = createButton('Dark Corners');
  buttons[3] = createButton('Radial Blur Filter');
  buttons[4] = createButton('Border Filter');

 //Position and size buttons
 for(var i = 0; i < buttons.length; i++) {
  buttons[i].position(100*i + 900, height-50);
  buttons[i].size(80, 40);
}

//Add event listeners 
for(var i = 0; i < buttons.length; i++) {
  buttons[i].mousePressed(applyFilter); 
}

}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var finalImg = createImage(imgIn.width, imgIn.height);
  finalImg = imgIn.get();
  if(sepiaEnabled) {
    finalImg = sepiaFilter(finalImg);
  }

  if(darkCornersEnabled) {  
    finalImg = darkCorners(finalImg);
  }

  if(radialBlurEnabled) {
    finalImg = radialBlurFilter(finalImg);
  }

  if(borderEnabled) {
    finalImg = borderFilter(finalImg);
  }
  return finalImg;
}

function sepiaFilter(finalImg){

  imgIn.loadPixels();
  finalImg.loadPixels();

  
  for(var x=0; x<imgIn.width;x++){
    for(var y=0; y<imgIn.height;y++){
      // Get pixel index from x and y
      var pixelIndex = ((imgIn.width*y) + x) * 4;
      // Get prev pixel RGB values
      var prevRed = imgIn.pixels[pixelIndex + 0];
      var prevGreen = imgIn.pixels[pixelIndex + 1];
      var prevBlue = imgIn.pixels[pixelIndex + 2];
      
      // Apply sepia filter to pixel RGB values
      var newRed = (prevRed * .393) + (prevGreen * .769) + (prevBlue * .189);
      var newGreen = (prevRed * .349) + (prevGreen * .686) + (prevBlue * .168);
      var newBlue = (prevRed * .272) + (prevGreen * .534) + (prevBlue * .131);

      // Constrain RGB values to 0-255
      // this will prevent the values from going out of bounds
      newRed = constrain(newRed, 0, 255);
      newGreen = constrain(newGreen, 0, 255);
      newBlue = constrain(newBlue, 0, 255);

      // Set new pixel RGB values
      finalImg.pixels[pixelIndex + 0] = newRed;
      finalImg.pixels[pixelIndex + 1] = newGreen;
      finalImg.pixels[pixelIndex + 2] = newBlue;
      finalImg.pixels[pixelIndex + 3] = 255;
    }
  }
  // Update pixels to display result
  finalImg.updatePixels();
  // Return updated result
  return finalImg;

}

function darkCorners(imgIn){
  imgIn.loadPixels();
  // this will get the middle of the image X
  var middleX = imgIn.width/2;
  // this will get the middle of the image Y
  var middleY = imgIn.height/2;
  // this will get the maximum distance from the middle to the corner
  var maxDist = abs(dist(middleX, middleY, 0, 0));
  // looping through all pixels
  for(var x=0; x<imgIn.width;x++){
    for(var y=0; y<imgIn.height;y++){
      //getting the distance from the middle to the current pixel
      var d = abs(dist(middleX, middleY, x, y));
      // if the distance is greater than 300
      if (d>300){
        // get the pixel index by multiplying the x and y values by 4
        var pixelIndex = ((imgIn.width*y) + x) * 4;
        // get the previous pixel RGB values
        var prevRed = imgIn.pixels[pixelIndex + 0];
        var prevGreen = imgIn.pixels[pixelIndex + 1];
        var prevBlue = imgIn.pixels[pixelIndex + 2];
        //if the distance is less than 450
        if(d<=450){
          // map the distance to a value between 1 and 0.4
          //dynlum is the dynamic luminance, it is the value that will be multiplied by the pixel RGB values

          var dynLum = map(d, 300, 450, 1, 0.4);
        }else{
          // map the distance to a value between 0.4 and 0
          var dynLum = map(d, 450, maxDist, 0.4, 0);
        }
        // constrain the value between 0 and 1
        dynLum = constrain(dynLum, 0, 1);
        // set the new pixel RGB values
        imgIn.pixels[pixelIndex + 0] = prevRed * dynLum;
        imgIn.pixels[pixelIndex + 1] = prevGreen * dynLum;
        imgIn.pixels[pixelIndex + 2] = prevBlue * dynLum;
      }
    }
  }
  imgIn.updatePixels();
  return imgIn;
}

function radialBlurFilter(imgIn){

  imgIn.loadPixels();
  var matrixSize = matrix.length;

  for(var x=0; x<imgIn.width; x++){
    for(var y=0; y<imgIn.height; y++){
      // Get pixel index from x and y
      var pixelIndex = ((imgIn.width*y) + x) * 4;

      // Get convolution matrix to multiply with pixel values
      var c = convolution(x, y, matrix, matrixSize, imgIn);

      // Get prev pixel RGB values
      var prevRed = imgIn.pixels[pixelIndex + 0];
      var prevGreen = imgIn.pixels[pixelIndex + 1];
      var prevBlue = imgIn.pixels[pixelIndex + 2];

      // Get distance from mouse to pixel
      var mouseDist = abs(dist(x+imgIn.width, y, mouseX, mouseY));
      // Map distance to a value between 0 and 1 for blur
      var dblur = map(mouseDist, 100, 300, 0, 1);
      // Constrain value between 0 and 1 so that it doesn't go out of bounds
      dblur = constrain(dblur, 0, 1);

      // Apply blur to pixel RGB values
      var newRed = c[0] * dblur + prevRed * (1-dblur);
      var newGreen = c[1] * dblur + prevGreen * (1-dblur);
      var newBlue = c[2] * dblur + prevBlue * (1-dblur);

      // Set new pixel RGB values and update pixels
      imgIn.pixels[pixelIndex + 0] = newRed;
      imgIn.pixels[pixelIndex + 1] = newGreen;
      imgIn.pixels[pixelIndex + 2] = newBlue;
    }

  }
  // Update pixels to display result
  imgIn.updatePixels();
  return imgIn;
}

function borderFilter(imgIn){
  var finalImg = createGraphics(imgIn.width, imgIn.height);
  finalImg.image(imgIn, 0, 0);

  finalImg.noFill();
  finalImg.stroke(255);
  finalImg.strokeWeight(20);
  finalImg.rect(0, 0, imgIn.width, imgIn.height,50);

  finalImg.strokeWeight(20);
  finalImg.stroke(255);
  finalImg.rect(0, 0, imgIn.width, imgIn.height);

  return finalImg;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color as an array
    return [totalRed, totalGreen, totalBlue];
}

function applyFilter() {
  
  // Get index of clicked button
  var index = buttons.indexOf(this);
  
  // Apply filter based on index
  if(index == 0)
  {
    sepiaEnabled = false;
    darkCornersEnabled = false;
    radialBlurEnabled = false;
    borderEnabled = false;
    
  } else if(index == 1) {
    // Toggle sepia
    sepiaEnabled = !sepiaEnabled;
  
  } else if(index == 2) {
    // Toggle dark corners
    darkCornersEnabled = !darkCornersEnabled;
  
  } else if(index == 3) {
    // Toggle radial blur
    radialBlurEnabled = !radialBlurEnabled;
  
  } else if(index == 4) {
    // Toggle border
    borderEnabled = !borderEnabled;
  }
  redraw();
}

// end of my code