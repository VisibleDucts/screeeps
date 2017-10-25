var sk = {
    
     run: function(creep) {
        var flag = Game.flags[creep.memory.goal];
        var goal = creep.memory.goal;
        if (flag == null) {
            creep.say("no flag");
            return;
        }
    /*    if (!creep.pos.isEqualTo(flag.pos) && !creep.memory.there) {
            creep.moveTo(flag, {ignoreCreeps: false});
        }
        if(creep.pos.isEqualTo(flag.pos)) creep.memory.there = true; */
        if (creep.room != Game.flags[goal].room) {
            creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
            return;
        }
        
        if(creep.memory.attackSK){
          //  let sklairs = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_KEEPER_LAIR}});
           // let sklairsTimer = _.min(sklairs,'ticksToSpawn');
            let sk = creep.pos.findInRange(FIND_HOSTILE_CREEPS,3);
            //console.log(sklairsTimer);
            if(!creep.pos.inRangeTo(flag.pos, 3)){
                creep.moveTo(flag);
            }
            if (sk == undefined) return;
            if (creep.attack(sk[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sk[0], { visualizePathStyle: { stroke: '#22B91B' } });
                //return;
            }
            if(sk.length){
                creep.rangedAttack(sk[0]);
            }
            
             let hurtCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            
            
            creep.heal(hurtCreep);
           
        }
     }
    
};



module.exports = sk;