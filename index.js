const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector("button");

var raf;

ctx.strokeRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";

//막대기
var bar = {
  x: 150,
  y: 350,
  vx: 15,
  width: 100,
  color: "black",
  draw: function () {
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 100, 20);
    ctx.closePath();
    if (this.x + 100 > canvas.width) {
      this.x = canvas.width - 100;
    } else if (this.x < 0) {
      this.x = 0;
    }
  },
};
var brick = {
  rowCount: 3,
  columnCount: 4,
  width: 75,
  height: 20,
  padding: 10,
  offSetTop: 30,
  offSetLeft: 30,
};

var bricks = [];

for (var i = 0; i < brick.columnCount; i++) {
  bricks[i] = [];
  for (var j = 0; j < brick.rowCount; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

function rightMove() {
  bar.x += bar.vx;
  ctx.clearRect(bar.x - bar.vx, 350, 100, 20);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  bar.draw();
}
function leftMove() {
  bar.x -= bar.vx;
  ctx.clearRect(bar.x + bar.vx, 350, 100, 20);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  bar.draw();
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    raf = window.requestAnimationFrame(rightMove);
  }
});
window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    raf = window.requestAnimationFrame(leftMove);
  }
});
bar.draw();

// 공
var ball = {
  x: 200,
  y: 335,
  vx: 5,
  vy: 2,
  radius: 15,
  color: "black",
  draw: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bar.draw();
    drawBricks();
    collisionDetection();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    if (
      this.x + this.vx > canvas.width - this.radius ||
      this.x + this.vx < this.radius
    ) {
      this.vx = -this.vx;
    }
    if (this.y + this.vy < this.radius) {
      this.vy = -this.vy;
    } else if (ball.y + ball.vy > canvas.height - ball.radius) {
      if (ball.x > bar.x && ball.x < bar.x + 100) {
        ball.vy = -ball.vy;
      } else {
        alert("Game Over");
        document.location.reload();
      }
    }
  },
};

function draw() {
  if (
    ball.y + ball.radius === bar.y &&
    ball.x >= bar.x &&
    ball.x <= bar.x + bar.width
  ) {
    ctx.beginPath();
    ctx.clearRect(
      ball.x - ball.radius - ball.vx,
      ball.y - ball.radius - ball.vy,
      ball.radius * 2,
      ball.radius * 2
    );
    ctx.closePath();
    ball.vy = -ball.vy;
    ball.vx = -ball.vx;
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.draw();
    ctx.beginPath();
    ctx.clearRect(
      ball.x - ball.radius - ball.vx,
      ball.y - ball.radius - ball.vy,
      ball.radius * 2,
      ball.radius * 2
    );
    ctx.closePath();
    raf = window.requestAnimationFrame(draw);
  } else {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ctx.beginPath();
    ctx.clearRect(
      ball.x - ball.radius - ball.vx,
      ball.y - ball.radius - ball.vy,
      ball.radius * 2,
      ball.radius * 2
    );
    ctx.closePath();
    ball.draw();
    raf = window.requestAnimationFrame(draw);
  }

  if (ball.y === canvas.height) {
    window.cancelAnimationFrame(draw);
  }
}

btn.addEventListener("click", function (e) {
  raf = window.requestAnimationFrame(draw);
});

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

ball.draw();
