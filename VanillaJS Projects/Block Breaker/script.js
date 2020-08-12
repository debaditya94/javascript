const rulesButton = document.getElementById('rules-button');
const closeButton = document.getElementById('close-button');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brickImg = new Image;
brickImg.src = './img/brick.png';


const brickRows = 9;
const brickColumns = 5;

let score = 0;

//Create ball attributes
const ball = {
    x: canvas.width / 2,
    y: canvas.width / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

//Create paddle properties
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
}

//Create brick attributes
const brickAttrib = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

//Paint bricks
const bricksArray = [];
for (let i = 0; i < brickRows; i++) {
    bricksArray[i] = [];
    for (let j = 0; j < brickColumns; j++) {
        const x = i * (brickAttrib.w + brickAttrib.padding) + brickAttrib.offsetX;
        const y = j * (brickAttrib.h + brickAttrib.padding) + brickAttrib.offsetY;
        bricksArray[i][j] = { x, y, ...brickAttrib };

    }

}

//Paint ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    // ctx.drawImage(ballImg, ball.x, ball.y, 2 * ball.size, 2 * ball.size);
    // ctx.drawImage(brickImg, brick.x, brick.y, brick.w, brick.h)
    // ctx.clip();
    let gradient = ctx.createLinearGradient(ball.x,ball.y, ball.x + (2 * ball.size), ball.y + (2 * ball.size));
    
    // Add three color stops
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'white');
    gradient.addColorStop(1, 'red');
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    // ctx.fillStyle = 'lightskyblue';
    ctx.fill();
    ctx.closePath();
}

//Paint paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    let gradient = ctx.createLinearGradient(paddle.x,paddle.y, paddle.x + paddle.w, paddle.y + paddle.h);
    
    // Add three color stops
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'grey');
    gradient.addColorStop(1, 'white');
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    // ctx.fillStyle = 'lightskyblue';
    ctx.fill();
    ctx.closePath();
}

//Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx;

    //Wall detection 
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //Wall collision for x axis
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    //Wall collision for y axis
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    //Paddle collision
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }

    //Brick collision
    bricksArray.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x && // left brick side check
                    ball.x + ball.size < brick.x + brick.w && // right brick side check
                    ball.y + ball.size > brick.y && // top brick side check
                    ball.y - ball.size < brick.y + brick.h // bottom brick side check
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });

    //Lose on hitting ground 
    if (ball.y + ball.size > canvas.height) {
        // showAllBricks();
        // score = 0;
        alert('Oops ! You hit the ground ! Click on Ok to play again');
        location.reload();
    }
}

// Increment score
function increaseScore() {
    score++;
    if (score % (brickRows * brickColumns) === 0) {
        alert('You have won ! Click on Ok to play again !!');
        location.reload();
        // showAllBricks();
    }
}

// Make all bricks reappear 

function showAllBricks() {
    bricksArray.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}


//Render ball & paddle & bricks
function draw() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

//Paint score on canvas
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Block Breaker`, canvas.width - 500, 30);
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Paint all the bricks
function drawBricks() {
    bricksArray.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            // ctx.rect(brick.x, brick.y, brick.w, brick.h);
            // brickImg.height = brick.h;
            // brickImg.width = brick.w;
            
            ctx.fillStyle = brick.visible ? ctx.drawImage(brickImg, brick.x, brick.y, brick.w, brick.h) : '';
            // ctx.fill();
            ctx.closePath();
        });
    });
}

//Update canvas paintings & animations
function update() {
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}

update();

//Keydown event
function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

//Keyup event
function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        paddle.dx = 0;
    }
}
//Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//Rules show/hide event listeners

rulesButton.addEventListener('click', () => {
    rules.classList.add('show');
    rulesButton.style.visibility = 'hidden';
});

closeButton.addEventListener('click', () => {
    rules.classList.remove('show');
    rulesButton.style.visibility = 'visible';
});