const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
  {x: 9, y: 9}
];

let velocity = {x: 0, y: 0};
let food = randomFoodPosition();
let score = 0;

function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function gameLoop() {
  update();
  draw();
}

function update() {
  // Двигаем змейку
  const head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

  // Проверка столкновений со стенами
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
    return;
  }

  // Проверка столкновения с телом змейки
  for(let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      resetGame();
      return;
    }
  }

  snake.unshift(head);

  // Проверка съедания еды
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = randomFoodPosition();
  } else {
    snake.pop();
  }
}

function draw() {
  // Очистка холста
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем еду
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Рисуем змейку
  ctx.fillStyle = '#0f0';
  for(let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize -1);
  }
}

function resetGame() {
  alert('Игра окончена! Попробуй снова.');
  snake = [{x: 9, y: 9}];
  velocity = {x: 0, y: 0};
  score = 0;
  updateScore();
  food = randomFoodPosition();
}

function updateScore() {
  document.getElementById('score').innerText = 'Счёт: ' + score;
}

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp':
      if (velocity.y === 1) break; // нельзя сразу в обратную сторону
      velocity = {x: 0, y: -1};
      break;
    case 'ArrowDown':
      if (velocity.y === -1) break;
      velocity = {x: 0, y: 1};
      break;
    case 'ArrowLeft':
      if (velocity.x === 1) break;
      velocity = {x: -1, y: 0};
      break;
    case 'ArrowRight':
      if (velocity.x === -1) break;
      velocity = {x: 1, y: 0};
      break;
  }
});

// Запускаем игру с частотой 10 кадров в секунду
setInterval(gameLoop, 100);
updateScore();
