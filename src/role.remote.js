var roleRemote = {

    run: function(creep, loc, source, canID) {

        var can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER)}});

        //console.log(canID);
        if(creep.pos != loc.toString()){
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
