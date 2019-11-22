function set_tank(ctx) {
    var tank = new Tank(600, 600)
    if (ctx) {
        var tankIMG = document.getElementById('tank')
        tankIMG.onload = function () {
            console.log('load the tank');
            context.drawImage(tankIMG, tank.x, tank.y, 100, 100);
        };
    }
    return tank;
}

function fire_in_the_hole(tank) {
    var bullet = new Bulet();
    if (!bullet.active) {
        bullet.start(tank.x + 40, tank.y - 30);
        buletIMG.onload = function () {
            context.drawImage(buletIMG, bullet.x, bullet.y, 20, 40);
        }
    }
    setInterval(function () {
        if (bullet.visible && bullet.y > 0 && tank.alive) {
            context.fillStyle = bg_color;
            context.fillRect(bullet.x, bullet.y, 20, 40);
            bullet.moveUp();
            context.drawImage(buletIMG, bullet.x, bullet.y, 20, 40);
        }
        else {
            bullet.kill()
            context.fillStyle = bg_color;
            context.fillRect(bullet.x, bullet.y, 20, 40);
        }
    }, 100)
    return bullet;
}

function throw_alien(alienIMG) {
    var x = Math.random() * 1100;
    var alien = new Alien(x, 0);
    alienIMG.onload = function () {
        context.drawImage(alienIMG, alien.x, alien.y, 100, 100);
    };
    return alien;
}

function set_game(context, tank, bullets, aliens, key, pos) {
    var context = canvas.getContext('2d');
    var tank = set_tank(context)
    var bullets = new Array();
    var aliens = new Array();
    var key, pos = 0
}

