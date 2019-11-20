var setSize = 2;
var stepSize = 400;
var popSize = 330;
var globGenSize = Infinity;
var bigSet;
var target;
var start;
var pointR = 10;
var vectorLength = 1;
let rectObstacles = [];

function setup() {
    rectMode(CENTER);
    target = new Vector(400, 400);
    start = new Vector(300, 300);
    //add new rectangle obstacles here!
    // paramaters for obstacle objects are (in order) : vector for position, vector for width/height, a starting orientation in radians, and a spinSpeed
    //you'll need to add it to the rectangle array just like is done below
    let h = sqrt(pow(50, 2) + pow(20, 2)) / 2;
    rectObstacles.push(new obstacle((target.sub(start)).divScalar(2).add(start).add(new Vector(h, -h)), new Vector(50, 20), 0, 0.05));
    rectObstacles.push(new obstacle((target.sub(start)).divScalar(2).add(start).add(new Vector(-h, h)), new Vector(50, 20), PI, -0.05));
    rectObstacles.push(new obstacle(new Vector(380, 380), new Vector(20, 4), PI / 2, 0.025));
    createCanvas(700, 500);

    bigSet = new populationSet();
    //first param is mutation rate
    bigSet.addPop(0.015, color(0, 255, 0, 170));
    bigSet.addPop(0.025, color(255, 255, 0, 170));
    bigSet.addPop(0.035, color(0, 255, 255, 170));


    fill(255, 255, 255);
}

function draw() {
    background(0);
    bigSet.play();
    displayObstacles();
    //text("gen " + pop1.gen, 100, 100);
    stroke(255, 0, 0, 0.5);
    ellipse(start.i, start.j, pointR, pointR);
    ellipse(target.i, target.j, pointR, pointR);

}

function collidedWithObstacle(player) {
    for (let i = 0; i < rectObstacles.length; i++) {
        if (rectObstacles[i].isPointInside(player.pos)) {
            return true;
        }
    }
    return false;
}

function displayObstacles() {
    for (let i = 0; i < rectObstacles.length; i++) {
        rectObstacles[i].draw();
    }
}


function isNumInBetween(n, value1, value2) {
    let maxi = max(value1, value2);
    let mini = min(value1, value2);
    if (n <= maxi && n >= mini) {
        return true;
    }

    return false;
}

function resetObstacles() {
    for (let i = 0; i < rectObstacles.length; i++) {
        rectObstacles[i].reset();
    }
}

function hasReachedDestination(pos) {
    if (pos.getDist(target) < pointR) {
        return true;
    }
    return false;
}
