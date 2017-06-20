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

  // 生产六边形
  tris.push(new Triangle(233.6, 266.7,254.5,230.6,275.3,266.7, 'red'))
  tris.push(new Triangle(275.3,266.7,296.1,230.6,317,266.7, 'red'))
  tris.push(new Triangle(296.1,230.6,275.3,266.7,254.5,230.6, 'red'))
  tris.push(new Triangle(317,266.7,296.1,302.8,275.3,266.7, 'red'))
  tris.push(new Triangle(275.3,266.7,254.5,302.8,233.6,266.7, 'red'))
  tris.push(new Triangle(254.5,302.8,275.3,266.7,296.1,302.8, 'red'))
  tris.push(new Triangle(296.1,230.6,317.0,194.6,337.8,230.6, 'red'))
  tris.push(new Triangle(337.8,230.6,358.6,194.6,379.5,230.6, 'red'))
  tris.push(new Triangle(358.6,194.6,337.8,230.6,317,194.6, 'red'))
  tris.push(new Triangle(379.5,230.6,358.6,266.7,337.8,230.6, 'red'))
  tris.push(new Triangle(337.8,230.6,317.0,266.7,296.1,230.6, 'red'))
  tris.push(new Triangle(317,266.7,337.8,230.6,358.6,266.7, 'red'))
  tris.push(new Triangle(358.6,266.7,379.5,230.6,400.3,266.7, 'red'))
  tris.push(new Triangle(400.3,266.7,421.1,230.6,442.0,266.7, 'red'))
  tris.push(new Triangle(421.1,230.6,400.3,266.7,379.5,230.6, 'red'))
  tris.push(new Triangle(442,266.7,421.1,302.8,400.3,266.7, 'red'))
  tris.push(new Triangle(400.3,266.7,379.5,302.8,358.6,266.7, 'red'))
  tris.push(new Triangle(379.5,302.8,400.3,266.7,421.1,302.8, 'red'))
  tris.push(new Triangle(296.1,302.8,317,266.7,337.8,302.8, 'red'))
  tris.push(new Triangle(337.8,302.8,358.6,266.7,379.5,302.8, 'red'))
  tris.push(new Triangle(358.6,266.7,337.8,302.8,317,266.7, 'red'))
  tris.push(new Triangle(379.5,302.8,358.6,338.9,337.8,302.8, 'red'))
  tris.push(new Triangle(337.8,302.8,317,338.9,296.1,302.8, 'red'))
  tris.push(new Triangle(317,338.9,337.8,302.8,358.6,338.9, 'red'))
  tris.push(new Triangle(233.6,338.9,254.5,302.8,275.3,338.9, 'red'))
  tris.push(new Triangle(275.3,338.9,296.1,302.8,317.0,338.9, 'red'))
  tris.push(new Triangle(296.1,302.8,275.3,338.9,254.5,302.8, 'red'))
  tris.push(new Triangle(317,338.9,296.1,375,275.3,338.9, 'red'))
  tris.push(new Triangle(275.3,338.9,254.5,375,233.6,338.9, 'red'))
  tris.push(new Triangle(254.1,374.5,275.7,338.9,295.7,375.5, 'red'))
  tris.push(new Triangle(358.6,338.9,379.5,302.8,400.3,338.9, 'red'))
  tris.push(new Triangle(400.3,338.9,421.1,302.8,442,338.9, 'red'))
  tris.push(new Triangle(421.1,302.8,400.3,338.9,379.5,302.8, 'red'))
  tris.push(new Triangle(442,338.9,421.1,375,400.3,338.9, 'red'))
  tris.push(new Triangle(400.3,338.9,379.5,375,358.6,338.9, 'red'))
  tris.push(new Triangle(379.5,375,400.3,338.9,421.1,375, 'red'))
  tris.push(new Triangle(296.1,375,317,338.9,337.8,375, 'red'))
  tris.push(new Triangle(337.8,375,358.6,338.9,379.5,375, 'red'))
  tris.push(new Triangle(358.6,338.9,337.8,375,317,338.9, 'red'))
  tris.push(new Triangle(379.5,375,358.6,411.1,337.8,375, 'red'))
  tris.push(new Triangle(379.5,375,358.6,411.1,337.8,375, 'red'))
  tris.push(new Triangle(337.8,375,317,411.1,296.1,375, 'red'))
  tris.push(new Triangle(317,411.1,337.8,375,358.6,411.1, 'red'))
  tris.push(new Triangle(212.8,302.8,233.6,266.7,254.5,302.8, 'red'))
  tris.push(new Triangle(254.5,302.8,233.6,338.9,212.8,302.8, 'red'))
  tris.push(new Triangle(421.1,302.8,442.0,266.7,462.8,302.8, 'red'))
  tris.push(new Triangle(462.8,302.8,442,338.9,421.1,302.8, 'red'))
  tris.push(new Triangle(254.5,230.6,275.3,194.6,296.1,230.6, 'red'))
  tris.push(new Triangle(317,194.6,296.1,230.6,275.3,194.6, 'red'))
  tris.push(new Triangle(296.1,375,275.3,411.1,254.5,375, 'red'))
  tris.push(new Triangle(275.3,411.1,296.1,375,317,411.1, 'red'))
  tris.push(new Triangle(400.3,194.6,379.5,230.6,358.6,194.6, 'red'))
  tris.push(new Triangle(379.5,230.6,400.3,194.6,421.1,230.6, 'red'))
  tris.push(new Triangle(421.1,375,400.3,411.1,379.5,375, 'red'))
  tris.push(new Triangle(358.6,411.1,379.5,375,400.3,411.1, 'red'))

}