var modeClaim = true;
var claimCon = false;
var reserve = true;

var claimer = {

    run: function(creep){

        if (modeClaim){

            if (Game.flags["Claim"] == undefined){
                console.log("No Claim Flag Found?");
                return;
            }
            else{

                if (creep.room != Game.flags["Claim"].room) {
                    creep.moveTo(Game.flags["Claim"], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }
        if (claimCon){
            let target = creep.room.controller;
            if (target == undefined) return;
            if (creep.claimController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }
        }
        else if(reserve){
            let target = creep.room.controller;
            if (target == undefined) return;
            if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }
        }

    }
};

module.exports = claimer;
