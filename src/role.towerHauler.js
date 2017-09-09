var roleTowerHauler = {

        /** @param {Creep} creep **/
        run: function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                /*if(Game.rooms['W34S38'].energyAvailable < Game.rooms['W34S38'].energyCapacityAvailable){
                    if(creep.room.storage.store[RESOURCE_ENERGY] > 0){
                        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke:"red"}});
                        }
                    }
                } 
                
                else{ */
                    
                    var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                //}
            }


            else {
                //var tower = Game.getObjectById('59a6fdbb06441679bbeb1e0b');
                var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType == STRUCTURE_TOWER)
                    }
                });
                
                //if(tower[0].energy >= 600 && tower[1].energy < tower[1].energyCapacity){
                if(tower.length > 0){
                    if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#000000'}});
                    }
                }
                /*else if(tower[1].energy == tower[1].energyCapacity){
                    if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#000000'}});
                    }
                } */
            }
        }
};

    module.exports = roleTowerHauler;
