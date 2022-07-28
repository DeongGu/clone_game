const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.rect(10, 10, 150, 100);
ctx.stroke();

// 채우기(기본 직사각형)
ctx.fillRect(10, 10, 100, 100);
// 지우기;
ctx.clearRect(15, 15, 50, 50);
// 윤곽선;
ctx.strokeStyle = "yellow";
ctx.strokeRect(10, 20, 200, 200);
// 선 시작
ctx.beginPath();

// 펜 이동
ctx.moveTo(0, 0);

// 선, 채우기
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fill();

// 역삼각형
ctx.beginPath();
ctx.moveTo(125, 125);
ctx.lineTo(125, 45);
ctx.lineTo(45, 125);
ctx.closePath();
ctx.stroke();

// 호 나 원
ctx.beginPath();
ctx.arc(150, 150, 30, 0, (Math.PI / 180) * 360, true);
ctx.arc(150, 150, 15, 0, (Math.PI / 180) * 360, true);
ctx.stroke();
ctx.fillStyle = "blue";
ctx.fill("evenodd");

// 이차 베지어 곡선
ctx.beginPath();
ctx.moveTo(75, 25);
ctx.quadraticCurveTo(25, 25, 25, 62.5);
ctx.quadraticCurveTo(25, 100, 50, 100);
ctx.quadraticCurveTo(50, 120, 30, 125);
ctx.quadraticCurveTo(60, 120, 65, 100);
ctx.quadraticCurveTo(125, 100, 125, 62.5);
ctx.quadraticCurveTo(125, 25, 75, 25);
ctx.stroke();

// Cubic curves example
ctx.beginPath();
ctx.moveTo(75, 40);
ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
ctx.stroke();

// 테두리
var offset = 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.setLineDash([4, 2]);
ctx.lineDashOffset = -offset;
ctx.strokeRect(10, 10, 100, 100);

ctx.fillRect(0, 0, 150, 150); // 기본 설정으로 사각형을 그리기
ctx.save(); // 기본 상태를 저장하기

ctx.fillStyle = "#09F"; // 설정 변경하기
ctx.fillRect(15, 15, 120, 120); // 새로운 설정으로 사각형 그리기

ctx.save(); // 현재 상태 저장하기
ctx.fillStyle = "#FFF"; // 설정 변경하기
ctx.globalAlpha = 0.5;
ctx.fillRect(30, 30, 90, 90); // 새로운 설정으로 사각형 그리기

ctx.restore(); // 이전 상태 복원하기
ctx.fillRect(45, 45, 60, 60); // 복원된 설정으로 사각형 그리기

ctx.restore(); // 초기 상태를 복원하기
ctx.fillRect(60, 60, 30, 30); // 복원된 설정으로 사각형 그리기

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    ctx.save();
    ctx.fillStyle = "rgb(" + 51 * i + ", " + (255 - 51 * i) + ", 255)";
    ctx.translate(10 + j * 50, 10 + i * 50);
    ctx.fillRect(0, 0, 25, 25);
    ctx.restore();
  }
}
ctx.translate(200, 200);
for (var j = 1; j < 50; j++) {
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.translate(
    75 - Math.floor(Math.random() * 150),
    75 - Math.floor(Math.random() * 150)
  );
  drawStar(ctx, Math.floor(Math.random() * 4) + 2);
  ctx.restore();
}

function drawStar(ctx, r) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (var i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 == 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

drawStar(ctx, 20);
