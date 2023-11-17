let img;
let cols; let rows; let size; let speed;
let myParticles = [];

let animate = false;


function preload() {
    img = loadImage("assets/img/ml.jpg");

}

function setup() {
    createCanvas(700, 800);
    img.resize(700, 0);
    //grid
    size = 10;
    speed = 0.4;
    cols = width / size;
    rows = height / size;



    background(0);

    //image(img, 0, 0)
    //img.resize(400, 0);

    for (let i = 0; i < cols; i++) {

        for (let j = 0; j < rows; j++) {
            let c = img.get(i * size, j * size);

            myParticles.push(new Particle(i, j, size, speed, c));
            //console.log(c);
        }

    }

    myParticles.forEach(particle => {

        particle.drawParticle();
    });


}

function draw() {

    if (animate) {
        //background(0);
        myParticles.forEach(particle => {
            particle.updateParticle();
            // particle.drawParticle();
        });
    }

}

function mouseClicked() {
    if (animate) {
        animate = false;

        background(0);

        myParticles.forEach(particle => {
            particle.resetParticle();

        });
    } else {
        animate = true
    }
}



class Particle {

    constructor (x, y, mySize, velocity, myColor) {

        this.pixelColor = myColor;
        this.x = x;
        this.y = y;

        this.xOrigin = x;
        this.yOrigin = y;
        this.size = mySize;
        this.rad = mySize;
        this.v = velocity;
        this.decay = map(Math.random(), 0, 1, 0.2, 0.4);
        this.vX = Math.random() * velocity - (velocity / 2);
        this.vY = Math.random() * velocity - (velocity / 2);


    }

    updateParticle() {
        this.x += this.vX;
        this.y += this.vY;

        this.rad -= this.decay;
        if (this.rad < 0) {
            this.rad = 0;
        } else {
            this.drawParticle();
        }


    }

    resetParticle() {
        this.x = this.xOrigin;
        this.y = this.yOrigin;

        this.rad = this.size;
        console.log(this.rad, this.size);
        this.drawParticle();
    }

    drawParticle() {
        // stroke(this.pixelColor[0], this.pixelColor[1], this.pixelColor[2]);
        //point(this.x, this.y);

        noStroke();
        fill(this.pixelColor[0], this.pixelColor[1], this.pixelColor[2]);

        circle(this.x * this.size, this.y * this.size, this.rad);

        //square(this.x, this.y, 60);

    }
}