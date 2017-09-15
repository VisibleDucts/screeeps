var roleTowerHauler = {

        /** @param {Creep} creep **/
        run: function(creep) {
           
            
            //const targetx = creep.room.find(FIND_DROPPED_RESOURCES);
            const total = _.sum(creep.carry);
            if(total < creep.carryCapacity) {
                /*if(Game.rooms['W34S38'].energyAvailable < Game.rooms['W34S38'].energyCapacityAvailable){
                    if(creep.room.storage.store[RESOURCE_ENERGY] > 0){
                        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke:"red"}});
                        }
                    }
                } 
                
                else{ */
                    
                    var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                   /* if(targetx.length > 0) {
                        if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetx[0]);
                        }
                    } */
                    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                //}
            }


            else {
                //var tower = Game.getObjectById('59a6fdbb06441679bbeb1e0b');
              //  const total = _.sum(creep.carry);
                var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType == STRUCTURE_TOWER)
                    }
                });
                
                //if(tower[0].energy >= 600 && tower[1].energy < tower[1].energyCapacity){
                if(tower.length > 0){
                    if(tower[0].energy < tower[0].energyCapacity){
                        if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#000000'}});
                        }
                    }
                    if(tower[1] != undefined && (tower[1].energy <= tower[0].energy)){
                        if(creep.transfer(tower[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[1], {visualizePathStyle: {stroke: '#000000'}});
                        }
                    } 
                }
                
              /*  if(creep.room.storage){
                    for(const resourceType in creep.carry) {
                        if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage);
                            
                        }
                    }
                } */
                
            }
        }
};

    module.exports = roleTowerHauler;
