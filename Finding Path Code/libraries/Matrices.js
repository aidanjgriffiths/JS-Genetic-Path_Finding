function x22Matrix(first, second, third, fourth) {
    this.first = first;
    this.second = second;
    this.third = third;
    this.fourth = fourth;

    this.mult = function (v) {
        return new Vector(this.first * v.i + this.third * v.j,
            this.second * v.i + this.fourth * v.j);
    }

    this.invert = function () {
        let determinant = this.first * this.fourth - this.second * this.third;
        if (determinant != 0) {
            return new x22Matrix(fourth / determinant, (-second) / determinant, (-third) / determinant,
                first / determinant);
        }
        return new x22Matrix(0, 0, 0, 0);

    }

    this.convertPointToNewBasis = function (point) {
        return this.invert().mult(point);
    }
}