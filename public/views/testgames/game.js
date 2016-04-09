window.onload = function() {

    var gameBoard = document.getElementById("game");
    Crafty.init(gameBoard.availWidth, gameBoard.availHeight, document.getElementById('game'));
    console.log("Screen Width: " + screen.availWidth);
    console.log("Screen Height: " + screen.availHeight);
    Crafty.e('2D, DOM, Color, Fourway')
        .attr({x: 0, y: 0, w: 100, h: 100})
        .color('#696969')
        .fourway(200);
        
}
