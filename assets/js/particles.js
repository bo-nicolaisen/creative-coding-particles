
export function particleCloud(container, baseHue) {


    const myCanvas = document.createElement('canvas');
    myCanvas.width = 200;// window.innerWidth;
    myCanvas.height = 400; //window.innerHeight;
    myCanvas.classList.add('canvas-container');
    container.appendChild(myCanvas);

    const ctx = myCanvas.getContext('2d');

    const myController = new ParticleController(myCanvas, ctx, "soft", baseHue, 30, 0.1, 2, myCanvas.width * 0.3);

}


export function HardParticles(container, baseHue) {

    const myCanvas = document.createElement('canvas');
    myCanvas.width = 200;// window.innerWidth;
    myCanvas.height = 400; //window.innerHeight;
    myCanvas.classList.add('canvas-container');
    container.appendChild(myCanvas);

    const ctx = myCanvas.getContext('2d');


    const myController = new ParticleController(myCanvas, ctx, "hard", baseHue, 10, 0.3, 2, myCanvas.width * 0.3);

}

export function FastParticles(container, baseHue) {

    const myCanvas = document.createElement('canvas');
    myCanvas.width = 200;// window.innerWidth;
    myCanvas.height = 400; //window.innerHeight;
    myCanvas.classList.add('canvas-container');
    container.appendChild(myCanvas);

    const ctx = myCanvas.getContext('2d');


    const myController = new ParticleController(myCanvas, ctx, "fast", baseHue, 300, 2, 1, 2);

}




export class ParticleController {

    constructor (canvas, ctx, particleType, baseHue, particleCount, speed, minSize, maxSize) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particleType = particleType;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numParticles = particleCount;
        this.particleSpeed = speed;

        this.minSize = minSize;
        this.maxSize = maxSize;
        this.baseHue = baseHue;
        this.createParticles();
        this.animate();

    }

    createParticles() {

        for (let index = 0; index < this.numParticles; index++) {
            let myParticle;
            switch (this.particleType) {
                case "soft":
                    myParticle = new SoftParticle(this, this.particleSpeed, this.minSize, this.maxSize, this.baseHue)
                    break;
                case "hard":
                    myParticle = new Particle(this, this.particleSpeed, this.minSize, this.maxSize, this.baseHue)
                    break;
                case "fast":
                    myParticle = new ColorParticle(this, this.particleSpeed, this.minSize, this.maxSize, this.baseHue)
                    break;

                default:
                    myParticle = new Particle(this, this.particleSpeed, this.minSize, this.maxSize, this.baseHue)
                    break;
            }

            this.particles.push(myParticle);

        }

    }

    handleParticle() {
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
    }



    animate() {

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.handleParticle();
        requestAnimationFrame(this.animate.bind(this));
    }

}





class Particle {
    constructor (controller, speed, minSize, maxSize, baseHue) {
        this.controller = controller;
        this.radius = (Math.random() * maxSize) + minSize;

        this.x = this.radius + Math.random() * (this.controller.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.controller.height - this.radius * 2);

        this.maxVelo = speed;
        this.vX = Math.random() * this.maxVelo;
        this.vY = Math.random() * this.maxVelo;
        this.hue = baseHue; //  Math.random() * 360;

    }

    update() {


        this.x += this.vX;
        this.y += this.vY;

        if (this.x > this.controller.width - this.radius || this.x < this.radius) {
            this.vX *= -1;
            this.hue += 10;
        }
        if (this.y > this.controller.height - this.radius || this.y < this.radius) {
            this.vY *= -1;
            this.hue += 10;
        }



    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = `hsl(${this.hue},100%,50%,1)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }


}

class SoftParticle {

    constructor (controller, speed, minSize, maxSize, baseHue) {
        this.controller = controller;
        this.radius = (Math.random() * maxSize) + minSize;

        this.x = this.radius + Math.random() * (this.controller.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.controller.height - this.radius * 2);

        this.maxVelo = speed;
        this.vX = Math.random() * this.maxVelo;
        this.vY = Math.random() * this.maxVelo;

        this.hue = baseHue;
    }

    update() {


        this.x += this.vX;
        this.y += this.vY;

        if (this.x > this.controller.width - this.radius || this.x < this.radius) {
            this.vX *= -1;
            this.hue += 1;
        }
        if (this.y > this.controller.height - this.radius || this.y < this.radius) {
            this.vY *= -1;
            this.hue += 1;
        }

    }

    draw(ctx) {

        var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        // make gradient
        gradient.addColorStop(0, `hsl(${this.hue},100%,50%,1)`);

        gradient.addColorStop(1, `hsl(${this.hue},100%,50%,0)`);

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

}


class ColorParticle {
    constructor (controller, speed, minSize, maxSize, baseHue) {
        this.controller = controller;
        this.radius = (Math.random() * maxSize) + minSize;

        this.x = this.radius + Math.random() * (this.controller.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.controller.height - this.radius * 2);

        this.maxVelo = speed;
        this.vX = Math.random() * this.maxVelo + this.maxVelo * 0.5;
        this.vY = Math.random() * this.maxVelo + this.maxVelo * 0.5;
        this.hue = baseHue; //  Math.random() * 360;

    }

    update() {


        this.x += this.vX;
        this.y += this.vY;

        if (this.x > this.controller.width - this.radius || this.x < this.radius) {
            this.vX *= -1;

        }
        if (this.y > this.controller.height - this.radius || this.y < this.radius) {
            this.vY *= -1;

        }


    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = `hsl(${this.hue},100%,50%,1)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }


}



