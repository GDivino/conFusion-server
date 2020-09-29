var rect = require("./rectangle");

function solveRect(l, b) {
    console.log("Solving for rectangle with length = " + l + " and breadth = " + b);
    console.log("");

    rect(l, b, (err, rectangle) => {
        if (err) {
            console.log("ERROR: " + err.message)
        }
        else {
            console.log("Area of a rectangle: " + rectangle.area(l, b));
            console.log("Perimter of rectangle: " + rectangle.perimeter(l, b));
        }
    });
    console.log("this statement is after the call to rect()")
};

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);