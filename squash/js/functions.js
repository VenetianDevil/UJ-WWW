function set_game() {
    document.getElementsByTagName('button')[0].disabled = true;
    var bg_color = 'aliceblue';
    var canvas = document.getElementById('can');
    canvas.width = canvas.width;
    canvas.style = "background-color: " + bg_color;
    var context = canvas.getContext('2d');

    var bat = set_bat(context)
    var ball = set_ball(context)
    var score = document.getElementsByTagName('progress')[0];
    score.value = 0;

    set_keys_handler(bat, context);
    set_ball_handler(ball, bat, context);

    var interv_id = setInterval(function () {
        if (!bat.alive) {
            alert(`game over! Score: ${score.value}`)
            for (var i = interv_id; i >= 0; i--) {
                clearInterval(i)
            }
            document.getElementsByTagName('button')[0].disabled = false;
        }
    }, 5);
}

function set_bat(ctx) {
    var bat = new Bat(0, 240)
    if (ctx) {
        ctx.fillRect(bat.x, bat.y, 10, 60);
    }
    return bat;
}

function set_ball(ctx) {
    var ball = new Ball(500, 250)
    console.log(ball.x, ball.y)

    if (ctx) {
        ctx.beginPath();
        console.log(ball.x, ball.y)
        ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ball.bounce(ctx, 250);
    }
    return ball;
}

function set_keys_handler(bat, context) {
    var key, pos = 0;
    document.onkeydown = function (e) {
        pos = 1;
        key = window.event ? e.keyCode : e.which;
    }
    document.onkeyup = function (e) { pos = 0; }
    setInterval(function () {
        if (bat.y >= -10 && bat.y <= 500) {
            // console.log('move the bat')
            if (pos == 0) return;
            else {
                context.clearRect(0, 0, 10, 500);
                if (key == 38) bat.y -= 2;
                if (key == 40) bat.y += 2;
                context.fillRect(bat.x, bat.y, 10, 60);
            }
        }
    }, 0);
}

function set_ball_handler(ball, bat, context) {
    var score = document.getElementsByTagName('progress')[0];
    setInterval(function () {
        if (ball.bouncing == false) {
            console.log('rebaunce')
            if (ball.x >= 990) {
                var destiny_y = Math.floor((Math.random()* 490) + 10);
                ball.bounce(context, destiny_y);
            }
            else if (ball.x <= 20 && ball.y >= bat.y && ball.y <= bat.y + 60) {
                context.fillRect(bat.x, bat.y, 10, 60);
                score.value += 2;
                var destiny_y = Math.floor((Math.random() * 490) + 10);
                ball.bounce(context, destiny_y);
            }
            else if (ball.x < 20){
                bat.kill();
            }
        }
    }, 25);
}