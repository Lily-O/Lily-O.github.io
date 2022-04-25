var canvas = document.getElementById('canvas');

var context = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// cloud animation
var cloud_img = new Image(),
    x = canvas.width,
    y = 10;
cloud_img.src = "https://simg.nicepng.com/png/small/91-912538_best-fluffy-cartoon-clouds-small-white-cloud-transparent.png";
cloud_img.onload = animate;

function animate() {
    context.drawImage(cloud_img, x, y);
    if (x > 40) requestAnimationFrame(animate)
    x -= 2;
}

let width = canvas.width;
let height = canvas.height;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let petal = [];
let count = 48;

for (let i = 0; i < count; i++) {
    let angle = 15 + Math.random() * 45
    let dir = [-1, 1][Math.floor(Math.random() * 2)];

    petal.push({
        x: Math.random() * (width + 150) - 65,
        y: Math.random() * (height + 150) - 65,
        v: 48 / angle,
        a: angle,
        d: dir
    });
}

function update(dt) {
    for (let i = 0; i < petal.length; i++) {
        petal[i].y += petal[i].v;

        if (petal[i].y > height) {
            petal[i].y = -65;
            petal[i].x = Math.random() * width;
        }

    }
}

function draw(dt) {

    update(dt);

    context.clearRect(0, 0, width, height);

    for (let i = 0; i < petal.length; i++) {
        context.save();

        context.translate(petal[i].x, petal[i].y);

        // Make the petal flutter
        // https://oktemplate.com/6554_canvas-autumn-leaves-falling-animation.html
        context.rotate(
            petal[i].d *
            Math.sin(dt * 0.002 * i * 0.01) *
            (petal[i].a) *
            Math.PI / 160
        );


        // elipse 
        context.fillStyle = 'pink';
        context.beginPath();
        context.ellipse(70, 30, 10, 10, Math.PI * .25, 0, Math.PI);
        context.fill();

        // circle 
        context.beginPath();
        context.fillStyle = "yellow";
        context.strokeStyle = "pink";
        context.arc(40, 40, 10, 0, Math.PI / 2);
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = "yellow";
        context.arc(40, 40, 10, 0, Math.PI / 2, true);
        context.fill();


        context.restore();
    }

    requestAnimationFrame(draw);

}

draw();