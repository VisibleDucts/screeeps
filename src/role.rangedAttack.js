var modeOffensive = true;
var attackCreep = true;

var roleRangedAttack = {
    run: function(creep, goal){
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
             //exmaple from api
            const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if (targets == undefined) return;
            if(targets.length > 0) {
                creep.rangedAttack(targets[0]);
            }

        }

    }
};
module.exports = roleRangedAttack;
