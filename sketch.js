let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#dde5b6');
  
  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機畫面相同大小的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  //overlayGraphics.background(255, 0, 0, 100); // 半透明紅色背景，失去這串則為透明
  overlayGraphics.fill(255);
  overlayGraphics.textSize(32);
  overlayGraphics.textAlign(CENTER, CENTER);
  overlayGraphics.text('Overlay Text', overlayGraphics.width / 2, overlayGraphics.height / 2);
}

function draw() {
  background('#dde5b6');
  
  // 水平鏡像翻轉攝影機畫面
  push();
  translate(width, 0);
  scale(-1, 1);
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);
  pop();

  // 顯示 overlayGraphics 在視訊畫面上方
  let overlayX = (width - overlayGraphics.width) / 2;
  let overlayY = (height - overlayGraphics.height) / 2;
  image(overlayGraphics, overlayX, overlayY);
}

function windowResized() { // 當視窗大小改變時，調整畫布和攝影機大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.resizeCanvas(capture.width, capture.height);
}
