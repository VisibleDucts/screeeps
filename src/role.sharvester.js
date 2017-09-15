//Memory.y = 0;

var roleSHarvester = {
    
        /** @param {Creep} creep **/
        run: function(creep, loc, sources) {
            //console.log(sources);
           // console.log(creep.pos + ' ' + Game.flags[loc.toString()].pos);
            if(loc){
                if(creep.pos.toString() !=  Game.flags[loc.toString()].pos.toString()){
                    creep.moveTo(Game.flags[loc.toString()].pos);
                     
                }
               // console.log(creep.pos != Game.flags[loc.toString()].pos);
               else{
                    var can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER)}});

                    if(can && can.store[RESOURCE_ENERGY] < 2000){
                        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } 
                }
            }
            else{
                console.log(sources);
                
                /*var sources = Game.getObjectById('5982fc22b097071b4adbce34');
                var can = Game.getObjectById('59b3e1e35d483d3f7281829b');
                
                if(can && can.store[RESOURCE_ENERGY] < 2000){
                    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } */
            }
                
               
            
        }
    };
    
    module.exports = roleSHarvester;