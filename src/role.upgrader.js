var roleUpgrader = {

        /** @param {Creep} creep **/
        run: function(creep) {
            
            var can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)}});
            const targety = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            var storages = creep.room.storage;
            //console.log(storages);
            if (creep.memory.role == 'upgrader'){
                creep.moveTo(Game.flags["Harvest1"].room);
            }
            
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
               // var sources = Game.getObjectById('5982fc88b097071b4adbdabe');
                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                if(targety) {
                    if(creep.pickup(targety) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targety);
                    }
                }
                else if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 0){
                    if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0], {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
                }
                 else if(storages != undefined && storages.store[RESOURCE_ENERGY] > 0){
                        //console.log(storages);
                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                           
                        creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                    }
                }
                
                else if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                
            }
            if(creep.room.controller.sign == undefined){
                if(creep.room.controller) {
                    if(creep.signController(creep.room.controller, "[Unity Alliance] Territory") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    };

    module.exports = roleUpgrader;
