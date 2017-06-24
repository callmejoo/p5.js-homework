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
  // 红黄
  triRed.push(new Triangle(233.6, 266.7,254.5,230.6,275.3,266.7, 'red'))
  triRed.push(new Triangle(275.3,266.7,296.1,230.6,317,266.7, 'red'))
  triRed.push(new Triangle(296.1,230.6,275.3,266.7,254.5,230.6, 'red'))
  triRed.push(new Triangle(317,266.7,296.1,302.8,275.3,266.7, 'red'))
  triRed.push(new Triangle(275.3,266.7,254.5,302.8,233.6,266.7, 'red'))
  triRed.push(new Triangle(254.5,302.8,275.3,266.7,296.1,302.8, 'red'))
  triRed.push(new Triangle(296.1,230.6,317.0,194.6,337.8,230.6, 'red'))
  triRed.push(new Triangle(337.8,230.6,358.6,194.6,379.5,230.6, 'red'))
  triRed.push(new Triangle(358.6,194.6,337.8,230.6,317,194.6, 'red'))
  triRed.push(new Triangle(379.5,230.6,358.6,266.7,337.8,230.6, 'red'))
  triRed.push(new Triangle(337.8,230.6,317.0,266.7,296.1,230.6, 'red'))
  triRed.push(new Triangle(317,266.7,337.8,230.6,358.6,266.7, 'red'))
  triRed.push(new Triangle(358.6,266.7,379.5,230.6,400.3,266.7, 'red'))
  triRed.push(new Triangle(400.3,266.7,421.1,230.6,442.0,266.7, 'red'))
  triRed.push(new Triangle(421.1,230.6,400.3,266.7,379.5,230.6, 'red'))
  triRed.push(new Triangle(442,266.7,421.1,302.8,400.3,266.7, 'red'))
  triRed.push(new Triangle(400.3,266.7,379.5,302.8,358.6,266.7, 'red'))
  triRed.push(new Triangle(379.5,302.8,400.3,266.7,421.1,302.8, 'red'))
  triRed.push(new Triangle(296.1,302.8,317,266.7,337.8,302.8, 'red'))
  triRed.push(new Triangle(337.8,302.8,358.6,266.7,379.5,302.8, 'red'))
  triRed.push(new Triangle(358.6,266.7,337.8,302.8,317,266.7, 'red'))
  triRed.push(new Triangle(379.5,302.8,358.6,338.9,337.8,302.8, 'red'))
  triRed.push(new Triangle(337.8,302.8,317,338.9,296.1,302.8, 'red'))
  triRed.push(new Triangle(317,338.9,337.8,302.8,358.6,338.9, 'red'))
  triRed.push(new Triangle(233.6,338.9,254.5,302.8,275.3,338.9, 'red'))
  triRed.push(new Triangle(275.3,338.9,296.1,302.8,317.0,338.9, 'red'))
  triRed.push(new Triangle(296.1,302.8,275.3,338.9,254.5,302.8, 'red'))
  triRed.push(new Triangle(317,338.9,296.1,375,275.3,338.9, 'red'))
  triRed.push(new Triangle(275.3,338.9,254.5,375,233.6,338.9, 'red'))
  triRed.push(new Triangle(254.1,374.5,275.7,338.9,295.7,375.5, 'red'))
  triRed.push(new Triangle(358.6,338.9,379.5,302.8,400.3,338.9, 'red'))
  triRed.push(new Triangle(400.3,338.9,421.1,302.8,442,338.9, 'red'))
  triRed.push(new Triangle(421.1,302.8,400.3,338.9,379.5,302.8, 'red'))
  triRed.push(new Triangle(442,338.9,421.1,375,400.3,338.9, 'red'))
  triRed.push(new Triangle(400.3,338.9,379.5,375,358.6,338.9, 'red'))
  triRed.push(new Triangle(379.5,375,400.3,338.9,421.1,375, 'red'))
  triRed.push(new Triangle(296.1,375,317,338.9,337.8,375, 'red'))
  triRed.push(new Triangle(337.8,375,358.6,338.9,379.5,375, 'red'))
  triRed.push(new Triangle(358.6,338.9,337.8,375,317,338.9, 'red'))
  triRed.push(new Triangle(379.5,375,358.6,411.1,337.8,375, 'red'))
  triRed.push(new Triangle(379.5,375,358.6,411.1,337.8,375, 'red'))
  triRed.push(new Triangle(337.8,375,317,411.1,296.1,375, 'red'))
  triRed.push(new Triangle(317,411.1,337.8,375,358.6,411.1, 'red'))
  triRed.push(new Triangle(212.8,302.8,233.6,266.7,254.5,302.8, 'red'))
  triRed.push(new Triangle(254.5,302.8,233.6,338.9,212.8,302.8, 'red'))
  triRed.push(new Triangle(421.1,302.8,442.0,266.7,462.8,302.8, 'red'))
  triRed.push(new Triangle(462.8,302.8,442,338.9,421.1,302.8, 'red'))
  triRed.push(new Triangle(254.5,230.6,275.3,194.6,296.1,230.6, 'red'))
  triRed.push(new Triangle(317,194.6,296.1,230.6,275.3,194.6, 'red'))
  triRed.push(new Triangle(296.1,375,275.3,411.1,254.5,375, 'red'))
  triRed.push(new Triangle(275.3,411.1,296.1,375,317,411.1, 'red'))
  triRed.push(new Triangle(400.3,194.6,379.5,230.6,358.6,194.6, 'red'))
  triRed.push(new Triangle(379.5,230.6,400.3,194.6,421.1,230.6, 'red'))
  triRed.push(new Triangle(421.1,375,400.3,411.1,379.5,375, 'red'))
  triRed.push(new Triangle(358.6,411.1,379.5,375,400.3,411.1, 'red'))

  // 蓝绿
  triBlue.push(new Triangle(800,119,837.5,140.6,800,162.3, 'blue'))
  triBlue.push(new Triangle(800,162.3,837.5,183.9,800,205.6, 'blue'))
  triBlue.push(new Triangle(837.5,183.9,800,162.3,837.5,140.6, 'blue'))
  triBlue.push(new Triangle(800,205.6,762.5,183.9,800,162.3, 'blue'))
  triBlue.push(new Triangle(800,162.3,762.5,140.6,800,119, 'blue'))
  triBlue.push(new Triangle(762.5,140.6,800,162.3,762.5,183.9, 'blue'))
  triBlue.push(new Triangle(875,205.6,837.5,227.2,837.5,183.9, 'blue'))
  triBlue.push(new Triangle(875,248.9,837.5,270.5,837.5,227.2, 'blue'))
  triBlue.push(new Triangle(875,248.9,837.5,227.2,875.0,205.6, 'blue'))
  triBlue.push(new Triangle(837.5,270.5,800,248.9,837.5,227.2, 'blue'))
  triBlue.push(new Triangle(837.5,227.2,800,205.6,837.5,183.9, 'blue'))
  triBlue.push(new Triangle(800,205.6,837.5,227.2,800,248.9, 'blue'))
  triBlue.push(new Triangle(800,248.9,837.5,270.5,800,292.2, 'blue'))
  triBlue.push(new Triangle(800,292.2,762.5,270.5,800,248.9, 'blue'))
  triBlue.push(new Triangle(762.5,183.9,800,205.6,762.5,227.2, 'blue'))
  triBlue.push(new Triangle(762.5,227.2,800,248.9,762.5,270.5, 'blue'))
  triBlue.push(new Triangle(800,248.9,762.5,227.2,800,205.6, 'blue'))
  triBlue.push(new Triangle(762.5,270.5,725.0,248.9,762.5,227.2, 'blue'))
  triBlue.push(new Triangle(762.5,227.2,725,205.6,762.5,183.9, 'blue'))
  triBlue.push(new Triangle(725,205.6,762.5,227.2,725,248.9, 'blue'))
  triBlue.push(new Triangle(725,162.3,762.5,183.9,725.0,205.6, 'blue'))
  triBlue.push(new Triangle(762.5,183.9,725.0,162.3,762.5,140.6, 'blue'))
  triBlue.push(new Triangle(875,162.3,837.5,183.9,837.5,140.6, 'blue'))
  triBlue.push(new Triangle(875,205.6,837.5,183.9,875,162.3, 'blue'))

  // 绿色
  triGreen.push(new Triangle(601.6,75,561.6,51.9,601.6,28.8, 'green'))
  triGreen.push(new Triangle(561.6,5.7,601.6,28.8,561.6,51.9, 'green'))
  triGreen.push(new Triangle(561.6,51.9,601.6,75,561.6,98.1, 'green'))
  triGreen.push(new Triangle(561.6,98.1,521.6,75,561.6,51.9, 'green'))
  triGreen.push(new Triangle(521.6,28.8,561.6,51.9,521.6,75, 'green'))
  triGreen.push(new Triangle(561.6,51.9,521.6,28.8,561.6,5.7, 'green'))

  // 三角形飞行速度
  for (var i in triRed) {
    triRed[i].goal = {x: random(-1, 1), y: random(-1, 1)}
  }
  for (var i in triBlue) {
    triBlue[i].goal = {x: random(-1, 1), y: random(-1, 1)}
  }
  for (var i in triGreen) {
    triGreen[i].goal = {x: random(-1, 1), y: random(-1, 1)}
  }
}