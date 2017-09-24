var modeClaim = true;


var claimer = {

    run: function(creep, job, goal){

        if(job == undefined){
            console.log('Where\'s my Job?!');
        }
        else if(job == 'claiming'){
            var claimCon = true;
            var reserve = false;
        }
        else if(job == 'reserving'){
            var reserve = true;
            var claimCon = false;
        }
        else if(job == 'attacking'){
            var reserve = false;
            var claimCon = false;
            var attacking = true;

        }

        if (modeClaim){

            if (Game.flags[goal] == undefined){
                console.log("No Claim Flag Found?");
                return;
            }
            else{

                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
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
        else if(attacking){
            if(creep.room.controller && !creep.room.controller.my) {
                if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }

    }
};

module.exports = claimer;
