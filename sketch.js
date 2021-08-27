var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstacolos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;

var JOGAR = 1;

var estadodojogo = JOGAR;

var ENCERRAR = 0;

var gameover,  imagemgameover;
var restart, imagemrestart;

var somdojump, somcheckpoint, somdamorte; 


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  //Carregando todas as imagens
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  imagemgameover = loadImage("gameover.png");
  
  imagemrestart = loadImage("restart.png");

  somdojump = loadSound("jump.mp3");
  
  somcheckpoint = loadSound("checkPoint.mp3");
  
  somdamorte = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  pontuacao = 0;

  grupodeobstacolos = createGroup();

  grupodenuvens = createGroup();

  //trex.debug = true;
  trex.setCollider("circle",150,0,40);

  gameover = createSprite(300,80);
  gameover.addImage("gameover", imagemgameover);
  gameover.scale = 0.2;

  restart = createSprite(300,120);
  restart.addImage("restart", imagemrestart);
  restart.scale = 0.4;

  
  
}

function draw(){
  background("black");
  text("Pontuacao: "+ pontuacao, 450,30);
  
  
  

  if (estadodojogo === JOGAR){
    
    solo.velocityX = -(5 + 2* pontuacao / 1000);
 
    if (pontuacao % 1000 === 0 && pontuacao > 0){
      somcheckpoint.play();
    }
    
    pontuacao = pontuacao + Math.round(frameCount/60);
  
    if(keyDown("space")&& trex.y >= 100){
      trex.velocityY = -13;
      
      somdojump.play();
    
    }
     
    trex.velocityY = trex.velocityY + 0.8
    
    if (solo.x < 0){
    solo.x = solo.width/2;
   }
  
    //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo 
    gerarobstacolos();
  
    if (grupodeobstacolos.isTouching(trex)){
      
      
      trex.velocityY = -13;
      
      somdojump.play(); 
      
      
      //estadodojogo = ENCERRAR;
      //somdamorte.play();
    }
  
    gameover.visible = false;
    restart.visible = false;
  }
  else if (estadodojogo === ENCERRAR){
    
    
    solo.velocityX = 0;
    grupodenuvens.setVelocityXEach (0);
    grupodeobstacolos.setVelocityXEach (0);
  
    grupodenuvens.setLifetimeEach(-1);
    grupodeobstacolos.setLifetimeEach(-1);
  
    trex.changeAnimation("collided" , trex_colidiu);
  
    trex.velocityY = 0
  
    gameover.visible = true;
    restart.visible = true;
  }
    
  trex.collide(soloinvisivel); 

  drawSprites();

}

function gerarobstacolos(){
 if (frameCount % 60 === 0){
   var obstacolo = createSprite(600,165,10,40);
   obstacolo.velocityX = -(5 + 2* pontuacao / 1000);

   
    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacolo.addImage(obstaculo1);
              break;
      case 2: obstacolo.addImage(obstaculo2);
              break;
      case 3: obstacolo.addImage(obstaculo3);
              break;
      case 4: obstacolo.addImage(obstaculo4);
              break;
      case 5: obstacolo.addImage(obstaculo5);
              break;
      case 6: obstacolo.addImage(obstaculo6);
              break;
      default: break;
    
    }
   
    //atribuir escala e tempo de duração ao obstáculo           
    obstacolo.scale = 0.5;
    obstacolo.lifetime = 300;
    
    grupodeobstacolos.add(obstacolo);
 
 }

}




function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 200;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
  
    grupodenuvens.add(nuvem);
  }
}  