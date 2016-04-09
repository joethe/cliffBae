//==================== MAIN CONTROLLER ==================================
    angular.module('mainApp').controller('mainCtrl', function(){
        var mainControl = this;
        console.log("Main controller loaded with cliffshit!");

        //here's your damn chifshitz.
        var tiles = [
          {'x'=0,'y'=0,'corners':["rock","rock","grass","grass","water","grass",]},
          {'x'=1,'y'=0,'corners':["grass","grass","grass","grass","grass","rock"]},
          {'x'=1,'y'=-1,'corners':["grass","grass","grass","grass","grass","grass"]}
        ];

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
        getNeighbor[tile,n]{
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
        }
/*
        thing=function(a,b){
          if(a=="empty"){return b}else{if(a==b){return a}else{throw "error: tiles unsynced"}}
        }*/

        //x,y-->void
        syncCorners=function(x,y){
          //my 0 is there 4 ;my 1 is there 3 they are at me + (1,1)
          self.getTile(x+1,y+1).corners[4]=self.getTile(x,y).corners(0);
          self.getTile(x+1,y+1).corners[3]=self.getTile(x,y).corners(1);
          //my 1 is there 5;my 2 is there 4 they are at me + (1,0)
          self.getTile(x+1,y).corners[1]=self.getTile(x,y).corners(5);
          self.getTile(x+1,y).corners[2]=self.getTile(x,y).corners(4);
          //my 2 is there 0;my 3 is there 5 they are at me + (1,-1)
          self.getTile(x+1,y-1).corners[2]=self.getTile(x,y).corners(0);
          self.getTile(x+1,y-1).corners[3]=self.getTile(x,y).corners(5);
          //my 3 is there 1;my 4 is there 0 they are at me + (0,-1)
          self.getTile(x,y-1).corners[3]=self.getTile(x,y).corners(1);
          self.getTile(x,y-1).corners[4]=self.getTile(x,y).corners(0);
          //my 4 is there 2;my 5 is there 1 they are at me + (-1,0)
          self.getTile(x-1,y).corners[4]=self.getTile(x,y).corners(2);
          self.getTile(x-1,y).corners[5]=self.getTile(x,y).corners(1);
          //my 5 is their 3;my 0 is there 2 they are at me + (-1,1)
          self.getTile(x-1,y+1).corners[5]=self.getTile(x,y).corners(3);
          self.getTile(x-1,y+1).corners[0]=self.getTile(x,y).corners(2);
        }

        //corners,corners,int 0-5 --> boolean
        fits=function(array1,array2,rotation){
          for(var i=0;i<6;i++){
            if(array1[i]=="empty"){throw "empty in player piece";}
            if((array2[i]!="empty")&&(array2[i]!=array1[(i+rotation)%6])){
              return false;
            }
          }
        }

        //x,y-> getTile(x,y) or False
        getTile=function(x,y){
          self.tiles.forEach(function(z){
            if (z.x==x&&z.y==y){return z;}
          })
          tiles.push({'x':x,'y':y,'placed':False,'corners':["empty","empty","empty","empty","empty","empty"]});
          return getTile(x,y);
        }

        //getTile(x,y),getNeighbot(getTile(x,y),n)-->boolean
        placeTile=function(myTile,toTile,rotation){
          if(self.fits(myTile.corners,toTile.corners)&&(!(toTile.placed))){
            self.update[myTile,toTile];
            toTile=myTile;
            toTile.placed=True;
            self.syncCorners(toTile);
            return True;
          }else{
            return False;
          }
        }

    });
