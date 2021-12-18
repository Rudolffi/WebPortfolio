let canvas;
let ctx;
let terminator;
let arnold;

// on terminator image load add event listener to canvas
function terminator_load(){
    canvas.addEventListener('mouseenter', function(event){
        let scale = Math.min(canvas.width / terminator.width, canvas.height / terminator.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.globalAlpha = 0.5;
        ctx.drawImage(terminator, 0, 0, terminator.width, terminator.height, canvas.width/2 - (terminator.width * scale)/2, 0, terminator.width * scale, terminator.height * scale);
        ctx.globalAlpha = 0.5;
        scale = Math.min(canvas.width / arnold.width, canvas.height / arnold.height);
        ctx.drawImage(arnold, 0, 0, arnold.width, arnold.height, canvas.width/2 - (arnold.width * scale)/2, 0, arnold.width * scale, arnold.height * scale);
        ctx.globalAlpha = 1;
    });
}
// on arnold image load add event listener to canvas
function arnold_load(){
    canvas.addEventListener('mouseleave', function(event){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let scale = Math.min(canvas.width / arnold.width, canvas.height / arnold.height);
        ctx.drawImage(arnold, 0, 0, arnold.width, arnold.height, canvas.width/2 - (arnold.width * scale)/2, 0, arnold.width * scale, arnold.height * scale);
    });
    let scale = Math.min(canvas.width / arnold.width, canvas.height / arnold.height);
    ctx.drawImage(arnold, 0, 0, arnold.width, arnold.height, canvas.width/2 - (arnold.width * scale)/2, 0, arnold.width * scale, arnold.height * scale);
}
// initialize canvas, images and event listener
export function init(){
    terminator = new Image();
    arnold = new Image();
    canvas = document.getElementById('about-arnoldpicture');
    ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    terminator.onload = terminator_load;
    arnold.onload = arnold_load;
    arnold.src = require("../assets/arnold.png");
    terminator.src = require("../assets/terminator.png");

    window.addEventListener('resize', function(){
        let scale = Math.min(canvas.width / arnold.width, canvas.height / arnold.height);
        ctx.drawImage(arnold, 0, 0, arnold.width, arnold.height, canvas.width/2 - (arnold.width * scale)/2, 0, arnold.width * scale, arnold.height * scale);
    });
}