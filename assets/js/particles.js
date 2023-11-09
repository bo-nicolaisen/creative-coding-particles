export class Particle {
    constructor (controller, speed, minSize, maxSize) {
        this.controller = controller;
        this.radius = (Math.random() * maxSize) + minSize;

        this.x = this.radius + Math.random() * (this.controller.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.controller.height - this.radius * 2);

        this.maxVelo = speed;
        this.vX = Math.random() * this.maxVelo;
        this.vY = Math.random() * this.maxVelo;
        this.hue = 200; //  Math.random() * 360;

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

export class SoftParticle {

    constructor (controller, speed, minSize, maxSize) {
        this.controller = controller;
        this.radius = (Math.random() * maxSize) + minSize;

        this.x = this.radius + Math.random() * (this.controller.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.controller.height - this.radius * 2);

        this.maxVelo = speed;
        this.vX = Math.random() * this.maxVelo;
        this.vY = Math.random() * this.maxVelo;
        this.hue = 200; //  Math.random() * 360;

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

        var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
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


export class ParticleController {

    constructor (canvas, ctx, particleType, particleCount, speed, minSize, maxSize) {
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
        this.createParticles();

    }

    createParticles() {

        for (let index = 0; index < this.numParticles; index++) {
            let myParticle;
            switch (this.particleType) {
                case "soft":
                    myParticle = new SoftParticle(this, this.particleSpeed, this.minSize, this.maxSize)
                    break;
                case "hard":
                    myParticle = new Particle(this, this.particleSpeed, this.minSize, this.maxSize)
                    break;

                default:
                    myParticle = new Particle(this, this.particleSpeed, this.minSize, this.maxSize)
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


}