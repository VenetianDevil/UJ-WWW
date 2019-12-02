class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visible = true;
        this.bouncing = false;
    }
    bounce(ctx, destiny_y) {
        console.log('bouncing')
        console.log(destiny_y)
        this.bouncing = true;

        var from_x = this.x;
        var from_y = this.y;
        var to_y = destiny_y;
        if (this.x <= 20 || (this.x == 500 && this.y == 250)) {
            var to_x = 990;
        }
        else {
            var to_x = 20;
        }

        // console.log(Math.sqrt((to_x - from_x)*(to_x - from_x) + (to_y - from_y)*(to_y - from_y)))
        var distance = Math.sqrt((to_x - from_x) * (to_x - from_x) + (to_y - from_y) * (to_y - from_y));
        var moves = Math.floor(distance / 5); // 5 is speed
        var xunits = (to_x - from_x) / moves;
        var yunits = (to_y - from_y) / moves;
        console.log(distance)
        console.log(moves)
        console.log(xunits)
        console.log(yunits)

        var interv_id = setInterval(function (ball) {
            // console.log(ball);
            if (ball.bouncing) {
                ctx.clearRect(ball.x-11, ball.y-11, 22, 22);
                ball.x = ball.x + xunits;
                ball.y = ball.y + yunits;
                ctx.beginPath();
                console.log(ball.x, ball.y)
                ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
                ctx.fill();
            }

            if (ball.x > 990 || ball.x < 20 || ball.y < 10 || ball.y > 490) {
                console.log(ball);
                ball.bouncing = false;
                clearInterval(interv_id);
            }
        }.bind(null, this), 20)
    }
    start(x, y) {
        this.visible = true;
        this.x = x;
        this.y = y;
    }
    kill() {
        this.visible = false;
    }
}

class Bat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }
    kill() {
        this.alive = false;
    }
}

