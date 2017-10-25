var util = require('util');
var carrier = require('hauler.carrier');
var Labs = require('labs');

var hauler = {

    spawn: function(){

    },

    run: function(creep){

       /// Game.creeps.Cole.moveTo(Game.flags['Main'].pos);
        let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(threat){
            util.attacked(creep);
        }
        if (threat && creep.pos.getRangeTo(threat) < 5) {
            let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
            creep.moveByPath(result.path);
            return;
        }

        const goal = creep.memory.goal;
        const job = creep.memory.job;
        const homeID = creep.memory.homeID;
        const resourceT = creep.memory.resourceT;

        var termy = creep.room.terminal;
        var links = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_LINK; }});
        var labs_ = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_LAB; }});

        const total = _.sum(creep.carry);
        var storages = creep.room.storage;

        //NOTE: Information collection.
        if(Game.time % 15 == 0){
            if(termy !== undefined){
                for(var resourceType in termy.store){
                   if(!Memory.rooms[creep.room.name].terminal.resourceType) Memory.rooms[creep.room.name].terminal.resourceType = {};
                   Memory.rooms[creep.room.name].terminal.resourceType[resourceType] = termy.store[resourceType];
                }
            }

            if(storages != undefined){
                for(var resourceType in storages.store){
                    if(!Memory.rooms[creep.room.name].storage) Memory.rooms[creep.room.name].storage = {};
                    if(!Memory.rooms[creep.room.name].storage.resourceType) Memory.rooms[creep.room.name].storage.resourceType = {};
                    Memory.rooms[creep.room.name].storage.resourceType[resourceType] = storages.store[resourceType];
                }
            }
        }

        //console.log('XGH2O' in store_minerals);
        //console.log(boosty);
        if(creep.memory.hauling && total == 0){
            creep.memory.hauling = false;
        }
        if(!creep.memory.hauling && total == creep.carryCapacity) {
            creep.memory.hauling = true;
        }
        ///////////////    JOB LINKS/LABS/TERMINAL   ///////////////////////////

        //NOTE: Needs rewritten .. since I don't know what I had this do..
        if(job == 'links[0]'){
            let labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB && l.energy < l.energyCapacity; }});
            let term = creep.room.terminal;

            ////////////// TERMINAL ////////////////  (loook into this. Is it seperate from the energy withdrawing of labs and links for a reason?)
            if(term != undefined || term != null){

                if(total < creep.carryCapacity){
                    if(term.store[RESOURCE_LEMERGIUM] <= 500){
                        if(storages){
                            if(storages.store[RESOURCE_LEMERGIUM] > 0){
                                if(creep.withdraw(storages, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(storages);
                                    return;
                                }
                            }
                        }
                    }

                    if(term.store[RESOURCE_ENERGY] <= 10000){
                        if(storages){
                            if(storages.store[RESOURCE_ENERGY] > 0){
                                if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(storages);
                                    return;
                                }
                            }
                        }
                    }
                }
                /*   I don't know what this was for.....
                if(total == creep.carryCapacity && creep.carry[RESOURCE_LEMERGIUM] > 0 && labs_[0].mineralAmount != labs_[0].mineralCapacity){
                    if(creep.transfer(labs_[0], RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                        creep.moveTo(labs_[0]);
                        return;
                    }
                }
                */
                if(total == creep.carryCapacity && term.store[RESOURCE_ENERGY] <= 10000){
                    if(term){
                        if(creep.carry.energy > 0){
                            if(creep.transfer(term, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(term);
                                return;
                            }
                        }
                        if(creep.transfer(term, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                            creep.moveTo(term);
                            return;
                        }
                    }
                }
            }
            ////////////////// LINKS + LABS /////////////////////////
            if(links.length){
                if(total < creep.carryCapacity){
                    let lookyHere = Game.flags['Recycle'].pos.lookFor(LOOK_STRUCTURES);
                    let specialCan = _.filter(lookyHere, (s) => {return s.structureType === STRUCTURE_CONTAINER;});
                    if(specialCan.length && _.sum(specialCan[0].store) >= creep.carryCapacity){
                        for(resourceType in specialCan[0].store){
                            if(creep.withdraw(specialCan[0],resourceType) === ERR_NOT_IN_RANGE){
                                creep.moveTo(specialCan[0]);
                                return;
                            }
                        }
                    }
                    if(creep.withdraw(links[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                        creep.moveTo(links[0]);
                        return;
                    }
                }
                /* here we are again with L and labs stuff ...  what was this originallyyy
                if(total == creep.carryCapacity && creep.carry[RESOURCE_LEMERGIUM] > 0){
                    if(labs_ && storages && labs_[0].mineralAmount == labs_[0].mineralCapacity){
                        if(creep.transfer(storages, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                            return;
                        }
                    }
                }
                */
                //At least I understand this... fill labs up with energy...and move shit to storage
                if(total === creep.carryCapacity){
                    if(labs.length){
                        if(creep.transfer(labs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(labs[0]);
                            return;
                        }
                    }
                    if(storages != undefined || storages != null){
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(storages, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(storages);
                                return;
                            }
                        }
                    }
                }
            }
        }
        if(job === 'storageToTerm'){
            if(!creep.memory.hauling){

                if(creep.room.storage !== undefined){
                    if(creep.room.terminal !== undefined && creep.room.terminal.store.energy < 10000){
                        if(creep.withdraw(creep.room.storage, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                        return;
                    }
                    if(creep.room.storage.store['X'] > 0){
                        if(creep.withdraw(creep.room.storage, 'X') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                    }
                    return;
                }
            }
            if(creep.memory.hauling){
                if(creep.room.terminal !== undefined && creep.room.terminal.store.energy < 10000){
                    if(creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.terminal);
                        return;
                    }
                }
                if(creep.carry['X'] > 0){
                    if(creep.transfer(creep.room.terminal, 'X') === ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.terminal);
                        return;
                    }
                }
            }
        }
        if(job === 'termToStorage'){
            if(!creep.memory.hauling){
                /*
                if(storages.store['energy'] > 200000){
                    if(creep.withdraw(storages,'energy') === ERR_NOT_IN_RANGE){
                        creep.moveTo(storages);
                        return;
                    }
                    return;
                }
                */
                if(Game.getObjectById('59ede008e7b420581617af49') !== null && Game.getObjectById('59ede24466102e61dc1b41f3') !== null){
                    if(_.sum(Game.getObjectById('59ede24466102e61dc1b41f3').store) < Game.getObjectById('59ede24466102e61dc1b41f3').storeCapacity || _.sum(Game.getObjectById('59ede008e7b420581617af49').store) < Game.getObjectById('59ede008e7b420581617af49').storeCapacity){
                        if(storages !== undefined){
                            if(storages.store.energy > 200000){
                                if(creep.withdraw(storages, 'energy') === ERR_NOT_IN_RANGE){
                                    creep.moveTo(storages);
                                    return;
                                }
                                return;
                            }
                        }

                        if(creep.withdraw(termy, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(termy);
                            return;
                        }
                        return;
                    }
                }

                if(termy !== undefined && termy.store['energy'] > 50000 && storages.store['energy'] < 150000){
                    if(creep.withdraw(termy, 'energy') === ERR_NOT_IN_RANGE){
                        creep.moveTo(termy);
                        return;
                    }
                    return;
                }
            }
            if(creep.memory.hauling){
                if(Game.getObjectById('59ede008e7b420581617af49') !== null){
                    if(_.sum(Game.getObjectById('59ede008e7b420581617af49').store) < Game.getObjectById('59ede008e7b420581617af49').storeCapacity){
                        if(creep.transfer(Game.getObjectById('59ede008e7b420581617af49'), 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.getObjectById('59ede008e7b420581617af49'));
                            return;
                        }
                        return;
                    }
                }
                if(Game.getObjectById('59ede24466102e61dc1b41f3') !== null){
                    if(_.sum(Game.getObjectById('59ede24466102e61dc1b41f3').store) < Game.getObjectById('59ede24466102e61dc1b41f3').storeCapacity){
                        if(creep.transfer(Game.getObjectById('59ede24466102e61dc1b41f3'), 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.getObjectById('59ede24466102e61dc1b41f3'));
                            return;
                        }
                        return;
                    }
                }
                if(storages){
                    if(storages.store.energy < 150000){
                        if(creep.transfer(storages, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                            return;
                        }
                    }
                }
            }
        }

        if(job === 'removal'){
            if(creep.carry['energy'] > 0){
                if(creep.transfer(storages, 'enery') === ERR_NOT_IN_RANGE){
                    creep.moveTo(storages);
                    return;
                }
            }

            //Labs.remove(creep, 'O');
            Labs.remove(creep, 'XUHO2');
            Labs.remove(creep, 'X');
            return;

        }
        if(job === 'fill'){

            if(creep.carry['energy'] > 0){
                if(creep.transfer(storages, 'energy') === ERR_NOT_IN_RANGE){
                    creep.moveTo(storages);
                    return;
                }
            }


            //Labs.fill(creep, 'W43S27', 2, 'UHO2');
            //Labs.fill(creep, 'W43S27', 0, 'X');

            Labs.fill(creep, 'W43S27', 5, 'UHO2');
            //Labs.fill(creep, 'W43S27', 7, 'X');
            return;

        }

        if(job == 'carrier'){
            carrier.run(creep);
            return;
        }

        ///// NORMAL HAULING, aka, grab from containers/links/storage and fill spawn and extensions. /////////
        //  Energy Grabbing //
        if(!creep.memory.hauling && job == 'normal' && (total < creep.carryCapacity)){



            var can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s)=>{
                return (s.structureType === STRUCTURE_CONTAINER &&
                        s.store[RESOURCE_ENERGY] >= creep.carryCapacity
                        && s.id !== '59ddc09e0f1c423b1ae747c5' && s.id !== '59ede008e7b420581617af49' && s.id !== '59ede24466102e61dc1b41f3')
                    }
                });

            if(creep.memory.homeID === 2){

                if(links.length){
                    if(links[3].energy >= creep.carryCapacity){
                        if(creep.withdraw(links[3], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(links[3]);
                            return;
                        }
                    }
                }

                if(Game.getObjectById('59dee0d4379f694de8ce08ec') != null){
                    var specialCan = Game.getObjectById('59dee0d4379f694de8ce08ec');
                }

                if(specialCan.store['K'] >= creep.carryCapacity){
                    if(creep.withdraw(Game.getObjectById('59dee0d4379f694de8ce08ec'), 'K') === ERR_NOT_IN_RANGE){
                        creep.moveTo(Game.getObjectById('59dee0d4379f694de8ce08ec'));
                        return;
                    }
                }
                if(creep.room.terminal !== undefined){
                    if(creep.room.terminal.store['energy'] > 15000){
                        if(creep.withdraw(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                        return;
                    }
                }
            }

            if(creep.memory.homeID === 3){
                if(creep.room.storage !== undefined){
                    //NOTE: FIREHOSE
                    if(creep.room.storage.store.energy < 150000){
                        if(creep.room.terminal !== undefined){
                            if(creep.room.terminal.store.energy > 50000){
                                if(creep.withdraw(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: 'blue'}});
                                    return;
                                }
                            }
                        }
                    }

                    /* NOTE: diable for now.
                    if(creep.room.storage.store['X'] > 0){
                        if(creep.withdraw(creep.room.storage, 'X') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                    }
                    */
                }
            }

            //NOTE: Not using memory, becuase creeps don't respond to dropped resources when I did.
            let dropped = creep.room.find(FIND_DROPPED_RESOURCES);

            if(dropped.length){
                if(creep.pickup(dropped[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(dropped[0]);
                    return;
                }
            }

            if(can !== null){
                for(var resourceType in can.store){
                    if(creep.withdraw(can, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can, {visualizePathStyle: {stroke: "#00aaFF"}});
                        return;
                    }
                }
            }
            //NOTE: if there is a storage and spawn needs energy, take from storage.
            if(storages !== undefined && creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                if(storages.store[RESOURCE_ENERGY] > 0){
                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                        return;
                    }
                }
            }
        }

        // Energy Storing //
        if(creep.memory.hauling && job === 'normal') {

            //NOTE: if true, repair roads walked on.
            if(creep.memory.roads){
                let road = creep.pos.lookFor(LOOK_STRUCTURES) // , {filter: (s) => {return s.structureType == STRUCTURE_ROAD;}});

                if(road.length && road[0].structureType == STRUCTURE_ROAD){
                    creep.repair(road[0]);
                }
            }


            /*
            creep.carry['KH'] > 0 || creep.carry['GO'] > 0
            || creep.carry['ZH'] > 0 || creep.carry['KO'] > 0
            || creep.carry['H'] > 0 || creep.carry['K'] > 0
            || creep.carry['L'] > 0 || creep.carry['O'] > 0
            || creep.carry['LH2O'] > 0 || creep.carry['XGHO2'] > 0
            */
            let minerals = {'O': true, 'H':true,'L':true,
                'K':true,'Z':true,'U':true,'G':true,'GO':true,
                'GH':true,'KH':true,'OH':true,'LH':true,'KO':true,
                'XGHO2':true,'XGH2O':true, 'LH2O':true};
            if(creep.room.energyAvailable === creep.room.energyCapacityAvailable || minerals in creep.carry){
               // if(total > 0){

                if(storages !== undefined){
                    for(const resourceType in creep.carry) {
                        if(creep.transfer(storages, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
                return;
            }

            if(total > 0) {
                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => { return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity; }});

                if(targets !== undefined && creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
                //NOTE w45s22
                if(creep.memory.homeID === 3){
                    if(creep.room.energyAvailable === creep.room.energyCapacityAvailable){
                        if(storages !== undefined){
                            for(const resourceType in creep.carry) {
                                if(creep.transfer(storages, resourceType) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(storages, {visualizePathStyle: {stroke: '#ffffff'}});
                                    return;
                                }
                            }
                        }
                    }
                    if(creep.room.terminal !== undefined && creep.room.terminal.store.energy < 10000){
                        if(creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                    }
                    if(creep.carry['X'] > 0){
                        if(creep.transfer(creep.room.terminal, 'X') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                    }
                }

                if(creep.room === Game.rooms['W45S28'] && creep.room.energyAvailable === creep.room.energyCapacityAvailable){
                    if(Game.getObjectById('59ddc09e0f1c423b1ae747c5') !== null && Game.getObjectById('59ddc09e0f1c423b1ae747c5').store[RESOURCE_ENERGY] < 1500){
                        if(creep.transfer(Game.getObjectById('59ddc09e0f1c423b1ae747c5'), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.getObjectById('59ddc09e0f1c423b1ae747c5'), {visualizePathStyle: {stroke: '#ffffff'}});
                            return;
                        }
                    }
                }


                //NOTE: W43S28
                if(creep.memory.homeID === 2){
                    if(creep.room.terminal !== undefined && creep.room.terminal.store.energy < 15000){
                        if(creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal);
                            return;
                        }

                    }
                }

            }
        }
    }
};

module.exports = hauler;
