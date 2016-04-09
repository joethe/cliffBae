window.onload = function() {

    var gameBoard = document.getElementById("game");
    var height = gameBoard.availHeight;
    var width = gameBoard.availWidth;

    Crafty.init(gameBoard.availWidth, gameBoard.availHeight, document.getElementById('game'));
    console.log("Game Width: " + width);
    console.log("Game Height: " + height);
    Crafty.e('2D, DOM, Color, Fourway')
        .attr({x: 0, y: 0, w: 100, h: 100})
        .color('#696969')
        .fourway(200);

}
