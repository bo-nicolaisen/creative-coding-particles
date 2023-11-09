import { ParticleController } from './particles.js'
const myCanvas = document.getElementById('myCanvas');

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;


const ctx = myCanvas.getContext('2d');
ctx.fillStyle = 'black';


const myController = new ParticleController(myCanvas, ctx, "soft", 10, 0.9, 4, 100);


function animate() {

    // hard clear no trails
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    //soft clear trails
    // softClear();

    myController.handleParticle();
    requestAnimationFrame(animate);
}

animate();


function softClear() {
    ctx.save();
    ctx.fillStyle = `rgba(255,255,255,0.03)`;
    ctx.rect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fill();

    ctx.restore();
} 