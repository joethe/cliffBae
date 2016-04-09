var canvas = document.getElementById("game");
canvas.width = screen.width - 20;
canvas.height = 1000;
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

//here's your damn chifshitz.
var tiles = [
  {'x':0,'y':0,'corners':["rock","rock","grass","grass","water","grass",],'placed':true},
  {'x':1,'y':0,'corners':["grass","grass","grass","grass","grass","rock"],'placed':true},
  {'x':1,'y':-1,'corners':["grass","grass","grass","grass","grass","grass"],'placed':true},
  {'x':0,'y':1,'corners':["empty","empty","grass","rock","rock","empty"],'placed':false},
  {'x':2,'y':-1,'corners':["grass","empty","empty","empty","grass","grass"],'placed':false},
  {'x':0,'y':-1,'corners':["water","grass","grass","empty","empty","empty"],'placed':false}
];

var yS;
var xS;

var scaleCoordinates = function(xScale,yScale){
    console.log("Scaling coords");
    yS=yScale;
    xS=xScale;
    tiles.forEach(function(tile){
        tile.x=tile.x*xScale;
        tile.y=tile.y*yScale;
        console.log("Scaling a tile...");
});
}

/*
pixleGetTile=function(x,y){
  return getTile();
}
*/


        reframeCoordinates = function(){
          xMax=0;
          xMin=0;
          yMax=0;
          yMin=0;
          tiles.forEach(function(tile){
            if(tile.x<xMin){xMin=tile.x;}
            if(tile.x>xMax){xMax=time.x;}
            if(tile.y<xMin){yMin=tile.y;}
            if(tile.y>xMax){xMax=time.y;}
          })
          shiftCoordinates(-(xMin),-(yMin));
          return {'xMax':xMax-xMin,'yMax':yMax-yMin}
        }

        /*
        pixleGetTile=function(x,y){
          return getTile();
        }

        pixlePlaceTileC=funciton(x,y,rotation){
          placeTile(getTile(xScale*Math.floor(x-(y*2)),yScale*y).x,getTile(xScale*Math.floor(x-(y*2)),yScale*y).y,rotation);
        }*/

      /*  var nullTile = {'corners':["empty","empty","empty","empty","empty","empty"]}*/
/*
placements=function(myTile,toTile){
  var arr=[];
  for(var i = 0;i<6;i++){
  if(fits(myTile.corners,toTile.corners,i)){
    arr.push([
      myTile.corners[(0+i)%6],
      myTile.corners[(1+i)%6],
      myTile.corners[(2+i)%6],
      myTile.corners[(3+i)%6],
      myTile.corners[(4+i)%6],
      myTile.corners[(5+i)%6],])
  }
}
return arr;
}*/
//tile,n->tile
/*getNeighbor[tile,n]{
  var m=0;
  if(n==m++){
    //top right
    return self.getTile(tile.x+1,tile.y+1);
  }elseif(n==m++){
    //right
    return self.getTile(tile.x+1,tile.y);
  }elseif(n==m++){
    //bottom right
    return self.getTile(tile.x+1,tile.y1-1);
  }elseif(n==m++){
    //bottom left
    return self.getTile(tile.x,tile.y-1,0);
  }elseif(n==m++){
    //left
    return self.getTile(tile.x-1,tile.y,tile,);
  }else{
    //top left
    return self.getTile(tile.x-1,tile.y+1,2,tile,);
  }
}*/
/*
thing=function(a,b){
  if(a=="empty"){return b}else{if(a==b){return a}else{throw "error: tiles unsynced"}}
}*/

//x,y-->void
var syncCorners=function(x,y){
  //my 0 is there 4 ;my 1 is there 3 they are at me + (1,1)
  self.getTile(x+1*xS,y*yS+1).corners[4]=self.getTile(x,y).corners(0);
  self.getTile(x+1*xS,y*yS+1).corners[3]=self.getTile(x,y).corners(1);
  //my 1 is there 5;my 2 is there 4 they are at me + (1,0)
  self.getTile(x+1*xS,y*yS).corners[1]=self.getTile(x,y).corners(5);
  self.getTile(x+1*xS,y*yS).corners[2]=self.getTile(x,y).corners(4);
  //my 2 is there 0;my 3 is there 5 they are at me + (1,-1)
  self.getTile(x+1*xS,y*yS-1).corners[2]=self.getTile(x,y).corners(0);
  self.getTile(x+1*xS,y*yS-1).corners[3]=self.getTile(x,y).corners(5);
  //my 3 is there 1;my 4 is there 0 they are at me + (0,-1)
  self.getTile(x,y*yS-1).corners[3]=self.getTile(x,y).corners(1);
  self.getTile(x,y*yS-1).corners[4]=self.getTile(x,y).corners(0);
  //my 4 is there 2;my 5 is there 1 they are at me + (-1,0)
  self.getTile(x-1*xS,y*yS).corners[4]=self.getTile(x,y).corners(2);
  self.getTile(x-1*xS,y*yS).corners[5]=self.getTile(x,y).corners(1);
  //my 5 is their 3;my 0 is there 2 they are at me + (-1,1)
  self.getTile(x-1*xS,y*yS+1).corners[5]=self.getTile(x,y).corners(3);
  self.getTile(x-1*xS,y*yS+1).corners[0]=self.getTile(x,y).corners(2);
}

//corners,corners,int 0-5 --> boolean
var fits=function(array1,array2,rotation){
  for(var i=0;i<6;i++){
    if(array1[i]=="empty"){throw "empty in player piece";}
    if((array2[i]!="empty")&&(array2[i]!=array1[(i+rotation)%6])){
      return false;
    }
  }
}

//x,y-> getTile(x,y) or False
var getTile=function(x,y){
  self.tiles.forEach(function(z){
    if (z.x==x&&z.y==y){return z;}
  })
  tiles.push({'x':x,'y':y,'placed':False,'corners':["empty","empty","empty","empty","empty","empty"]});
  return getTile(x,y);
}
function rotateTile(tile,rotation){
  var mytile = tile
  for(var i;i<6;i++){
    mytile.corners[i]=tile.corners[(i+rotation)%6];
  }
  return mytile;
}
//getTile(x,y),getNeighbot(getTile(x,y),n)-->boolean



var placeTile=function(myTile,toTile,rotation){
  if(self.fits(myTile.corners,toTile.corners,rotation)&&(!(toTile.placed))){
    toTile=rotateTile[myTile];
    toTile.placed=True;
    self.syncCorners(toTile);
    return True;
  }else{
    return False;
  }
}

var emptyTile = new Image();
emptyTile.src = "assets/images/placeHolder.png";
var realTile = new Image();
realTile.src = "assets/images/GGGGGG.png";

// {'x':0,'y':0,'corners':["rock","rock","grass","grass","water","grass",],'placed':True}
window.onload = function() {
    console.log("File loaded");
    scaleCoordinates(120, 130);
    clearCanvas();
    drawBoard();
}

/*placeTileC=funciton(tile){
  var x=tile.x;
  var y=tile.y;
  placeTile(getTile(Math.floor(x-(y*2)),(3*y)/4),getTile(xScale*Math.floor(x-(y*2)),yScale*y).y,rotation);
}*/
revertX=function(x,y){return x + ((8/3)*y);}
revertY=function(y){return (4/3)*y;}


function drawBoard() {
    for (var i = 0; i < tiles.length; i++) {
        console.log("Drawing a tile... X=" + tiles[i].x + ", Y=" + tiles[i].y)
        var x=tiles[i].x;
        var y=tiles[i].y;
        context.drawImage(
            tiles[i].placed ? realTile : emptyTile,
            Math.floor(x-(y*2)),
            (3*y)/4,
            xS,
            yS
        )
    }
}

function clearCanvas() {
    "use strict";
    context.clearRect(0, 0, width, height);
}
/*
setInterval(function () {
    "use strict";
    scaleCoordinates(120, 130);
    clearCanvas();
    drawBoard();
}, 1000 / 200);
*/
