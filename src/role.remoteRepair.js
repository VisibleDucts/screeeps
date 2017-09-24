var remoteRepair = {

    run: function(creep, loc){

        //Game.creeps.Nathaniel.moveTo(13, 37)

        
        if (Game.flags[loc] == undefined){
            console.log('No ' + loc + ' Flag Found?');
            return;
        }
        else{
            if (creep.room != Game.flags[loc].room) {
                creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                return;
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


        if((creep.room == Game.flags[loc].room) && creep.carry.energy < creep.carryCapacity && !creep.memory.building){
            const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
            var can = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return (s.structureType == STRUCTURE_CONTAINER);}});

            if(targetx.length > 0) {
                if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetx[0], {reusePath: 50});
                    }

            }
            else if(can.length > 0 && can[0].store[RESOURCE_ENERGY] >= creep.carryCapacity){
                if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(can[0], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
            }
            if(can.length > 1 && can[1].store[RESOURCE_ENERGY] >= creep.carryCapacity && creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(can[1], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
            }


        }


        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                        return ((s.structureType == STRUCTURE_CONTAINER && s.hits < 200000)
                                || (s.structureType == STRUCTURE_ROAD && s.hits < 3000))
                    }});

            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return;
                }
            }
            else{
                if(repairTargets.length > 0) {
                    creep.say('Oh dear me');
                    if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairTargets[0]);
                        return;
                    }
                }
               /* if(repairCans){
                    creep.say('Can time!')
                    let lowest = _.min(repairCans, 'hits');
                //  console.log(repairCans[0]);
                    if(creep.repair(repairCans[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(repairCans[0]);
                    }
                } */
            }
        }
               if(creep.room.controller.sign == undefined){
                    if(creep.room.controller) {
                        if (creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society") == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                            return;
                        }
                    }
                }
        }

};

module.exports = remoteRepair;
