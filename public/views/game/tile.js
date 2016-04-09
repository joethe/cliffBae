class tile {
  self = this;
  constructor(corners, x, y) {
    self.corners = corners;
    self.token = nil;
    self.x = x;
    self.y = y;
  }
  addToken(token){
    self.token = token;
  }
  goodneighbors(){
    //iterate over corners and return array of coord pairs
    //or misc reference.
  }
  conventionalCoords(){
    //do math
  }
}
