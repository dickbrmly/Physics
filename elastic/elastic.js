var ctx = document.getElementById("myCanvas").getContext("2d");
//ball is fixed size. onlu color is selectable.
class item {
    constructor (x, y, color, mass, velocity) {
        this.mass = mass;
        this.velocity = {xSpeed: velocity.xSpeed, ySpeed: velocity.ySpeed};
        this.momentum = Math.sqrt(Math.pow(velocity.xSpeed,2) + Math.pow(velocity.ySpeed,2)) * mass;

        this.kenetic = 0.5 * mass * (Math.pow(velocity.xSpeed,2) + Math.pow(velocity.ySpeed,2));
        this.x = x;
        this.y = y;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        this.color = color;
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    move(x,y) {
            ctx.beginPath();
            this.x = x;
            this.y = y;
            ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
    }
}

function runsim() {
    var velocity = {xSpeed: document.getElementById('velosity1x').value, ySpeed: document.getElementById('velosity1y').value};
    ball1 = new item((1350 / 2 - parseInt(velocity.xSpeed) * 500),(625 / 2 - parseInt(velocity.ySpeed) * 500),'#ff0000', document.getElementById('mass1').value,velocity);
    document.getElementById('leftMomentum').innerHTML = "Inital momentum " + ball1.momentum;
    document.getElementById('leftKenetic').innerHTML = "Inital kenetic energy " + ball1.kenetic;

    velocity.xSpeed = document.getElementById('velosity2x').value;
    velocity.ySpeed = document.getElementById('velosity2y').value;
    ball2 = new item((1350 / 2 - parseInt(velocity.xSpeed) * 500),(625 / 2 - parseInt(velocity.ySpeed) * 500),'#0000ff', document.getElementById('mass2').value,velocity);
    document.getElementById('rightMomentum').innerHTML = "Inital momentum " + ball2.momentum;
    document.getElementById('rightKenetic').innerHTML = "Inital kenetic energy " + ball2.kenetic;
    move();
}

function move() {
    ctx.clearRect(0,0,1350,625);
    ball1.move(parseFloat(ball1.x) + parseFloat(ball1.velocity.xSpeed),parseFloat(ball1.y) + parseFloat(ball1.velocity.ySpeed));
    ball2.move(parseFloat(ball2.x) + parseFloat(ball2.velocity.xSpeed),parseFloat(ball2.y) + parseFloat(ball2.velocity.ySpeed));
    var distance = Math.sqrt(Math.pow(parseFloat(ball2.x) - parseFloat(ball1.x),2) + Math.pow(parseFloat(ball2.y) - parseFloat(ball1.y),2));
    if(distance <= 40) {
        calcImpact();
        document.getElementById('leftFinalVelocity').innerHTML = "<br><br><br><br>Final Velocity (" + ball1.velocity.xSpeed + ", "  + ball1.velocity.ySpeed + " )";
        document.getElementById('leftFinalMomentum').innerHTML = "Final momentum " + ball1.momentum;
        document.getElementById('leftFinalKenetic').innerHTML = "Final kenetic energy " + ball1.kenetic;

        document.getElementById('rightFinalVelocity').innerHTML = "<br><br><br><br>Final Velocity (" + ball2.velocity.xSpeed + ", "  + ball2.velocity.ySpeed + " )";
        document.getElementById('rightFinalMomentum').innerHTML = "Final momentum " + ball2.momentum;
        document.getElementById('rightFinalKenetic').innerHTML = "Final kenetic energy " + ball2.kenetic;
    }
    requestAnimationFrame(move);
}

function calcImpact() {
     var new1x = (parseFloat(ball1.mass) - parseFloat(ball2.mass)) / (parseFloat(ball1.mass) + parseFloat(ball2.mass)) * parseFloat(ball1.velocity.xSpeed) + (2.0 * parseFloat(ball2.mass) / 
     (parseFloat(ball1.mass) + parseFloat(ball2.mass))) * parseFloat(ball2.velocity.xSpeed);
     var new1y = (parseFloat(ball1.mass) - parseFloat(ball2.mass)) / (parseFloat(ball1.mass) + parseFloat(ball2.mass)) * parseFloat(ball1.velocity.ySpeed) + (2.0 * parseFloat(ball2.mass) / 
     (parseFloat(ball1.mass) + parseFloat(ball2.mass))) * parseFloat(ball2.velocity.ySpeed);

     ball2.velocity.xSpeed = (parseFloat(ball2.mass) - parseFloat(ball1.mass)) / (parseFloat(ball1.mass) + parseFloat(ball2.mass)) * parseFloat(ball2.velocity.xSpeed) + (2.0 * parseFloat(ball1.mass) / 
     (parseFloat(ball1.mass) + parseFloat(ball2.mass))) * parseFloat(ball1.velocity.xSpeed);
     ball2.velocity.ySpeed = (parseFloat(ball2.mass) - parseFloat(ball1.mass)) / (parseFloat(ball1.mass) + parseFloat(ball2.mass)) * parseFloat(ball2.velocity.ySpeed) + (2.0 * parseFloat(ball1.mass) / 
     (parseFloat(ball1.mass) + parseFloat(ball2.mass))) * parseFloat(ball1.velocity.ySpeed);
    ball1.velocity.xSpeed = new1x;
    ball1.velocity.ySpeed = new1y;   
    
    ball1.momentum = Math.sqrt(Math.pow(ball1.velocity.xSpeed, 2) + Math.pow(ball1.velocity.ySpeed, 2)) * parseFloat(ball1.mass);
    ball1.kenetic = 0.5 * parseFloat(ball1.mass) * (Math.pow(parseFloat(ball1.velocity.xSpeed),2) + Math.pow(parseFloat(ball1.velocity.ySpeed),2));

    ball2.momentum = Math.sqrt(Math.pow(ball2.velocity.xSpeed, 2) + Math.pow(ball2.velocity.ySpeed, 2)) * parseFloat(ball2.mass);
    ball2.kenetic = 0.5 * parseFloat(ball2.mass) * (Math.pow(parseFloat(ball2.velocity.xSpeed),2) + Math.pow(parseFloat(ball2.velocity.ySpeed),2));
}