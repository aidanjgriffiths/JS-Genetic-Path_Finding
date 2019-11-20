function population(popSize, stepSize, genSize, mutRate, ncolor, popSet) {
    this.players = [];
    this.gen = 1;
    this.ncolor = ncolor;
    this.genSize = genSize;
    this.popSize = popSize;
    this.mutRate = mutRate;
    this.stepSize = stepSize;
    this.genEnded = false;
    this.prevMaxFit = 0;
    this.prevAvgFit = 0;
    this.avgFit = 0;
    this.maxFit = 0;
    this.simFin = false;
    this.popSet = popSet;
    this.genCurrentStep = 0;
    this.howManyDied = 0;
    for (var i = 0; i < popSize; i++) {
        this.players.push(new player(this));
    }

    this.run = function () {
        if (!this.simFin) {
            if (!this.genEnded && (!(this.genCurrentStep > stepSize))) {
                for (let i = 0; i < this.players.length; i++) {
                    //move the player, then show it to screen, run collision code too
                    this.players[i].update();
                    this.players[i].show();
                }
                //vv if generation ended
            } else {
                this.howManyDied = 0;

                //generation has finished, calc fitness for each player
                for (let i = 0; i < this.players.length; i++) {
                    this.players[i].calcFitness();
                    if (this.players[i].stuck) {
                        this.howManyDied++;
                    }
                }

                resetObstacles();
                this.genCurrentStep = 0;
                this.avgFit /= this.players.length;
                this.normalise();
                if (this.gen < this.genSize) {
                    //if simulation hasn't ended at conclusion of generation, create a new generation by selection process
                    this.createNewGen();

                    for (let i = 0; i < this.players.length; i++) {
                        //mutate new generation to create variance
                        this.players[i].mutate(this.mutRate);
                        //reset players info
                        this.players[i].pos.x = start.x;
                        this.players[i].pos.y = start.y;
                        this.players[i].count = 0;
                    }
                    this.prevMaxFit = this.maxFit;
                    this.prevAvgFit = this.avgFit;
                    this.maxFit = 0;
                    this.avgFit = 0;
                    this.gen++;
                    this.popSet.gen = this.gen;
                    this.genEnded = false;
                } else {
                    this.simFin = true;
                    this.popSet.finished = true;
                }
            }
        }
        this.genCurrentStep++;

    }
    this.createNewGen = function () {
        let newGen = [];
        for (var i = 0; i < this.popSize; i++) {
            newGen.push(this.getChild());
        }
        this.players = newGen;
    }
    this.getChild = function () {
        let dnaArr = [];
        let r = random();
        let i1 = random(this.players);
        while (r > i1.fitness) {
            r = random();
            i1 = random(this.players);
        }
        r = random();
        let i2 = random(this.players);
        while (r > i2.fitness) {
            r = random();
            i2 = random(this.players);
        }
        for (let i = 0; i < this.stepSize; i++) {
            let r = random();
            if (r > 0.5) {
                dnaArr.push(i2.dna.dna[i]);
            } else {
                dnaArr.push(i1.dna.dna[i]);
            }
        }
        return new player(this, dnaArr);

    }
    this.normalise = function () {
        //make it so the sum of all fitness values of all players will equal 1, by scaling them down
        //if a stick is xcm, and you cut it into x seperate parts, each part will be 1cm
        //same process is used here
        let sum = 0;
        for (let i = 0; i < popSize; i++) {
            sum += this.players[i].fitness;
        }
        for (let i = 0; i < popSize; i++) {
            this.players[i].fitness /= sum;
        }
    }
    this.stats = function (y) {
        stroke(this.ncolor);
        text("average fitness  of last gen  " + this.prevAvgFit, 20, y * 60 + 20);
        text("max fitness of last gen  " + this.prevMaxFit, 20, y * 60 + 40);
        text("success rate is " + floor(this.howManyDied / this.popSize) + "%", 20, y * 60 + 60);
    }
}
