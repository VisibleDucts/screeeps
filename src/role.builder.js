var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);}
        });
        const targetx = creep.room.find(FIND_DROPPED_RESOURCES);
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
                minTarget = _.min(repairTargets, 'hits')
               // repairTargets.sort((a,b) => a.hits - b.hits);
                //console.log(repairTargets.length);
                if(repairTargets.length > 0) {
                    if(creep.repair(minTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(minTarget);
                    }
                }
            }
        }
        else {
            var sourcesOG = creep.room.find(FIND_SOURCES_ACTIVE);
             if(targetx.length > 0) {
                if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetx[0]);
                }
                    
            }
            else if(creep.harvest(sourcesOG[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(sourcesOG[0], {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }


    }

};

module.exports = roleBuilder;
