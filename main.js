let rect
let ball
let mic

function setup() {
  createCanvas(600, 480)
  noStroke()

  // 初始化录音
  mic = new p5.AudioIn()
  mic.start()

  ball = new Ball(width/3, height/2, 100)
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
}

function Ball (x, y, size) {
  this.pos = createVector(x, y)
  console.log('初始化于：', x, y)

  this.dragState = false
  this.color = color(random(255), random(255), random(255))
  this.size = size

  // 初始化
  this.init = function () {
    stroke(this.color)
    line(this.pos.x, this.pos.y, x, y)
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.size)
  }

  // 逐帧
  this.update = function () {
    if (this.dragState === true) {
      this.moveTo(mouseX, mouseY)
    }
  }
  this.moveTo = function (tx, ty) {
    var goal = createVector(tx, ty)
    var power = p5.Vector.sub(goal, this.pos)
    power.mult(0.2)
    this.pos.add(power)
  }
}