var roleTower = {

    run: function(tower){
        var AllianceMembers = ["Shylo132", "mnuck", "Name"];
        const hurtCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                && (p.owner.username != 'mnuck')
                && (p.owner.username != 'LordPong')
                && (p.owner.username != 'complexQuanta')
                && (p.owner.username != 'Augl')
                && (p.owner.username != 'mightyleguan')
                && (p.owner.username != 'pragmascript');
            }
        });
        if(tower) {
            const repairTargets = tower.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});
            const can = tower.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});


            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            var minClose = _.min(repairTargets, 'hits');

            if(tower.energy > 600 && !closestHostile){
                if(repairTargets) {
                    tower.repair(minClose);
                }
            }
            if(closestHostile) {
                tower.attack(closestHostile);
            }

            if(!closestHostile && hurtCreep) {
                tower.heal(hurtCreep)
            }


        }
    }
};
module.exports = roleTower;
