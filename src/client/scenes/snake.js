// this is where the actual snake game functionality will live
// home -> snake -> restart

class Snake extends Phaser.Scene {
    snake;
    food;
    score;
    speed;
    updateDelay;
    direction;
    eaten;
    keys;
    textStyleLabel;
    textStyleData;
    scoreTextValue;


    constructor() {
        super("Snake");
        this.snake = [];    // stack representing parts of snake
        this.food = {};     // object representing food item
        this.score = 0; // score of the game so far
        this.speed = 0; // speed snake is traveling at
        this.updateDelay = 0;   // const to hold amount of delay
        this.direction = 'right';    // direction for the snake
        this.eaten = false;  // variable to track if food has been eaten yet

        this.keys = this.input.keyboard.createCursorKeys(); // Set up a Phaser controller for keyboard input.

        // Add Text to top of game.
        this.textStyleLabel = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        this.textStyleData = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
        this.scoreTextValue = this.score.toString();
    }

    init(data) {
        this.roomKey = data.roomKey;
        this.players = data.players;
        this.numPlayers = data.numPlayers;
        this.socket = data.socket;
    }

    preload () {
        // loading images for snake & food
        // need about a million more snake images
        // game.load.image('snake', './assets/images/snake.png');
        // game.load.image('snakeHead', './assets/images/snakeHeadPointingRight.png');
        // game.load.image('food', './assets/images/food.png');
    }

    create () {
        const scene = this;

        // placing starting head, body, and tail of snake
        this.snake[0] = Game.add.sprite(357.5, 412.5, 'snakeHeadPointingRight');
        this.snake[1] = Game.add.sprite(302.5, 412.5, 'horizSnakeBody');
        this.snake[2] = Game.add.sprite(247.5, 412.5, 'tailPointingLeft');

        this.generateFood();

        // add score stat to screen
        Game.add.text(30, 20, "SCORE", this.textStyleLabel);
        Game.add.text(90, 18, this.scoreTextValue, this.textStyleData);
    }

    update () {
         let newDirection;
        // handling key presses
        // illegal press if it is the opposite of the current direction
        if (this.keys.right.isDown && this.direction != 'left') {
            newDirection = 'right';
        } else if (this.keys.left.isDown && this.direction != 'right') {
            newDirection = 'left';
        } else if (this.keys.up.isDown && this.direction != 'down') {
            newDirection = 'up';
        } else if (this.keys.down.isDown && this.direction != 'up') {
            newDirection = 'down';
        }

        // updating game speed based on the score
        this.speed = Math.min(10, Math.floor(this.score/5));
        // update user of speed we are at?

        // inc with every call
        this.updateDelay ++;

        // assigning variables to the head and tail values
        let tail = this.snake.shift();
        let head = this.snake[this.snake.length - 1];

        if (this.updateDelay % (10 - this.speed) == 0) {

            // if cursor chose a new direction, reassign direction
            if (newDirection) {
                this.direction = newDirection;
                newDirection = null;
                // put a variable here to mark the place where it turned
                // and adjust sprites accordingly
                // could cause problems if there are two turns and we need to keep track of both
            }

            // only works with snake segments represented by blocks:
            // instead need to implement (for direction up):
                // let prevY = snake[0].y
                // for (i=0; i < snake.length(); i++) {
                //      let tempY = snake[i].y;
                //      snake[i].y = prevY;
                //      prevY = tempY;
                // }
            // and similar process for other directions
            // change the direction of the tail
            if (this.direction == 'right') {
                tail.x = head.x + 55;
                tail.y = head.y;
            } else if (this.direction == 'left') {
                tail.x = head.x - 55;
                tail.y = head.y;
            } else if (this.direction == 'up') {
                tail.x = head.x;
                tail.y = head.y +  55;
            } else if (this.direction == 'down') {
                tail.x = head.x;
                tail.y = head.y - 55;
            }
            this.snake.push(tail);

            // then need to track coords of turns and keep bend snake graphic
            // constant in that place as straight snake segments change length around it
        }

        // stretch snake if it has eaten food
        // this only works with square blocks as snake segments
        // need to remove tail, add a straight snake segment then reinsert the tail
        if (this.eaten) {
            this.snake.unshift(Game.add.sprite(tail.x, tail.y, 'snake'));
            this.eaten = false;
        }

        // check if snake has eaten food
        this.eatFood();

        // check if snake has collided with self
        this.selfCollide(head);

        // check if snake has collided with wall
        this.wallCollide(head);
    }

    generateFood () {
        // defining randomized variables for the coordinates of the food's location
        // x can be between 442.5 and 1157.5, y between 222.5 and 957.5
        let randX = Math.random() * (15 - 1) + 1;
        let randY = Math.random() * (15 - 1) + 1;
        let X = 55 * randX - 27.5 + 415,
            Y = 55 * randY - 27.5 + 215;

        this.food = Game.add.sprite(X, Y, 'food');
    }

    eatFood () {
        // for each portion of the snake (necessary in case food appears inside snake)
        for (let i = 0; i < this.snake.length(); i++) {
            // check if part of snake overlaps with the food
            if (this.snake[i].x === this.food.x && this.snake[i].y === this.food.y) {
                // marking that the next time the snake moves it should grow
                this.eaten = true;

                // remove old food and create a new one
                this.food.destroy();
                this.generateFood();

                // increase score & update score display
                this.score++;
                this.scoreTextValue.text = this.score.toString();
            }
        }
    }

    selfCollide (head) {
        // for each portion of the snake
        for (let i = 0; i < this.snake.length(); i++) {
            // check if the snake's head overlaps with the portion of it's body
            if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
                Game.state.start('gameOver');
            }
        }
    }

    wallCollide (head) {
        // for each portion of the snake
        for (let i = 0; i < this.snake.length(); i++) {
            // check if the snake's head has hit the wall anywhere
            if (head.x >= 442.5|| head.x <= 1157.5 || head.y >= 222.5 || head.y < 957.5) {
                Game.state.start('gameOver');
            }
        }
    }

}