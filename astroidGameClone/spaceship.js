class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  thrust()
  {

    //make a random number from -1 to 1
    var rand = random(-1,1);

    //make a random color between yellow and red
    var randColor = color(random(255), random(255), 0);

    fill(randColor);
    //thrusters pointing left
    if (keyIsDown(RIGHT_ARROW)){
      triangle
    (
      this.location.x - this.size/2, this.location.y - this.size/2,
      this.location.x - this.size/2, this.location.y - this.size/2 +20,
      this.location.x - this.size/2 - 20, this.location.y - this.size/2 + 10*rand
    )
    triangle
    (
      this.location.x - this.size/2, this.location.y + this.size/2,
      this.location.x - this.size/2, this.location.y + this.size/2 - 20,
      this.location.x - this.size/2 - 20, this.location.y + this.size/2 - 10*rand
    )
    }
    //thrusters pointing right
    else if (keyIsDown(LEFT_ARROW)){
      triangle
    (
      this.location.x + this.size/2, this.location.y - this.size/2,
      this.location.x + this.size/2, this.location.y - this.size/2 +20,
      this.location.x + this.size/2 + 20, this.location.y - this.size/2 + 10*rand
    )
    triangle
    (
      this.location.x + this.size/2, this.location.y + this.size/2,
      this.location.x + this.size/2, this.location.y + this.size/2 - 20,
      this.location.x + this.size/2 + 20, this.location.y + this.size/2 - 10*rand
    )
    }
    //thrusters pointing up
    else if (keyIsDown(UP_ARROW)){
      triangle
    (
      this.location.x - this.size/2, this.location.y + this.size/2,
      this.location.x - this.size/2 +20, this.location.y + this.size/2,
      this.location.x - this.size/2 + 10*rand, this.location.y + this.size/2 + 20
    )
    triangle
    (
      this.location.x + this.size/2, this.location.y + this.size/2,
      this.location.x + this.size/2 -20, this.location.y + this.size/2,
      this.location.x + this.size/2 - 10*rand, this.location.y + this.size/2 + 20
    )
    }
    //thrusters pointing down
    else if (keyIsDown(DOWN_ARROW)){
      triangle
    (
      this.location.x - this.size/2, this.location.y - this.size/2,
      this.location.x - this.size/2 +20, this.location.y - this.size/2,
      this.location.x - this.size/2 + 10*rand, this.location.y - this.size/2 - 20
    )
    triangle
    (
      this.location.x + this.size/2, this.location.y - this.size/2,
      this.location.x + this.size/2 -20, this.location.y - this.size/2,
      this.location.x + this.size/2 - 10*rand, this.location.y - this.size/2 - 20
    )
    }

  }
    

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);


      
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        this.thrust();

      }
      if (keyIsDown(RIGHT_ARROW)){
        // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1, 0));
        this.thrust();
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, -0.1));
        this.thrust();
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, 0.1));
        this.thrust();

      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    var friction = this.velocity.copy();
    friction.mult(-1);
    friction.mult(1/30);
    this.applyForce(friction);

  }
}
