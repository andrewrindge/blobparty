// this is where the actual snake game functionality will live
// home -> snake -> restart
// import 'phaser';

let snake, food, dimension, score, speed,
    updateDelay, direction, newDirection,
    eaten,
    keys, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;

let Snake = {
    preload: function () {
        // loading images for snake & food (squares)
        // game.load.image('snake', './assets/images/snake.png');
        // game.load.image('food', './assets/images/food.png');
    },

    create: function () {
        snake = [];     // stack containing parts of the snake
        food = {};      // food object to be eaten
        dimension = 15;   // size in px of a length of a unit on grid
        score = 0;      // score of the game so far
        speed = 0;      // speed snake is traveling at
        updateDelay = 0;
        direction = 'right';    // direction for the snake
        newDirection = null;    // next direction for the snake to go
        eaten = false;        // variable to track if food has been eaten yet

        // Set up a Phaser controller for keyboard input.
        keys = this.input.keyboard.createCursorKeys();

        game.state.backgroundColor = '#061f27';

        // creating snake stack
        // x increases on every iteration
        for(let i = 0; i < 10; i++) {
            // x, y, image name
            snake[i] = game.add.sprite(150+i*dimension, 150, 'snake');
        }

        this.generateFood();

        // Add Text to top of game.
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // add score stat to screen
        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
    },

    // createCursorKeys: function () {
    //     // maybe this isn't a function we need?
    // },

    update: function () {
        // handling key presses
        // illegal press if it is the opposite of the current direction
        if (keys.right.isDown && direction != 'left') {
            newDirection = 'right';
        } else if (keys.left.isDown && direction != 'right') {
            newDirection = 'left';
        } else if (keys.up.isDown && direction != 'down') {
            newDirection = 'up';
        } else if (keys.down.isDown && direction != 'up') {
            newDirection = 'down';
        }

        // updating game speed based on the score
        speed = Math.min(10, Math.floor(score/5));
        // update user of speed we are at?

        // inc with every call
        updateDelay ++;

        if (updateDelay % (10 - speed) == 0) {
            // assigning variables to the head and tail values
            let head = snake[snake.length - 1],
                tail = snake.shift(),
                oldTailX = tail.x,
                oldTailY = tail.y;

            // if cursor chose a new direction, reassign direction
            if (newDirection) {
                direction = newDirection;
                newDirection = null;
                // put a variable here to mark the place where it turned
                // and adjust sprites accordingly
                // could cause problems if there are two turns and we need to keep track of both
            }

            // change the direction of the tail

            if (direction == 'right') {
                tail.x = head.x + 15;
                tail.y = head.y;
            } else if (direction == 'left') {
                tail.x = head.x - 15;
                tail.y = head.y;
            } else if (direction == 'up') {
                tail.x = head.x;
                tail.y = head.y +  15;  // -15 ?
            } else if (direction == 'down') {
                tail.x = head.x;
                tail.y = head.y - 15;   // + 15?
            }

            snake.push(tail);
            head = tail;
        }

        // stretch snake if it has eaten food
        if (eaten) {
            snake.unshift(game.add.sprite(tailX, tailY, 'snake'));
            eaten = false;
        }

        // check if snake has eaten food
        this.eatFood();

        // check if snake has collided with self
        this.selfCollide(head);

        // check if snake has collided with wall
        this.wallCollide(head);
    },

    generateFood: function () {
        // defining randomized variables for the coordinates of the food's location
        // x can be between 0 and 585, y between 0 and 435
        let randX = Math.floor(Math.Random() * 40) * dimension,
            randY = Math.floor(Math.Random() * 30) * dimension;

        food = game.add.sprite(randX, randY, 'food');
    },

    eatFood: function () {
        // for each portion of the snake (necessary in case food appears inside snake)
        for (let i = 0; i < snake.length(); i++) {
            // check if part of snake overlaps with the food
            if (snake[i].x === food.x && snake[i].y === food.y) {
                // marking that the next time the snake moves it should grow
                eaten = true;

                // remove old food and create a new one
                food.destroy();
                this.generateFood();

                // increase score & update score display
                score++;
                scoreTextValue.text = score.toString();
            }
        }
    },

    selfCollide : function (head) {
        // for each portion of the snake
        for (let i = 0; i < snake.length(); i++) {
            // check if the snake's head overlaps with the portion of it's body
            if (snake[i].x === head.x && snake[i].y === head.y) {
                game.state.start('gameOver');
            }
        }
    },

    wallCollide: function (head) {
        // for each portion of the snake
        for (let i = 0; i < snake.length(); i++) {
            // check if the snake's head has hit the wall anywhere
            if (head.x >= 600 || head.x <= 0 || head.y >= 450 || head.y < 0) {
                game.state.start('gameOver');
            }
        }
    }

}