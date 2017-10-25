var war = false;

var tower = {

    run: function(tower){


        var limit;


        //add towers to memory
        /*
        if(!Memory.rooms[tower.room.name].structureMemory) Memory.rooms[tower.room.name].structureMemory = {};
        if(!Memory.rooms[tower.room.name].structureMemory.towers) Memory.rooms[tower.room.name].structureMemory.towers = {};
        if(!Memory.rooms[tower.room.name].structureMemory.towers[tower.id]) Memory.rooms[tower.room.name].structureMemory.towers[tower.id] = {};
        if(!Memory.rooms[tower.room.name].structureMemory.towers[tower.id].memory) Memory.rooms[tower.room.name].structureMemory.towers[tower.id].memory = {};
        //Memory.rooms[tower.room.name].structureMemory.towers[tower.id].memory =;
        if(tower.room == Game.rooms['W45S22'])
        //console.log(Game.getObjectById('59d944a21300017016836294').memory)
        //if()
        */

        if(Memory.alerts.towerWar){
            limit = 1000;
        }
        else{
            limit = 900;
        }

        if(!tower.memory) tower.memory = {};
        if(tower != undefined) {
            if (Game.time % 1000 == 0) {
                //Memory.rooms.W43S28.wallSize += 100;
                //Memory.rooms.W43S28.rampartSize += 100;
                //Memory.rooms.W43S27.wallSize += 400;
                //Memory.rooms.W43S27.rampartSize += 400;
                //Memory.rooms.W45S22.wallSize += 400;
                //Memory.rooms.W45S22.rampartSize += 400;
                Memory.rooms.W45S28.wallSize += 400;
                Memory.rooms.W45S28.rampartSize += 400;
                Memory.rooms.W38S24.wallSize += 400;
                Memory.rooms.W38S24.rampartSize += 400;
            }

           var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                    && (p.owner.username != 'mnuck')
                    && (p.owner.username != 'LordPong')
                    && (p.owner.username != 'complexQuanta')
                    && (p.owner.username != 'Augl')
                    && (p.owner.username != 'mightyleguan')
                    && (p.owner.username != 'pragmascript')
                    && (p.owner.username != 'Jestersheepy')
                    && (p.owner.username != 'Shadowwulf');
                }
            });

            var humanHostile = tower.room.find(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Invader')
                    && (p.owner.username != 'Shylo132')
                    && (p.owner.username != 'mnuck')
                    && (p.owner.username != 'LordPong')
                    && (p.owner.username != 'complexQuanta')
                    && (p.owner.username != 'Augl')
                    && (p.owner.username != 'mightyleguan')
                    && (p.owner.username != 'pragmascript')
                    && (p.owner.username != 'Jestersheepy')
                    && (p.owner.username != 'Shadowwulf');
            }});

            if(humanHostile.length){
                console.log(tower.room + ' HUMAN ' + humanHostile[0].owner.username);
                Game.notify(tower.room + ' is being attacked by HUMAN!!! ' + humanHostile[0].owner.username + ' ' + Game.time);

                if(Game.getObjectById('59c09f5b1e7ef47c50d61e37').hits < 300000 ){
                    Game.rooms['W43S27'].controller.activateSafeMode();
                    Game.notify('W43S27 Safe Mode activated.');
                    return;
                }
            }

            const hurtCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });

            if(tower.energy > limit && !closestHostile){

                if((tower.room === Game.rooms['W45S22'] || tower.room === Game.rooms['W45S28'] || tower.room === Game.rooms['W38S24']) && (tower.memory.repairThis == undefined || Game.time % 50 == 0)){
                    var repairShit = tower.room.find (FIND_STRUCTURES, {filter: (s) => {
                        return (s.structureType == STRUCTURE_WALL && s.hits < Memory.rooms[tower.room.name].wallSize)
                            || (s.structureType == STRUCTURE_RAMPART && s.hits < Memory.rooms[tower.room.name].rampartSize)
                            || (s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax)
                    }});
                    var minShit = _.min(repairShit, 'hits');
                    tower.memory.repairThis = minShit.id;

                }
                if(tower.room === Game.rooms['W45S22'] || tower.room === Game.rooms['W45S28'] || tower.room === Game.rooms['W38S24']){
                    if((Game.time % 20) == 0){
                        if(Game.getObjectById(tower.memory.repairThis) != null){
                            if(Game.getObjectById(tower.memory.repairThis).structureType == STRUCTURE_RAMPART){
                                if(Game.getObjectById(tower.memory.repairThis).hits >= Game.rooms[tower.room.name].memory.rampartSize){
                                    tower.memory.repairThis = undefined;
                                    return;
                                }
                            }
                            else if(Game.getObjectById(tower.memory.repairThis).structureType == STRUCTURE_WALL){
                                if(Game.getObjectById(tower.memory.repairThis).hits >= Game.rooms[tower.room.name].memory.wallSize){// Game.getObjectById(tower.memory.repairThis).hitsMax){
                                    tower.memory.repairThis = undefined;
                                    return;
                                }
                            }
                            else if(Game.getObjectById(tower.memory.repairThis).structureType == STRUCTURE_CONTAINER){
                                if(Game.getObjectById(tower.memory.repairThis).hits == Game.getObjectById(tower.memory.repairThis).hitsMax){
                                    tower.memory.repairThis = undefined;
                                    return;
                                }
                            }
                            if(Game.getObjectById(tower.memory.repairThis)){
                                tower.repair(Game.getObjectById(tower.memory.repairThis));
                                return;
                            }
                        }
                    }
                }
                else if((Game.time % 30) == 0){
                    if(tower.room === Game.rooms['W43S27']){
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
                        var repairWalls = tower.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_WALL && s.hits < 2000000 && s.id in wallsObject;}}); //Memory.rooms[tower.room.name].wallSize;
                        var minWall = _.min(repairWalls, 'hits');
                    }
                    else{

                        var repairWalls = tower.room.find(FIND_STRUCTURES, {filter: (s) => {
                            return s.structureType == STRUCTURE_WALL && s.hits < Memory.rooms[tower.room.name].wallSize;
                            }
                        });
                        var minWall = _.min(repairWalls, 'hits');
                    }

                    const repairRamparts = tower.room.find(FIND_STRUCTURES, {filter: (s) => {
                            return s.structureType == STRUCTURE_RAMPART && s.hits < Memory.rooms[tower.room.name].rampartSize;
                            }
                        });
                    const can = tower.room.find(FIND_STRUCTURES, {filter: (s) => {
                           return(s.structureType == STRUCTURE_CONTAINER) && s.hits < s.hitsMax;}
                               });

                    var minCan = _.min(can, 'hits');
                    var minRamp = _.min(repairRamparts, 'hits');

                    if(repairRamparts){
                        tower.repair(minRamp);
                    }
                    if(repairWalls) {
                        tower.repair(minWall);
                    }
                    if(can){
                        tower.repair(minCan);
                    }
                }
            }

            if(closestHostile) {
                tower.attack(closestHostile);
                return;
            }

            if(!closestHostile && hurtCreep) {
                tower.heal(hurtCreep);
                return;
            }


        }

    }
};
module.exports = tower;
