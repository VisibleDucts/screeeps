var modeOffensive = true;
var attackCreep = true;
var healCreep = true;

var rangedAttacker = {
    run: function(creep, goal){
        const hurtCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: function(c) { return c.hits < c.hitsMax; }});
        // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
        if (modeOffensive){
            if (Game.flags[goal] == undefined){
                console.log("No " + goal + " Flag Found?");
                return;
            }
            else{
                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }
        if (attackCreep){
            //NEED TO MAKE THEM STAY AT MAX RANGE
             //exmaple from api
            let enemy = creep.room.find(FIND_HOSTILE_CREEPS);
            const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if(enemy == undefined) return;
            if(enemy.length > 0){
                creep.moveTo(enemy[0]);
            }
            if (targets == undefined) return;
            if(targets.length > 0) {
                creep.rangedAttack(targets[0]);
            }
            if(hurtCreep == undefined) return;
            if(hurtCreep.length > 0){
                if(creep.heal(hurtCreep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hurtCreep);
                    return;
                }
            }
        }

    }
};
module.exports = rangedAttacker;

/*  getRange API EXAMPLE
const range = creep.pos.getRangeTo(target);
if(range <= 3) {
    creep.rangedAttack(target);
}

// API example of inRangeTo
if(creep.pos.inRangeTo(target, 3)) {
    creep.rangedAttack(target);
}
*/
