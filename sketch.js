var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var obstacle, obstacleImage

var PLAY = 1
var END = 0
var gameState = PLAY

var score = 0


function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600)  
  
  monkey = createSprite(80, 475, 20, 20)
  monkey.addAnimation ("running",monkey_running)
  monkey.scale = 0.15
  
  ground = createSprite (400, 560, 800, 85)
  ground.velocityX = -5
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
}


function draw() {
  background("lightblue")
  
  console.log(gameState)
  
  if(keyDown("space") && monkey.y > 470){
    monkey.velocityY = -12
  }
  
  monkey.velocityY = monkey.velocityY + 0.3 
  
  
  
  ground.x = ground.width/2
  
  
  
  if(gameState === PLAY){
    stroke("black")
    textSize(25)
    fill("black")
    text("Survival Time " + score,400, 50)
    if(frameCount % 10 === 0){
      score = score + 1
    }
    if(monkey.isTouching(obstacleGroup)){
    gameState = END
    }
  }
  else if(gameState === END){
    reset();
    monkey.velocityY = monkey.velocityY + 5
    monkey.collide(ground)
    stroke("black")
    textSize(50)
    fill("red") 
    text("GAME OVER",150,300)
  }
  
  monkey.collide(ground)

  
  spawn_obstacle();
  spawn_banana();
  drawSprites();
}

function spawn_banana() {
  if(frameCount % 80 === 0) {
    banana = createSprite(450, 325, 20, 20)
    banana.addImage (bananaImage)
    banana.scale = 0.15
    banana.velocityX = -5
    banana.y = random(250, 330)
    banana.lifetime = 85
    
    foodGroup.add(banana)  
  }
}

function spawn_obstacle() {
  if(frameCount % 300 === 0){
    obstacle = createSprite(450, 485, 20, 20)
    obstacle.addImage (obstacleImage)
    obstacle.scale =0.2
    obstacle.velocityX = -5
    obstacle.lifetime = 85
    
    obstacleGroup.add(obstacle)
  }
    

}

function reset(){
  
  banana.destroy();
  obstacle.destroy();
  obstacle.velocityX = 0
  banana.velocityX = 0
  banana.lifetime = -1
  obstacle.lifetime = -1  
}
