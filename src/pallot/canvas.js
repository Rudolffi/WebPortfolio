let canvas;
let ctx;
const particlesArray = [];
let hue = 0;
let light = 0;

const mouse = {
    x: null,
    y: null,
}
export function init(){
    canvas = document.getElementById('gamecanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('click', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });
    window.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        spawn();
    });
    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
        this.color = 'rgba(0,0,0,0.2)';
        //this.color = 'rgba(255,255,255,0.2)';
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
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgb(255,0,217)'; //'hsl(' + hue + ',100%, 0%'; //particlesArray[i].color;
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
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}
