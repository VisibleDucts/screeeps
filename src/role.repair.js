var roleRepair = {

    run: function(creep){

        //const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_WALL) && structure.hits < structure.hitsMax;}});

        //console.log(_.min(repairTargets, 'hits'));
        //repairTargets.sort((a,b) => a.hits - b.hits);
        
         const targetx = creep.room.find(FIND_DROPPED_RESOURCES);
            var shylo = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(
                        (structure.structureType == STRUCTURE_WALL && structure.hits < 30000)
                    || (structure.structureType == STRUCTURE_RAMPART && structure.hits < 10000)
                    || (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax))}
                });
                
                const shylo2 = creep.room.find(FIND_STRUCTURES, {filter: (structure) => { return((structure.structureType == STRUCTURE_WALL && structure.hits < 30000) || (structure.structureType == STRUCTURE_RAMPART && structure.hits < 10000) || (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax))}});
                
      //console.log(structure);
          
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.building) {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});
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
                //}
        }
    }

};

module.exports = roleRepair;


/*
var repairSites = creep.pos.findInRange(FIND_STRUCTURES, range, {filter: structure =>
                                                 (structure.structureType != STRUCTURE_ROAD || structure.pos.isNearTo(creep.pos)) && (((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) || structure.hits <= 15000) && structure.hitsMax - structure.hits >= healAmt)});
*/
