var util = require('util');

var moreHauler = {


    run: function(creep){


        util.attacked(creep);

        var total = _.sum(creep.carry);
        if(creep.memory.hauling && total == 0){
            creep.memory.hauling = false;
            creep.say('🔄 Retrieving');

        }
        if(!creep.memory.hauling && total == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }

        if(creep.memory.job === 'canHauler'){
            let storage = creep.room.storage;
            if(creep.memory.homeID === 4){
                var can = Game.getObjectById('59ddc09e0f1c423b1ae747c5');
            }

            if(storage != undefined && storage.store[RESOURCE_ENERGY] > 1000 && !creep.memory.hauling){
                if(creep.withdraw(storage,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(storage);
                    return;
                }
            }
            if(creep.memory.hauling && can != undefined || can != null && can.store[RESOURCE_ENERGY] < can.storeCapacity){
                if(creep.transfer(can, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(can);
                    return;
                }
            }
        }

        if(creep.memory.job === 'minerals'){
            let resourceType = creep.memory.resourceType;

            if(creep.ticksToLive < 80) {
                if(creep.room === Game.flags['Home2'].room && total === 0){
                    creep.memory.job = 'death';
                }
            }

            if(creep.memory.job === 'death'){
                if(creep.room === Game.rooms['W43S27']){
                    if(!creep.pos.isEqualTo(Game.flags['Recycle'])){
                        creep.moveTo(Game.flags['Recycle']);
                        return;
                    }
                    if(creep.pos.isEqualTo(Game.flags['Recycle'])){
                        Game.spawns['Spawn1'].recycleCreep(creep);
                        return;
                    }
                }
                if(creep.room === Game.rooms['W43S28']){ creep.say('hi')
                    if(!creep.pos.isEqualTo(Game.flags['Deathzone'])){
                        creep.moveTo(Game.flags['Deathzone']);
                        return;
                    }
                    if(creep.pos.isEqualTo(Game.flags['Deathzone'])){
                        Game.spawns['Spawn2'].recycleCreep(creep);
                        return;
                    }
                }
            }

            if(!creep.memory.hauling){
                let can = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_CONTAINER && s.store[resourceType] > 0}});
                //let storage = creep.room.storage;

                if(can.length){
                    if(creep.withdraw(can[0], resourceType) === ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0]);
                        return;
                    }
                }
            }
            if(creep.memory.hauling){
                let storage = creep.room.storage;
                let terminal = creep.room.terminal;
                let termTotal = _.sum(terminal.store);
                let storeTotal = _.sum(storage.store);
                if(terminal != undefined && termTotal < 200000){
                    if(creep.transfer(terminal, resourceType) === ERR_NOT_IN_RANGE){
                        creep.moveTo(terminal);
                        return;
                    }
                }
                if(storage != undefined && storeTotal < storage.storeCapacity){
                    if(creep.transfer(storage, resourceType) === ERR_NOT_IN_RANGE){
                        creep.moveTo(storage);
                        return;
                    }
                }
            }
        }

        if(creep.memory.job == 'tower'){
            if(!creep.memory.hauling){

                let storages = creep.room.storage;
                let dropped = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (r) => { return r.resourceType == RESOURCE_ENERGY && r.energy > 200;}});

                if(creep.memory.useThisCan === undefined || Game.time % 50 === 0){
                    let can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => { return s.structureType == STRUCTURE_CONTAINER
                        && s.store[RESOURCE_ENERGY] > 49 && s.id != '59ddc09e0f1c423b1ae747c5' && s.id !== '59ede008e7b420581617af49' && s.id !== '59ede24466102e61dc1b41f3';}});

                    if(can != undefined){
                        creep.memory.useThisCan = can.id;
                    }
                }

                if(dropped.length){
                    if(creep.pickup(dropped[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(dropped[0]);
                        return;
                    }
                }
                if(creep.memory.useThisCan !== undefined){
                    let thisCan = Game.getObjectById(creep.memory.useThisCan);
                    if(thisCan.store['energy'] > 49){
                        if(creep.withdraw(thisCan, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                            creep.moveTo(thisCan);
                            return;
                        }
                    }
                    if(thisCan.store['energy'] === 0){
                        creep.memory.useThisCan = undefined;
                        return;
                    }
                }
                if(storages && storages.store[RESOURCE_ENERGY] > 200){
                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages);
                        return;
                    }
                }
                else {
                    let sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if(creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources);
                        return;
                    }
                }
            }
            if(creep.memory.hauling){
                let tower = creep.room.find(FIND_STRUCTURES, { filter: (s) => { return s.structureType == STRUCTURE_TOWER; }});

                if(creep.memory.roads){
                    let road = creep.pos.lookFor(LOOK_STRUCTURES);
                    if(road.length && road[0].structureType == STRUCTURE_ROAD){
                        creep.repair(road[0]);
                    }
                }


                for(i in tower){
                    if(tower[i].energy < tower[i].energyCapacity){
                        if(creep.transfer(tower[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[i], {visualizePathStyle: {stroke: '#000000'}});
                            return;
                        }
                    }
                }
            }




        }

        if(creep.memory.job == 'mineral'){
            if(creep.memory.going == undefined) creep.memory.going = true;
            if(creep.memory.grab == undefined)  creep.memory.grab = false;
            if(creep.memory.reverse == undefined)   creep.memory.reverse = false;


               // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });


            if(creep.memory.going){
                if (Game.flags[goal] == undefined){
                        console.log('No ' + goal + ' Flag Found?');
                        return;
                    }
                else{


                    if(!creep.memory.goal) {
                            creep.memory.goal = 'Claim';
                    }
                    if(creep.memory.reverse == false){
                        switch(creep.memory.goal) {
                            case 'Claim':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                                    creep.memory.goal = 'One';
                                }
                                break;
                            case 'One':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                                    creep.memory.goal = 'NEXT';
                                }
                                break;
                            case 'NEXT':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                                    creep.memory.goal = 'oxygen';
                                }
                                break;
                            case 'oxygen':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.room == Game.flags[creep.memory.goal].room){
                                    creep.memory.grab = true;
                                    creep.memory.going = false;
                                }
                                break;
                        }
                    }
                   if (creep.room != Game.flags[creep.memory.goal].room) {
                        creep.moveTo(Game.flags[creep.memory.goal], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
            }

            if(creep.memory.grab){

                if(creep.ticksToLive < 400){

                }

                let can = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER;}});
                let total = _.sum(creep.carry);
                if(can.length){
                    if(total < creep.carryCapacity){
                        if(creep.withdraw(can[0]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(can[0], {visualizePathStyle: {stroke: 'red'}});
                            return;
                        }
                    }

                }
                if(total == creep.carryCapacity){
                    creep.memory.going = false;
                    creep.memory.grab = false;
                    creep.memory.reverse = true;
                    creep.memory.goal = 'NEXT';
                }
            }


            if(creep.memory.reverse){
                if(!creep.memory.goal) {
                    creep.memory.goal = 'NEXT';
                }

                switch(creep.memory.goal) {
                    case 'NEXT':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'One';
                        }
                        break;
                    case 'One':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'Claim';
                        }
                        break;
                    case 'Claim':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'Main';
                        }
                        break;
                    case 'Main':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        break;
                }

                if(creep.room == Game.flags[creep.memory.goal].room){
                    let storages = creep.room.storage;
                    if(storages){
                        if(total > 0){
                            for(const resourceType in creep.carry) {
                                if(creep.transfer(Game.flags[goal].room.storage, resourceType) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(Game.flags[goal].room.storage);
                                }
                                //return;
                            }
                        }
                    }
                    if(total == 0 && !creep.memory.doom){
                        creep.memory.goal = 'Claim';
                        creep.memory.going = true;
                        creep.memory.reverse = false;
                    }
                }
            }
        }
    }

};
module.exports = moreHauler;
