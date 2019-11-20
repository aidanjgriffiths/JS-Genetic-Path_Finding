function player(myPop, inDna) {
    this.pos = new Vector(start.i, start.i);
    if (inDna) {
        this.dna = new DNA(inDna);
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;
    this.count = 0;
    this.stuck = false;
    this.finished = false;
    this.update = function () {
        //if hasn't reached destination, and isn't stuck
        if (this.finished)
            return;
        if (this.stuck)
            return;
        if (collidedWithObstacle(this)) {
            this.stuck = true;
            return;
        }
        if (hasReachedDestination(this.pos)) {
            this.finished = true;
            return;
        }
        this.pos = this.pos.add(this.dna.dna[this.count]);
        this.count++;
    }
    this.show = function () {
        if (this.count < stepSize) {
            push();
            if (this.stuck)
                stroke(255, 0, 0);
            rect(this.pos.i, this.pos.j, 1, 1);
            pop();
        } else {
            //next gen begins
            myPop.genEnded = true;
        }
    }
    this.calcFitness = function () {
        let distance = this.pos.sub(target).getMag();
        // let distance = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = 1 / pow((distance + 1), 5);
        if (this.finished) {
            this.fitness = pow((stepSize - this.count), 2)
        }
        if (this.stuck) {
            this.fitness = 0;
        }
        if (this.fitness > myPop.maxFit) {

            myPop.maxFit = this.fitness;
        }
        myPop.avgFit += this.fitness;
    }
    this.mutate = function (mutRate) {
        for (let i = 0; i < stepSize; i++) {
            if (random() < mutRate) {
                let vector = p5.Vector.random2D().normalize().mult(vectorLength);
                this.dna.dna[i] = new Vector(vector.x, vector.y);
            }
        }
    }
}
