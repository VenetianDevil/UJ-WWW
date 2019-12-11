function set_tank(ctx, w, h) {
    var tank = new Tank(w / 2, h - 100)
    if (ctx) {
        var tankIMG = document.getElementById('tank')
        console.log('load the tank');
        ctx.drawImage(tankIMG, tank.x, tank.y, 100, 100);
    }
    return tank;
}

function fire_in_the_hole(tank, context) {
    var bullet = new Bulet();
    var buletIMG = document.getElementById('bulet');
    if (!bullet.active) {
        bullet.start(tank.x + 40, tank.y - 30);
        buletIMG.onload = function () {
            context.drawImage(buletIMG, bullet.x, bullet.y, 20, 40);
        }
    }
    var score = document.getElementsByTagName('progress')[0];

    var interval_id = setInterval(function () {
        if (bullet.visible && bullet.y > 0 && tank.alive) {
            context.clearRect(bullet.x, bullet.y, 20, 40);
            bullet.moveUp();
            context.drawImage(buletIMG, bullet.x, bullet.y, 20, 40);
        }
        else {
            if (bullet.y > 0) {
                score.value--;
                console.log(score.value);
            }
            bullet.kill()
            context.clearRect(bullet.x, bullet.y, 20, 40);
            clearInterval(interval_id);
        }
    }, 100)
    return bullet;
}

function throw_alien(alienIMG, context) {
    var x = Math.random() * 1100;
    var alien = new Alien(x, 0);
    alienIMG.onload = function () {
        context.drawImage(alienIMG, alien.x, alien.y, 100, 100);
    };
    return alien;
}

function set_game() {
    document.getElementsByTagName('button')[0].disabled = true;
    var bg_color = 'aliceblue';
    var canvas = document.getElementById('can');
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    canvas.style = "background-color: " + bg_color;
    var context = canvas.getContext('2d');
    var tank = set_tank(context, canvas.width, canvas.height)
    var bullets = new Array();
    var aliens = new Array();
    var score = document.getElementsByTagName('progress')[0];
    score.value = 0;

    set_alien_bullet(aliens, tank, bullets, context);
    set_keys_handler(tank, bullets, context)

    var interv_id = setInterval(function () {
        if (!tank.alive) {
            alert(`game over! Score: ${score.value}`)
            console.log(interv_id)
            for (var i = interv_id; i >= 0; i--) {
                clearInterval(i)
            }
            document.getElementsByTagName('button')[0].disabled = false;
        }
    }, 5);
}

function set_alien_bullet(aliens, tank, bullets, context) {
    var alienIMG = document.getElementById('alien01');
    setInterval(function () {
        if (aliens.length < 3) {
            aliens.push(throw_alien(alienIMG, context));
        }
    }, 1000);

    var score = document.getElementsByTagName('progress')[0];
    console.log(score.value)

    setInterval(function () {
        for (var i = 0; i < aliens.length; i++) {
            al01 = aliens[i];
            if (al01.y + 50 < tank.y) {
                al01.y += 2;
                context.clearRect(al01.x, al01.y, 100, 100);
                context.drawImage(alien01, al01.x, al01.y, 100, 100);
            }
            else {
                tank.kill()
            }

            //hit
            for (var j = 0; j < bullets.length; j++) {
                bullet = bullets[j]
                if (bullet.x + 20 >= al01.x && bullet.x < al01.x + 150 && bullet.y <= al01.y + 108) {
                    bullet.kill();
                    bullets.splice(j, 1);
                    al01.kill();
                    context.clearRect(al01.x, al01.y, 100, 100);
                    aliens.splice(i, 1);
                    score.value += 2;
                }
            }
        }
    }, 20);
}

function set_keys_handler(tank, bullets, context) {
    var key, pos = 0;
    var tankIMG = document.getElementById('tank');
    document.onkeydown = function (e) {
        pos = 1;
        key = window.event ? e.keyCode : e.which;
    }
    document.onkeyup = function (e) { pos = 0; }
    setInterval(function () {
        if (key == 32 && tank.alive && (bullets.length == 0 || bullets[bullets.length-1].y < tank.y - 80)) {
            console.log('fire the bullet')
            bullets.push(fire_in_the_hole(tank, context))
            // console.log(bullets)
            key = 0;
        }
        else console.log(bullets[bullets.length-1].y)
    },0)

    setInterval(function () {
        if (tank.alive && key != 32) {
            // console.log('move the tank')
            if (pos == 0) return;
            if (key == 37) tank.x -= 2;
            if (key == 39) tank.x += 2;
            context.clearRect(tank.x, tank.y, 100, 100);
            context.drawImage(tankIMG, tank.x, tank.y, 100, 100);
        }
    }, 0);
}