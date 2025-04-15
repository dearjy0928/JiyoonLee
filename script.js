const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const gameOverText = document.getElementById("gameOver");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let playerX, playerY, stars, gameRunning, speed, score;

function initGame() {
  playerX = 180;
  playerY = 550;
  stars = [];
  gameRunning = true;
  speed = 2;
  score = 0;
  scoreDisplay.textContent = score;
  gameOverText.style.display = "none";
  restartBtn.style.display = "none";
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  // 기존 별 제거
  document.querySelectorAll(".star").forEach(star => star.remove());

  gameLoop();
}

document.addEventListener("keydown", e => {
  keysPressed[e.key] = true;
});

document.addEventListener("keyup", e => {
  keysPressed[e.key] = false;
});

restartBtn.addEventListener("click", initGame);

let keysPressed = {};

function movePlayer() {
  if (!gameRunning) return;

  if (keysPressed["ArrowLeft"] && playerX > 0) playerX -= 4;
  if (keysPressed["ArrowRight"] && playerX < 360) playerX += 4;
  if (keysPressed["ArrowUp"] && playerY > 0) playerY -= 4;
  if (keysPressed["ArrowDown"] && playerY < 560) playerY += 4;

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  // 랜덤 크기 (10px ~ 30px 사이)
  const size = Math.floor(Math.random() * 21) + 10;
  star.style.width = size + "px";
  star.style.height = size + "px";

  // 랜덤 색상 (보라색 제외)
  const colors = ["yellow", "white", "blue", "red", "cyan", "green"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  star.style.backgroundColor = color;

  star.style.left = Math.floor(Math.random() * 380) + "px";
  star.style.top = "0px";
  gameArea.appendChild(star);
  stars.push(star);
}

function moveStars() {
  stars.forEach((star, index) => {
    let y = parseInt(star.style.top);
    y += speed;
    star.style.top = y + "px";

    // 충돌 체크
    if (
      y > playerY &&
      y < playerY + 40 &&
      parseInt(star.style.left) > playerX - 20 &&
      parseInt(star.style.left) < playerX + 40
    ) {
      endGame();
    }

    // 별이 화면 아래로 벗어남 = 피함
    if (y > 600) {
      score++;
      updateScore();
      star.remove();
      stars.splice(index, 1);
    }
  });
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function gameLoop() {
  if (!gameRunning) return;
  
  movePlayer(); // 우주선 이동 추가
  moveStars();

  if (Math.random() < 0.04) {
    createStar();
  }

  speed += 0.0005;
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;
  gameOverText.style.display = "block"; // 게임 오버 메시지 보이기
  restartBtn.style.display = "inline-block"; // 재시작 버튼 보이기
}

// 게임 시작
initGame();
