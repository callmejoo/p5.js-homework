var posX = 25;//赋值
var posY = 25;
var speedX = 8.5;
var speedY = 10;
var ballSize = 30;
var word = "hello";//全局变量
var ballColor;
//作用域


function setup() {
    var myLocalWord = "Hi"
    //函数
    createCanvas(200,150);
    ballColor =
    color(random(225),random(225),random(225))
   noStroke();//无边框
}

function draw() {
    //循环变化（动画）
    fill(ballColor);//填充色
    background(0,20);//背景(黑白，透明度)小球尾巴
    ellipse(posX,posY,ballSize);//圆（x，y，size）
    posX = posX+speedX;
    posY = posY+speedY;
    //posX += speedX 与之相同
    
    //if条件判断
    if((posX >= width-ballSize/2)||(posX <= ballSize/2)){//减去半径
        //如果条件满足
        speedX = speedX * -1
        ballColor = color(random(225),random(225),random(225))//改变颜色
    }
      if((posY >= height-ballSize/2)||(posY <= ballSize/2)){//减去半径
        //如果条件满足
        speedY = speedY * -1  
        ballColor = color(random(225),random(225),random(225))
    }
    
}