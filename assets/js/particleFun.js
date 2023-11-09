import { ParticleController, particleCloud } from './particles.js';


const myApp = document.getElementById('app');

const myCanvas = document.createElement('canvas');
myCanvas.width = 200;// window.innerWidth;
myCanvas.height = 400; //window.innerHeight;
myCanvas.classList.add('canvas-container');
myApp.appendChild(myCanvas);

const ctx = myCanvas.getContext('2d');

let baseColorHue = 10;
const myCloud = particleCloud(myCanvas, baseColorHue);

//const myController = new ParticleController(myCanvas, ctx, "soft", 300, 100, 0.2, 2, 40);