var squares = []
var ball, sidearc
var ballSize = 50
var mic
var backToOri
var startRun
var bong
var horNum = 20
var verNum = 15
var squareHeight
var squareWidth
var bg,startCircle,sideArc,bgCircle = []
var countStart, countEnd

var start = {
  pos: {
    x: 130,
    y: 100
  }
}
function preload () {
  bong = loadSound('pong.mp3')
  bg = loadImage('images/bg.jpg')
  startCircle = loadImage('images/start.png')
  sideArc = loadImage('images/sidearc.png')
}

function setup() {
  createCanvas(960, 540)
  noStroke()
  squareHeight = Math.round(height/verNum)
  squareWidth = Math.round(width/horNum)
  // 请求录音权限
  mic = new p5.AudioIn()
  mic.start()

  ball = new Ball(start.pos.x, start.pos.y, ballSize)
  sidearc = new SideArc()
  // for (var i = 0; i < verNum; i++) {
  //   for (var a = 0; a < horNum; a++) {
  //     squares.push(new Square(squareWidth, squareHeight, a * squareWidth, i * squareHeight))
  //   }
  // }
}

function draw() {
  background(255)
  image(bg, 0, 0, 960, 540)
  push()
  imageMode(CENTER)
  translate(130, 100)
  rotate(frameCount/20)
  image(startCircle, 0, 0, 75, 75)
  pop()
  push()
  sidearc.init()
  sidearc.update()
  pop()
  push()
  for (var i = 0; i < 20; i++) {
    bgCircle.push(new BgCircle(20, 20, 30, 50))
    bgCircle[i].init()
  }

  // for (var i in squares) {
  //   squares[i].init()
  //   squares[i].bounce()
  // }
  ball.init()
  ball.update()

}

function mouseClicked () {
  var d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
  if (d <= ball.size/2) {
  }
}

function mousePressed () {
  var d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
  if (d <= ball.size/2) {
    ball.dragState = true
  }
}

function mouseReleased () {
  if (!startRun) {
    ball.dragState = false
    ball.freeGo(start.pos.x, start.pos.y)
    startRun = true
  }
}

function Ball (x, y, size) {
  this.pos = createVector(x, y)
  console.log('初始化于：', x, y, 'size:', size)
  this.speed = createVector(0, 0)
  this.dragState = false
  this.color = color(random(255), random(255), random(255))
  this.size = size

  // 初始化
  this.init = function () {
    stroke(this.color)
    if (!backToOri) line(this.pos.x, this.pos.y, x, y)
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.size)
  }

  // 逐帧
  this.update = function () {

    this.pos.add(this.speed)

    if (this.dragState === true) {
      this.moveTo(mouseX, mouseY)
    }

    // 碰壁检测
    if (this.pos.x >= width - this.size / 2) {
      this.bounce('right')
    }
    if (this.pos.x <= this.size / 2) {
      this.bounce('left')
    }
    if (this.pos.y <= this.size / 2) {
      this.bounce('top')
    }
    if (this.pos.y >= height - this.size / 2) {
      this.bounce('bottom')
    }
    if (startRun && !backToOri) {
      if (collidePointCircle(start.pos.x, start.pos.y, this.pos.x, this.pos.y, ballSize)) {
        backToOri = true
      }
    }
  }
  this.moveTo = function (tx, ty) {
    var goal = createVector(tx, ty)
    var power = p5.Vector.sub(goal, this.pos)
    power.mult(0.2)
    this.pos.add(power)
  }
  this.freeGo = function (tx, ty) {
    var goal = createVector(tx, ty)
    var power = p5.Vector.sub(goal, this.pos)
    power.mult(0.2)
    // var go = power.copy()
    // go.mult(0.3)
    this.speed.add(power)
  }
  this.bounce = function (side) {
    bong.play()
    var power
    if (side === 'top') {
      power = createVector(0, 1)
    } else if (side === 'bottom') {
      power = createVector(0, -1)
    } else if (side === 'left') {
      power = createVector(-1, 0)
    } else if (side === 'right') {
      power = createVector(-1, 0)
    } else if (side === 'rightTop') {
      power = createVector(-1, 1)
    }
    var oppo = this.speed.copy()
    oppo.rotate(PI)
    var angle = p5.Vector.angleBetween(power, oppo)
    var len = Math.cos(angle) * this.speed.mag() * 2
    power.setMag(len)
    this.speed.add(power)
  }
}

function Square (width, height, x, y) {
  this.color = color(random(255), random(255), random(255))
  this.w = width
  this.h = height
  this.x = x
  this.y = y
  this.hit = false
  this.alpha = 0
  this.isfadeIn = false
  this.init = function () {
    if (!startRun) {
      stroke(255)
      // translate(0, 0)
      fill(255)
      rect(x, y, width, height)
    }
  }
  this.update = function () {
    this.bounce()
  }
  this.fadeIn = function () {
    stroke(this.color)
    // translate(0, 0)
    if (this.alpha <= 1 ){
      this.alpha += 0.01
    }
    fill(this.color)
    rect(x, y, width, height)
  }
  this.bounce = function () {
    var hit = collideRectCircle(x,y,width,height,ball.pos.x, ball.pos.y, ballSize);
    if(hit && startRun) {
       this.hit = true
    }
    if (this.hit) {
      this.fadeIn()
    }
  }
}

function SideArc () {
  this.move = 0
  this.isTouch = false
  this.init = function () {
    if (!this.isTouch) {
      translate(width-120, 0)
      image(sideArc,0,0, 120, 120)
    }
  }
  this.update = function () {
    stroke(ball.color)
    fill(ball.color)
    var hit = collideCircleCircle(ball.pos.x, ball.pos.y, ballSize, width, 0, 240)
    if (hit) {
      ball.bounce('rightTop')
      this.isTouch = true
      countStart = frameCount
    }
    if (this.isTouch) {
      this.touch()
    }
  }
  this.touch = function () {
    translate(width-115, -5)
    image(sideArc, 0, 0, 120, 120)
    countEnd = frameCount
    if (countEnd - countStart > 5) {
      this.isTouch = false
    }
  }
}

function BgCircle (startX, startY, endX, endY) {
  this.color1 = color(252, 213, 140)
  this.color2 = color(252, 162, 134)
  this.color =  random(2) > 1 ? this.color1 : this.color2
  this.size = random(5, 15)
  this.x = random(5)
  this.y = random(5)
  this.init = function () {
    translate(startX, startY)
    stroke(this.color)
    fill(this.color)
    ellipse(this.x, this.y, this.size)
  }
}