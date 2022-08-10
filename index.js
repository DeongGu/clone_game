const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector("button");

//막대기
var bar = {
  x: 150,
  y: 350,
  vx: 15,
  width: 100,
  height: 20,
  color: "black",
};

//벽돌
var brick = {
  rowCount: 3,
  columnCount: 4,
  width: 75,
  height: 20,
  padding: 10,
  offSetTop: 30,
  offSetLeft: 30,
  color: "green",
};

// 공
var ball = {
  x: 200,
  y: 335,
  vx: 5,
  vy: 2,
  radius: 15,
  color: "black",
};

//이벤트
function rightMove() {
  bar.x += bar.vx;
}
function leftMove() {
  bar.x -= bar.vx;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    window.requestAnimationFrame(rightMove);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    window.requestAnimationFrame(leftMove);
  }
});
btn.addEventListener("click", function (e) {
  window.requestAnimationFrame(draw);
});

//함수
function draw() {
  drawBall();
  drawBar();
  drawBricks();
  collisionDetection();
}

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = ball.color;
  ctx.fill();
}

function drawBar() {
  ctx.beginPath();
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = bar.color;
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = bar.color;
  ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
  ctx.closePath();

  if (bar.x + 100 > canvas.width) {
    bar.x = canvas.width - 100;
  } else if (bar.x < 0) {
    bar.x = 0;
  }
}

var bricks = [];
for (var i = 0; i < brick.columnCount; i++) {
  bricks[i] = [];
  for (var j = 0; j < brick.rowCount; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for (var i = 0; i < brick.columnCount; i++) {
    for (var j = 0; j < brick.rowCount; j++) {
      if (bricks[i][j].status == 1) {
        var brickX = i * (brick.width + brick.padding) + brick.offSetLeft;
        var brickY = j * (brick.height + brick.padding) + brick.offSetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.width, brick.height);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  if (
    ball.y + ball.vy + ball.radius > bar.y &&
    ball.y + ball.vy + ball.radius < bar.y + bar.height &&
    ball.x >= bar.x &&
    ball.x <= bar.x + bar.width
  ) {
    ctx.beginPath();
    ctx.arc(
      ball.x - ball.radius - ball.vx,
      ball.y - ball.radius - ball.vy,
      ball.radius,
      0,
      true
    );
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    ball.vy = -ball.vy;
    ball.vx = -ball.vx;
    ball.x += ball.vx;
    ball.y += ball.vy;

    window.requestAnimationFrame(draw);
  } else {
    ball.x += ball.vx;
    ball.y += ball.vy;

    window.requestAnimationFrame(draw);
  }

  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  //천장 충돌
  if (ball.y + ball.vy < ball.radius) {
    ball.vy = -ball.vy;
  }

  //바닥 충돌
  if (ball.y + ball.vy > canvas.height) {
    ball.vx = 0;
    ball.vy = 0;
    const userName = prompt("이름?", "홍길동");
    location.reload(true);
  }

  for (var i = 0; i < brick.columnCount; i++) {
    for (var j = 0; j < brick.rowCount; j++) {
      var b = bricks[i][j];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brick.width &&
          ball.y > b.y &&
          ball.y < b.y + brick.height
        ) {
          b.status = 0;
          ball.vy = -ball.vy;
        }
      }
    }
  }
}

drawBall();
drawBar();
drawBricks();
