const util = require('util');

var remote = {

    run: function(creep) {

        const goal = creep.memory.goal;
        const sourceID = creep.memory.sourceID;
        const canID = creep.memory.canID;

        if(goal === null) return;

        let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(threat){
            util.attacked(creep);
        }
        if(threat && creep.pos.getRangeTo(threat) < 5){
            let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
            creep.moveByPath(result.path);
            return;
        }
        if(creep.room.controller !== undefined){
            if(creep.room.controller.sign === undefined) {
                if (creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                    return;
                }
            }
        }

        if(!creep.pos.isEqualTo(Game.flags[goal])){
            creep.moveTo(Game.flags[goal], {visualizePathStyle: {stroke: '#FFFFFF'}});
            return;
        }
        if(creep.pos.isEqualTo(Game.flags[goal])){
            let can = creep.room.find(FIND_STRUCTURES, { filter: function(s){ return (s.structureType == STRUCTURE_CONTAINER)}});
            let source = Game.getObjectById(sourceID);

            if(can.length && can[canID] !== undefined) var total = _.sum(can[canID].store);

            //Do you do anything?
            //if(canID == undefined || canID == null) return;

            if(can[canID] !== undefined && can[canID].hits < 200000 && creep.carry.energy > 0){
                creep.repair(can[canID]);
            }

            if(can.length > 0 && can[canID] != undefined && total < 2000){//can[canID].store[RESOURCE_ENERGY] < 2000){
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                if(creep.carry.energy === creep.carryCapacity){
                    creep.drop(RESOURCE_ENERGY);
                    return;
                }
            }
            /*
            if(creep.room === Game.rooms['W45S27']){
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }

                if(_.sum(can[canID].store) === can[canID].storeCapacity){
                    if(can[canID+1] !== undefined || can[canID+1] !== null && _.sum(can[canID+1].store) < can[canID].storeCapacity){
                        if(creep.carry.energy === creep.carryCapacity){
                            creep.transfer(can[canID+1], 'energy');
                            return;
                        }
                    }
                }
                if(creep.carry.energy === creep.carryCapacity){
                    creep.drop(RESOURCE_ENERGY);
                    return;
                }


            }
            */
            /*else if(source.energy == 0 || (can[canID] != undefined && can[canID].store[RESOURCE_ENERGY] == 2000)){
                let repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                            return ((s.structureType == STRUCTURE_CONTAINER && s.hits < 200000)
                                    || (s.structureType == STRUCTURE_ROAD && s.hits < 3000))
                        }});

                if(repairTargets.length){
                    if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairTargets[0]);
                        return;
                    }
                }
            }*/
            if(can.length == 0 || can[canID] == undefined){ //console.log(source)
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    return;
                }
            }
        }
    }
};

module.exports = remote;
