/*jslint browser:true */
var canvas = document.getElementById("game");
canvas.width = screen.width - 20;
canvas.height = 1000;
var context = canvas.getContext("2d");

var tile = new Image();
tile.src = "assets/images/GGGGGG.png";

var tiles = [];

function makeBoard() {
    for (var i = 0; i < 100; i++) {
        tiles.push(new Image());
        tiles[i].src = "assets/images/GGGGGG.png";
    }
}

var speed = 5;

var width = canvas.width;
var height = canvas.height;

function makeCharacter(character, color) {
    "use strict";
    //context.fillStyle = color;
    //context.fillRect(character.x, character.y, character.width, character.height);

}

function clearCanvas() {
    "use strict";
    context.clearRect(0, 0, width, height);
}

function render() {
    "use strict";
    clearCanvas()
    var tilesPerRow = 10;
    var tileWidth = 120;
    var tileHeight = 150;

    for (var i = 0; i < 100; i++) {
        context.drawImage(tiles[i],
                          (116 * (i % tilesPerRow)) + (58 * Math.floor((i/tilesPerRow)%2)),  // X position of the tile
                          ((.72 * tileHeight) * Math.floor(i/tilesPerRow)),                    // Y position of the tile
                          tileWidth,                  // Width scaling of the tile (pixels?)
                          tileHeight);                 // Height scaling of the tile (pixels?)
    }
}

function game() {
    "use strict";
    makeBoard();
    render();
}

setInterval(function () {
    "use strict";
    game();
}, 1000 / 60);
