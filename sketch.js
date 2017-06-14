// 全局变量
var rect
var ball
var MAX_BALL_NUM = 1000
var bally, ballx, mousey, mousex
var mic
var coolDown

function setup () {
  bong.setVolume(1)
  createCanvas(800, 600)
  // 初始化
  mic = new p5.AudioIn()
  mic.start()
  noStroke()
  rectMode(CORNER)
  ball = new Ball(width / 5, (height - height / 3), 100)
  cross = new Cross(0, 0, 300)
}

function draw() {
  background(0)
  push()
  ball.render()
  ball.update()
  pop()
  push()
  translate(width / 2, height / 2)
  cross.render()
  pop()
  bong()
}

// 事件处理函数
function mouseClicked () {
  var d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
  if ((d <= ball.size / 2) && (coolDown <= 0)) {
    //                    explode(i)
    //                    coolDown = 60
  }
}

function mousePressed () {
  var d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
  if (d <= ball.size / 2) {
    // 点中了
    ball.dragState = true
  }
}

function mouseReleased () {
  ball.dragState = false
  // ball.snakeTo(width / 5, (height - height / 3))
}

function bong() {
  hit = collideRectCircle(cross.ppos.x, cross.ppos.y, 10, cross.size, ball.pos.x, ball.pos.y, 100)
  push()
  stroke(color(4, 120, 187))
  noFill()
  rect(cross.ppos.x, cross.ppos.y, 10, cross.size)
  pop()
  hit2 = collideRectCircle(cross.ppos.x, 10, cross.ppos.y, cross.size, ball.pos.x, ball.pos.y, 100)
  if (hit || hit2) console.log('撞了')
}
function Ball (posX, posY, ballSize) {
  // 设置小球初始位置
  this.pos = createVector(posX, posY)
  // 定义小球拖拽状态
  this.dragState = false
  this.vel = createVector(0, 0)
  //    this.vel = p5.Vector.random2D(); //属性，方向随机
  //    this.vel.setMag(random(2, 5)); //属性，长度随机
  this.color = color(random(255), random(255), random(255))
  this.size = ballSize
  this.update = function () {
    if (this.dragState == true) {
      this.moveTo(mouseX, mouseY)
    }
    // else {
    //     this.snakeTo(width / 5, (height - height / 3))
    // }

    // 定义行为
    this.pos.add(this.vel)
    if (this.pos.x >= width - this.size / 2) {
      this.bounceOnEdge('RIGHT')
    }
    if (this.pos.x <= this.size / 2) {
      this.bounceOnEdge('LEFT')
    }
    if (this.pos.y >= height - this.size / 2) {
      this.bounceOnEdge('BOTTOM')
    }
    if (this.pos.y <= this.size / 2) {
      this.bounceOnEdge('TOP')
    }
  }
  this.render = function () {
    stroke(this.color)
    line(this.pos.x, this.pos.y, width / 5, (height - height / 3))
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.size)
  }
  this.bounceOnEdge = function (edge) {
    bong.play()
    var force
    var antiVel
    var angle
    var len
    if (edge == 'TOP') {
      force = createVector(0, 1)
    } else if (edge == 'BOTTOM') {
      force = createVector(0, -1)
    } else if (edge == 'LEFT') {
      force = createVector(1, 0)
    } else if (edge == 'RIGHT') {
      force = createVector(-1, 0)
    }
    antiVel = this.vel.copy()
    antiVel.rotate(PI)
    angle = p5.Vector.angleBetween(force, antiVel)
    len = Math.cos(angle) * this.vel.mag() * 2
    force.setMag(len)
    this.vel.add(force)
    this.color = color(random(255), random(255), random(255))
  }

  this.moveTo = function (tx, ty) {
    var target = createVector(tx, ty)
    var force = p5.Vector.sub(target, this.pos)
    force.mult(0.5)
    this.vel = force.copy()
  }
  this.elasticTo = function (tx, ty) {
    var target = createVector(tx, ty)
    var force = p5.Vector.sub(target, this.pos)
    force.mult(0.3)
    this.vel.add(force)
    this.vel.mult(0.7)
  }
  this.snakeTo = function (tx, ty) {
    var target = createVector(tx, ty)
    var force = p5.Vector.sub(target, this.pos)
    console.log(force)
    force.mult(0.05)
    var snakeForce = force.copy()
    snakeForce.mult(0.3)
    snakeForce.rotate(frameCount / 2)
    this.vel = p5.Vector.add(force, snakeForce)
  }
}

function Cross (posX, posY, size) {
  this.pos = createVector(posX, posY)
  this.ppos = createVector(width / 2, height / 2)
  this.size = size
  this.touch = false
  this.dir = true
  this.speed = null
  this.color = color(255, 255, 255)
  this.half = size / 2
  this.vel = createVector(5, 0)
  this.i = 0
  this.render = function () {
    push()
    stroke(color(82, 72, 68))
    fill(color(163, 136, 81))  
    triangle(this.pos.x, this.pos.y, this.pos.x - 50, 500, this.pos.x + 50, 500)
    pop()
    this.one()
    this.two()
    this.three()
  // if (!this.touch) {
  //   push()
  //   stroke(this.color)
  //   triangle(this.pos.x, this.pos.y, this.pos.x - 50, 500, this.pos.x + 50, 500)
  //   pop()
  // } else {
  //   if (this.dir) {
  //     this.i += this.speed / 1000
  //     stroke(this.color)
  //     rotate(this.i)
  //     line(this.pos.x + this.half, this.pos.y, this.pos.x - this.half, this.pos.y)
  //     line(this.pos.x, this.pos.y + this.half, this.pos.x, this.pos.y - this.half)
  //     fill(this.color)
  //   } else {
  //     this.i += this.speed / 1000
  //     stroke(this.color)
  //     rotate(this.i)
  //     line(this.pos.x + this.half, this.pos.y, this.pos.x - this.half, this.pos.y)
  //     line(this.pos.x, this.pos.y + this.half, this.pos.x, this.pos.y - this.half)
  //     fill(this.color)
  //   }
  // }
  }
  this.run = function (dir, speed) {}
  this.stop = function () {
    this.touch = false
  }
  
  this.one = function () {
    push()
    if (this.speed) {
        if (this.dir) {
            rotate(frameCount/20) 
        } else {
            rotate(-frameCount/20) 
        }
    } 
    stroke(this.color)
    rect(this.pos.x, this.pos.y, this.size, 10)
    fill(this.color)
    pop()
  }
  this.two = function () {
    push()
    if (this.speed) {
        if (this.dir) {
            rotate(frameCount/20) 
        } else {
            rotate(-frameCount/20) 
        }
    } 
    stroke(this.color)
    rect(this.pos.x, this.pos.y, 10, this.size)
    fill(this.color)
    pop()
  }
  this.three = function () {
    push()
    stroke(color(163, 136, 81))
    fill(color(163, 136, 81))
    ellipse(this.pos.x, this.pos.y, 20)
    pop()
  }
}
