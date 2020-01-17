var ctx = document.getElementById("myCanvas").getContext("2d");
var canvas = document.getElementById('myCanvas');
var moonSpot = canvas.width / 3;
var planetSpot = canvas.width / 2;
var halfUp = canvas.height / 2; 
const xspeedAdjust = 5650;
const yspeedAdjust = xspeedAdjust * 1 / 2;

var flag = false;



class item {
    constructor(x, y, color, mass, velocity) {
        this.mass = mass;
        this.velocity = { xSpeed: velocity.xSpeed / xspeedAdjust, ySpeed: velocity.ySpeed / yspeedAdjust};
        this.x = x;
        this.y = y;

        this.radius = Math.pow(mass / 1E21, 1 / 6);
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
        this.grd.addColorStop(1, "#FFFFFF");
         ctx.fillStyle = this.grd;
        ctx.fill();
    }
}

function gravitate() {
    if (flag === false) return;
    var distance = 7688000 * Math.sqrt(Math.pow(parseFloat(planet.x) - parseFloat(meteor.x), 2) + Math.pow(parseFloat(planet.y) - parseFloat(meteor.y), 2));
    var angle = Math.atan2(meteor.y - planet.y, planet.x - meteor.x);
    var force = 6.673E-11 * parseFloat(planet.mass) * parseFloat(meteor.mass) / Math.pow(parseFloat(distance), 2);

    planet.velocity.xSpeed = parseFloat(planet.velocity.xSpeed) + parseFloat(Math.cos(angle) * force / parseFloat(planet.mass) * -1.0);
    planet.velocity.ySpeed = parseFloat(planet.velocity.ySpeed) + parseFloat(Math.sin(angle) * force / parseFloat(planet.mass));
    meteor.velocity.xSpeed = parseFloat(meteor.velocity.xSpeed) + parseFloat(Math.cos(angle) * force / parseFloat(meteor.mass));
    meteor.velocity.ySpeed = parseFloat(meteor.velocity.ySpeed) + parseFloat(Math.sin(angle) * force / parseFloat(meteor.mass) * -1.0);

    var meteorAccel = force / parseFloat(meteor.mass);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    meteor.move(parseFloat(meteor.x) + parseFloat(meteor.velocity.xSpeed), parseFloat(meteor.y) + parseFloat(meteor.velocity.ySpeed));
    planet.move(parseFloat(planet.x) + parseFloat(planet.velocity.xSpeed), parseFloat(planet.y) + parseFloat(planet.velocity.ySpeed));

    document.getElementById('velosityMx').value = meteor.velocity.xSpeed * xspeedAdjust / 2;
    document.getElementById('velosityMy').value = meteor.velocity.ySpeed * -yspeedAdjust;
    document.getElementById('velosityPx').value = planet.velocity.xSpeed * xspeedAdjust / 2;
    document.getElementById('velosityPy').value = planet.velocity.ySpeed * -yspeedAdjust;

    if (distance <= [planet.radius + meteor.radius]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        planet.move(parseFloat(planet.x) + parseFloat(planet.velocity.xSpeed), parseFloat(planet.y) + parseFloat(planet.velocity.ySpeed));
        window.cancelAnimationFrame(requestId);
    }
    else requestAnimationFrame(gravitate);
}

var meteor = new item(moonSpot, halfUp, '#662200', document.getElementById('massMeteor').value, { xSpeed: document.getElementById('velosityMx').value, ySpeed: document.getElementById('velosityMy').value * -1.0 });
var planet = new item(planetSpot, halfUp, '#0000FF', document.getElementById('massPlanet').value, { xSpeed: document.getElementById('velosityPx').value, ySpeed: document.getElementById('velosityPy').value * -1.0 });
gravitate();

function startStop() {
    if (flag === false) flag = true;
    else flag = false;

    meteor.velocity.xSpeed = document.getElementById('velosityMx').value * 2 / xspeedAdjust;
    meteor.velocity.ySpeed = document.getElementById('velosityMy').value / -yspeedAdjust;
    planet.velocity.xSpeed = document.getElementById('velosityPx').value  * 2 / xspeedAdjust;
    planet.velocity.ySpeed = document.getElementById('velosityPy').value / -yspeedAdjust;

    meteor.mass = document.getElementById('massMeteor').value;
    meteor.radius = Math.pow(parseFloat(meteor.mass) / 1E21, 1 / 6);
    planet.mass = document.getElementById('massPlanet').value;
    planet.radius = Math.pow(parseFloat(planet.mass) / 1E21, 1 / 6);

    gravitate();
}