function setup() {
  createCanvas(960, 540)
  noStroke()

  // 请求录音权限
  mic = new p5.AudioIn()
  mic.start()

  // 实例化弹球
  ball = new Ball(start.pos.x, start.pos.y, ballSize)
  ballLine = new Line(start.pos.x, start.pos.y)
  // 实例化加速球
  sidearc = new SideArc()

  // 生成陨石背景
  for (var i = 0; i < 10; i++) {
    bgCircle.push(new BgCircle(20, 20, 120, 170))
  }
  for (var i = 0; i < 8; i++) {
    bgCircle.push(new BgCircle(150, 250, 250, 320))
  }
  for (var i = 0; i < 10; i++) {
    bgCircle.push(new BgCircle(width-250, height-200, width, height))
  }
  for (var i = 0; i < 5; i++) {
    bgCircle.push(new BgCircle(500, 150, 600, 250))
  }

  // 生成十字
  crosses.push(new Cross(580, 400, 'green'))
  crosses.push(new Cross(530, 450, 'green'))
  crosses.push(new Cross(630, 450, 'green'))
  crosses.push(new Cross(580, 500, 'green'))
  crosses.push(new Cross(680, 500, 'green'))

  crosses.push(new Cross(300, 100, 'blue'))
  crosses.push(new Cross(400, 100, 'blue'))
  crosses.push(new Cross(350, 50, 'blue'))
  crosses.push(new Cross(350, 150, 'blue'))

  crosses.push(new Cross(50, 350, 'red'))
  crosses.push(new Cross(150, 350, 'red'))
  crosses.push(new Cross(100, 300, 'red'))
  crosses.push(new Cross(100, 400, 'red'))

  crosses.push(new Cross(800, 150, 'red'))
  crosses.push(new Cross(700, 150, 'red'))
  crosses.push(new Cross(750, 100, 'red'))
  crosses.push(new Cross(750, 200, 'red'))
  crosses.push(new Cross(700, 50, 'red'))
}