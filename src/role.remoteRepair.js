var roleRemoteRepair = {

    run: function(creep){

        //const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_WALL) && structure.hits < structure.hitsMax;}});

         var flag = Game.flags.Claim;
        //var link1 = Game.getObjectById('59aac0d94057e852a824c842');
        var source = Game.getObjectById('5982fc22b097071b4adbce38');
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER);}});
        
                        
       if (creep.room != Game.flags["Claim"].room){
            creep.moveTo(Game.flags["Claim"]);
        }
        
        if(creep.room != Game.flags["Claim"].room && creep.carry.energy < creep.carryCapacity && !creep.memory.building){
            if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
        
        
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
            /*if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }*/
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            /*else{
                const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
                minTarget = _.min(repairTargets, 'hits')
                if(repairTargets.length > 0) {
                    if(creep.repair(minTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(minTarget);
                    }
                }
            } */
        }
        else{
            
            /*if(containers.length > 0 && creep.carry.energy > 0){
                //console.log(containers[0].store);
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke:"red"}});
                }
            }
            else { */
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            //}
        
        }
    }

};

module.exports = roleRemoteRepair;


/*
var repairSites = creep.pos.findInRange(FIND_STRUCTURES, range, {filter: structure =>
                                                 (structure.structureType != STRUCTURE_ROAD || structure.pos.isNearTo(creep.pos)) && (((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) || structure.hits <= 15000) && structure.hitsMax - structure.hits >= healAmt)});
*/
