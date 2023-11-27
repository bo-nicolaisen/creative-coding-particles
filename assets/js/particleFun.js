import { ParticleController, FastParticles, particleCloud, HardParticles } from './particles.js';

const myApp = document.getElementById('app');

const p1 = particleCloud(myApp, 300);

const p2 = HardParticles(myApp, 200);

const p3 = FastParticles(myApp, 100);
const p4 = particleCloud(myApp, 200);