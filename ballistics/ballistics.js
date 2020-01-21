
var ctx = document.getElementById("myCanvas").getContext("2d");
var canvas = document.getElementById('myCanvas');

class item {
    constructor(x, y, color, mass, velocity) {
        this.mass = mass;
        this.velocity = { xSpeed: velocity.xSpeed, ySpeed: velocity.ySpeed };
        this.x = x;
        this.y = y;

        this.radius = Math.pow(mass , 1 / 2);
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        this.grd = ctx.createLinearGradient(x - this.radius, y + this.radius, this.radius + x, this.radius + y);
        this.grd.addColorStop(0, color);
        this.grd.addColorStop(1, "#FFFFFF");
        this.color = color;
        ctx.fillStyle = this.grd;
        ctx.fill();
    }

    move(x, y) {
        ctx.beginPath();
        this.x = x;
        this.y = y;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.grd = ctx.createLinearGradient(x - this.radius, y + this.radius, this.radius + x, this.radius + y);
        this.grd.addColorStop(0, this.color);
        this.grd.addColorStop(1, "#555555");
        ctx.fillStyle = this.grd;
        ctx.fill();
    }
}

var cannonBall;
var xspeed;
var yspeed;
var gravity;
var x;
var y;

function runsim() {

    x = 67;
    y = 572;
    gravity = 0;
    xspeed = Math.cos(document.getElementById('lift').value * Math.PI / 180) * document.getElementById('force').value / document.getElementById('mass').value / 20;
    yspeed = -Math.sin(document.getElementById('lift').value * Math.PI / 180) * document.getElementById('force').value / document.getElementById('mass').value / 20;
    var tt = Math.sin(document.getElementById('lift').value * Math.PI / 180) * document.getElementById('force').value / document.getElementById('mass').value / 9.8;
    var h = Math.sin(document.getElementById('lift').value * Math.PI / 180) * document.getElementById('force').value / document.getElementById('mass').value * tt - 4.9 * Math.pow(tt, 2);
    var d = Math.cos(document.getElementById('lift').value * Math.PI / 180) * document.getElementById('force').value / document.getElementById('mass').value * tt;
    document.getElementById('travel').innerHTML = '&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;travel time = ' + tt;
    document.getElementById('height').innerHTML = '&nbsp; &nbsp; &nbsp; Maximum height = ' + h;
    document.getElementById('distance').innerHTML = '&nbsp; Maximum distance = ' + d;
    document.getElementById('xmax').innerHTML = '&nbsp;Maximum X speed =  ' + xspeed * 20;
    document.getElementById('ymax').innerHTML = '&nbsp;Maximum Y speed =  ' + yspeed * -20;
    document.getElementById('initalVelocity').innerHTML = '<br><br><br><br>&nbsp;Inital velocity = ' + document.getElementById('force').value / document.getElementById('mass').value;
    cannonBall = new item(x, y, '#000000', document.getElementById('mass').value, { xSpeed: xspeed, ySpeed:yspeed});
    cannonBall.move(x, y);
    progress();
}

function progress() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += xspeed;
    y += yspeed + gravity;
    gravity += .0069;
    cannonBall.move(x, y);
    requestAnimationFrame(progress);
}

