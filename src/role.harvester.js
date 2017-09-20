var harvester = {

        /** @param {Creep} creep **/
        run: function(creep) {

            var storages = creep.room.storage;
           // console.log(creep.room.conta
            if(creep.carry.energy < creep.carryCapacity) {
                    var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                    if(creep.room == '[room W43S28]'){
                        if(creep.harvest(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}})
                            return;
                        }
                    }
                    else if(creep.room != '[room W43S28]' && creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                        return;
                    }

            }
            else {

                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                //console.log(creep.room.energyAvailable);
                if(storages){
                    if(storages.store[RESOURCE_ENERGY] < storages.storeCapacity && creep.room.energyAvailable > 650){
                        if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages, {visualizePathStyle: {stroke: '#ffffff'}});
                            return;
                        }

                    }
               }
               /* */
                //else
                if(targets.length > 0)  {

                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
            }
        }
    };

    module.exports = harvester;
