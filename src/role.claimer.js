var modeClaim = true;
var claimCon = true;

var roleClaimer = {
    
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

    }
};

module.exports = roleClaimer;

        /*
        if((creep.room == '[room W34S39]') && (creep.carry.energy < creep.carryCapacity)) {
           // console.log('hi');
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
         }*/