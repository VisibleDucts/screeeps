var attackCreep = true;

var roleDefender = {
    
    run: function(creep, job, loc){
       //Game.creeps.Nathan.moveTo(Game.flags['Flag1']);
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            
            if(job == 'guard'){
                if (Game.flags[loc] == undefined){
                    console.log('No ' + loc + ' Flag Found?');
                    return;
                }
                else{
                    
                    if (creep.pos.toString()  != Game.flags[loc].pos.toString()) {
                        creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
            if (attackCreep){
                let target = creep.room.find(FIND_HOSTILE_CREEPS)[0];
                creep.say('HUG ME');
                if (target == undefined) return;
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        } 
        else{   
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
               creep.moveTo(closestHostile);
            }
            
        
        }   
    }
};
module.exports = roleDefender;