
const mycanvas = document.getElementById('canv');

function setup() {
    createCanvas(400, 400, mycanvas);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}