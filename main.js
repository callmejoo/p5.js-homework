var square
var ball
var mic
var backToOri
var startRun
function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noStroke()

  // 初始化录音
  mic = new p5.AudioIn()
  mic.start()

  ball = new Ball(width/2, height/2, 50)
}

function draw() {
  background(255)

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
  ball.dragState = false
  ball.freeGo(width/2, height/2)
  startRun = true
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
      if (collidePointCircle(width/2, height/2, this.pos.x, this.pos.y, 50)) {
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
    power.mult(0.05)
    // var go = power.copy()
    // go.mult(0.3)
    this.speed.add(power)
  }
  this.bounce = function (side) {
    var power
    if (side === 'top') {
      power = createVector(0, 1)
    } else if (side === 'bottom') {
      power = createVector(0, -1)
    } else if (side === 'left') {
      power = createVector(1, 0)
    } else if (side === 'right') {
      power = createVector(-1, 0)
    }
    var oppo = this.speed.copy()
    oppo.rotate(PI)
    var angle = p5.Vector.angleBetween(power, oppo)
    var len = Math.cos(angle) * this.speed.mag() * 2
    power.setMag(len)
    this.speed.add(power)
  }
}

function Square () {
  
}