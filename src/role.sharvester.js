var util = require('util');

var sharvester = {

        run: function(creep) {
            const goal = creep.memory.goal;
            const sourceID = creep.memory.sourceID;
            let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(threat){
                util.attacked(creep);
            }
            if (threat && creep.pos.getRangeTo(threat) < 5) {
                let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
                creep.moveByPath(result.path);
                return;
            }

            if(goal !== undefined || goal !== null){
                if(!creep.pos.isEqualTo(Game.flags[goal].pos)){
                    creep.moveTo(Game.flags[goal]);
                    return;
                }
                else{
                    if(!creep.memory.canID){
                         let can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => { return s.structureType == STRUCTURE_CONTAINER; }});
                         if(can){
                             creep.memory.canID = can.id;
                         }
                    }
                    if(creep.memory.homeID === 4){
                        if(!Memory.rooms.W45S28.timeInformation) Memory.rooms.W45S28.timeInformation = {};
                        if(!Memory.rooms.W45S28.timeInformation.harvesting) Memory.rooms.W45S28.timeInformation.harvesting = {};
                        if(!Memory.rooms.W45S28.timeInformation.harvesting[sourceID]) Memory.rooms.W45S28.timeInformation.harvesting[sourceID] = {};
                        //let source = Game.getObjectById(sourceID);
                        if(Game.getObjectById(sourceID).energy === Game.getObjectById(sourceID).energyCapacity){
                            creep.memory.startTime = Game.time;
                            if(Game.getObjectById(sourceID).ticksToRegeneration !== undefined){
                                creep.memory.startToR = Game.getObjectById(sourceID).ticksToRegeneration;
                            }
                            else{
                                creep.memory.startToR = 300;
                            }

                        }
                        if(creep.memory.startTime !== undefined && Game.getObjectById(sourceID).energy === 0){
                            creep.memory.endTime = Game.time;
                            creep.memory.endToR = Game.getObjectById(sourceID).ticksToRegeneration;
                            Memory.rooms.W45S28.timeInformation.harvesting[sourceID].harvestTime = creep.memory.endTime - creep.memory.startTime;
                            Memory.rooms.W45S28.timeInformation.harvesting[sourceID].regen_left_at_start = creep.memory.startToR;
                            Memory.rooms.W45S28.timeInformation.harvesting[sourceID].ticksLeftTilRegen = creep.memory.endToR;
                        }
                    }
                    if(creep.memory.canID && Game.getObjectById(creep.memory.canID) != null){
                        var total = _.sum(Game.getObjectById(creep.memory.canID).store);
                    }
                    if(Game.getObjectById(creep.memory.canID) && total < 2000){
                        if(creep.harvest(Game.getObjectById(sourceID)) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(sourceID), {visualizePathStyle: {stroke: '#ffaa00'}});
                            return;
                        }
                    }
                    else if(!Game.getObjectById(creep.memory.canID)){
                        if(creep.harvest(Game.getObjectById(sourceID)) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(sourceID), {visualizePathStyle: {stroke: '#ffaa00'}});
                            return;
                        }
                    }
                }
            }

        }
    };

    module.exports = sharvester;
