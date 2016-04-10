(function() {
  var canvas = document.getElementById('hexmap');

  /*
["grass","grass","grass","grass","grass","grass"],
["grass","grass","grass","grass","grass","grass"],
["grass","grass","grass","grass","grass","grass"],
["grass","grass","grass","grass","grass","rock"],
["grass","grass","grass","grass","grass","water"],
["grass","grass","grass","grass","rock","rock"],
["grass","grass","grass","rock","grass","grass"],
["grass","grass","grass","rock","grass","rock"],
["grass","grass","grass","rock","rock","rock"],
["grass","grass","grass","water","water","water"],
["grass","grass","grass","water","water","water"],
["grass","grass","rock","grass","grass","grass"],
["grass","grass","rock","rock","grass","grass"],
["grass","grass","water","grass","grass","rock"],
["grass","grass","water","grass","rock","rock"],
["grass","rock","grass","water","water","water"],
["grass","rock","grass","water","water","water"],
["grass","rock","rock","grass","grass","grass"],
["grass","rock","rock","grass","rock","grass"],
["grass","rock","rock","rock","rock","grass"],
["grass","water","grass","rock","rock","grass"],
["grass","water","water","grass","grass","grass"],
["grass","water","water","water","grass","grass"],
["grass","water","water","water","water","grass"],
["rock","grass","grass","grass","grass","rock"],
["rock","grass","grass","grass","rock","rock"],
["rock","grass","rock","rock","rock","rock"],
["rock","rock","grass","grass","grass","grass"],
["rock","rock","grass","rock","rock","grass"],
["rock","rock","grass","water","water","grass"],
["rock","rock","rock","grass","grass","grass"],
["rock","rock","rock","rock","grass","grass"],
["rock","rock","rock","rock","rock","rock"],
["water","grass","water","water","water","water"],
["water","water","grass","grass","grass","water"],
["water","water","grass","grass","rock","grass"],
["water","water","water","grass","grass","grass"],
["water","water","water","grass","grass","water"],
["water","water","water","water","grass","grass"],
["water","water","water","water","grass","grass"]
*/

  var Tiles = Create2DArray(100),
    hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 degrees in radians
    hexagonAngle2 = 1.0473, //60 degrees in radians
    sideLength = 36 * 2,
    boardWidth = 4,
    boardHeight = 4,
    lineWidth = 6,
    currentTile = {
      "blank": false,
      "CoordX": null,
      "CoordY": null,
      "hidden": false,
      "kites": ["rock", "rock", "rock", "grass", "grass", "grass"],
      "visible": true
  };


  hexHeight = Math.sin(hexagonAngle) * sideLength;
  hexRadius = Math.cos(hexagonAngle) * sideLength;
  kiteLongSide = Math.sin(hexagonAngle2) * sideLength * .5; // 30/60/90 triangle in half of kite edge
  kiteShortSide = Math.tan(hexagonAngle) * sideLength * .5; // 30/60/90 triangle in half of kite edge

  hexRectangleHeight = sideLength + 2 * hexHeight;
  hexRectangleWidth = 2 * hexRadius;

  canvas.width = Math.max(660, (boardWidth * hexRectangleWidth) + 50)
  canvas.width = Math.max(624, (boardWidth * hexRectangleHeight) + 50)

  Tiles = initTiles(boardWidth, boardHeight);


  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "#006600";
    ctx.strokeStyle = "#ffff00";
    ctx.lineWidth = lineWidth;

    drawBoard(ctx, boardWidth, boardHeight);

    canvas.addEventListener("mousemove", function(eventInfo) {
      var x,
        y,
        hexX,
        hexY,
        screenX,
        screenY;

      x = eventInfo.offsetX || eventInfo.layerX;
      y = eventInfo.offsetY || eventInfo.layerY;


      hexY = Math.floor(y / (hexHeight + sideLength));
      hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

      screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
      screenY = hexY * (hexHeight + sideLength);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBoard(ctx, boardWidth, boardHeight);

      // Check if the mouse's coords are on the board & the field is available to be placed into
      if (typeof Tiles[hexX] != "undefined" && typeof Tiles[hexX][hexY] != "undefined" && Tiles[hexX][hexY].blank == true) {
        if (hexX >= 0 && hexX < boardWidth) {
          if (hexY >= 0 && hexY < boardHeight) {
            drawTile(ctx, screenX, screenY, true, ["rock", "rock", "rock", "grass", "grass", "grass"]);
            drawHexagon(ctx, screenX, screenY, false);
          }
        }
      }
    });
  }

  function spotIsFree(hx, hy) {
    (typeof Tiles[hx] != "undefined" && typeof Tiles[hx][hy] != "undefined" && Tiles[hx][hy].blank == true)
  }

  function listNeighbors(hx, hy) {
    var neighbors = [];    
    
    if((hx - 1) >= 0){  // for left neighbor
       neighbors.push({"pos": "L", "x": (hx - 1), "y": hy});	
    }
    if((hy - 1) >= 0){  // for upper left neighbor
       neighbors.push({"pos": "UL", "x": hx, "y": (hy - 1)});
    }
    if((hy + 1) <= boardHeight){ // for bottom left neighbor
       neighbors.push({"pos": "BL", "x": hx, "y": (hy + 1)});
    }
    if(((hy - 1) >= 0) && ((hx + 1) <= boardWidth)) { // for upper right neighbor
       neighbors.push({"pos": "UR", "x": (hx + 1), "y": (hy - 1)});
    }
    if(((hx + 1) <= boardWidth) && ((hy + 1) <= boardHeight)) {  // for bottom right neighbor
       neighbors.push({"pos": "BR", "x": (hx + 1), "y": (hy + 1)});
    }
    if((hx + 1) <= boardWidth) {  // for the right neighbor
       neighbors.push({"pos": "R", "x": (hx+1), "y": hy});
    }

    return neighbors;
  }

  function validatePlacement(hx, hy, kites) {
    if (!spotIsFree(hx, hy)) {
	return -1;
    } else {
	neighbors = listNeighbors(hx, hy);
	
	for(var i=0; i < neighbors.length; i++){
		var n = neighbors[i];
		switch(n.pos){
			case "L":
			   if(!(Tile[n.x][n.y].kites[1] == kites[5])){ return false; }
			   if(!(Tile[n.x][n.y].kites[2] == kites[4])){ return false; }
			   break;
			case "UL":
			   if(!(Tile[n.x][n.y].kites[2] == kites[0])){ return false; }
			   if(!(Tile[n.x][n.y].kites[3] == kites[5])){ return false; }
			   break;
			case "BL":
			   if(!(Tile[n.x][n.y].kites[0] == kites[4])){ return false; }
			   if(!(Tile[n.x][n.y].kites[1] == kites[3])){ return false; }
			   break;
			case "UR":
			   if(!(Tile[n.x][n.y].kites[4] == kites[0])){ return false; }
			   if(!(Tile[n.x][n.y].kites[3] == kites[1])){ return false; }
			   break;
		  	case "BR":
			   if(!(Tile[n.x][n.y].kites[5] == kites[3])){ return false; }
			   if(!(Tile[n.x][n.y].kites[0] == kites[2])){ return false; }
			   break;
			case "R":
			   if(!(Tile[n.x][n.y].kites[5] == ktes[1])){ return false; }
			   if(!(Tile[n.x][n.y].kites[4] == kites[2])){ return false; }
			   break;
			default:
			   console.log("Something wrong with placment validation!");
		 
			  
		}
	}

	return true; // true when not found to be false...
    }	
  }

  function initTiles(width, height) {
    var i, j, tile;
    var tiles = Create2DArray(100);

    for (i = 0; i < width; ++i) {
      for (j = 0; j < height; ++j) {
        tile = {
          "blank": CreateBlank(i.toString() + "," + j.toString()),
          "CoordX": centerHex(i, j).x,
          "CoordY": centerHex(i, j).y,
          "hidden": false,
          "kites": CreateKite(i.toString() + "," + j.toString()),
          "visible": true
        }
        tiles[i][j] = tile;
      }
    }

    return tiles;
  }

  function CreateBlank(val) {
    switch (val) {
      case "1,0":
      case "0,1":
      case "1,1":
        return false;
        break;
      default:
        return true;
    }
  }


  function CreateKite(ids) {
    var Kite = [];

    switch (ids) {
      case "1,0":
        Kite = ["grass", "grass", "grass", "grass", "grass", "grass"];
        break;
      case "0,1":
        Kite = ["grass", "grass", "rock", "grass", "grass", "grass"];
        break;
      case "1,1":
        Kite = ["grass", "water", "grass", "rock", "rock", "grass"];
        break;
    }
    return Kite;
  }


  function Create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }

    return arr;
  }

  function drawBoard(canvasContext, width, height) {
    var i,
      j;

      console.log(Tiles);

    for (i = 0; i < width; ++i) {
      for (j = 0; j < height; ++j) {
        if (Tiles[i][j].blank == false) {
          drawTile(ctx, Tiles[i][j].CoordX, Tiles[i][j].CoordY, true, Tiles[i][j].kites)
        }
        if (Tiles[i][j].visible == true) {
          drawHexagon(ctx, Tiles[i][j].CoordX, Tiles[i][j].CoordY, false);
        }
      }
    }
  }

  function drawLittleHexagon(canvasContext, x, y, fill) {
    var fill = fill || false;


    sideLengthL=sideLength*.46;
    x=x+sideLengthL;
    y=y+sideLengthL;


    hexHeightL=Math.sin(hexagonAngle) * sideLengthL;
    hexRadiusL=Math.cos(hexagonAngle) * sideLengthL;
  	hexRectangleHeightL = sideLengthL + 2 * hexHeightL;
  	hexRectangleWidthL = 2 * hexRadiusL;


    canvasContext.beginPath();
    canvasContext.moveTo(x + hexRadiusL, y); //Top
    canvasContext.lineTo(x + hexRectangleWidthL, y + hexHeightL); //Top Right
    canvasContext.lineTo(x + hexRectangleWidthL, y + hexHeightL + sideLengthL); //Bottom Right
    canvasContext.lineTo(x + hexRadiusL, y + hexRectangleHeightL); //Bottom
    canvasContext.lineTo(x, y + sideLengthL + hexHeightL); //Bottom Left
    canvasContext.lineTo(x, y + hexHeightL); //Upper Left
    canvasContext.closePath(); //Top

    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }
  }

    function drawHexagon(canvasContext, x, y, fill) {
    var fill = fill || false;

    canvasContext.beginPath();
    canvasContext.moveTo(x + hexRadius, y); //Top
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight); //Top Right
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength); //Bottom Right
    canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight); //Bottom
    canvasContext.lineTo(x, y + sideLength + hexHeight); //Bottom Left
    canvasContext.lineTo(x, y + hexHeight); //Upper Left
    canvasContext.closePath(); //Top

    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }
  }


  function drawTile(canvasContext, x, y, fill, ground) {
    var fill = fill || false;

    canvasContext.fillStyle = StyleColor(ground[0]);

    canvasContext.beginPath();
    canvasContext.moveTo(x + hexRadius, y); //Top
    canvasContext.lineTo(x + hexRadius + kiteLongSide, y + kiteShortSide); //Top Mid Right
    canvasContext.lineTo(x + hexRadius, y + hexRadius); //Center
    canvasContext.lineTo(x + hexRadius - kiteLongSide, y + kiteShortSide); //Top Left
    canvasContext.closePath();
    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }


    canvasContext.fillStyle = StyleColor(ground[1]);
    canvasContext.beginPath();
    canvasContext.lineTo(x + hexRadius + kiteLongSide, y + kiteShortSide); //Top Mid Right
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight); //Top Right
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + kiteLongSide); //Right
    canvasContext.lineTo(x + hexRadius, y + hexRadius); //Center
    canvasContext.closePath();
    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }

    canvasContext.fillStyle = StyleColor(ground[2]);
    canvasContext.beginPath();
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + kiteLongSide); //Right
    canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength); //Bottom Right
    canvasContext.lineTo(x + hexRectangleWidth - kiteLongSide, y + hexHeight + sideLength + kiteShortSide); //Bottom Right Mid
    canvasContext.lineTo(x + hexRadius, y + hexRadius); //Center

    canvasContext.closePath();
    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }

    canvasContext.fillStyle = StyleColor(ground[3]);
    canvasContext.beginPath();
    canvasContext.lineTo(x + hexRectangleWidth - kiteLongSide, y + hexHeight + sideLength + kiteShortSide); //Bottom Right Mid
    canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight); //Bottom
    canvasContext.lineTo(x + hexRadius - kiteLongSide, y + hexRectangleHeight - kiteShortSide); //Bottom Left Mid
    canvasContext.lineTo(x + hexRadius, y + hexRadius); //Center
    canvasContext.closePath();
    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }


    canvasContext.fillStyle = StyleColor(ground[4]);
    canvasContext.beginPath();
    canvasContext.lineTo(x + hexRadius - kiteLongSide, y + hexRectangleHeight - kiteShortSide); //Bottom Left Mid
    canvasContext.lineTo(x, y + sideLength + hexHeight); //Bottom Left
    canvasContext.lineTo(x, y + sideLength + hexHeight - kiteLongSide); //Left
    canvasContext.lineTo(x + hexRadius, y + hexRadius); //Center
    canvasContext.closePath();
    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }

    canvasContext.fillStyle = StyleColor(ground[5]);
    canvasContext.beginPath();
    canvasContext.lineTo(x, y + sideLength + hexHeight - kiteLongSide); //Left
    canvasContext.lineTo(x, y + hexHeight); //Upper Left
    canvasContext.lineTo(x + kiteLongSide, y + hexHeight - kiteShortSide); //Upper Left Mid
    canvasContext.lineTo(x + hexRadius, y + hexRadius); //Center
    canvasContext.closePath();
    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }

    for (var i = 0; i < ground.length; i++) {
    	if (ground[i] == "grass")
      {
      	 canvasContext.fillStyle = StyleColor(ground[i]);
      	 drawLittleHexagon(canvasContext, x, y, true);
         break;
      }
    }

  }


  function StyleColor(ground) {
    switch (ground) {
      case "grass":
        return "#009900";
        break;
      case "rock":
        return "#999999";
        break;
      case "water":
        return "#0066ff";
        break;
      default:
        return "#000000";
    }
  }

  function R3(){
    var n = Math.floor(Math.Random()*3);
    if(n==0){return "grass";}else if(n==1){return "rock";}else{return "water";}
  }

  function MakeRandomKiteValues(){
    return [self.R3(),self.R3(),self.R3(),self.R3(),self.R3(),self.R3()];
  }

  function MakeRandomKites(n){
    var arr;
    for(var i = 0;i<n;i++){
      arr.push(MakeRandomKiteValues());
    }
    return arr;
  }

  function selectRandom(arr){
    var r = Math.floor(Math.Random()*arr.length);
    temparr;
    temp=arr[i];
    for(var i = 0;i<arr.length;i++){
      if(i!=r){temparr.push(arr[i]);}
    }
    arr=temparr;
    return temp;
  }

  function getTile(x, y) {
      var hexY = Math.floor(y / (hexHeight + sideLength));
      var hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
      return {x: hexX, y: hexY};
  }

  function centerHex(i, j) {
      var newX = i * hexRectangleWidth + ((j % 2) * hexRadius);
      var newY = j * (sideLength + hexHeight);
      return {x: newX, y: newY};
  }


  document.addEventListener("click", function(eventInfo){
      var curTile = {
          "blank": false,
          "CoordX": null,
          "CoordY": null,
          "hidden": false,
          "kites": ["rock", "rock", "rock", "grass", "grass", "grass"],
          "visible": true
      };
      x = eventInfo.offsetX || eventInfo.layerX;
      y = eventInfo.offsetY || eventInfo.layerY;

      var selectedTile = getTile(x, y);
      console.log(selectedTile);


      var hexCenter = centerHex(selectedTile.x, selectedTile.y);
      curTile.CoordX = hexCenter.x;
      curTile.CoordY = hexCenter.y;

      Tiles[selectedTile.x][selectedTile.y] = curTile;
      console.log(Tiles);
      console.log(currentTile);

      drawBoard(canvas, boardWidth, boardHeight);
  });

})();
