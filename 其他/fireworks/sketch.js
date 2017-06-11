var balls=[]; 
var coolDown=0;
var MAX_BALL_NUM=1000;
var logo;//图片

function preload(){
    logo = loadImage("296075.jpg")//括号里为地址
}

function setup() {
    createCanvas(500,300);
    background(0);
    noStroke();
    }
    cam = createCapture(VIDEO){
   
        
    }
function draw() {

    
    background(0,20);//冷却时间读秒
    image(cam,0,0,width,height)
    
    if(coolDown>0){
        coolDown -=1
    }else{
        fireBall();
        coolDown=60;
    }
    
    for(var i=0;i<balls.length;i++){
       balls[i].render();
       balls[i].update();
       //检查小球的状态
        if(balls[i].state=="FIRE"){
            var d=p5.Vector.dist(balls[i].pos,balls[i].target);
            if(d<3){
               //把小球状态标记为DEAD
                balls[i].state="DEAD";
                //引爆核弹
                explode(i);
                
               }
        }else if(balls[i].state=="SPARK"){
            var d=p5.Vector.dist(balls[i].pos,balls[i].target)
            if(d<3){
                balls[i].state="DEAD"
            }
        }
        
    }
//事件处理函数
removeDeadBalls()

imageMode(CENTER)//居中
image(logo,width/2,height/2,130,40)//图片位置//最后写入最后被渲染出来，覆盖在最上层

}


function removeDeadBalls(){
    for(var i=0;i<balls.length;i++){
        if(balls[i].state=="DEAD"){
            balls.splice(i,1);
        }
    }
}
function fireBall(){
    //生成一个小球，定义出生点
    var b=new Ball(random(50,width-50),height,20)
    b.state="FIRE";
    //设置小球的目标
    b.target=createVector(b.pos.x,50);
    //把小球装到balls数组
    balls.push(b);
}

function explode(chosenBallIndex){//被选中的要爆炸的小球
    var posX=balls[chosenBallIndex].pos.x;
    var posY=balls[chosenBallIndex].pos.y;
    var ballSize=balls[chosenBallIndex].size*0.4;
    //神选小球从数组里踢掉
    //balls.splice(chosenBallIndex,1);
    for(var i=0;i<50;i++){
        var b=new Ball(posX,posY,ballSize);
        b.state="SPARK";
        var v=p5.Vector.random2D();
        v.setMag(random(70,100));
        b.target=p5.Vector.add(v,b.pos);
        balls.push(b);
    }
    
}

function Ball(posX,posY,ballSize){//设置小球的初始位置
    this.pos=createVector(posX,posY);
    //定义小球,可能有多种状态
    this.state="IDLE";//游戏人物的原始摆动运动
    this.target=null;
    

    this.vel=createVector(0,0);
    
    this.color=color(random(255),random(255),random(255));
    this.size=ballSize;
    
    
    this.update=function(){
        
        if(this.state=="FIRE"){
           this.moveTo(this.target.x,this.target.y)
           
           }else if(this.state=="SPARK"){
               this.snakeTo(this.target.x,this.target.y);
                    
                    }
        

        this.pos.add(this.vel);
    
    }
    //渲染小球
    this.render=function(){
        
        fill(this.color);
        
        ellipse(this.pos.x,this.pos.y,this.size);
    }
   
    this.moveTo =function(tx,ty){
        var target =createVector(tx,ty);
        var force=p5.Vector.sub(target,this.pos);
        force.mult(0.05);
        this.vel=force.copy();
        
    }

    this.elasticTo=function(tx,ty){
        var target =createVector(tx,ty);
        var force=p5.Vector.sub(target,this.pos);
        force.mult(0.3);
        this.vel.add(force);
        this.vel.mult(0.7);
       
    }
    this.snakeTo =function(tx,ty){
        var target =createVector(tx,ty);
        var force=p5.Vector.sub(target,this.pos);
        force.mult(0.05);
        var snakeForce=force.copy();
        snakeForce.mult(0.5);
        snakeForce.rotate(frameCount);
        this.vel=p5.Vector.add(force,snakeForce);
        
  }
}