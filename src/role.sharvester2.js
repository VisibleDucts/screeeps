var roleSHarvester2 = {
    
        /** @param {Creep} creep **/
        run: function(creep) {
        
        
        
        if(creep.pos != '[room W43S27 pos 45,13]'){
            creep.moveTo(45,13);
        }
        else{
            //console.log(creep.pos);
  
            var can = Game.getObjectById('59b3e88adc43b14dbbe76d54');
            var sources = Game.getObjectById('5982fc22b097071b4adbce33');
            const total = _.sum(can.store);
            //console.log(total);
            
            if(total < 2000){
                 if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
    };
    
    module.exports = roleSHarvester2;