var active = true;
var p = 0.25;
var sleep = 1000;

var ctx = null;
var grid = null;
var newgrid = null;

var clear = null;

function onpause() {
    var b = document.getElementById("btn_pause");
    if(active) {
        active = false;
        b.value = "Start";
    }
    else {
        active = true;
        b.value = "Pause";
        loop();
    }
}

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
            if(row[i])
                ctx.fillStyle = "gray";
            else
                ctx.fillStyle = "white";
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

function gridIndex(row, col) {
    if(row >= 0 && col < grid[0].length &&
       col >= 0 && row < grid.length)
        return grid[row][col];
    else
        return null;
}

function neighborIndices(r, c) {
    var n = [];

    function appendIndex(rshift, cshift) {
        var row = r + rshift;
        var col = c + cshift;
        if(row >= 0 && col < grid[0].length &&
           col >= 0 && row < grid.length)
            n = n.concat([[row, col]]);
    }

    appendIndex(-1, 0);
    appendIndex(1, 0);
    appendIndex(0, -1);
    appendIndex(0, 1);
    if(r % 2 == 0) {
        appendIndex(1,  1);
        appendIndex(-1, 1);
    }
    else {
        appendIndex(1,  -1);
        appendIndex(-1, -1);
    }
    return n;
}

function neighbors(row, col) {
    var ni = neighborIndices(row, col);
    var n = [];
    for(i in ni) {
        n = n.concat([grid[ni[i][0]][ni[i][1]]]);
    }
    return n;
}

function stepLife() {
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            var n = neighbors(i, j);
            var count = 0;
            for(x in n) {
                if(n[x]) {
                    count += 1;
                }
            }

            newgrid[i][j] = count >= 3;
        }
    }

    var tmp = grid;
    grid = newgrid;
    newgrid = tmp;
}

function redraw() {
    clear();
    var r = 16;
    ctx.save();
    ctx.translate(r + 2, r + 2);
    drawGrid(grid, r);
    ctx.restore();
}

function loop() {
    if(active) {
        stepLife();
        redraw();
        window.setTimeout(loop, sleep);
    }
}

function init() {
    var canvas = document.getElementById("grid");
    ctx = canvas.getContext("2d");

    clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    grid = makeGrid(30, 28, false);
    newgrid = makeGrid(30, 28, false);
}

function initGrid() {
    for(var i = 0; i < grid.length; i++)
        for(var j = 0; j < grid[i].length; j++)
            grid[i][j] = (Math.random() < p);
}

function start() {
    init();

    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.0;

    initGrid();

    redraw();
    window.setTimeout(loop, sleep);
}
