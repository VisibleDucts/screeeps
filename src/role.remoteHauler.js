const util = require('util');
var remoteHauler = {

        run: function(creep) {
            let goal = creep.memory.goal;
            let useLinkID = creep.memory.useLinkID;
            let homeID = creep.memory.homeID;
            let homeFlag = creep.memory.homeFlag;

            if(creep.memory.job === undefined) creep.memory.job = 'normal';

            if(goal === null){
                console.log('"No goal, dood." - ' + creep.name);
                return;
            }
            var total = _.sum(creep.carry);


            //util.beware(creep);
            let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (threat && creep.pos.getRangeTo(threat) < 6) {
                let result = PathFinder.search(creep.pos, {pos:threat.pos, range:6}, {flee: true});
                creep.moveByPath(result.path);
                return;
            }

            if(creep.memory.hauling && total == 0) {
                creep.memory.hauling = false;
                creep.memory.home = false;
            }

            if(!creep.memory.hauling && total == creep.carryCapacity) {
                creep.memory.hauling = true;
            }

            if (creep.ticksToLive < 200) {
                if(creep.room === Game.flags[homeFlag].room && total === 0){
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

            if(!creep.memory.hauling && creep.memory.job === 'normal'){
                if (Game.flags[goal] == undefined){
                    console.log('No ' + goal + ' Flag Found?');
                    return;
                }
                else{
                    if (creep.room != Game.flags[goal].room) {
                        creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
                if(creep.memory.whatCan === undefined){
                    let can = creep.room.find(FIND_STRUCTURES, { filter: function(s){ return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 400;}});
                    if(can.length){
                        creep.memory.whatCan = can[0].id;
                    }
                }
                let can = Game.getObjectById(creep.memory.whatCan);

                //if(creep.memory.dropped === undefined){
                    let dropped = creep.room.find(FIND_DROPPED_RESOURCES);
                    /*
                    if(dropped.length){
                        creep.memory.dropped = dropped[0].id;
                    }
                }
                let dropped = Game.getObjectById(creep.memory.dropped);
                */

                if(can !== null){
                    if(_.sum(can.store) > 400){
                        for(const resourceType in can.store) {
                            if(creep.withdraw(can, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(can, {visualizePathStyle: {stroke: "#00aaFF"}});
                                return;
                            }
                        }
                    }
                    else if(_.sum(can.store) < 400){
                        creep.memory.whatCan = undefined;
                    }
                }

                if(dropped.length){
                    if(creep.pickup(dropped[0]) === ERR_NOT_IN_RANGE){
                        creep.moveTo(dropped[0]);
                        return;
                    }
                }
                /*
                if(dropped !== null) {
                    if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped, {reusePath: 10});
                    }
                }
                else if(dropped === null){
                    creep.memory.dropped = undefined;
                }
                */
            }


            if(creep.memory.hauling && creep.memory.job === 'normal'){

                if(Game.flags[homeFlag] == undefined) return;

                if(creep.memory.roads){
                    let road = creep.pos.lookFor(LOOK_STRUCTURES);

                    if(road.length && road[0].structureType === STRUCTURE_ROAD){
                        creep.repair(road[0]);
                    }
                }
                //Removing .toString() from creep.room.toString() and Game.flags[].room.toString(). Shouldn't need it.
                if(creep.room != Game.flags[homeFlag].room){
                    creep.moveTo(Game.flags[homeFlag], {visualizePathStyle: {stroke:'#F0F0F0'}});
                    return;
                }

                if(total > 0){
                    let storages = creep.room.storage;
                    if(useLinkID != null && creep.carry[RESOURCE_ENERGY] > 0){
                        let links = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_LINK;}});
                        if(links.length && links[useLinkID].energy < links[useLinkID].energyCapacity){
                            if(creep.transfer(links[useLinkID], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(links[useLinkID]);
                                return;
                            }
                        }
                    }

                    for(const resourceType in creep.carry) {
                        if(creep.transfer(storages, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                            return;
                        }
                    }

                    if(total == 0){
                        creep.memory.home = false;
                    }
                }
            }



        }
    };

    module.exports = remoteHauler;
