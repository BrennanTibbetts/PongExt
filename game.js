const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let speedFactor = 1;
let gameStarted = true;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = .4;
let ballSpeedY = .4;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;


document.addEventListener('mousemove', mouseMoveHandler, false);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
    if (gameStarted) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
  
      if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
      }
      if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
      } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          ballSpeedY = -ballSpeedY;
          speedFactor += 0.4;
        } else {
          alert('Game over');
          document.location.reload();
        }
      }
  
      ballX += ballSpeedX * speedFactor;
      ballY += ballSpeedY * speedFactor;
    }
  }
  

setInterval(draw, 10);