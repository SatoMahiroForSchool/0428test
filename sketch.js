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

  // 每隔 20px 繪製一個圓
  for (let x = 10; x < overlayGraphics.width; x += 20) {
    for (let y = 10; y < overlayGraphics.height; y += 20) {
      // 計算相對顏色，根據位置生成
      let r = map(x, 0, overlayGraphics.width, 0, 255);
      let g = map(y, 0, overlayGraphics.height, 0, 255);
      let b = map(x + y, 0, overlayGraphics.width + overlayGraphics.height, 0, 255);
      overlayGraphics.fill(r, g, b);
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x, y, 15, 15); // 繪製圓形，寬高為 15
    }
  }
}

function draw() {
  background('#dde5b6');
  
  // 顯示攝影機畫面（移除水平翻轉）
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  image(capture, x, y, capture.width, capture.height);

  // 更新 overlayGraphics 為馬賽克效果
  overlayGraphics.clear();
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
