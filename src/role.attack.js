var modeOffensive = false;
var attackCreep = false;
var attackStructure = false;

var attacker = {
    run: function(creep){
        const goal = creep.memory.goal;


        if(creep.memory.boost){
            let boosty = _.filter(creep.body, (t) => !t.boost && t.type === 'attack');
            let boostx = _.filter(creep.body, (t) => !t.boost && t.type === 'move');
            let boostz = _.filter(creep.body, (t) => !t.boost && t.type === 'tough');

            if(creep.memory.mineral != null){
                let boostLab = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral}});
                if(boostLab.length && boosty.length && boostLab[0].mineralAmount > 30){
                    if(boostLab[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab[0]);
                        return;
                    }
                }
            }
            if(creep.memory.mineral2 != null){
                let boostLab2 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral2}});
                if(boostLab2.length && boostx.length && boostLab2[0].mineralAmount > 30){
                    if(boostLab2[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab2[0]);
                        return;
                    }
                }
            }
            if(creep.memory.mineral3 != null){
                let boostLab3 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral3}});
                if(boostLab3.length && boostz.length && boostLab3[0].mineralAmount > 30){
                    if(boostLab3[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab3[0]);
                        return;
                    }
                }
            }
        }
      // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: 'red' } });


        if (modeOffensive){
            if (Game.flags[goal] == undefined){
                console.log("No " + goal + " Flag Found?");
                return;
            }
            else{
                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: 'red' } });
                    return;
                }
            }
        }
        if (attackCreep){
            let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                    && (p.owner.username != 'mnuck')
                    && (p.owner.username != 'LordPong')
                    && (p.owner.username != 'complexQuanta')
                    && (p.owner.username != 'Augl')
                    && (p.owner.username != 'mightyleguan')
                    && (p.owner.username != 'pragmascript')
                    && (p.owner.username != 'Jestersheepy');
                }
            });
           // creep.say('HUG ME');
            if (target == undefined) return;
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }
        }
    //59cf84be51bdb2476936c280  59b7011b02f32824980d1745
        if(attackStructure){
            let structure = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}});
         //   let structure = Game.getObjectById('59acee3d4e36b416ade5f484');
//            var structure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
            if (structure == undefined) return;
            if(creep.attack(structure[1]) == ERR_NOT_IN_RANGE){
                creep.moveTo(structure[1], { visualizePathStyle: { stroke: '#22B91B' } });
                creep.say('DEATH TAKE ME');
                return;
            }
        }
    }
};
module.exports = attacker;
