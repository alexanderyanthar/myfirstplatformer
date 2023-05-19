document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 400;

    const player = {
        x: 100,
        y: 350,
        width: 50,
        height: 50,
        jumping: false,
        jumpHeight: 100,
        jumpSpeed: 10,
        velocityX: 0,
        velocityY: 0,
        acceleration: 0,
        friction: 0.8,
        gravity: 1
    };

    const platform = {
        x: 200,
        y: 300,
        width: 100,
        height: 20,
    }

    const pressedKeys = {};

    function drawPlayer() {
        context.fillStyle = "#ff0000";
        context.fillRect(player.x, player.y, player.width, player.height);
    };

    function drawPlatform(){
        context.fillStyle = "#00ff00";
        context.fillRect(platform.x, platform.y, platform.width, platform.height);
    };

    function movePlayer(event){

        pressedKeys[event.key] = event.type === 'keydown';

        if (pressedKeys['ArrowRight']){
            player.acceleration = 1;
        }
        else if (pressedKeys['ArrowLeft']){
            player.acceleration = -1
        }
        else {
            player.acceleration = 0;
        }

        if (pressedKeys['ArrowUp'] && !player.jumping){
            player.jumping = true;
            player.velocityY = -player.jumpSpeed;
        }
    }

    function applyPhysics(){
        player.velocityX += player.acceleration;
        player.velocityX *= player.friction;
        player.x += player.velocityX;

        player.y += player.velocityY;
        player.velocityY += player.gravity;

        if (player.y > canvas.height - player.height){
            player.y = canvas.height - player.height;
            player.jumping = false;
        }

    }

    function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawPlayer();
        drawPlatform();
        applyPhysics();

    }

    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keyup', movePlayer);

    setInterval(gameLoop, 1000 / 60); // Call gameLoop function approximately 60 times per second
});
