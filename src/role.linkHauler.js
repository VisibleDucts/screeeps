const util = require('util');

var linkHauler = {

    run: function(creep){
        let homeID = creep.memory.homeID;
        util.attacked(creep);

        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('Grabbing');
        }

        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }

        if(!creep.memory.hauling){
            let links = creep.room.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType === STRUCTURE_LINK;}});
            if(homeID === 1){
                var can = Game.getObjectById('59db7730ede6543293590dc7');
                if(can && can.store[RESOURCE_ENERGY] >= 200 && (creep.withdraw(can, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)){
                    creep.moveTo(can);
                    return;
                }
            }
            else if(homeID === 2){
                let storages = creep.room.storage;
                let total = _.sum(creep.carry);
                if(links.length){
                    if(links[3].energy > 0 && total < creep.carryCapacity){// links[3].energyCapacity){
                        if(creep.withdraw(links[3], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(links[3]);
                            return;
                        }
                    }
                }
                if(storages !== undefined && storages.store[RESOURCE_ENERGY] >= creep.carryCapacity){
                    if(creep.withdraw(storages, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                        creep.moveTo(storages);
                        return;
                    }
                }
            }
            else if(homeID === 3){
                if(creep.memory.job === undefined || creep.memory.job === null) return;
                if(creep.memory.job === 'can'){
                    let looky = Game.flags.HarvestR3_1.pos.lookFor(LOOK_STRUCTURES);
                    let can = _.filter(looky, (s) => {return s.structureType === STRUCTURE_CONTAINER;});
                    if(can.length){
                        if(creep.withdraw(can[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(can[0]);
                            return;
                        }
                    }
                }
                if(creep.memory.job === 'storage'){
                    if(links.length && links[1].energy > 0){
                        if(creep.withdraw(links[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(links[1]);
                            return;
                        }
                    }
                }
            }
            else if(homeID === 4){
                if(creep.memory.job === null) return;
                if(creep.memory.job === 'can'){
                    let looky = Game.flags.HarvestR4_1.pos.lookFor(LOOK_STRUCTURES);
                    let can = _.filter(looky, (s) => {return s.structureType === STRUCTURE_CONTAINER;});
                    if(can.length){
                        if(creep.withdraw(can[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(can[0]);
                            return;
                        }
                    }
                }
                if(creep.memory.job === 'storage'){
                    if(links.length && links[1].energy > 0){
                        if(creep.withdraw(links[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(links[1]);
                            return;
                        }
                    }
                }
            }
            else if(homeID === 5){
                if(creep.memory.job === null) return;
                if(creep.memory.job === 'can'){
                    let looky = Game.flags.HarvestR5_1.pos.lookFor(LOOK_STRUCTURES);
                    let can = _.filter(looky, (s) => {return s.structureType === STRUCTURE_CONTAINER;});
                    if(can.length){
                        if(creep.withdraw(can[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(can[0]);
                            return;
                        }
                    }
                }
                if(creep.memory.job === 'storage'){
                    if(links.length && links[1].energy > 0){
                        if(creep.withdraw(links[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(links[1]);
                            return;
                        }
                    }
                }
            }
        }

        if(creep.memory.hauling){
            let links = creep.room.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_LINK;}});

            if(homeID === 1){
                if(links.length > 0){
                    if(creep.transfer(links[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                       creep.moveTo(links[1]);
                    }
                }
                return;
            }
            if(homeID === 2){
                if(links.length > 0 && _.sum(creep.carry) > 0){
                    if(links[0].energy < links[0].energyCapacity){
                        if(creep.transfer(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                           creep.moveTo(links[0]);
                           return;
                        }
                        return;
                    }
                }
                if(creep.room.terminal !== undefined && _.sum(creep.room.terminal.store) < creep.room.terminal.storeCapacity){
                    if(creep.room.terminal.store.energy < 5000){
                        if(creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: 'yellow'}});
                            return;
                        }
                        return;
                    }
                }
                return;
            }
            if(homeID === 3){
                if(creep.memory.job === undefined || creep.memory.job === null) return;
                if(creep.memory.job === 'can'){
                    if(links.length && links[0].energy < links[0].energyCapacity){
                        if(creep.transfer(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                           creep.moveTo(links[0]);
                        }
                    }
                    return;
                }
                if(creep.memory.job === 'storage'){
                    let storage = creep.room.storage;
                    if(storage !== undefined){
                        if(creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }
                    return;
                }
            }
            if(homeID === 4){
                if(creep.memory.job === undefined || creep.memory.job === null) return;
                if(creep.memory.job === 'can'){
                    if(links.length && links[0].energy < links[0].energyCapacity){
                        if(creep.transfer(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                           creep.moveTo(links[0]);
                        }
                    }
                    return;
                }
                if(creep.memory.job === 'storage'){
                    let storage = creep.room.storage;
                    if(storage != undefined || storage != null){
                        if(creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }
                    return;
                }
            }
            if(homeID === 5){
                if(creep.memory.job === undefined || creep.memory.job === null) return;
                if(creep.memory.job === 'can'){
                    if(links.length && links[0].energy < links[0].energyCapacity){
                        if(creep.transfer(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                           creep.moveTo(links[0]);
                        }
                    }
                    return;
                }
                if(creep.memory.job === 'storage'){
                    let storage = creep.room.storage;
                    if(storage != undefined || storage != null){
                        if(creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }
                    return;
                }
            }
        }
    }
};

module.exports = linkHauler;
