//Key events
document.onkeydown = function(e) {
  if (tilePhase) {
    switch (e.keyCode) {
        case 32: // Space
            console.log("Rotate");
            break;
        case 84: // T
          if (activePlayer.settlement < 4){
            toggleSettlement();
            console.log("Settlement Toggle");
            break;
          }
      }
   }
};



function nextTileTurn(){
  settlementFlag = false; //TODO turn visual element off
  activePlayer = nextPlayer(); //TODO function that returns next player
  activeTile = nextTile(); //function that returns new tile.
  //wait untill tile is placed.
}

function nextTokenTurn(){
  activePlayer = nextPlayer();
  //wait untill token is placed.
}


function toggleSettlement(){
  if {activeTile.token == nil} {
    activeTile.token = ["Settlement", activePlayer.color];
    settlementFlag = true; //TODO turn visual element on
    activePlayer.settlements++; //increment settlement count
  } else {
    activeTile.token == nil;
    settlementFlag = false; //TODO turn visual element off
    activePlayer.settlements--; //decrement settlement count
}


//++++ Main loop ++++ //

function cliffBae(tiles){ //num of tiles (total)
  var numTiles = tiles;
  black = new player("Black", 0, 0);
  white = new player("White", 0, 0);

  //========================================
  activePlayer = decideFirstTilePlayer(); //TODO
  while(numTiles > 0) {//while we're placing tiles:

  //turn-over timer - after tile placement, start timer.
  setTimeout(nextTileTurn(), 15000); //15 sec
  } //======================================
  activePlayer = decideFirstTokenPlayer(); //TODO
  while(validMovesExist()){//spooky. FIXME //while we're placing tokens:



  //turn-over timer - after token placement, start timer.
  setTimeout(nextTokenTurn(), 5000); //5 sec
  } //======================================
  if(black.score() > white.score()){
    //Call in the police.
  }else{
    //WHOOP WHOOP IT'S THE SOUND OF THE SPACE POLICE.
  }
}

class player{
  constructor{

  }
}
