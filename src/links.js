var roleLinks = {
  
  run: function(links){
      var link1 = Game.getObjectById('59aac0d94057e852a824c842');
      var link2 = Game.getObjectById('59aac7e8639a424c2f8fca1b');
      
      if(link1.energy > 149){
          link1.transferEnergy(link2);
      }
  }
    
};

module.exports = roleLinks;