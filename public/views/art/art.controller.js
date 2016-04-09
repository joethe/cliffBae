//===================== ART CONTROLLER ==============================
angular.module('mainApp').controller('artCtl', function(){
	var artControl = this;
	console.log("Art Controller Loaded!");

	this.imagesPath = "assets/images/"

	this.colOneImages = [
        "GGGGGG_2.png",
        "GGGGGG_3.png",
        "GGGGGG.png",
        "GGGGGR.png",
        "GGGGGW.png",
        "GGGGRR.png",
        "GGGRGG.png",
        "GGGRGR.png",
        "GGGRRR.png",
        "GGGWWW_2.png",
        "GGGWWW.png",
        "GGRGGG.png",
        "GGRRGG.png",
        "GGWGGR.png",
        "GGWGRR.png",
        "GRGWWW_2.png"
        ];

    this.colTwoImages = [
        "GRGWWW.png",
        "GRRGGG.png",
        "GRRGRG.png",
        "GRRRRG.png",
        "GWGRRG.png",
        "GWWGGG.png",
        "GWWWGG.png",
        "GWWWWG.png",
        "RGGGGR.png",
        "RGGGRR.png",
        "RGRRRR.png",
        "RRGGGG.png",
        "RRGRRG.png",
        "RRGWWG.png",
        "RRRGGG.png",
        "RRRRGG.png",
        "RRRRRR.png",
        "tilePlaceholder.png",
        "WGWWWW.png",
        "WWGGGW.png",
        "WWGGRG.png",
        "WWWGGG.png",
        "WWWGGW.png",
        "WWWWGG_2.png",
        "WWWWGG.png"
	];	
});
