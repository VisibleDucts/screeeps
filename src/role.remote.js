var roleRemote = {

    run: function(creep, loc, sourceID, canID) {

        var can = creep.room.find(FIND_STRUCTURES, { filter: function(s){ return (s.structureType == STRUCTURE_CONTAINER)}});
        var source = Game.getObjectById(sourceID);

        if(creep.room.controller.sign == undefined){
             creep.say('hi');
             if(creep.room.controller) {
                 if (creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society") == ERR_NOT_IN_RANGE) {
                     creep.moveTo(creep.room.controller);
                 }
             }
         }
        //console.log(canID);
        else if(creep.pos != loc.toString()){
            creep.moveTo(loc, {visualizePathStyle: {stroke: '#FFFFFF'}});
            return;
        }

        else{
            //console.log(canID);
            if(canID == undefined) return;
            if(can.length > 0 && can[canID].store[RESOURCE_ENERGY] < 2000){
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(can.length == 0){
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleRemote;
