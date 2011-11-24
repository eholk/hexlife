var ctx = null;
var grid = null;

function makeGrid(width, height, init) {
    var g = new Array(height);
    for(var i = 0; i < g.length; i++) {
        g[i] = new Array(width);
        for(var j = 0; j < g[i].length; j++) {
            g[i][j] = init;
        }
    }
    return g;
}

function drawHex(cx, cy, r) {
    function hexPath() {
        ctx.beginPath();
        ctx.moveTo(r, 0);
        for(var i = 1; i <= 6; i++) {
            ctx.lineTo(r * Math.cos(step * i), r * Math.sin(step * i));
        }
    }

    var step = Math.PI / 3;

    ctx.save();
    ctx.translate(cx, cy);

    ctx.rotate(Math.PI / 2);

    hexPath();
    ctx.fill();

    // stroke
    hexPath();
    ctx.stroke();

    ctx.restore();
}

function drawGrid(grid, r) {
    function drawRow(row) {
        for(var i = 0; i < row.length; i++) {
            drawHex(2 * i * r, 0, r);
        }
    }
    for(var i = 0; i < grid.length; i++) {
        ctx.save();
        if(i % 2 == 1)
            ctx.translate(0, 5 / 3 * i * r);
        else 
            ctx.translate(1 * r, 5 / 3 * i * r);
        drawRow(grid[i]);
        ctx.restore();
    }
}

function init() {
    var canvas = document.getElementById("grid");
    ctx = canvas.getContext("2d");

    grid = makeGrid(30, 28, false);
}

function start() {
    init();

    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.0;

    var r = 16;

    ctx.translate(r + 2, r + 2);

    drawGrid(grid, r);
}