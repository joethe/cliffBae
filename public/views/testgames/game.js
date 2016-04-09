/*jslint browser:true */
var canvas = document.getElementById("game");
canvas.width = screen.width - 20;
canvas.height = screen.height - 250;
var context = canvas.getContext("2d");

var tile = new Image();
tile.src = "assets/images/tilePlaceholder.png"

var keys = [];

var width = canvas.width;
var height = canvas.height;

var characterHeight = 100;
var characterWidth = 100;

var player = {
    x: 40,
    y: 40,
    width: characterWidth,
    height: characterHeight
};

window.addEventListener("keydown", function (e) {
    "use strict";
    keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    "use strict";
    delete keys[e.keyCode];
}, false);

function makeCharacter(character, color) {
    "use strict";
    //context.fillStyle = color;
    //context.fillRect(character.x, character.y, character.width, character.height);
    context.drawImage(tile, character.x, character.y, 100, 100)
}

function clearCanvas() {
    "use strict";
    context.clearRect(0, 0, width, height);
}

function bounds(character, distance) {
    "use strict";
    if (character.x <= distance) {
        character.x = distance;
    }
    if (character.y <= distance) {
        character.y = distance;
    }
    if (character.x >= (width - character.width - distance)) {
        character.x = width - character.width - distance;
    }
    if (character.y >= (height - character.height - distance)) {
        character.y = height - character.height - distance;
    }
}

function keyMovement() {
    "use strict";
    if (keys[38]) {
        player.y -= speed;
    }
    if (keys[40]) {
        player.y += speed;
    }
    if (keys[37]) {
        player.x -= speed;
    }
    if (keys[39]) {
        player.x += speed;
    }
}

function render() {
    "use strict";
    clearCanvas();
    makeCharacter(player, "rgb(21, 206, 246)");
}


function update() {
    "use strict";
    keyMovement();
    bounds(player, 0);
}

function game() {
    "use strict";
    update();
    render();
}

setInterval(function () {
    "use strict";
    game();
}, 1000 / 60);
