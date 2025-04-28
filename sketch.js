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
  overlayGraphics.background(0); // 設定背景為黑色
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

  // 更新 overlayGraphics 為馬賽克效果
  overlayGraphics.clear();
  capture.loadPixels();
  for (let x = 0; x < capture.width; x += 20) {
    for (let y = 0; y < capture.height; y += 20) {
      let i = (y * capture.width + x) * 4; // 計算像素索引
      let r = capture.pixels[i];
      let g = capture.pixels[i + 1];
      let b = capture.pixels[i + 2];
      overlayGraphics.fill(r, g, b);
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓形
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
