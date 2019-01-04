function getRandomSize() {
    let r = pow(random(0, 1), 3);
    return constrain(r * 48, 16, 48);
}

class Snowflake {
    constructor(x, y) {
        this.img = random(textures);

        this.acc = createVector();
        this.vel = createVector(0, 0);
        this.pos = createVector(x, y);
        this.angle = random(TWO_PI);
        this.dir = (random(1) > 0.5) ? -1 : 1;

        this.xOff = 0;

        this.r = getRandomSize();    
    }

    applyForce(force) {
        let f = force.copy();
        f.mult(this.r);
        this.acc.add(f);
    }

    update() {
        this.xOff = sin(this.angle) * 1.5 * this.r;

        this.vel.add(this.acc);
        this.vel.limit(this.r*0.2);

        if (this.vel.mag() < 1)
            this.vel.normalize();

        this.pos.add(this.vel);
        this.acc.mult(0);
        this.angle += this.dir * this.vel.mag() / 200;

        if (this.pos.y > height + this.r)
            this.randomize();

        if (this.pos.x < -this.r)
            this.pos.x = width + this.r;
        else if (this.pos.x > width + this.r)
            this.pos.x = -this.r;
    }

    show() {
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();

    }

    randomize() {
        this.img = random(textures);

        this.acc = createVector();
        this.vel = createVector(0, 0);
        this.pos = createVector(random(width), random(-100, -10));
        
        this.xOff = 0;

        this.angle = random(TWO_PI);
        this.dir = (random(1) > 0.5) ? -1 : 1;
        
        this.r = getRandomSize();
    }

    offScreen() {
        return (this.pos.x > width + this.r ||
                this.pos.x < -this.r ||
                this.pos.y > height + this.r);
    }
}