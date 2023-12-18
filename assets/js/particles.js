
class myRect {
    constructor (ctx) {

        this.ctx = ctx;

        this.updateRect();
    }

    updateRect() {
        this.x = Math.random() * 800;
        this.y = Math.random() * 300;
        this.width = Math.random() * 400;
        this.height = Math.random() * 600;

        this.drawRect();
    }

    drawRect() {
        this.ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255},${Math.random()})`;

        this.ctx.fillRect(this.x, this.y, this.width, this.height);

    }
}





const myCanvas = document.getElementById('myCanvas');

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;


const ctx = myCanvas.getContext('2d');

console.log(ctx);




let myArray = [];


for (let i = 0; i < 100; i++) {
    myArray.push(new myRect(ctx));
}




var myTimer = setInterval(change, 10);





function change() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    myArray.forEach(element => {
        element.updateRect();
    });


}







class Controller {

    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numParticles = 20;
        this.createParticles();

    }

    createParticles() {

        for (let index = 0; index < this.numParticles; index++) {
            this.particles.push(new Particle(this));

        }

    }

    handleParticle() {
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
    }

}


class Particle {
    constructor (controller) {
        this.controller = controller;
        this.radius = Math.random() * 10;

        this.x = this.radius + Math.random() * (this.controller.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.controller.height - this.radius * 2);



    }

    update() {
        this.x++;

    }

    draw(ctx) {

        ctx.fillStyle = `hsl(${300},100%,50%)`
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }


}

/* const myController = new Controller(myCanvas, ctx);
myController.handleParticle(); */

