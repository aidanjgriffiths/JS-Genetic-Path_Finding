function DNA(inDna) {
    this.dna = [];
    if (inDna) {
        this.dna = inDna;
    } else {
        for (var i = 0; i < stepSize; i++) {
            let vector = p5.Vector.random2D().normalize().mult(vectorLength);
            this.dna.push(new Vector(vector.x, vector.y));

        }
    }

}