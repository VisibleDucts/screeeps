var util = require('util');

var builder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Game.creeps.Jeremiah.moveTo(new RoomPosition(25, 20, 'W43S27'));

        let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(threat){
            util.attacked(creep);
        }
        if (threat && creep.pos.getRangeTo(threat) < 5) {
            let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
            creep.moveByPath(result.path);
            return;
        }


        if(creep.memory.homeID == 1){
            var room = Memory.rooms.W43S27.roomName;
        }
        else if(creep.memory.homeID == 2){
            var room = Memory.rooms.W43S28.roomName;
        }
        else if(creep.memory.homeID == 3){
            var room = Memory.rooms.W45S22.roomName;
        }
        else if(creep.memory.homeID == 4){
            var room = Memory.rooms.W45S28.roomName;
        }
        else if(creep.memory.homeID === 5){
            var room = Memory.rooms.W38S24.roomName;
        }

        if(creep.memory.boost){
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
            if(boosty.length === 0){
                creep.memory.boosted = true;
            }
            /*
            if(boostLab2.length && boostx.length){
                if(boostLab2[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(boostLab2[0]);
                    return;
                }
            }
            */
        }

        if(creep.memory.run && creep.memory.boosted){
            creep.memory.changeTo = 'builder';
            creep.memory.role = 'runner';
        }
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }



        if(creep.memory.job == 'remote'){
            var goal = creep.memory.goal;
            if(creep.memory.boost){
                let boosty = _.filter(creep.body, (t) => !t.boost && t.type == 'work');
                let boostx = _.filter(creep.body, (t) => !t.boost && t.type == 'move');
                let boostLab = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral}});
                let boostLab2 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral2}});
                if(boostLab.length && boosty.length){
                    if(boostLab[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab[0]);
                        return;
                    }
                }
                if(boostLab2.length && boostx.length){
                    if(boostLab2[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab2[0]);
                        return;
                    }
                }
                creep.memory.going = true;
            }

            if(creep.memory.going){
                /// Long distantion   /////////////
                if(creep.memory.state == undefined) {
                    creep.memory.state = 'Goat';
                }
                switch(creep.memory.state) {
                    case 'Goat':
                        creep.moveTo(Game.flags['Goat']);
                        if(creep.pos.isEqualTo(Game.flags['Goat'])){
                            creep.memory.state = 'Goat2';
                        }
                        break;
                    case 'Goat2':
                        creep.moveTo(Game.flags['Goat2']);
                        if(creep.pos.toString() == Game.flags['Goat2'].pos.toString()){
                            creep.memory.state = 'Goat3';
                        }
                        break;
                    case 'Goat3':
                        creep.moveTo(Game.flags['Goat3']);
                        if(creep.pos.toString() == Game.flags['Goat3'].pos.toString()){
                            creep.memory.state = 'Flag1';
                        }
                        break;
                    case 'oxygen':
                        creep.moveTo(Game.flags['oxygen']);
                        if(creep.pos.toString() == Game.flags['oxygen'].pos.toString()){
                            creep.memory.state = 'Next3.1';
                        }
                        break;
                    case 'Next3.1':
                        creep.moveTo(Game.flags['Next3.1']);
                        if(creep.pos.toString() == Game.flags['Next3.1'].pos.toString()){
                            creep.memory.state = 'Next3.2';
                        }
                        break;
                    case 'Next3.2':
                        creep.moveTo(Game.flags['Next3.2']);
                        if(creep.pos.toString() == Game.flags['Next3.2'].pos.toString()){
                            creep.memory.state = 'Next3.3';
                        }
                        break;
                    case 'Next3.3':
                        creep.moveTo(Game.flags['Next3.3']);
                        if(creep.pos.toString() == Game.flags['Next3.3'].pos.toString()){
                            creep.memory.state = 'Next3.4';
                        }
                        break;
                    case 'Next3.4':
                        creep.moveTo(Game.flags['Next3.4']);
                        if(creep.pos.toString() == Game.flags['Next3.4'].pos.toString()){
                            creep.memory.state = 'Next4';
                        }
                        break;
                    case 'Next4':
                        creep.moveTo(Game.flags['Next4']);
                        if(creep.pos.toString() == Game.flags['Next4'].pos.toString()){
                            creep.memory.state = 'Finish';
                        }
                        break;
                    case 'Flag1':
                        creep.moveTo(Game.flags['Flag1']);
                        break;
                }
                ////////////////

                ////////////////Short Destination
                /*
                if (Game.flags[goal] == undefined){
                    console.log('No ' + goal + ' Flag Found?');
                    return;
                }
                else{
                     if(!creep.pos.isEqualTo(Game.flags[goal].pos)) {
                        creep.moveTo(Game.flags[goal], {ignoreCreeps: false});
                        return;
                    }
                    if (creep.room != Game.flags[goal].room) {
                        creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
                */
                ///////////////////////////////////
                if(creep.pos.isEqualTo(Game.flags[goal].pos)){
                    creep.memory.job = 'remoteHere';
                }
                if(creep.room === Game.rooms['W38S24'] && creep.memory.room === Game.flags['room_W38S24'].memory.room){
                    creep.memory.job = 'remoteHere';
                }
            }

        }
        if(creep.memory.job == 'remoteHere'){

            if(!creep.memory.building){ //creep.carry.energy == 0){

                let can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => { return s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] >= creep.carryCapacity}});


                if(can !== null){
                    if(creep.withdraw(can, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can);
                        return;
                    }
                }
                if(creep.room !== Game.rooms['W38S24']){
                    let sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if(sources){
                        if(creep.harvest(sources), ERR_NOT_IN_RANGE){
                            creep.moveTo(sources);
                            return;
                        }
                    }
                }
                else if(creep.room === Game.rooms['W38S24']){
                    let source = Game.getObjectById('5982fc58b097071b4adbd3bb');
                    if(source !== null){
                        if(creep.harvest(source), ERR_NOT_IN_RANGE){
                            creep.moveTo(source);
                            return;
                        }
                    }
                }
            }

            if(creep.memory.building){
                let control = creep.room.controller;
                let construction = creep.room.find(FIND_CONSTRUCTION_SITES);

                //console.log(control.level != 2);
                if(control.level != 2){
                    if(creep.upgradeController(control) == ERR_NOT_IN_RANGE){
                        creep.moveTo(control);
                        return;
                    }
                }

                if(creep.memory.repairThis == undefined || ((Game.time % 50) == 0)){
                    let repairTar = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.hits < s.hitsMax}});
                    let minTar = _.min(repairTar, 'hits');
                    creep.memory.repairThis = minTar.id;
                }

                if(control.ticksToDowngrade < 3000){
                    if(creep.upgradeController(control) == ERR_NOT_IN_RANGE){
                        creep.moveTo(control);
                    }
                }


               // console.log(Game.getObjectById(creep.memory.repairThis) true);
               if(construction.length){
                    if(creep.build(construction[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(construction[0]);
                        //return;
                    }
                }
                else if(Game.getObjectById(creep.memory.repairThis)){

                    if(Game.getObjectById(creep.memory.repairThis).structureType === STRUCTURE_WALL){
                        if(Game.getObjectById(creep.memory.repairThis).hits >= 10000){
                            creep.memory.repairThis = undefined;
                            return;
                        }
                    }
                    if(Game.getObjectById(creep.memory.repairThis).hits == Game.getObjectById(creep.memory.repairThis).hitsMax){
                        creep.memory.repairThis = undefined;
                        return;
                    }
                    if(creep.repair(Game.getObjectById(creep.memory.repairThis)) == ERR_NOT_IN_RANGE){
                        creep.moveTo(Game.getObjectById(creep.memory.repairThis));
                    }
                }

            }



        }
        else if(creep.memory.building && creep.memory.job === 'building') {
             var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return;
                }
            }
            else{

                //const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
                var repairTargets;
                var wallsObject = {
                    '59d70e0079804d2ecbb7750c': true,
                    '59d70e03792a5e0ef7639b3a': true,
                    '59d70e0681903d4a00d90410': true,
                    '59d70e0e11aacc2a708a8087': true,
                    '59d70e0cb2b06350b42c5af4': true,
                    '59d70e149cc3342a063cca42': true,
                    '59d70e12c6b6602e5be6372b': true,
                    '59d70e149c1ec65b2f25bf8b': true,
                    '59d70e1bb2b06350b42c5afa': true,
                    '59d70e1e40397a6931bf162f': true,
                    '59d70e23a977e061b5e8e07e': true,
                    '59d70e2c15de852e8a32e5a4': true,
                    '59d70d4638f56b6ede4fea4e': true,
                    '59d70d4a7e7fa7695075e870': true,
                    '59d70d5411aacc2a708a8041': true,
                    '59d70d566a9944618f5404f1': true,
                    '59d70d5b3eb74d7a0c37930f': true,
                    '59d70d6079804d2ecbb774d7': true,
                    '59d70d66733cda6e8cc90e21': true,
                    '59d70d6f9cc3342a063cca0c': true,
                    '59d70d7094ab87694617fb28': true
                };

                if(creep.memory.repairThis == undefined || ((Game.time % 50) == 0)){
                    if(creep.room === Game.rooms['W45S28'] || creep.room === Game.rooms['W38S24']){
                        repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                            return ((s.structureType == STRUCTURE_ROAD && s.hits < 3500)
                                    || (s.structureType == STRUCTURE_RAMPART && s.hits < Game.rooms[room].memory.rampartSize)
                                    || (s.structureType == STRUCTURE_WALL && s.hits < Game.rooms[room].memory.wallSize))
                        }});
                    }
                    else if(creep.room == Game.rooms['W43S27']){
                        repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                            return ((s.structureType == STRUCTURE_ROAD && s.hits < 3500)
                                    || (s.structureType == STRUCTURE_RAMPART && s.hits < Game.rooms[room].memory.rampartSize)
                                    || (s.structureType == STRUCTURE_WALL && s.hits < 2000000 && s.id in wallsObject)) //Game.rooms[room].memory.wallSize))
                        }});
                    }
                    else if(creep.room == Game.rooms['W43S28'] || creep.room == Game.rooms['W45S22']){
                        repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                            return ((s.structureType == STRUCTURE_ROAD && s.hits < 3500)
                                    || (s.structureType == STRUCTURE_RAMPART && s.hits < Game.rooms[room].memory.rampartSize)
                                    || (s.structureType == STRUCTURE_WALL && s.hits < Game.rooms[room].memory.wallSize))
                        }});
                    }
                    minTarget = _.min(repairTargets, 'hits');

                    creep.memory.repairThis = minTarget.id;
                }


                if(Game.getObjectById(creep.memory.repairThis) != null){
                    if(Game.getObjectById(creep.memory.repairThis).structureType == STRUCTURE_RAMPART){
                        if(Game.getObjectById(creep.memory.repairThis).hits >= Game.rooms[room].memory.rampartSize){
                            creep.memory.repairThis = undefined;
                            return;
                        }
                    }
                    else if(Game.getObjectById(creep.memory.repairThis).structureType == STRUCTURE_ROAD){
                        if(Game.getObjectById(creep.memory.repairThis).hits == Game.getObjectById(creep.memory.repairThis).hitsMax){
                            creep.memory.repairThis = undefined;
                            return;
                        }
                    }
                    if(Game.getObjectById(creep.memory.repairThis)){
                        if(creep.repair(Game.getObjectById(creep.memory.repairThis)) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.repairThis), {visualizePathStyle: {stroke: 'red'}});
                            return;
                        }
                    }
                }
                      /*
                      if(repairTargets.length > 0) {
                          if(creep.repair(minTarget) == ERR_NOT_IN_RANGE) {
                              creep.moveTo(minTarget);
                              return;
                          }
                      }*/
            }
        }
        else if(!creep.memory.building && creep.memory.job === 'building') {
            const dropped = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
            var sourcesOG = creep.room.find(FIND_SOURCES_ACTIVE);
            const storages = creep.room.storage;
            let can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function(s){
                return (s.structureType == STRUCTURE_CONTAINER &&
                        s.store[RESOURCE_ENERGY] >= creep.carryCapacity && s.id != '59ddc09e0f1c423b1ae747c5')
                    }
                });

             if(dropped.length > 0) {
                if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0], {visualizePathStyle: {stroke: 'red'}});
                    return;
                }
            }

            if(storages && storages.store[RESOURCE_ENERGY] > 30000){
                if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storages, {visualizePathStyle: {stroke: 'red'}});
                    return;
                }
            }
            if(can != undefined){
                if(creep.withdraw(can, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(can, {visualizePathStyle: {stroke: 'red'}});
                    return;
                }
            }
            if(creep.harvest(sourcesOG[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(sourcesOG[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }
        }


    }

};

module.exports = builder;
