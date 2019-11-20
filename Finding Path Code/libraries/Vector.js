function Vector(i, j) {
    this.i = i;
    this.j = j;

    this.draw = function () {
        line(0, 0, i, j);
        line(i, j, i, j + 3);
    }

    this.normalize = function () {
        return this.divScalar(this.getMag());
    }

    this.add = function (v) {
        return new Vector(v.i + this.i, v.j + this.j);
    }

    this.sub = function (v) {
        return new Vector(this.i - v.i, this.j - v.j);
    }

    this.divScalar = function (num) {
        if (this.i == 0) {
            if (this.j == 0) {
                return new Vector(0, 0);
            }
            return new Vector(0, j / num);
        }
        if (this.j == 0) {
            return new Vector(i / num, 0);
        }
        return new Vector(i / num, j / num);
    }

    this.multScalar = function (num) {
        return new Vector(i * num, j * num);
    }

    this.setMag = function (len) {
        return this.divScalar(this.getMag()).multScalar(len);
    }

    this.getMag = function () {
        return Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
    }

    this.getDist = function (v) {
        return this.sub(v).getMag();

    }

    this.dotProd = function (v) {
        return i * v.i + j * v.j;
    }

    this.limit = function (num) {
        if (this.getMag() > num) {
            return this.setMag(num);
        }
        return this;
    }

    this.heading = function () {
        return Math.acos(this.j / this.i);
    }

    this.length = function () {
        return sqrt(this.i * this.i + this.j * this.j);
    }

    this.print = function () {
        console.log("i: " + this.i + ", j: " + j);
    }

    this.print = function (pretext) {
        console.log(pretext + " i " + i + ", j: " + j);
    }

    this.draw = function (x, y) {
        line(x, y, x + this.i, y + this.j);
    }

    this.abs = function () {
        return new Vector(abs(this.i), abs(this.j));
    }

    this.max = function (num) {
        return new Vector(max(num, this.i), max(num, this.j));
    }

    this.min = function (num) {
        return new Vector(min(num, this.i), min(num, this.j));
    }

    this.perp = function () {
        return new Vector(this.j, -this.i);
    }

    this.perp2 = function () {
        return new Vector(-this.j, this.i);
    }

}