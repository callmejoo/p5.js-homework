var ball, ballimg, sidearc, crosses = [], ballLine
var triRed = [], triBlue = [], triGreen = []
var ballSize = 50, ballSpeed
var mic
var backToOri
var startRun
var bong
var bg,startCircle,sideArc,bgCircle = []
var countStart, countEnd
var voiceLevel = 0.3 // 消除路径所需音量等级
var start = {
  pos: {
    x: 130,
    y: 100
  }
}

function preload () {
  bong = loadSound('assets/audio/pong.mp3')
  bg = loadImage('assets/images/bg.jpg')
  ballimg = loadImage('assets/images/ball.png')
  startCircle = loadImage('assets/images/start.png')
  sideArc = loadImage('assets/images/sidearc.png')
}