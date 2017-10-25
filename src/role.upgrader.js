//var findWay = require('findWay');
var upgrader = {

        /** @param {Creep} creep **/
        run: function(creep) {

            var can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 200)}});
            const targety = creep.room.find(FIND_DROPPED_RESOURCES);
            var storages = creep.room.storage;

            var links = creep.room.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_LINK;}});

            if(creep.memory.boost && (creep.memory.beenboosted === undefined || creep.memory.beenboosted === true)){
                let boosty = _.filter(creep.body, (t) => !t.boost && t.type == 'work');
                //let boostx = _.filter(creep.body, (t) => !t.boost && t.type == 'move');
                let boostLab = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral}});
                //let boostLab2 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral2}});
                if(boostLab.length && boosty.length){
                    if(boostLab[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab[0]);
                        return;
                    }
                }
                //console.log(boostLab[0] + ' ' + creep.name)
              //  if(boosty.length === 0 || boostLab[0].mineralAmount === 0){
                //    creep.memory.boosted = true;
                //}
                /*
                if(boostLab2.length && boostx.length){
                    if(boostLab2[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab2[0]);
                        return;
                    }
                }
                */
            }



            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
            }

            if(creep.memory.job == 'remote' && creep.memory.run && (creep.memory.boosted || creep.memory.boost === false)){
                creep.memory.changeTo = 'upgrader';
                creep.memory.role = 'runner';
                return;
            }

            creep.memory.ticksToLive = creep.ticksToLive;

            if(creep.memory.upgrading && creep.room === Game.rooms['W45S28']){
                let creepHere = Game.flags['upgrade'].pos.lookFor(LOOK_CREEPS);
                let upgradeFlag = Game.flags['upgrade'];
                //console.log(creepHere[0])
                if(creepHere[0] === undefined){
                    if(!creep.pos.isEqualTo(Game.flags['upgrade'].pos)){
                        creep.moveTo(Game.flags['upgrade']);
                        return;
                    }
                }
                if(creepHere[0] !== undefined){
                    if(!creep.pos.isNearTo(Game.flags['upgrade'].pos)){
                        creep.moveTo(Game.flags['upgrade']);
                        return;
                    }
                }
                if(creep.pos.isEqualTo(upgradeFlag.pos) || creep.pos.isNearTo(upgradeFlag.pos)){
                    creep.upgradeController(creep.room.controller);
                    return;
                }
            }
            else if(creep.memory.upgrading && creep.room !== Game.rooms['W45S28']){
                if(creep.memory.upgrading && creep.room.controller != ERR_NOT_OWNER) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                    return;
                }
            }
            /*
            if(!creep.memory.upgrading && creep.memory.homeID === 2){


            }
            */
            if(!creep.memory.upgrading){
                var sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if(creep.room === Game.rooms['W43S28']){
                    if(links == undefined) return;
                    if(links[1].energy >= creep.carryCapacity){
                        if(creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(links[1])
                            return;
                        }
                        return;
                    }
                    else{
                        if(storages && storages.store[RESOURCE_ENERGY] > 0){
                            if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                                return;
                            }
                        }
                        else{
                            if(can.length){
                                if(can[0].store[RESOURCE_ENERGY] > 200){
                                    if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                        creep.moveTo(can[0], {visualizePathStyle: {stroke: "#00aaFF"}});
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
                if(creep.room === Game.rooms['W45S22']){
                    let uCans = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s)=> { return s.structureType === STRUCTURE_CONTAINER && (s.id === '59ede008e7b420581617af49'
                        || s.id === '59ede24466102e61dc1b41f3') && s.store['energy'] > 0}});
                    //console.log(uCans)
                    if(uCans !== null){
                        if(creep.withdraw(uCans, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(uCans);
                            return;
                        }
                        return;
                    }
                    if(creep.room.storage !== undefined){
                        if(creep.room.storage.store.energy > 200000){
                            if(creep.withdraw(creep.room.storage, 'energy') === ERR_NOT_IN_RANGE){
                                creep.moveTo(creep.room.storage);
                                return;
                            }
                            return;
                        }
                    }
                    if(Game.rooms.W45S22.terminal.store.energy > 40000){
                        if(creep.withdraw(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                        return;
                    }
                }
                if(creep.memory.homeID === 4 || creep.room === Game.rooms['W45S28']){
                    if(Game.getObjectById('59ddc09e0f1c423b1ae747c5') != null && Game.getObjectById('59ddc09e0f1c423b1ae747c5').store[RESOURCE_ENERGY] >= creep.carryCapacity){
                        if(creep.withdraw(Game.getObjectById('59ddc09e0f1c423b1ae747c5'), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.getObjectById('59ddc09e0f1c423b1ae747c5'));
                            return;
                        }
                        return;
                    }
                }
                if(creep.memory.homeID != 4 || creep.room != Game.rooms['W45S28'] || Game.getObjectById('59ddc09e0f1c423b1ae747c5').store[RESOURCE_ENERGY] < creep.carryCapacity){

                    if(storages && storages.store[RESOURCE_ENERGY] > 0){
                        if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                            return;
                        }
                        return;
                    }
                    if(targety.length) {
                        if(creep.pickup(targety[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targety[0]);
                            return;
                        }
                        return;
                    }
                    if(creep.memory.break && creep.room == Game.rooms['W45S22']){
                        if(creep.memory.energyTarget === undefined){
                            let can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)}});
                            let source = creep.room.find(FIND_SOURCES_ACTIVE);
                        }
                    }
                    if(can !== undefined){
                        if(creep.withdraw(can, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(can, {visualizePathStyle: {stroke: "#00aaFF"}});
                            return;
                        }
                        return;
                    }
                    else if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                        return;
                    }
                    return;
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

    module.exports = upgrader;
