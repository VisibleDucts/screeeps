var util = require('util');

var repairer = {

    run: function(creep){

        var room = creep.room.name;
        let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(threat){
            util.attacked(creep);
        }
        if (threat && creep.pos.getRangeTo(threat) < 5) {
            let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
            creep.moveByPath(result.path);
            return;
        }


        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧');
        }

        if(creep.memory.building && creep.memory.job === 'normal') {
            if(creep.memory.repairThis === undefined || (Game.time % 50) === 0){
                let repairTargets = creep.room.find(FIND_STRUCTURES, {filter: (s) => {
                    return((s.structureType === STRUCTURE_WALL && s.hits <  Memory.rooms[creep.room.name].wallSize)
                        || (s.structureType === STRUCTURE_RAMPART && s.hits < Memory.rooms[creep.room.name].rampartSize)
                        || (s.structureType === STRUCTURE_ROAD && s.hits < 3000))
                }});
                let ramparts = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType === STRUCTURE_RAMPART && s.hits < s.hitsMax}});
                let repairCans = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType === STRUCTURE_CONTAINER && s.hits < s.hitsMax;}});
                let minTar = _.min(repairTargets, 'hits');
                let minCan = _.min(repairCans, 'hits');

                if(minCan !== undefined && minCan.hits < 150000){
                    creep.memory.repairThis = minCan.id;
                }
                else{

                    creep.memory.repairThis = minTar.id;
                }
            }

            if(Game.getObjectById(creep.memory.repairThis) != null){
                if(Game.getObjectById(creep.memory.repairThis).structureType === STRUCTURE_RAMPART){
                    if(Game.getObjectById(creep.memory.repairThis).hits >= Game.rooms[room].memory.rampartSize){
                        creep.memory.repairThis = undefined;
                        return;
                    }
                }
                else if(Game.getObjectById(creep.memory.repairThis).structureType === STRUCTURE_ROAD){
                    if(Game.getObjectById(creep.memory.repairThis).hits === Game.getObjectById(creep.memory.repairThis).hitsMax){
                        creep.memory.repairThis = undefined;
                        return;
                    }
                }
                else if(Game.getObjectById(creep.memory.repairThis).structureType === STRUCTURE_WALL){
                    if(Game.rooms[room].memory.wallSize != null && Game.getObjectById(creep.memory.repairThis).hits >=  Game.rooms[room].memory.wallSize){
                        creep.memory.repairThis = undefined;
                        return;
                    }
                }
                if(Game.getObjectById(creep.memory.repairThis)){
                    if(creep.repair(Game.getObjectById(creep.memory.repairThis)) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.repairThis), {visualizePathStyle: {stroke: 'red'}});
                        return;
                    }
                }
            }
        }

        if(creep.memory.job === 'rampart' && creep.memory.building){
            if(creep.memory.repairThis == undefined || (Game.time % 50) === 0){
                let ramparts = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_RAMPART}});
                let min = _.min(ramparts, 'hits');
                creep.memory.repairThis = min.id;
            }
            if(Game.getObjectById(creep.memory.repairThis) != null){
                if(Game.getObjectById(creep.memory.repairThis).structureType === STRUCTURE_RAMPART){
                    if(Game.getObjectById(creep.memory.repairThis).hits >= Game.rooms[room].memory.rampartSize){
                        creep.memory.repairThis = undefined;
                        return;
                    }
                }
            }
            if(Game.getObjectById(creep.memory.repairThis)){
                if(creep.repair(Game.getObjectById(creep.memory.repairThis)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.repairThis), {visualizePathStyle: {stroke: 'red'}});
                    return;
                }
            }

        }

        if(creep.memory.job === 'walls' && creep.memory.building){
            if(creep.room === Game.rooms['W43S27']){
                let wallsObject = {
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

                let walls = creep.room.find(FIND_STRUCTURES, {filter: (s)=> { return s.structureType === STRUCTURE_WALL && s.id in wallsObject && s.hits < 2000000}});
                if(creep.repair(walls[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(walls[0],{visualizePathStyle: {stroke: 'green'}});
                    return;
                }
                return;
            }

            if(creep.memory.repairThis == undefined || (Game.time % 50) === 0){
                let walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_WALL}});
                let min = _.min(walls, 'hits');
                creep.memory.repairThis = min.id;
            }
            if(Game.getObjectById(creep.memory.repairThis) != null){
                if(Game.getObjectById(creep.memory.repairThis).structureType === STRUCTURE_WALL){
                    if(Game.getObjectById(creep.memory.repairThis).hits >= Game.rooms[room].memory.wallSize){
                        creep.memory.repairThis = undefined;
                        return;
                    }
                }
            }
            if(Game.getObjectById(creep.memory.repairThis)){
                if(creep.repair(Game.getObjectById(creep.memory.repairThis)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.repairThis), {visualizePathStyle: {stroke: 'red'}});
                    return;
                }
            }
        }

        if(!creep.memory.building) {

            let dropped = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType === RESOURCE_ENERGY; }});
            let sources = creep.room.find(FIND_SOURCES_ACTIVE);

            if(creep.memory.useCan === undefined || (Game.time % 20) === 0){
                let can = _.filter(creep.room.find(FIND_STRUCTURES), (s) => s.structureType === STRUCTURE_CONTAINER && s.store['energy'] >= creep.carryCapacity);
                if(can.length > 0){
                    creep.memory.useCan = can[0].id;
                }
            }
            /*
            let can = creep.room.find(FIND_STRUCTURES, { filter: function(s){
                return (s.structureType == STRUCTURE_CONTAINER &&
                        s.store[RESOURCE_ENERGY] >= creep.carryCapacity)
                    }
                }); */

            if(dropped.length > 0) {
                if(creep.pickup(dropped[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0]);
                }
            }
            if(Game.getObjectById(creep.memory.useCan) === null){
                creep.memory.useCan = undefined;
                return;
            }
            else if(Game.getObjectById(creep.memory.useCan) !== null){
                if(creep.withdraw(Game.getObjectById(creep.memory.useCan), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.useCan));
                    return;
                }
            }
            /*
            if(can.length){
                if(creep.withdraw(can[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(can[0]);
                    return;
                }
            }
            */
            else if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }


        }


    }

};

module.exports = repairer;
