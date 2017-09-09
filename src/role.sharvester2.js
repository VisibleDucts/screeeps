var roleSHarvester2 = {
    
        /** @param {Creep} creep **/
        run: function(creep) {
            //var flagName = creep.memory.flag;
            //console.log(Game.flags.flagName
            //console.log(flagName);
            if(creep.room.pos != (45,13)){
                creep.moveTo(45,13);
            }
            
                //var sourceID = Game.flags.flagName.memory.sourceID;
                var sources = Game.getObjectById('5982fc22b097071b4adbce33');
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            
            
                
               
            
        }
    };
    
    module.exports = roleSHarvester2;