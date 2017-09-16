var roleUpgrader = {

        /** @param {Creep} creep **/
        run: function(creep) {
            
           // Game.creeps.Dylan.moveTo(new RoomPosition(25, 20, 'W43S27'));
            //Game.creeps.Emma.moveTo(new RoomPosition(25, 20, 'W43S27'));
            var can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)}});
            const targety = creep.room.find(FIND_DROPPED_RESOURCES);
            var storages = creep.room.storage;
            //console.log(storages);
             var links = creep.room.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_LINK;}});


            
            /*if (creep.memory.role == 'upgrader'){
                creep.moveTo(Game.flags["Harvest1"].room);
            } */
            
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if(creep.memory.upgrading && creep.room.controller != ERR_NOT_OWNER) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
               // var sources = Game.getObjectById('5982fc88b097071b4adbdabe');
               if(Game.flags['Home2'].room == creep.room){
                    if(links == undefined) return;
                    if(links[1].energy >= creep.carryCapacity && creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(links[1])
                    }
                    else{
                        if(storages.store[RESOURCE_ENERGY] > 0){
                            if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                            }
                        }
                    }
               }
               else{
               
                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                 if(storages.store[RESOURCE_ENERGY] > 0){
                        if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                    }
                }
                if(targety) {
                    //creep.say(targety);
                   //console.log(targety);
                    if(creep.pickup(targety) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targety);
                    }
                }
                else if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 200){
                    if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0], {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
                }
                if(storages.store[RESOURCE_ENERGY] > 0){
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
                   if (creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
            }
        }
    };

    module.exports = roleUpgrader;
