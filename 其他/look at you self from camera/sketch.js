var balls=[]; 
var coolDown=0;
var MAX_BALL_NUM=1000;
var logo;
var music;
var amp;
var capture;

function preload(){
   
    //music = loadSound("audio/Molly Marlette-sleep must heal the heart final.mp3")
    
}

function setup() {
    createCanvas(400,300);
    background(0);
    noStroke();
//    music.play();
//    music.setVolume(1);
//    amp = new p5.Amplitude();
    pixelDensity(1)
    
    cam = createCapture(VIDEO)
    cam.hide
    }

  
function draw() {

//    
//    background(0,20);//冷却时间读秒
    image(cam,0,0,width,height);
//    var lvl = Math.floor(amp.getLevel()*100);
//    
//    if(coolDown>0){
//        coolDown -=1
//    }else if (lvl>10){
//        fireBall();
//        coolDown=20;
//    }
    
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
            var d=balls[i].vel.mag()
            if(balls[i].pos.y>height+balls[i].size){
                balls[i].state="DEAD"
            }
        }
        
    }
removeDeadBalls()
  
    //把像素数据加载到Pixels数组
    loadPixels();
    
    //操纵像素
    for(var w=0;w<width;w++){
        for(var h=0;h<height;h++){
            //第一个像素
            var idx = (w+h*width)*4;
            var d = dist(w,h,mouseX,mouseY)
            
            pixels[idx] = map(d,0,150,255,0);
            pixels[idx+2] = map(d,0,150,0,255);
            
            
//            //红色
//            pixels[idx]=255
//            //绿色
//            pixels[idx+1]=0
//            }else {
//            //红色
//            //pixels[idx]=0     
//            //绿色
//            pixels[idx+2]=255
//            }
//            //蓝色
//            pixels[idx1]=
//            //透明
//            pixels[idx+3]=
            
        }
    }
    
    
//    for(var i=0;i<pixels.length;i+=4){
//        //第i个像素的红色
//        pixels[i] = 255 - pixels[i]
//        //第i个像素的绿色
//        pixels[i+1] = 0
//        //第i个像素的蓝色
//        pixels[i+2] = 255
//        //第i个像素的透明
//        //pixels[i+3] = 
//    }
    
    //把像素数组里的数据更新到画布
    updatePixels();
   
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
        v.setMag(random(2,3));
        b.vel=v;
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
               var gForce=createVector(0,0.05);
               var snakeForce=gForce.copy();
               snakeForce.setMag(0.5);
               snakeForce.rotate(frameCount);
               this.vel.add(gForce).add(snakeForce);
               
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
