window.onload = function() {

    var gameBoard = document.getElementById("game");
    var height = gameBoard.availHeight;
    var width = gameBoard.availWidth;

    Crafty.init(gameBoard.availWidth, gameBoard.availHeight, document.getElementById('game'));
    console.log("Game Width: " + width);
    console.log("Game Height: " + height);
  //  Crafty.e('2D, DOM, Color, Fourway')
  //      .attr({x: 0, y: 0, w: 100, h: 100})
  //      .color('#696969')
  //      .fourway(200);
   Crafty.paths({ audio: "custom/audio/path/", images: "assets/images/" });
   Crafty.load(assetsObj, // preload assets
        function() { //when loaded
              //  Crafty.scene("splash"); //go to splash scene
              //  Crafty.audio.play("boop"); //Play the audio file
              //  Crafty.e('2D, DOM, lazycat'); // create entity with sprite
              Crafty.e('2D, tileP, Fourway')
                  //.attr({x: 0, y: 0, w: 100, h: 100})
                  //.color('#696969')
                  .fourway(200);
            },
        function(e) { //progress
              //Callback when an asset is loaded. Contains information about assets loaded
            },
        function(e) { //uh oh, error loading
            }
        );
}


var assetsObj = {
    "images": {"tileP": ["tilePlaceholder.png"]}
    };
