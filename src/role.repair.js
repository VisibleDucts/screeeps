var roleRepair = {

    run: function(creep){
        // Game.creeps.Mason.moveTo(new RoomPosition(25, 20, 'W43S27'));

        
        const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});

        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.building) {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return((structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax) || (structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax) 
                    || (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax) || (structure.structureType == STRUCTURE_ROAD && structure.hits < 3000)  ;}
                
            });
            repairTargets.sort((a,b) => a.hits - b.hits);
            //console.log(repairTargets[0]);
            if(repairTargets.length) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            
                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                if(targetx.length > 0) {
                    if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetx[0]);
                    }
                    
                }
                else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
              /*  let storages = creep.room.storage;
                if(creep.pos != storages.pos){
                        creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                         creep.say('hid');
                         for(const resourceType in creep.carry) {
                            creep.transfer(storages, resourceType);
                        }
                    } */
                
        }
    }

};

module.exports = roleRepair;
