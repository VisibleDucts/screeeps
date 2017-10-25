var Runner = {
    spawn: function(spawner, flagName) {
        return spawner.createCreep(
            [MOVE],
            undefined,
            {
                role: "runner",
                flag: flagName
            }
        );
    },
    run: function(creep) {
        var flag = Game.flags[creep.memory.goal];
        if (flag == null) {
            creep.say("no flag");
            return;
        }
        if (!creep.pos.isEqualTo(flag.pos)) {
            creep.moveTo(flag, {ignoreCreeps: false, visualizePathStyle: {stroke: 'red'}});
        }
        if(creep.room === flag.room && creep.memory.changeTo != undefined){
            creep.memory.run = false;
            creep.memory.role = creep.memory.changeTo;
            return;
        }
        else if(creep.pos.isEqualTo(flag.pos)) creep.memory.tagIt = true;

        if(creep.memory.placeRoads){
            if(creep.pos.lookFor(LOOK_STRUCTURES).structureType != STRUCTURE_ROAD){
                creep.pos.createConstructionSite(STRUCTURE_ROAD);
            }
        }
        if(creep.memory.tagIt && creep.memory.signShit){
            if(creep.room.controller && !creep.room.controller.my){
                if(creep.room.controller.sign == undefined || creep.room.controller.sign.text != "[Former Ecorp Territory] f**k society."){
                    if(creep.room.controller) {
                        if(creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society.") == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                            return;
                        }
                    }
                }
            }
        }
    }
};

module.exports = Runner;
