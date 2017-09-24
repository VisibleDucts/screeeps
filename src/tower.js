var tower = {

    run: function(tower){
    //    Memory.allianceMembers = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript']);

        if(tower) {
            if (Game.time % 1000 == 0) {
                    Memory.rooms.W43S28.wallSize += 200;
                    Memory.rooms.W43S28.rampartSize += 200;
                    Memory.rooms.W43S27.wallSize += 200;
                    Memory.rooms.W43S27.rampartSize += 200;
                }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                    && (p.owner.username != 'mnuck')
                    && (p.owner.username != 'LordPong')
                    && (p.owner.username != 'complexQuanta')
                    && (p.owner.username != 'Augl')
                    && (p.owner.username != 'mightyleguan')
                    && (p.owner.username != 'pragmascript')
                    && (p.owner.username != 'Jestersheepy');
                }
            });

            const hurtCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });

            if(tower.energy > 600 && !closestHostile){

                const repairWalls = tower.room.find(FIND_STRUCTURES, {filter: (s) => {
                    return s.structureType == STRUCTURE_WALL && s.hits < Memory.rooms[tower.room.name].wallSize;
                    }
                });
                const repairRamparts = tower.room.find(FIND_STRUCTURES, {filter: (s) => {
                    return s.structureType == STRUCTURE_RAMPART && s.hits < Memory.rooms[tower.room.name].rampartSize;
                    }
                });
                const can = tower.room.find(FIND_STRUCTURES, {filter: (s) => {
                   return(s.structureType == STRUCTURE_CONTAINER) && s.hits < s.hitsMax;}
                       });

                var minWall = _.min(repairWalls, 'hits');
                var minCan = _.min(can, 'hits');
                var minRamp = _.min(repairRamparts, 'hits');

                if(repairRamparts){
                    tower.repair(minRamp);
                    return;
                }
                if(repairWalls) {
                    tower.repair(minWall);
                    return;
                }

                if(can){
                    tower.repair(minCan);
                    return;
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
