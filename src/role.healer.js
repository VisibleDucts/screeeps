var modeOffensive = false;
var healCreep = true;
var patientOn = false;
var healMe = false;
var priority = false;

var healer = {

    run: function(creep){

        const goal = creep.memory.goal;



      //  creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });

        if(creep.memory.boost){
            let boosty = _.filter(creep.body, (t) => !t.boost && t.type === 'heal');
            //let boostx = _.filter(creep.body, (t) => !t.boost && t.type === 'move');
            let boostz = _.filter(creep.body, (t) => !t.boost && t.type === 'tough');

            if(creep.memory.mineral != null){
                let boostLab = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral}});
                if(boostLab.length && boosty.length){
                    if(boostLab[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab[0]);
                        return;
                    }
                }
            }
            if(creep.memory.mineral2 != null){
                let boostLab2 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral2}});
                if(boostLab2.length && boostx.length){
                    if(boostLab2[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab2[0]);
                        return;
                    }
                }
            }
            if(creep.memory.mineral3 != null){
                let boostLab3 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral3}});
                if(boostLab3.length && boostz.length){
                    if(boostLab3[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab3[0]);
                        return;
                    }
                }
            }
        }
        // moveTo(patient, {ignoreCreeps: false, reusePath: 0})
        if (modeOffensive){
            if (Game.flags[goal] == undefined){
                console.log("No Attacks Flag Found?");
                return;
            }
            else{
                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                }
            }
        }

        if(patientOn){
            creep.moveTo(Game.getObjectById(creep.memory.patient), {ignoreCreeps: false, reusePath: 0})
        }

        if(healMe){
            let me = creep.pos.findClosestByRange(FIND_MY_CREEPS);
            creep.heal(me);

        }


        if(healCreep){

            if(priority){
                let priorityTar = Game.getObjectById('');
                if(priorityTar && priority.hits < priority.hitsMax){
                    if(creep.heal(priorityTar) == ERR_NOT_IN_RANGE){
                        creep.moveTo(priorityTar, {ignoreCreeps: false, reusePath: 0});
                        return;
                    }
                }
            }

            let hurtCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });

            if(hurtCreep) {
                if(creep.heal(hurtCreep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hurtCreep, {visualizePathStyle: { stroke: '#FFFFFF'}});
            //        return;
                }
            }
        }

    }
};
module.exports = healer;
