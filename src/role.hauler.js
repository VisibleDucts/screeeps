var roleHauler = {

    run: function(creep){

        //var loc = Game.rooms['W34S38']; //current room
        var storages = creep.room.storage;
        var can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)}});
        //console.log(can[0].store[RESOURCE_ENERGY]);
        //var link = Game.getObjectById('59aac7e8639a424c2f8fca1b');
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
        }); // extensions and spawn
        var sources = creep.room.find(FIND_SOURCES_ACTIVE); // energy sources
        const targety = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        const targetx = creep.room.find(FIND_DROPPED_RESOURCES);
        //console.log(targetx[0].energy);
        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 Retrieving');
            
            
        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }
        
        if(!creep.memory.hauling){
            //creep.say('he');
            if((creep.carry.energy < creep.carryCapacity) && (creep.room.energyAvailable <= creep.room.energyCapacityAvailable)) {
                //if(room.energyAvailable < room.energyCapacityAvailable){
                    /*if(link.energy >= 150){
                        if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(link, {visualizePathStyle: {stroke:"blue"}});
                        }
                        }*/
                       // console.log(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 0);
               
               
               
                if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 0){
                    if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0], {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
                    
                }
                else if(targetx.length > 0) {
                    if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetx[0]);
                    }
                    
                }
                if(storages.store[RESOURCE_ENERGY] > 0){
                        //console.log(storages);
                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                           
                        creep.moveTo(storages, {visualizePathStyle: {stroke:"red"}});
                    }
                }
                else{
                        
                    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                    }
                }
            }
           /* else if(creep.carry.energy < creep.carryCapacity && (creep.room.energyAvailable == creep.room.energyCapacityAvailable)){
                if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            } */
        }
        
        if(creep.memory.hauling) {
            //creep.say('heddd');
            if(creep.carry.energy > 0) {
                  var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType == STRUCTURE_TOWER)
                    }
                });
                
                
                if((targets.length > 0) && (creep.room.energyAvailable < creep.room.energyCapacityAvailable)) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if((tower[0].energy < 600) && creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#000000'}});
                }
                else if(tower.length > 1 && creep.transfer(tower[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower[1], {visualizePathStyle: {stroke: '#000000'}});
                }
                else if(creep.room.energyAvailable == creep.room.energyCapacityAvailable){
                    if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                //}
            }
        }
    }
};

module.exports = roleHauler;