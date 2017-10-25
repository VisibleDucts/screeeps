var harvester = {

        run: function(creep) {
            var job = creep.memory.job;
            var storages = creep.room.storage;
            // console.log(creep.room.conta
            if(creep.carry.energy < creep.carryCapacity) {
                if(creep.room === Game.rooms['W38S24']){
                    let source = Game.getObjectById('5982fc58b097071b4adbd3bb');
                    if(source !== null){
                        if(creep.harvest(source), ERR_NOT_IN_RANGE){
                            creep.moveTo(source);
                            return;
                        }
                    }
                }
                else{
                    var sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if(creep.room == '[room W43S28]' || '[room W49S27]'){
                        if(creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}})
                            return;
                        }
                    }
                    else if(creep.room != '[room W43S28]' && creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}})
                        return;
                    }
                }
            }
            else if(job === 'reboot'){
                let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });

                if(targets.length)  {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
            }
            else if(job === 'harvesting'){
                let can = creep.room.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity}});
                let targets = creep.room.find(FIND_STRUCTURES, {
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
               if(targets.length){
                   if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                       creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                       return;
                   }
               }
               //console.log(!targets.length && can.length > 0)
               if(!targets.length && can.length > 0){
                   if(creep.transfer(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                       creep.moveTo(can[0]);
                       return;
                   }
               }
            }
        }
    };

    module.exports = harvester;
