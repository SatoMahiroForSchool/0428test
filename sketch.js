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

  // 每隔 20px 繪製一個圓，覆蓋整個 graphics
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 計算相對顏色，根據位置生成
      let r = map(x, 0, overlayGraphics.width, 0, 255);
      let g = map(y, 0, overlayGraphics.height, 0, 255);
      let b = map(x + y, 0, overlayGraphics.width + overlayGraphics.height, 0, 255);
      overlayGraphics.fill(r, g, b);
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 圓心偏移，寬高為 15
    }
  }
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
