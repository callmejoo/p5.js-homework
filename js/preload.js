var ball, sidearc, crosses = []
var ballSize = 50, ballSpeed
var mic
var backToOri
var startRun
var bong
var bg,startCircle,sideArc,bgCircle = []
var countStart, countEnd
var start = {
  pos: {
    x: 130,
    y: 100
  }
}

function preload () {
  bong = loadSound('assets/audio/pong.mp3')
  bg = loadImage('assets/images/bg.jpg')
  startCircle = loadImage('assets/images/start.png')
  sideArc = loadImage('assets/images/sidearc.png')
}