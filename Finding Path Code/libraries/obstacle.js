//pos is a vector of x,y, scaleXY is a vector of width, length, rotation is degree 0<x<2PI
function obstacle(pos, scaleXY, rotation, spinSpeed) {
    this.spinSpeed = spinSpeed;
    this.startRotation = rotation;
    this.in = false;
    this.midPoint = pos;
    this.scaleXY = scaleXY;
    let boundSquareL = sqrt(pow(this.scaleXY.i, 2) + pow(this.scaleXY.j, 2));
    this.boundingBoxXYdiv2 = new Vector(boundSquareL / 2, boundSquareL / 2);
    this.BBXValues = new Vector(this.midPoint.i - this.boundingBoxXYdiv2.i, this.midPoint.i + this.boundingBoxXYdiv2.i);
    this.BBYValues = new Vector(this.midPoint.j - this.boundingBoxXYdiv2.j, this.midPoint.j + this.boundingBoxXYdiv2.j);
    this.rotation = rotation;
    let angleToP5 = 2 * PI - rotation;
    this.newBasisWidth = new Vector(cos(angleToP5 + PI / 2), sin(angleToP5 + PI / 2)).setMag(this.scaleXY.i / 2).multScalar(-1);
    this.newBasisHeight = new Vector(cos(angleToP5), sin(angleToP5)).setMag(this.scaleXY.j / 2);
    this.topLeft = this.midPoint + this.newBasisHeight - this.newBasisWidth;
    this.bottomRight = this.midPoint - this.newBasisHeight + this.newBasisWidth;

    this.draw = function () {
        push();
        translate(this.midPoint.i, this.midPoint.j);
        rotate(this.rotation += this.spinSpeed);
        stroke(255);
        rect(0, 0, this.scaleXY.i, this.scaleXY.j);
        pop();
        stroke(255, 0, 0);
        let angleToP5 = this.rotation;
        this.newBasisWidth = new Vector(cos(angleToP5 + PI / 2), sin(angleToP5 + PI / 2)).setMag(this.scaleXY.i / 2).multScalar(-1);
        this.newBasisHeight = new Vector(cos(angleToP5), sin(angleToP5)).setMag(this.scaleXY.j / 2);
        this.bottomRight = this.midPoint.add(this.newBasisHeight.setMag(this.scaleXY.i / 2).sub(this.newBasisWidth.setMag(this.scaleXY.j / 2)));
        this.topLeft = this.midPoint.add(this.newBasisHeight.multScalar(-1).setMag(this.scaleXY.i / 2).add(this.newBasisWidth.setMag(this.scaleXY.j / 2)));
        //rect1.newBasisHeight.setMag(this.scaleXY.i/2).draw(200,200);
        //rect1.newBasisWidth.setMag(this.scaleXY.j/2).draw(200,200);
    }

    this.isPointInside = function (point) {
        //if point isn't in bounding box, then we know it can't collide no matter the rect's orientation
        if (!this.pointInBoundingBox(point))
            return false;
        //create new 2x2 matrix to hold new basis vectors
        //get BR coord in terms of new basis vectors
        let newBasis = new x22Matrix(this.newBasisHeight.i, this.newBasisHeight.j, this.newBasisWidth.i, this.newBasisWidth.j);
        let BRinNewBasis = newBasis.convertPointToNewBasis(this.bottomRight);
        //get TL coord in terms of new basis vectors
        let TLinNewBasis = newBasis.convertPointToNewBasis(this.topLeft);
        //get point in terms of new basis vectors
        let pointinNewBasis = newBasis.convertPointToNewBasis(point);
        if (isNumInBetween(pointinNewBasis.i, BRinNewBasis.i, TLinNewBasis.i) &&
            isNumInBetween(pointinNewBasis.j, BRinNewBasis.j, TLinNewBasis.j)) {
            return true;
        }
        return false;
    }

    this.reset = function () {
        this.rotation = this.startRotation;
    }

    this.pointInBoundingBox = function (point) {
        if ((point.i < this.BBXValues.i) || (point.i > this.BBXValues.j) || (point.j < this.BBYValues.i) || (point.j > this.BBYValues.j)) {
            return false;
        }
        return true;
    }
}

function drawPointInGridSpaces(xCoord, yCoord, basisMatrix) {
    pointOnAxisX = xCoord - 200;
    pointOnAxisY = yCoord - 200;
    let newCoord = basisMatrix.convertPointToNewBasis(new Vector(pointOnAxisX, pointOnAxisY));
    let newXAxis = new Vector(basisMatrix.first, basisMatrix.second);
    let newYAxis = new Vector(basisMatrix.third, basisMatrix.fourth);
    let xVector = newXAxis.multScalar(newCoord.i);
    xVector.draw(200, 200);
    let yVector = newYAxis.multScalar(newCoord.j);
    yVector.draw(200 + xVector.i, 200 + xVector.j);


}