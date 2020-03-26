
//Các biến Const
const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');
const CAR_HEIGHT = 30;
const CAR_WiDTH = 50;
const CAR_X = 0;
const CAR_Y = (cvs.height/2) - CAR_HEIGHT/2;
const carImg = new Image();
carImg.src = 'car2.jpg';
let upArrow = false;
let downArrow = false;
let carOpImg = new Image();
carOpImg.src = 'carO.jpg';
let speed = 5;
let point = 0;
let bg=new Image();
bg.src = 'sky.jpg';

function drawBG() {
    ctx.drawImage(bg,0,0)
}


//Creat Car
let car = {
    x : CAR_X,
    y : CAR_Y
};

//Draw Car
function drawCar() {
    ctx.drawImage(carImg,car.x,car.y);
}


//Control Car
document.addEventListener('keydown', function (event) {
    if(event.keyCode === 38) {
        upArrow = true;
    } else if (event.keyCode == 40) {
        downArrow = true;
    }
})
document.addEventListener('keyup', function (event) {
    if(event.keyCode === 38) {
        upArrow = false;
    } else if (event.keyCode == 40) {
        downArrow = false;
    }
});


//Move car
function moveCar() {
    if (upArrow && car.y > 0) {
        car.y -= 5;
    }
    if (downArrow && car.y < cvs.height - 35) {
        car.y += 5;
    }
}

//Make Enemy Car
let enemyCar = [];
enemyCar[0] = {
    x : cvs.width,
    y : 0,
};
 function drawEnemy() {
        for (let i=0; i< enemyCar.length; i++) {
            ctx.drawImage(carOpImg,enemyCar[i].x, enemyCar[i].y);
            enemyCar[i].x -= speed;
            if (enemyCar[i].x > 0 && enemyCar[i].x <=speed) {
                enemyCar.push({
                    x : cvs.width,
                    y : Math.abs((Math.random()*cvs.height - 140))
                });
                if (car.y > enemyCar[i].y - 30 && car.y < enemyCar[i].y + 140 && car.x > enemyCar[i].x -81) {
                    speed = 0;
                }
            }
        } point = enemyCar.length -1;
 }
function Point() {
    ctx.font = '20px Arial';
    ctx.fillText('Point : '+point, cvs.width - 100, 30)
    switch (point) {
        case 10:
            speed = 7 ;
            console.log(speed)
            break;
        case 20:
            speed = 10;
            break;
        case 30:
            speed = 13;
            break;
        case 40:
            speed = 17;
            break;
        case 50:
            speed = 20;
            break;
        case 60:
            speed = 25;
            break;
        case 70:
            speed = 30;
            break;
        case 80:
            speed = 35;
            break;
        case 90:
            speed = 40;
            break;
    }
}

//Update Game
function update() {
    moveCar();
    Point();

}

function winner() {
    if (speed == 0 && point < 50) {
        ctx.font = '50px Arial';
        ctx.fillText('Your Score is : '+ point, cvs.width/4, cvs.height/2)
    }
    else if (point == 50) {
        speed = 0
        ctx.font = '40px Arial';
        ctx.fillText('Congralulation. You are the Winner', 0, cvs.height/2)
    }
}


//Game loop
function loop() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    drawBG();
    drawCar();
    update();
    drawEnemy();
    winner();
    requestAnimationFrame(loop);
}
loop();