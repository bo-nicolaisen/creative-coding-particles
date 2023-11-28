let img;
let cols; let rows; let size; let speed;
let myParticles = [];

let animate = true;
let trace = 1;

let myHeight = window.innerHeight;
let myWidth = window.innerWidth;

document.getElementsByClassName


function preload() {
    img = loadImage("assets/img/dd.png");

}

function setup() {

    createCanvas(myWidth, myHeight);
    img.resize(0, myHeight);
    //grid

    size = myWidth * 0.008;
    speed = map(Math.random(), 0, 1, 0.02, 1);
    cols = width / size;
    rows = height / size;



    background(0);
    //image(img, 0, 0);
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
        if (!trace) {
            background(0);
        }

        myParticles.forEach(particle => {
            particle.updateParticle();
            // particle.drawParticle();
        });
    }

}


function mouseDragged() {

    let MousePos = createVector(mouseX, mouseY);

    myParticles.forEach(particle => {

        particle.triggerDist(MousePos);

    });

}






/* function mouseClicked() {

    if (animate) {
        animate = false;


        background(0);
        //image(img, 0, 0);

        myParticles.forEach(particle => {
            particle.resetParticle();

        });
    } else {
        animate = true
    }
} */



class Particle {

    constructor (x, y, mySize, velocity, myColor) {

        this.pixelColor = myColor;
        this.alpha = 255;
        this.x = x;
        this.y = y;

        this.xOrigin = x;
        this.yOrigin = y;
        this.size = mySize;
        this.rad = mySize;
        this.v = velocity;
        this.decay = map(Math.random(), 0, 1, 0.02, 0.4);
        this.vX = (Math.random() * velocity - (velocity / 2));// * 2;
        this.vY = Math.random() * velocity - (velocity / 2);
        this.activated = 0;


    }

    triggerDist(myOrigin) {

        let myPos = createVector(this.x * this.size, this.y * this.size);

        let myDelta = myPos.dist(myOrigin);

        if (myDelta < 10) {

            this.activated = 1;

        }



    }

    updateParticle() {
        if (this.activated) {

            if (Math.random() > 0.9) {
                this.vX = (Math.random() * this.v - (this.v / 2));// * 3;
                this.vY = Math.random() * this.v - (this.v / 2);
            }


            this.x += this.vX;
            this.y += this.vY;

            this.rad -= this.decay;
            // this.alpha -= map(this.decay, 0.02, 0.4, 0, 255);


            if (this.rad > 0) {
                this.drawParticle();
            }
        }



    }

    resetParticle() {
        this.x = this.xOrigin;
        this.y = this.yOrigin;
        this.alpha = 255;
        this.rad = this.size;

        this.drawParticle();
    }

    drawParticle() {
        // stroke(this.pixelColor[0], this.pixelColor[1], this.pixelColor[2]);
        //point(this.x, this.y);

        noStroke();
        fill(this.pixelColor[0], this.pixelColor[1], this.pixelColor[2], this.alpha);

        circle(this.x * this.size, this.y * this.size, this.rad);

        //square(this.x, this.y, 60);

    }
}