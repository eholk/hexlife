var ctx = null;

function drawHex(cx, cy, r) {
    var step = Math.PI / 3;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(r, r);
    ctx.beginPath();
    ctx.moveTo(1, 0);
    for(var i = 1; i <= 6; i++) {
        ctx.lineTo(Math.cos(step * i), Math.sin(step * i));
    }
    ctx.fill();
    ctx.restore();
}

function init() {
    var canvas = document.getElementById("grid");
    ctx = canvas.getContext("2d");
}

function start() {
    init();

    drawHex(320, 240, 60);
}