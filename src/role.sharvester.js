//Memory.y = 0;

var roleSHarvester = {
    
        /** @param {Creep} creep **/
        run: function(creep) {
             var flagName = creep.memory.flag;
            //console.log(Game.flags.flagName
            //console.log(flagName);
            if(creep.room.pos != (34,40)){
                creep.moveTo(34,40);
            }
        
            
                //var sourceID = Game.flags.flagName.memory.sourceID;
                var sources = Game.getObjectById('5982fc22b097071b4adbce34');
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
               
            
                
               
            
        }
    };
    
    module.exports = roleSHarvester;