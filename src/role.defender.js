var attackCreep = true;
var attackStructure = true;

var defender = {

    run: function(creep){

        const job = creep.memory.job;
        const goal = creep.memory.goal;

            /////////////////////// GUARD //////////////////////////////////////
        if(job == 'guard'){
            if (Game.flags[goal] == undefined){
                console.log('No ' + goal + ' Flag Found? says ' + creep.name);
                return;
            }
            else{
                if (!creep.memory.there && !creep.pos.isEqualTo(Game.flags[goal].pos)){  //!= Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    //creep.memory.there = true;
                    return;
                }
                if(creep.pos.isEqualTo(Game.flags[goal].pos)) creep.memory.there = true;
            }
            if (attackCreep){
                if(creep.getActiveBodyparts(ATTACK) > 0){
                    var target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                            && (p.owner.username != 'mnuck')
                            && (p.owner.username != 'LordPong')
                            && (p.owner.username != 'complexQuanta')
                            && (p.owner.username != 'Augl')
                            && (p.owner.username != 'mightyleguan')
                            && (p.owner.username != 'pragmascript')
                            && (p.owner.username != 'Jestersheepy');
                        }
                    });
                    if (target == undefined) return;
                    if (creep.attack(target[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0], { visualizePathStyle: { stroke: '#22B91B' } });
                        //return;
                    }

                }
                if(creep.getActiveBodyparts(RANGED_ATTACK) > 0 ){
                    var rangedTar = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {filter: (p) => {return (p.owner.username != 'Shylo132')
                            && (p.owner.username != 'mnuck')
                            && (p.owner.username != 'LordPong')
                            && (p.owner.username != 'complexQuanta')
                            && (p.owner.username != 'Augl')
                            && (p.owner.username != 'mightyleguan')
                            && (p.owner.username != 'pragmascript')
                            && (p.owner.username != 'Jestersheepy');
                        }
                    });
                    if(rangedTar.length > 0){

                        if(!creep.pos.inRangeTo(rangedTar[0],3)){
                            creep.moveTo(rangedTar[0]);
                        }
                        creep.rangedAttack(rangedTar[0]);
                    }
                }

                let threats = creep.room.find(FIND_HOSTILE_CREEPS);

                if(threats.length === 0){
                    let total = _.sum(creep.carry);
                    let dropped = creep.room.find(FIND_DROPPED_RESOURCES);
                    if(dropped.length) {
                        if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(dropped[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            return;
                        }
                    }
                    if(total > 0){
                        let can = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity; }});
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(can[0], resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(can[0]);
                                return;
                            }
                        }
                    }
                }
            }
        }
        else if(job == 'ranged_guard'){
            //let hostiles = creep.
        }
        else if(job == 'backup'){

        }
    }
};
module.exports = defender;
