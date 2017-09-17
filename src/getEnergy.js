getEnergy = function(creep){

    const sources = creep.room.find(FIND_SOURCES_ACTIVE);
    const dropped = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
    const can = creep.room.find(FIND_STRUCTURES, { filter: function(s){ return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 49)}});


    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        return;
    }
    if(can.length){
        if((can.length == 1) && (creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
            creep.moveTo(can[0], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
            return;
        }
        else if((can.length == 2) && (can[1].store[RESOURCE_ENERGY] > can[0].store[RESOURCE_ENERGY])){
            if(creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(can[1], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                return;
            }
        }
    }
    if(dropped.length) {
        if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropped[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            return;
        }
    }

    if(creep.room.storage){
        if(creep.room.storage[RESOURCE_ENERGY] > 0){
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.storage,{reusePath: 10}, {visualizePathStyle: {stroke:"red"}});
                return;
            }
        }
    }

}

module.exports = getEnergy;
/*for(const name in Game.creeps) {
           const startCpu = Game.cpu.getUsed();

           // creep logic goes here

           const elapsed = Game.cpu.getUsed() - startCpu;

           console.log('Creep '+name+' has used '+elapsed+' CPU time');
       } */
