class Particle{
  constructor(){
    this.pos = createVector(0,0,0);
    this.vel = p5.Vector.random3D().normalize().mult(random(4,6));
  }
  update(){
    this.pos.add(this.vel);
  }
  showSphere(){
    push();
    
    noStroke();
    fill(255,100);
    translate(this.pos.x,this.pos.y,this.pos.z);
    sphere(6);
    
    pop();
  }
  showSquare(){
    push();
    
    noStroke();
    fill(255,100);
    translate(this.pos.x,this.pos.y,this.pos.z);
    box(10);
    
    pop();
  }
}

let canvas;
let button;
let slider;

particle = [];

let displayState = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  createEasyCam();
  angleMode(DEGREES);

  addGUI();
}

function draw() {
  background(193, 193, 215);
  
  noStroke();
  lights();
  ambientMaterial(slider.value(), 0, 100);

  if(random(1)>0.97){
    for(var i=0;i<50;i++){
      var p = new Particle();
      particle.push(p);
    }
  }

  for(var i =particle.length -1; i>=0; i--){
    particle[i].update();
    if(displayState == 0){
      particle[i].showSphere();
    }else{
      particle[i].showSquare();
    }
  }
}

function addGUI()
{
  //add a slider
  slider = createSlider(0, 255, 100);
  slider.addClass("slider");
  //Add the slider to the parent gui HTML element
  slider.parent("gui-container");

  //add a button
  if(displayState == 0)
  {
      button = createButton("Change to Square");
  }else if(displayState == 1){
      button = createButton("Change to Circle");
  }

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
    
  if(displayState < 1)
  {
    displayState++;
  }else{
    displayState = 0;
  }

  if(displayState == 0)
  {
      button.html("Change to Square");
  }else if(displayState == 1){
      button.html("Change to Circle");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}