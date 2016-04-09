/*jslint browser:true */
var canvas = document.getElementById("game");
canvas.width = screen.width - 20;
canvas.height = 1000;
var context = canvas.getContext("2d");

var tiles = [];

function makeBoard() {
    for (var i = 0; i < 100; i++) {
        tiles.push(new Image());
        tiles[i].src = "assets/images/placeHolder.png";
    }
}

var width = canvas.width;
var height = canvas.height;

function clearCanvas() {
    "use strict";
    context.clearRect(0, 0, width, height);
}

function drawBoard() {
    "use strict";
    var tilesPerRow = 10;
    var tileWidth = 120;
    var tileHeight = 130;

    var tileXMod = tileWidth * (29/30);
    var tileYMod = .72 * tileHeight;

    for (var i = 0; i < 100; i++) {
        context.drawImage(
            tiles[i],
            (tileXMod * (i % tilesPerRow)) + ((tileXMod/2) * Math.floor((i/tilesPerRow)%2)),    // X position of the tile
            (tileYMod * Math.floor(i/tilesPerRow)),                                             // Y position of the tile
            tileWidth,                                                                          // Width scaling of the tile (pixels?)
            tileHeight);                                                                        // Height scaling of the tile (pixels?)
    }
}

function render() {
    "use strict";
    clearCanvas()
    drawBoard();

}

function game() {
    "use strict";
    makeBoard();
    render();
}

setInterval(function () {
    "use strict";
    game();
}, 1000 / 200);
