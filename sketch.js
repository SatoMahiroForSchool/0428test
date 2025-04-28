let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#000000'); // 設定整體背景為黑色
  
  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機畫面相同大小的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.background(0); // 設定 overlayGraphics 背景為黑色
}

function draw() {
  background('#000000'); // 設定整體背景為黑色
  
  // 正常顯示攝影機畫面（修正左右顛倒）
  push();
  translate((width - capture.width) / 2, 0); // 將畫布原點移到攝影機畫面左上角
  scale(1, 1); // 移除水平翻轉
  image(capture, 0, (height - capture.height) / 2, capture.width, capture.height);
  pop();

  // 更新 overlayGraphics 為基於攝影機畫面的馬賽克效果
  overlayGraphics.background(0); // 設定 overlayGraphics 背景為黑色
  capture.loadPixels();
  for (let gx = 0; gx < capture.width; gx += 20) {
    for (let gy = 0; gy < capture.height; gy += 20) {
      let i = (gy * capture.width + gx) * 4; // 計算像素索引
      let r = capture.pixels[i];
      let g = capture.pixels[i + 1];
      let b = capture.pixels[i + 2];
      overlayGraphics.fill(r, g, b);
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(gx + 10, gy + 10, 15, 15); // 繪製圓形
    }
  }

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
