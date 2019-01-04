//Snow
let gravity;
let snow = [];

let spritesheet,
    textures = [];

let zOff = 0;

function preload() {
    spritesheet = loadImage('https://alca.tv/static/f32.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 0.0005);

    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            textures.push(img);
        }
    }

    for (let i = 0; i < 200; i++) {
        let x = random(width),
            y = random(height);
        snow.push(new Snowflake(x, y));
    }
    frameRate(50);
}

function draw() {
    background(0);

    zOff += 0.1;

    for (let flake of snow) {
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0);

        flake.applyForce(gravity);
        flake.applyForce(wind);
        flake.update();
        flake.show();
    }
}