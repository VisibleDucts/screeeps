var roleTower = {
    
    run: function(tower){
        
        const hurtCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(tower) {
            const repairTargets = tower.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});
            const can = tower.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});
            
           // console.log(repairTargets + 'j');
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            var minClose = _.min(repairTargets, 'hits');
           // var ratio = (minClose.hits / minClose.hitsMax) * 100;
                
            if(tower.energy > 600){
                if(repairTargets) {
                    tower.repair(minClose);
                }
            }
            if(closestHostile) {
                tower.attack(closestHostile);
            }
                
            if(hurtCreep) {
                tower.heal(hurtCreep)
            }
            
          
        }
    }
};
module.exports = roleTower;