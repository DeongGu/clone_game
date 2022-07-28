var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src ='icon.jpg';

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height );
    }
}

var img1 = new Image();
img1.src ='라이언.jpg';

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var 점프중 = false;
var animation;

function 프레임마다실행할거(){
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer % 120 === 0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o)=>{
        //x좌표가 0미만이면 제거
        if(a.x < 0){
            o.splice(i, 1);
        }
        a.x--;

        충돌하냐(dino, a);

        a.draw();
    })

    //점프기능
    
    if(점프중 == true){
        dino.y--;
        점프timer++;
    }
    if(점프중 == false){
        if (dino.y < 200) {
            dino.y++;
        }
    }
    if(점프timer > 100){
        점프중 = false;
        점프timer = 0;
    }
    dino.draw();
}




프레임마다실행할거();

//충돌 확인

function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if(x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}



document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        점프중 = true;        
    }
});