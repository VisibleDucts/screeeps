var roleHauler = {

    run: function(creep, links){
       
       /// Game.creeps.Cole.moveTo(Game.flags['Main'].pos);
        var storages = creep.room.storage;
        var can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)}});
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
        }); // extensions and spawn
        var sources = creep.room.find(FIND_SOURCES_ACTIVE); // energy sources
        
        const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
        
        var tower = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType == STRUCTURE_TOWER)
                    }
                });
        //Game.creeps.Nicholas.moveTo(new RoomPosition(25, 20, 'W43S27'));
       
        
        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 Retrieving');
            
            
        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }
        
        if(!creep.memory.hauling){
            if((creep.carry.energy < creep.carryCapacity) && (creep.room.energyAvailable <= creep.room.energyCapacityAvailable)) {
                   
               
               
               // if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 0){  <---why was this here?????
                    
                    if(links.length > 0){
                        
                        if(links[1] != undefined && links[1].energy > 700){
                            if(creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(links[1], {reusePath: 10});
                                 return;
                            }
                        }
                    }
                    
               // }
                if(targetx.length > 0) {
                    if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetx[0], {reusePath: 10}); 
                         return;
                }
                    
                } 
                if(can.length > 0 && (can[0].store[RESOURCE_ENERGY] >= creep.carryCapacity) && creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(can[0], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    return;
                }
                else if(can.length > 1  && (can[1].store[RESOURCE_ENERGY] >= creep.carryCapacity) && creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(can[1], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    return;
                }
                
                else if(storages.store[RESOURCE_ENERGY] > 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke:"red"}});
                         return;
                    }
                }
            }
        }
        
        if(creep.memory.hauling) {
            if(creep.carry.energy > 0) {
                
                
                
                if((targets.length > 0) && (creep.room.energyAvailable < creep.room.energyCapacityAvailable)) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if(tower.legnth > 0 && (tower[0].energy < 600) && creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#000000'}});
                }
                else if(tower.length > 1 && (tower.length > 1) && (tower[0].energy < 600) && (creep.transfer(tower[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
                    creep.moveTo(tower[1],{reusePath: 10}, {visualizePathStyle: {stroke: '#000000'}});
                }
                
                if(creep.room.energyAvailable == creep.room.energyCapacityAvailable){
                    if(storages == undefined) return;
                    if(creep.pos != storages.pos){
                        creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                         creep.say('hid');
                         for(const resourceType in creep.carry) {
                            creep.transfer(storages, resourceType);
                        }
                    } 
                    
                    
                       
                   // }
                    
                    
                    /*
                    if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                    }*/
                }
                //}
            }
        }
    }
};

module.exports = roleHauler;