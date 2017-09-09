var roleDefender = {
    
    run: function(creep){
        
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile);
                //creep.rangedAttack(closestHostile);
            }
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestHostile);
            }
            
            const hurtCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            
            if(hurtCreep) {
                creep.heal(hurtCreep)
            } 
        
        
    }
};
module.exports = roleDefender;