var modeClaim = true;


var claimer = {
            /** @param {object} spawner, @param {string} body, @param {string} goal, @param {number} creepTime  **/
    spawn: function(spawner, body, job, goal, creepTime){
        return spawner.createCreep(
            body,
            `${'claimer'}-${creepTime}`,
            {
                role: "claimer2",
                job: job,
                goal: goal,
                homeID: spawner.memory.homeID
            }
        );
    },

    run: function(creep){
        const job = creep.memory.job;
        const goal = creep.memory.goal;

        //if(goal === null) return;

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

        if(job === 'remote'){
            var claimCon = true;
            modeClaim = false;
            if(creep.memory.going){
                if(creep.memory.state == undefined) {
                    creep.memory.state = 'Claim';
                }
                switch(creep.memory.state) {
                    case 'Claim':
                        creep.moveTo(Game.flags['Claim']);
                        if(creep.pos.toString() == Game.flags['Claim'].pos.toString()){
                            creep.memory.state = 'One';
                        }
                        break;
                    case 'One':
                        creep.moveTo(Game.flags['One']);
                        if(creep.pos.toString() == Game.flags['One'].pos.toString()){
                            creep.memory.state = 'NEXT';
                        }
                        break;
                    case 'NEXT':
                        creep.moveTo(Game.flags['NEXT']);
                        if(creep.pos.toString() == Game.flags['NEXT'].pos.toString()){
                            creep.memory.state = 'oxygen';
                        }
                        break;
                    case 'oxygen':
                        creep.moveTo(Game.flags['oxygen']);
                        if(creep.pos.toString() == Game.flags['oxygen'].pos.toString()){
                            creep.memory.state = 'Next3.1';
                        }
                        break;
                    case 'Next3.1':
                        creep.moveTo(Game.flags['Next3.1']);
                        if(creep.pos.toString() == Game.flags['Next3.1'].pos.toString()){
                            creep.memory.state = 'Next3.2';
                        }
                        break;
                    case 'Next3.2':
                        creep.moveTo(Game.flags['Next3.2']);
                        if(creep.pos.toString() == Game.flags['Next3.2'].pos.toString()){
                            creep.memory.state = 'Next3.3';
                        }
                        break;
                    case 'Next3.3':
                        creep.moveTo(Game.flags['Next3.3']);
                        if(creep.pos.toString() == Game.flags['Next3.3'].pos.toString()){
                            creep.memory.state = 'Next3.4';
                        }
                        break;
                    case 'Next3.4':
                        creep.moveTo(Game.flags['Next3.4']);
                        if(creep.pos.toString() == Game.flags['Next3.4'].pos.toString()){
                            creep.memory.state = 'Next4';
                        }
                        break;
                    case 'Next4':
                        creep.moveTo(Game.flags['Next4']);
                        if(creep.pos.toString() == Game.flags['Next4'].pos.toString()){
                            creep.memory.state = 'Finish';
                        }
                        break;
                    case 'Finish':
                        creep.moveTo(Game.flags['Finish']);
                        break;
                }
                if(creep.room == Game.flags['Finsih']){
                    creep.memory.going = false;
                    var claimCon = true;
                    var reserve = false;
                    var attacking = false;
                }
            }

        }


        if (modeClaim){
        //    creep.moveTo(Game.flags[goal].pos);
            if (Game.flags[goal] == undefined){
                console.log('No Claim Flag Found? says ' + creep.name);
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
            if(creep.room.controller.sign == undefined || creep.room.controller.sign.text != "[Former Ecorp Territory] f**k society. Do not claim."){
                if(creep.room.controller) {
                    if (creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society. Do not claim.") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                        return;
                    }
                }
            }
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
