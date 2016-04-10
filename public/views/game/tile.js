(function() {
  var canvas = document.getElementById('hexmap');

var gamePieces = [
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
];

  var Tiles = Create2DArray(100),
    hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 degrees in radians
    hexagonAngle2 = 1.0473, //60 degrees in radians
    sideLength = 36 * 2,
    boardWidth = 6,
    boardHeight = 6,
    lineWidth = 6,
    currentTile = newTile(),
    currentPlayer = 1,
    player1 = {"farms": 10, "houses": 2},
    player2 = {"farms": 10, "houses": 2};

  hexHeight = Math.sin(hexagonAngle) * sideLength;
  hexRadius = Math.cos(hexagonAngle) * sideLength;
  kiteLongSide = Math.sin(hexagonAngle2) * sideLength * .5; // 30/60/90 triangle in half of kite edge
  kiteShortSide = Math.tan(hexagonAngle) * sideLength * .5; // 30/60/90 triangle in half of kite edge

  hexRectangleHeight = sideLength + 2 * hexHeight;
  hexRectangleWidth = 2 * hexRadius;

  canvas.width = Math.max(660, (boardWidth * hexRectangleWidth) + 50)
  canvas.height = Math.max(624, (boardWidth * hexRectangleHeight) + 50)

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
      if (typeof Tiles[hexX] != "undefined" && typeof Tiles[hexX][hexY] != "undefined") {
        if (hexX >= 0 && hexX < boardWidth) {
          if (hexY >= 0 && hexY < boardHeight) {
            currentTile.CoordX = screenX;
            currentTile.CoordY = screenY;
            if (Tiles[hexX][hexY].blank == true) {
                drawTile(ctx, screenX, screenY, true, currentTile.kites);
                drawHexagon(ctx, screenX, screenY, false);
            }
          }
        }
      }
    });
  }

  function toggleTurn() {
      if (currentPlayer === 1) {
          currentPlayer = 2;
          canvas.setAttribute("style", "border:15px solid #cc5500;");
          ctx.strokeStyle = "#cc5500";
      } else {
          currentPlayer = 1;
          canvas.setAttribute("style", "border:15px solid #ffff66;");
          ctx.strokeStyle = "#ffff66";
      }
      drawBoard(canvas.getContext('2d'), boardWidth, boardHeight);
      return currentPlayer;
  }

  function newTile() {
      tile = {
          "blank": false,
          "CoordX": null,
          "CoordY": null,
          "hidden": false,
          "kites": MakeRandomKiteValues(),
          "visible": true,
          "farm": 0,
          "house": 0
      }
      return tile;
  }

  function spotIsFree(hx, hy) {
    return (typeof Tiles[hx] != "undefined" && typeof Tiles[hx][hy] != "undefined" && Tiles[hx][hy].blank)
  }

  // These are horrifying. Please don't break them.
  function listNeighbors(hx, hy) {
    var neighbors = [];
    if((hx - 1) >= 0){  // for left neighbor
       neighbors.push({"pos": "L", "x": (hx - 1), "y": hy});
    }
    if((hy - 1) >= 0 && ((hy % 2 != 0) || (hx - 1) >= 0)){  // for upper left neighbor
       neighbors.push({"pos": "UL", "x": (((hy % 2) != 0) ? hx : (hx - 1)), "y": (hy - 1)});
    }
    if((hy + 1) < boardHeight && ((hy % 2) != 0 || (hx - 1) >= 0)){ // for bottom left neighbor
       neighbors.push({"pos": "BL", "x": (((hy % 2) != 0) ? hx : (hx - 1)), "y": (hy + 1)});
    }
    if(((hy - 1) >= 0) && ((hx + 1) < boardWidth) && ((hy % 2) == 0 || (hx + 1) < boardWidth)) { // for upper right neighbor
       neighbors.push({"pos": "UR", "x": ((hy % 2) == 0 ? hx : (hx + 1)), "y": (hy - 1)});
    }
    if(((hx + 1) < boardWidth) && ((hy + 1) < boardHeight) && ((hy % 2) == 0 || (hx + 1) < boardWidth)) {  // for bottom right neighbor
       neighbors.push({"pos": "BR", "x": ((hy % 2) == 0 ? hx : (hx + 1)), "y": (hy + 1)});
    }
    if((hx + 1) < boardWidth) {  // for the right neighbor
       neighbors.push({"pos": "R", "x": (hx+1), "y": hy});
    }

    return neighbors;
  }

  function validatePlacement(hx, hy, kites) {
    var sumLegitNeighbors = 0; // Sum of neighbors who aren't fakers (non-blank)
    if (!spotIsFree(hx, hy)) {
	       return -1;
    } else {
	neighbors = listNeighbors(hx, hy);

	for(var i=0; i < neighbors.length; i++){
		var n = neighbors[i];
        if (Tiles[n.x][n.y].blank == false) {
            sumLegitNeighbors += 1;
            //console.log(sumLegitNeighbors = sumLegitNeighbors + 1);
    		switch(n.pos){
    			case "L":
    			   if(!(Tiles[n.x][n.y].kites[1] == kites[5])){ return false; }
    			   if(!(Tiles[n.x][n.y].kites[2] == kites[4])){ return false; }
    			   break;
    			case "UL":
    			   if(!(Tiles[n.x][n.y].kites[2] == kites[0])){ return false; }
    			   if(!(Tiles[n.x][n.y].kites[3] == kites[5])){ return false; }
    			   break;
    			case "BL":
    			   if(!(Tiles[n.x][n.y].kites[0] == kites[4])){ return false; }
    			   if(!(Tiles[n.x][n.y].kites[1] == kites[3])){ return false; }
    			   break;
    			case "UR":
    			   if(!(Tiles[n.x][n.y].kites[4] == kites[0])){ return false; }
    			   if(!(Tiles[n.x][n.y].kites[3] == kites[1])){ return false; }
    			   break;
    		  	case "BR":
    			   if(!(Tiles[n.x][n.y].kites[5] == kites[3])){ return false; }
    			   if(!(Tiles[n.x][n.y].kites[0] == kites[2])){ return false; }
    			   break;
    			case "R":
    			   if(!(Tiles[n.x][n.y].kites[5] == kites[1])){ return false; }
    			   if(!(Tiles[n.x][n.y].kites[4] == kites[2])){ return false; }
    			   break;
    			default:
    			   console.log("Something wrong with placment validation!");


    		}
        }
	}
    return sumLegitNeighbors > 1;

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
          "visible": true,
          "farm": 0,
          "house": 0,
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

  function drawHouse(canvasContext, x, y, player) {
    var previousFill = canvasContext.fillStyle;
    var previousStroke = canvasContext.strokeStyle;

		canvasContext.lineWidth = 5;
    if (player==1){
    	canvasContext.fillStyle = "#ffff66";
      canvasContext.strokeStyle = "#ffff66";
    }
    else
    {
    	canvasContext.fillStyle = "#cc5500";
      canvasContext.strokeStyle = "#cc5500";
    }
    canvasContext.fillRect(x + hexRadius-hexRectangleWidth*.3*.5, y + hexRadius-hexRectangleWidth*.3*.5, hexRectangleWidth*.3, hexRectangleWidth*.3);

    canvasContext.beginPath();
    canvasContext.moveTo(x + hexRadius-hexRectangleWidth*.3*.5, y + hexRadius-hexRectangleWidth*.3*.5-30);

    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.moveTo(x + hexRadius-hexRectangleWidth*.3*.5, y+hexRadius-hexRectangleWidth*.3*.4);
    canvasContext.lineTo(x + hexRadius, y+hexRadius-hexRectangleWidth*.3);
    canvasContext.lineTo(x + hexRadius+hexRectangleWidth*.3*.5, y + hexRadius-hexRectangleWidth*.3*.4);
    canvasContext.closePath();
    canvasContext.stroke();

    canvasContext.fillStyle = previousFill;
    canvasContext.strokeStyle = previousStroke;
  }

function drawFarm(canvasContext, x, y, player) {
    var fill = fill || true;
    var previousFill = canvasContext.fillStyle;
    var previousStroke = canvasContext.strokeStyle;

    canvasContext.beginPath();
    canvasContext.lineTo(x + hexRadius, y + hexRadius);  //Center
    canvasContext.beginPath();
    canvasContext.arc(x+ hexRadius, y+ hexRadius, hexRectangleWidth*.2, 0, 2 * Math.PI, false);
    if (player==1){
    	canvasContext.fillStyle = "#ffff66";
      canvasContext.strokeStyle = "#ffff66";
    }
    else
    {
    	canvasContext.fillStyle = "#cc5500";
      canvasContext.strokeStyle = "#cc5500";
    }
    canvasContext.lineWidth = 5;


    if (fill) {
      canvasContext.fill();
    } else {
      canvasContext.stroke();
    }

    canvasContext.fillStyle = previousFill;
    canvasContext.strokeStyle = previousStroke;
  }

  function drawBoard(canvasContext, width, height) {
    var i,
      j;

    for (i = 0; i < width; ++i) {
      for (j = 0; j < height; ++j) {
        if (Tiles[i][j].blank == false) {
          drawTile(ctx, Tiles[i][j].CoordX, Tiles[i][j].CoordY, true, Tiles[i][j].kites)
        }
        if (Tiles[i][j].visible == true) {
          drawHexagon(ctx, Tiles[i][j].CoordX, Tiles[i][j].CoordY, false);
        }
        if (Tiles[i][j].house != 0) {
            drawHouse(ctx, Tiles[i][j].CoordX, Tiles[i][j].CoordY, Tiles[i][j].house);
        }
        if (Tiles[i][j].farm != 0) {
            drawFarm(ctx, Tiles[i][j].CoordX, Tiles[i][j].CoordY, Tiles[i][j].farm);
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
        return "#6b6b47";
        break;
      case "water":
        return "#0066ff";
        break;
      default:
        return "#000000";
    }
  }

  function R3(){
    var n = Math.floor(Math.random()*3);
    if (n==0) {
        return "grass";
    } else if (n==1) {
        return "rock";
    } else {
        return "water";}
  }

  function MakeRandomKiteValues(){
    return gamePieces[Math.floor(Math.random() * gamePieces.length)];
  }

  function MakeRandomKites(n){
    var arr;
    for(var i = 0;i<n;i++){
      arr.push(MakeRandomKiteValues());
    }
    return arr;
  }

  function selectRandom(arr){
    var r = Math.floor(Math.random()*arr.length);
    temparr;
    temp=arr[r];
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

  function rotateTile(dir) {
      kites = currentTile.kites;
      var temp;
      if (dir === "L") {
          temp = kites[0];
          for (var i = 0; i < kites.length - 1; i++) {
              kites[i] = kites[i + 1];
          }
          kites[5] = temp;
      } else if (dir === "R") {
          temp = kites[5];
          for (var i = 5; i > 0; i--) {
              kites[i] = kites[i - 1];
          }
          kites[0] = temp;
      }
      currentTile.kites = kites;
  }

  function placeTile(x, y) { // Ugly x and y
      var curTile = {
          "blank": currentTile.blank,
          "CoordX": currentTile.CoordX,
          "CoordY": currentTile.CoordY,
          "hidden": currentTile.hidden,
          "kites": [currentTile.kites[0], currentTile.kites[1], currentTile.kites[2], currentTile.kites[3], currentTile.kites[4], currentTile.kites[5]],
          "visible": currentTile.visible,
          "farm": currentTile.farm,
          "house": currentTile.house
      };

      var selectedTile = getTile(x, y);

      console.log(validatePlacement(selectedTile.x, selectedTile.y, curTile.kites));

      if (validatePlacement(selectedTile.x, selectedTile.y, curTile.kites) === true) {
          var hexCenter = centerHex(selectedTile.x, selectedTile.y);
          curTile.CoordX = hexCenter.x;
          curTile.CoordY = hexCenter.y;

          Tiles[selectedTile.x][selectedTile.y] = curTile;

          drawBoard(canvas, boardWidth, boardHeight);
          currentTile = newTile();
          return true;
      } else {
          //TODO: Visual indication of lack of playability of game piece.
          return false;
      }

  }

  function canPlayFarm(x, y) {
      if (currentPlayer === 1) {player = player1;} else {player = player2};
      return (Tiles[x][y].kites.length === 6 && Tiles[x][y].farm === 0 && Tiles[x][y].house === 0 && player.farms !== 0);
  }


  document.addEventListener("click", function(eventInfo){
      x = eventInfo.offsetX || eventInfo.layerX;
      y = eventInfo.offsetY || eventInfo.layerY;
      if (placeTile(x, y)) {
          toggleTurn();
      }

  });

  // Key code 37 is left arrow.
  // Key code 39 is right arrow.
  document.onkeydown = function(event) {
    ctx = canvas.getContext('2d');
    key = event.keyCode;
    var currX = currentTile.CoordX;
    var currY = currentTile.CoordY;
    var nice = getTile(currX, currY);

    switch (key) {
        case 37: // Left Arrow
            rotateTile("L");
            break;
        case 39: // Right Arrow
            rotateTile("R");
            break;
        case 70: // F
            if (canPlayFarm(nice.x, nice.y)) {
                Tiles[nice.x][nice.y].farm = currentPlayer;
                if (currentPlayer === 1) {
                    player1.farms = player1.farms - 1;
                } else {
                    player2.farms = player2.farms - 1;
                }
                toggleTurn();
            }
            break;
        case 72: // H
            var player;
            if (currentPlayer === 1) {player = player1;} else {player = player2};
            if (player.houses !== 0 && placeTile(currX, currY)) {
                Tiles[nice.x][nice.y].house = currentPlayer;
                if (currentPlayer === 1) {
                    player1.houses = player1.houses - 1;
                } else {
                    player2.houses = player2.houses - 1;
                }
                toggleTurn();
            }
            break;
        case 82: // R
            //TODO: Send current to player's "hand"
            currentTile = newTile();
            break;
        default:
            //console.log(event.keyCode);
            break;
    }

    currentTile.CoordX = currX;
    currentTile.CoordY = currY;

    drawBoard(ctx, boardWidth, boardHeight);
    drawTile(ctx, currentTile.CoordX, currentTile.CoordY, true, currentTile.kites);
    drawHexagon(ctx, currentTile.CoordX, currentTile.CoordY, false);
  };

})();
