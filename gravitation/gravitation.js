var ctx = document.getElementById("myCanvas").getContext("2d");
var flag = false;

class item {
    constructor(x, y, color, mass, velocity) {
        this.mass = mass;
        this.velocity = { xSpeed: velocity.xSpeed / 648, ySpeed: velocity.ySpeed / 648};
        this.x = x;
        this.y = y;

        this.radius = Math.pow(mass / 1E21, 1 / 3);
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
    if (flag === false) {
        ctx.font = "18px Times Newroman";

        ctx.fillText("The gravitational constant is set to 1 and the distances adjusted to have a day's travel occur every half", 1100, 50);
        ctx.fillText("second.", 1100, 70);
        ctx.fillText("Both bodies are under gravitational force toward one another.  The planet has the mass equal to earth", 1100, 100);
        ctx.fillText("and the moon is equal to our moon. The velocity in meters per second is close to our moon's velocity", 1100, 120);
        ctx.fillText("and  mass is adjustable.   Reloading the page will reset values. The  Run / Stop  button will reset the", 1100, 140);
        ctx.fillText("objects to the start  positions.  Another interesting condition is setting the moon to the  earth's  mass ", 1100, 160);
        ctx.fillText("and giving a velocity of  (0,650) and the planet a velocity of (0,-650)", 1100, 180);
        var img = new Image();
        img.src = 'equations.jpg';
        img.onload = function () {
            ctx.drawImage(img, 1200, 200);
        };
        return;
    }
    var distance = 100000000000 * Math.sqrt(Math.pow(parseFloat(planet.x) - parseFloat(meteor.x), 2) + Math.pow(parseFloat(planet.y) - parseFloat(meteor.y), 2));
    var angle = Math.atan2(meteor.y - planet.y, planet.x - meteor.x);
    var force = parseFloat(planet.mass) * parseFloat(meteor.mass) / Math.pow(parseFloat(distance), 2);
    planet.velocity.xSpeed = parseFloat(planet.velocity.xSpeed) + parseFloat(Math.cos( angle) * force / parseFloat(planet.mass) * -1.0);
    planet.velocity.ySpeed = parseFloat(planet.velocity.ySpeed) + parseFloat(Math.sin(angle) * force / parseFloat(planet.mass));
    meteor.velocity.xSpeed = parseFloat(meteor.velocity.xSpeed) + parseFloat(Math.cos(angle) * force / parseFloat(meteor.mass));
    meteor.velocity.ySpeed = parseFloat(meteor.velocity.ySpeed) + parseFloat(Math.sin(angle) * force / parseFloat(meteor.mass) * -1.0);

    var meteorAccel = force / parseFloat(meteor.mass);

    ctx.clearRect(0, 0, 1915, 935);
    meteor.move(parseFloat(meteor.x) + parseFloat(meteor.velocity.xSpeed), parseFloat(meteor.y) + parseFloat(meteor.velocity.ySpeed));
    planet.move(parseFloat(planet.x) + parseFloat(planet.velocity.xSpeed), parseFloat(planet.y) + parseFloat(planet.velocity.ySpeed));

    document.getElementById('velosityMx').value = meteor.velocity.xSpeed * 648;
    document.getElementById('velosityMy').value = meteor.velocity.ySpeed * -648;
    document.getElementById('velosityPx').value = planet.velocity.xSpeed * 648;
    document.getElementById('velosityPy').value = planet.velocity.ySpeed * -648;

    if (distance <= [planet.radius + meteor.radius]) {
        ctx.clearRect(0, 0, 1915, 935);
        planet.move(parseFloat(planet.x) + parseFloat(planet.velocity.xSpeed), parseFloat(planet.y) + parseFloat(planet.velocity.ySpeed));
        window.cancelAnimationFrame(requestId);
    }
    else requestAnimationFrame(gravitate);
}

var meteor = new item(1300, 350, '#662200', document.getElementById('massMeteor').value, { xSpeed: document.getElementById('velosityMx').value, ySpeed: document.getElementById('velosityMy').value * -1.0 });
var planet = new item(1060, 350, '#0000FF', document.getElementById('massPlanet').value, { xSpeed: document.getElementById('velosityPx').value, ySpeed: document.getElementById('velosityPy').value * -1.0 });
gravitate();

function startStop() {
    if (flag === false) flag = true;
    else flag = false;

    meteor.velocity.xSpeed = document.getElementById('velosityMx').value / 648;
    meteor.velocity.ySpeed = document.getElementById('velosityMy').value / -648;
    planet.velocity.xSpeed = document.getElementById('velosityPx').value / 648;
    planet.velocity.ySpeed = document.getElementById('velosityPy').value / -648;

    meteor.mass = document.getElementById('massMeteor').value;
    meteor.radius = Math.pow(parseFloat(meteor.mass) / 1E21, 1 / 3);
    planet.mass = document.getElementById('massPlanet').value;
    planet.radius = Math.pow(parseFloat(planet.mass) / 1E21, 1 / 3);

    meteor.x = 1300;
    meteor.y = 350;
    planet.x = 1060;
    planet.y = 350;
    gravitate();
}