var assetsObj = {
    "images": ["badguy.bmp", "goodguy.png"],
    "sprites": {
        "animals.png": {
            "tile": 50, //Tile size of the sprite map, defaults to 1
            "tileh": 40, //Height of the tile; if provided, tile is interpreted as the width
            "map": { "ladybug": [0,0], "lazycat": [0,1], "ferociousdog": [0,2] } //Object where the key is what becomes a new component and the value points to a position on the sprite map
            "paddingX": 5, //Horizontal space in between tiles.
            "paddingY": 5, //Vertical space in between tiles. Defaults to paddingX.
            "paddingAroundBorder": 10 //If padding should be applied around the border of the sprite sheet. If enabled the first tile starts at (paddingX,paddingY) instead of (0,0). Defaults to false
        },
    },
};

Crafty.load(assetsObj, // preload assets
    function() { //when loaded
      //  Crafty.scene("splash"); //go to splash scene
      //  Crafty.audio.play("boop"); //Play the audio file
      //  Crafty.e('2D, DOM, lazycat'); // create entity with sprite
    },

    function(e) { //progress
      //Callback when an asset is loaded. Contains information about assets loaded
    },

    function(e) { //uh oh, error loading
    }
);
