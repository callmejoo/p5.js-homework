function draw() {
  image(bg, 0, 0, 960, 540)
  startPoint()
  sidearc.init()
  sidearc.update()
  for (var i in bgCircle) { bgCircle[i].init() }
  for (var i in crosses) {
    crosses[i].init()
    crosses[i].update()
  }
  for (var i in triRed) {
    triRed[i].init()
    triRed[i].update()
  }
  for (var i in triBlue) {
    triBlue[i].init()
    triBlue[i].update()
  }
  for (var i in triGreen) {
    triGreen[i].init()
    triGreen[i].update()
  }
  ball.init()
  ball.update()
  ballLine.update()
}

function mouseClicked () {
  var d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
  if (d <= ball.size/2) {
  }
}

function mousePressed () {
  if(!startRun){
    var d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
    if (d <= ball.size/2) {
      ball.dragState = true
    }
  }
}

function mouseReleased () {
  if (!startRun) {
    ball.dragState = false
    ball.freeGo(start.pos.x, start.pos.y)
    startRun = true
  }
}

function startPoint () {
  push()
  imageMode(CENTER)
  translate(130, 100)
  rotate(frameCount/20)
  image(startCircle, 0, 0, 75, 75)
  pop()
}

function Line (x, y) {
  this.update = function () {
    push()
    fill(color(random(255),random(255),random(255)))
    if (!backToOri) line(ball.pos.x, ball.pos.y, x, y)
  }
}

function Ball (x, y, size) {
  this.pos = createVector(x, y)
  console.log('初始化于：', x, y, 'size:', size)
  this.speed = createVector(0, 0)
  this.dragState = false
  this.color = color(random(255), random(255), random(255))
  this.history = []
  this.size = size
  // 初始化
  this.init = function () {
    push()
    translate(this.pos.x, this.pos.y)
    imageMode(CENTER)
    rotate(frameCount / 100)
    image(ballimg, 0, 0, this.size, this.size)
    pop()
  }

  // 逐帧
  this.update = function () {
    var v = createVector(this.pos.x, this.pos.y)
    this.speedDown(1)   // 保持摩擦减速
    this.pos.add(this.speed)
    if(mic.getLevel() > voiceLevel) {
      this.history = []
    }
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
    if (startRun) {
      this.history.push(v)
      this.trace()
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
  this.speedUp = function (num) {
    console.log('加速！')
    var speed = 1 + num * 0.1
    this.speed.mult(speed)
  }
  this.speedDown = function (num) {
    var speed = 1 - num * 0.001
    this.speed.mult(speed)
  }
  this.trace = function () {
    for (var i = 1; i < this.history.length; i++) {
      stroke(255)
      line(this.history[i-1].x, this.history[i-1].y, this.history[i].x, this.history[i].y)
    }
  }
}

function SideArc () {
  this.move = 0
  this.isTouch = false
  this.speedUp = false
  this.init = function () {
    if (!this.isTouch) {
      push()
      translate(width-120, 0)
      image(sideArc,0,0, 120, 120)
      pop()
    }
  }
  this.update = function () {
    stroke(ball.color)
    fill(ball.color)
    var hit = collideCircleCircle(ball.pos.x, ball.pos.y, ballSize, width, 0, 240)
    if (hit) {
      this.isTouch = true
      countStart = frameCount
    }
    if (this.isTouch) {
      if (!this.speedUp){
        this.speedUp = true
        ball.bounce('rightTop')
        ball.speedUp(5)
      }
      this.touchAnimation()
    }
  }
  this.touchAnimation = function () {
    push()
    translate(width-115, -5)
    image(sideArc, 0, 0, 120, 120)
    countEnd = frameCount
    if (countEnd - countStart > 5) {
      this.isTouch = false
      this.speedUp = false
    }
    pop()
  }
}

function BgCircle (startX, startY, endX, endY) {
  this.color1 = color(252, 213, 140)
  this.color2 = color(252, 162, 134)
  this.color =  random(2) > 1 ? this.color1 : this.color2
  this.size = random(2, 10)
  this.x = random(endX - startX)
  this.y = random(endY - startY)
  this.init = function () {
    push()
    translate(startX, startY)
    stroke(this.color)
    fill(this.color)
    ellipse(this.x, this.y, this.size)
    pop()
  }
}

function Cross (x, y, Color) {
  this.blue1 = color(46, 253, 224)
  this.blue2 = color(0, 223, 212)
  this.green1 = color(66, 161, 129)
  this.green2 = color(57, 255, 151)
  this.red = color(252, 102, 116)
  this.gold = color(248, 203, 132)
  this.hit = false
  this.cStart = null
  this.hitFrom = null
  this.color = {
    x: null,
    y: null
  }
  this.x = x
  this.y = y
  this.init = function () {
    if (Color === 'blue') {
      this.color.x = this.blue1
      this.color.y = this.blue2
    }
    if (Color === 'green') {
      this.color.x = this.green1
      this.color.y = this.green2
    }
    if (Color === 'red') {
      this.color.x = this.gold
      this.color.y = this.red
    }
    if (!this.hit) {
      push()
      translate(x, y)
      stroke(this.color.x)
      fill(this.color.x)
      rect(-25, -1, 50, 2)
      pop()
      push()
      translate(x, y)
      stroke(this.color.y)
      fill(this.color.y)
      rect(-1, -25, 2, 50)
      pop()
    }
  }
  this.update = function () {
    var hitX = collideRectCircle(x-25, y-1, 50, 2, ball.pos.x, ball.pos.y, ballSize)
    var hitY = collideRectCircle(x-1, y-25, 2, 50, ball.pos.x, ball.pos.y, ballSize)
    if (hitX || hitY) {
      this.hit = true
      if (ball.speed.x > 0) {
        ballSpeed = (Math.abs(ball.speed.x) + Math.abs(ball.speed.y)) * 0.2
      }
      this.cStart = 500 / Math.abs(ballSpeed)
      if (ball.pos.x < x) {
        this.hitFrom = 'right'
      }
      else if (ball.pos.x > x) {
        this.hitFrom = 'left'
      }
    }
    if (this.hit) {
      if (this.cStart < 10000) {
        this.cStart += 0.1
      }
      // console.log(this.cStart)
      var speed = 10000/this.cStart
      if (speed < 30) speed = 0
      this.rotate(speed, this.hitFrom)
    }
  }
  this.rotate = function (speed, dir) {
    var s
    if (dir === 'left') {
      s = -speed
    } else {
      s = speed
    }
    push()
    translate(x, y)
    stroke(this.color.x)
    fill(this.color.x)
    rotate(s)
    rect(-25, -1, 50, 2)
    pop()
    push()
    translate(x, y)
    stroke(this.color.y)
    fill(this.color.y)
    rotate(s)
    rect(-1, -25, 2, 50)
    pop()
  }
}

function Triangle (x1, y1, x2, y2, x3, y3, fillcolor, degree) {
  this.y1 = y1 + 130
  this.y2 = y2 + 130
  this.y3 = y3 + 130
  this.pos = {
    x1: x1,
    y1: this.y1,
    x2: x2,
    y2: this.y2,
    x3: x3,
    y3: this.y3
  }
  this.center = {
    x: null,
    y: null
  }
  this.stat = {}
  this.red = color(252, 102, 116)
  this.gold = color(248, 203, 132)
  this.green = color(57, 255, 151)
  this.darkGreen = color(66, 161, 129)
  this.blue = color(46, 253, 224)
  this.darkBlue = color(0, 223, 212)
  this.colorRed = random(2) > 1 ? this.gold : this.red
  this.colorGreen = random(2) > 1 ? this.darkGreen : this.green
  this.colorBule = random(2) > 1 ? this.blue : this.darkBlue
  this.color = null
  this.power = {x: 0, y: 0}
  this.hit = {}
  this.tanDir = -2  // 反弹方向
  this.goal = {}
  this.init = function () {
    this.center.x = (this.pos.x1 + this.pos.x2 + this.pos.x3) / 3
    this.center.y = (this.pos.y1 + this.pos.y2 + this.pos.y3) / 3
    if (fillcolor === 'red') {
      this.color = this.colorRed
      if(this.stat.boom === false) {
        if (collideCircleCircle(this.center.x, this.center.y, 40, ball.pos.x, ball.pos.y, ballSize)) {
          for (var i in triRed) {
            triRed[i].stat.boom = true
            triRed[i].hit.stat = true
          }
        }
      }
      if (this.hit.stat) {
        for (var i in triRed) {
          if (triRed[i].hit.stat){
            triRed[i].go()
          }
          if (triRed[i].center.x <= 30) {
            triRed[i].freeGo('left')
          }
          if (width - triRed[i].center.x  <= 30) {
            triRed[i].freeGo('right')
          }
          if (triRed[i].center.y <= 30) {
            triRed[i].freeGo('top')
          }
          if (height - triRed[i].center.y <= 30) {
            triRed[i].freeGo('bottom')
          }
        }
      }
    }
    if (fillcolor === 'blue') {
      this.color = this.colorBule
      if(this.stat.boom === false) {
        if (collideCircleCircle(this.center.x, this.center.y, 40, ball.pos.x, ball.pos.y, ballSize)) {
          for (var i in triBlue) {
            triBlue[i].stat.boom = true
            triBlue[i].hit.stat = true
          }
        }
      }
      if (this.hit.stat) {
        for (var i in triBlue) {
          if (triBlue[i].hit.stat){
            triBlue[i].go()
          }
          if (triBlue[i].center.x <= 30) {
            triBlue[i].freeGo('left')          }
          if (width - triBlue[i].center.x  <= 30) {
            triBlue[i].freeGo('right')
          }
          if (triBlue[i].center.y <= 30) {
            triBlue[i].freeGo('top')
          }
          if (height - triBlue[i].center.y <= 30) {
            triBlue[i].freeGo('bottom')
          }
        }
      }
    }
    if (fillcolor === 'green') {
      this.color = this.colorGreen
      if(this.stat.boom === false) {
        if (collideCircleCircle(this.center.x, this.center.y, 40, ball.pos.x, ball.pos.y, ballSize)) {
          for (var i in triGreen) {
            triGreen[i].stat.boom = true
            triGreen[i].hit.stat = true
          }
        }
      }
      if (this.hit.stat) {
        for (var i in triGreen) {
          if (triGreen[i].hit.stat){
            triGreen[i].go()
          }
          if (triGreen[i].center.x <= 30) {
            triGreen[i].freeGo('left')
          }
          if (width - triGreen[i].center.x  <= 30) {
            triGreen[i].freeGo('right')
          }
          if (triGreen[i].center.y <= 30) {
            triGreen[i].freeGo('top')
          }
          if (height - triGreen[i].center.y <= 30) {
            triGreen[i].freeGo('bottom')
          }
        }
      }
    }
    push()
    stroke(this.color)
    fill(this.color)
    triangle(this.pos.x1, this.pos.y1, this.pos.x2, this.pos.y2, this.pos.x3, this.pos.y3)
    pop()
  }
  this.update = function () {
    // 碰壁检测

  }
  this.go = function () {
    this.pos.x1 += this.goal.x + this.power.x
    this.pos.x2 += this.goal.x + this.power.x
    this.pos.x3 += this.goal.x + this.power.x
    this.pos.y1 += this.goal.y + this.power.y
    this.pos.y2 += this.goal.y + this.power.y
    this.pos.y3 += this.goal.y + this.power.y
  }
  // 三角形到达边缘反弹
  this.freeGo = function (side) {
    if (side === 'top') {
      this.power.x = this.goal.x * this.tanDir
      this.power.y = this.goal.y * this.tanDir
    }
    if (side === 'bottom') {
      this.power.x = this.goal.x * this.tanDir
      this.power.y = this.goal.y * this.tanDir
    }
    if (side === 'left') {
      this.power.x = this.goal.x * this.tanDir
      this.power.y = this.goal.y * this.tanDir
    }
    if (side === 'right') {
      this.power.x = this.goal.x * this.tanDir
      this.power.y = this.goal.y * this.tanDir
    }
  }
}