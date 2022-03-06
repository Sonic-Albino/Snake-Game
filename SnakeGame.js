var size = 20;
var score;
var dead;
var Apple_sound;
var Death_sound;

function setup() 
{
  createCanvas(400, 400);
  Apple_sound = loadSound('Sounds/coin.wav');
  Death_sound = loadSound('Sounds/death.mp3');
  score = 0;
  dead = false;
  snk = new Snake();
  app = new Apple();
  SetCol = new SetColor();
  app.New_Location();
  frameRate(10);
}

function draw() 
{
  background(0);
  Death();
  snk.update_pos();
  snk.Draw();
  Eat();
  app.Draw();
  Draw_Score();
}

function SetColor()
{
  this.red = function()
  {
    strokeWeight(0);
    fill(200, 0, 0);
    stroke(200, 0, 0);
  }
  
  this.green = function()
  {
    strokeWeight(0);
    fill(0, 200, 0);
    stroke(0, 200, 0);
  }
  
  this.white = function()
  {
    strokeWeight(0);
    fill(255, 255, 255)
    stroke(255, 255, 255);
  }
}

function Snake()
{
  this.x = width/2; //Spawn pos
  this.y = height/2; //Spawn pos
  this.tail_size = 0;
  this.tail_pos = [];
 
  this.speedX = 0;
  this.speedY = 0;
  
  this.Direction = function(x, y)
  {
    this.speedX = x;
    this.speedY = y;
  }
  
  this.update_pos = function()
  {
    if (this.tail_size == this.tail_pos.length) //Prevent Reading Bugs
    {
      for (var i = 0; i < this.tail_pos.length; i++)
      {
        this.tail_pos[i] = this.tail_pos[i+1]; //Making the tail move
      }
    }
    
    this.tail_pos[this.tail_size-1] = createVector(this.x, this.y); //Setting the position of the tail
    
    this.x = this.x + this.speedX*size;
    this.y = this.y + this.speedY*size;
    
    this.x = constrain(this.x, 0, width - size);
    this.y = constrain(this.y, 0, height - size);
  }
  
  this.Draw = function() //Draw the Snake
  {
    SetCol.green();
    for (var i = 0; i < this.tail_pos.length; i++) //Snake Body
    {
      rect(this.tail_pos[i].x, this.tail_pos[i].y, size, size);
    }
    rect(this.x, this.y, size, size); //Snake Head
  }
}

function Apple()
{
  
  this.New_Location = function() //New location for the apple
  {
    var col = (width - size) / size;
    var row = (height - size) / size;
    this.x = round(random(col));
    this.y = round(random(row));
    this.x = floor(this.x * size);
    this.y = floor(this.y * size);
  }
  
  this.Draw = function() //Draw Apple
  {
    SetCol.red();
    rect(this.x, this.y, size, size);
  }
}

function Eat()
{
  if (snk.x == app.x && snk.y == app.y) //Eat the apple
  {
    Apple_sound.play();
    app.New_Location();
    snk.tail_size++;
    score++;
  }
}

function Draw_Score()
{
  textSize(20);
  SetCol.white();
  text("Score: " + score, 5, 20);
}

function Death()
{
  for (var i = 0; i < snk.tail_pos.length; i++)
  {
    if (snk.tail_pos[i].x == snk.x && snk.tail_pos[i].y == snk.y) //Head Hit the Body
    {
      dead = true;
      break;
    }
  }
  
  if (dead) //Reset all the stuff
  {
    dead = false;
    Death_sound.play();
    snk.tail_pos = [];
    snk.tail_size = 0;
    snk.Direction(0, 0);
    snk.x = width/2;
    snk.y = height/2;
    score = 0;
    app.New_Location();
  }
}

function keyPressed()
{
  if (keyCode == UP_ARROW && snk.speedY != 1)
    snk.Direction(0, -1);
  else if (keyCode == DOWN_ARROW && snk.speedY != -1)
    snk.Direction(0, 1);
  else if (keyCode == LEFT_ARROW && snk.speedX != 1)
    snk.Direction(-1, 0)
  else if (keyCode == RIGHT_ARROW && snk.speedX != -1)
    snk.Direction(1, 0)
  
}