var linkHauler = {

    run: function(creep, roomID){

    /*        var linkA = Game.rooms['W43S27'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);}
    });
    var linkB = Game.rooms['W43S28'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);}
    }); */

        var links = creep.room.find(FIND_STRUCTURES, { filter: (s) => {return s.structureType == STRUCTURE_LINK;}});


         if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 Retrieving');
        }

        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }
      /*  if(creep == Game.creeps.Sarah){
            Game.creeps.Sarah.moveTo(Game.spawns['Spawn2']);
        }
        else*/ if(!creep.memory.hauling){
            if(roomID == 0){
                var can = Game.getObjectById('59b3e88adc43b14dbbe76d54');
                if(can.store[RESOURCE_ENERGY] >= 200 && (creep.withdraw(can, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
                    creep.moveTo(can, {reusePath: 10});
                }


            }
            else if(roomID == 1){
                let storages = creep.room.storage;
                if(storages.store[RESOURCE_ENERGY] >= creep.carryCapacity && (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
                    creep.moveTo(storages);
                }
            }
        }

        if(creep.memory.hauling){
            if(roomID == 0){
                if(links.length > 0){
                    if(creep.transfer(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                       creep.moveTo(links[1], {reusePath:10});
                    }
                }
            }
            else if(roomID == 1){
                if(links.length > 0){
                    if(creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                       creep.moveTo(links[0], {reusePath:10});
                    }
                }
            }
        }
    }
};

module.exports = linkHauler;
