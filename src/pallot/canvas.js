let canvas;
let ctx;
const particlesArray = [];
let hue = 0;
let light = 0;
let theme = false; // false == dark; true == light

const mouse = {
    x: null,
    y: null,
}

export function init(){

    canvas = document.getElementById('gamecanvas');
    ctx = canvas.getContext('2d');

    let body = document.getElementById('app');
    canvas.width = body.getBoundingClientRect().width;
    body = document.body;
        let html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    canvas.height =height;
    console.log('Last update' + body.getBoundingClientRect().width);
    body.addEventListener('click', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });
    body.addEventListener('mousemove', function(event){
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        spawn();
    });
    body.addEventListener('change', function(event){
        let height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        canvas.width = body.getBoundingClientRect().width;
        canvas.height =height;
    });

    window.addEventListener('change', function(){
        let height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        canvas.width = body.getBoundingClientRect().width;
        canvas.height = height;
    });
    animate();
}
class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.connections = [];
        this.size = Math.random() * 9 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',0.2%, 100%';
        if (theme){
            this.color = 'rgba(255,255,255,0.2)';
        } else {
            this.color = 'rgba(30,30,30,0.2)';
        }
        console.log(this.color);
    }
    update(){
        if(this.size > 0.2){
            this.size -= 0.1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        if(this.x > canvas.width){
            this.x = 0;
        } else if(this.x < 0){
            this.x = canvas.width;
        }
        if(this.y > canvas.height){
            this.y = 0;
        } else if(this.y < 0){
            this.y = canvas.height;
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function spawn(){
    for(let i = 0; i < 5; i++){
        particlesArray.push(new Particle());
    }
}
function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for(let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x -  particlesArray[j].x;
            const dy = particlesArray[i].y -  particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < particlesArray[i].size + 50 && particlesArray[i].connections.length < 3){
                if(!particlesArray[i].connections.includes(particlesArray[j])){
                    particlesArray[i].connections = [...particlesArray[i].connections, particlesArray[j]];
                    ctx.beginPath()

                    if (theme){
                        ctx.strokeStyle = 'hsl(' + hue + ',100%, 0%'; //particlesArray[i].color;
                    } else {
                        ctx.strokeStyle = 'rgb(104,33,122)'; //'hsl(' + hue + ',100%, 0%'; //particlesArray[i].color;
                    }
                    ctx.lineWidth = particlesArray[i].size/10;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }

        }
        if(particlesArray[i].size <= 0.2){
            particlesArray.splice(i, 1);
            i--;
        }
    }
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].connections = [];
    }
}
function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(255,255,255,0.2)';
   // ctx.fillStyle = 'rgb(255,255,255)';

    if (theme){
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
    } else {
        ctx.fillStyle = 'rgba(30,30,30,0.2)';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}


