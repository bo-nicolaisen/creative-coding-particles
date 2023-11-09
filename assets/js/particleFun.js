import { ParticleController, FastParticles, particleCloud, HardParticles } from './particles.js';


const myApp = document.getElementById('app');

/* const myCanvas = document.createElement('canvas');
myCanvas.width = 200;// window.innerWidth;
myCanvas.height = 400; //window.innerHeight;
myCanvas.classList.add('canvas-container');
myApp.appendChild(myCanvas);


const myCanvasTwo = document.createElement('canvas');
myCanvasTwo.width = 200;// window.innerWidth;
myCanvasTwo.height = 400; //window.innerHeight;
myCanvasTwo.classList.add('canvas-container');
myApp.appendChild(myCanvasTwo); */


const myCloud = particleCloud(myApp, 10);
let baseColorHue = 10;
const myCloudTwo = HardParticles(myApp, 200);

const p3 = FastParticles(myApp, 100);

