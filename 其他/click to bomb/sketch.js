//全局变量
var balls = [];
var coolDown = 0;
var MAX_BALL_NUM=1000;
var mic;

function setup() {
    //函数
    mic = new p5.AudioIn();
    mic.start();
    
    createCanvas(200, 150);
    noStroke();
    for (var i = 0; i < 10; i++) {
        //循环体代码
        balls.push(new Ball(width/2,height/2,30));
    }
}

function draw() {
    var lvl = Math.floor(mic.getLevel()*1000);
    background(0, 20);
    console.log(lvl);
    if(lvl>=30){
        //explode(Math.floor(random(balls.length)))
    }
//香蕉读秒
    if(coolDown>0){
        coolDown -= 1
    }
    for (var i = 0; i < balls.length;i++) {
        balls[i].render();
        balls[i].update();

        }
    
}
function mouseClicked(){
  for (i=0;i<balls.length;i++){
      var d = dist(mouseX,mouseY,balls[i].pos.x,balls[i].pos.y)
      if((d<=balls[i].size/2)&&(coolDown<=0)&&(balls.length<=MAX_BALL_NUM))
      {
          //爆炸
          explode(i);
          coolDown = 60;
      }
  }

}


/*function mouseMoved(){
    fill(color(random(255),random(255),random(255)));
    ellipse(mouseX,mouseY,40);
}*/


//自定义函数
function explode(chosenBallIndex){
    var posX = balls[chosenBallIndex].pos.x;
    var posY = balls[chosenBallIndex].pos.y;
    var ballSize = balls[chosenBallIndex].size*random(60)*0.01;
    balls.splice(chosenBallIndex,1);
    for(var i=0;i<10;i++){
        balls.push(new Ball(posX,posY,ballSize));
    }
}

function Ball(posX,posY,ballSize){
    this.pos = createVector(posX,posY);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(1,3));
    this.color = color(random(255), random(255), random(255));
    this.size = ballSize;
    this.update = function(){
        this.pos.add(this.vel);
    //右边
    if (this.pos.x >= width - this.size / 2)
    {
        this.bounceOnEdge("RIGHT")
    }
    //左边
    if (this.pos.x <= this.size / 2){
        this.bounceOnEdge("LEFT")
    }
    //下边
    if (this.pos.y >= height - this.size / 2){
        this.bounceOnEdge("BOTTOM")
    }
    //上边
    if (this.pos.y <= this.size / 2){
        this.bounceOnEdge("TOP")
    }
    }
    this.render = function(){
        fill(this.color);
        ellipse(this.pos.x,this.pos.y,this.size);
    }
    this.bounceOnEdge = function(edge){
        var force;
        var antiVel;
        var angle;
        var len;        
        if(edge == "TOP"){
            force = createVector(0,1);
        }else if (edge == "BOTTOM"){
            force = createVector(0,-1);
        }else if (edge == "LEFT"){  
            force = createVector(1,0);
        }else if (edge == "RIGHT"){
            force = createVector(-1,0);
        }
        antiVel = this.vel.copy();
        antiVel.rotate(PI);
        angle = 
        p5.Vector.angleBetween(force,antiVel)
        len = Math.cos(angle)*this.vel.mag()*2
        force.setMag(len);
        this.vel.add(force);
        
        this.color = color(random(255),random(255),random(255))
    }
}