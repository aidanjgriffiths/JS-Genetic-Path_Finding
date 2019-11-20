function populationSet() {
    this.gen = 1;
    this.finished = false;
    this.populations = [];
    this.addPop = function (mutRate, ncolor) {
        this.populations.push(new population(popSize, stepSize, globGenSize, mutRate, ncolor, this));
    }
    this.play = function () {
        if (!this.finished) {
            for (let i = 0; i < this.populations.length; i++) {
                this.populations[i].stats(i);
                this.populations[i].run();
            }
        }
        else {
            //when simulation is finished
        }
        this.stats();
    }

    this.stats = function () {
        text("Generation " + this.gen, 100, 400);
    }
}


