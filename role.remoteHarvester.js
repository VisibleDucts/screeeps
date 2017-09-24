var remoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var flag = Game.flags.Claim;
        //var link1 = Game.getObjectById('59aac0d94057e852a824c842');
        var source = Game.getObjectById('5982fc22b097071b4adbce38');
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER);}});
        const total = _.sum(containers.store);
        var targ = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });

        if (creep.room != Game.flags["Claim"].room){
            creep.moveTo(Game.flags["Claim"]);
        }

        if(creep.room != Game.flags["Claim"].room && creep.carry.energy < creep.carryCapacity && !creep.memory.building){
            if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }

       // if(creep.carry.energy == creep.carryCapacity){

            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                //creep.say('🔄 harvest');
            }

            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && targets.length > 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }

            if(creep.memory.building){

                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }

                }
            }
            else if(!creep.memory.building && creep.carry.energy < creep.carryCapacity) {
                //console.log(total);
                if(total > 0){
                    if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke:"#ffffff"}});
                    }
                }
                else{
                    if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                //console.log(targets.length);
            }

           else if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && targ.length > 0){
                if (creep.transfer(targ[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targ[0]);
                }
            }

        //}

    }
};

module.exports = remoteHarvester;
