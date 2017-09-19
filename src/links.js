var links = {

  run: function(links){

    //console.log(links);
    if(links.length > 0){
       //console.log(links[0]);
       if(links[0].energy == links[0].energyCapacity){
           links[0].transferEnergy(links[1]);
       }
    }
     /* if(link1.energy > 149){
          link1.transferEnergy(link2);
      } */
  }

};

module.exports = links;
