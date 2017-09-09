var modeOffensive = true;
var destroySpawn = true;

var roleDismantler = {    
    run: function(creep){

        if (modeOffensive){
            if (Game.flags["Attack"] == undefined){
                console.log("No Attack Flag Found?");
                return;
            }
            else{
                if (creep.room != Game.flags["Attack"].room) {
                    creep.moveTo(Game.flags["Attack"], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }
        if (destroySpawn){
            let target = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
            if (target == undefined) return;
            if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }
        }
    }
};
module.exports = roleDismantler;