var hauler = {

    run: function(creep, links, job){

       /// Game.creeps.Cole.moveTo(Game.flags['Main'].pos);
        var storages = creep.room.storage;
        var can = creep.room.find(FIND_STRUCTURES, { filter: function(s){ return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity;
                }
        }); // extensions and spawn
        var sources = creep.room.find(FIND_SOURCES_ACTIVE); // energy sources
        const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
        var tower = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_TOWER; }});
        var labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB && l.energy < l.energyCapacity; }});
        var term = creep.room.terminal;
        //Game.creeps.Nicholas.moveTo(new RoomPosition(25, 20, 'W43S27'));


        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 Retrieving');


        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }
        if(job == 'links[0]'){

            if(term){
                var total = _.sum(creep.carry);
                if(total < creep.carryCapacity){
                    if(term.store[RESOURCE_LEMERGIUM] <= 500){
                        if(storages){
                            if(storages.store[RESOURCE_LEMERGIUM] > 0){
                                if(creep.withdraw(storages, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(storages);
                                    return;
                                }
                            }
                        }
                    }
                    if( !(RESOURCE_ENERGY in term.store) ){
                        if(term.store[RESOURCE_ENERGY] <= 1000){
                            if(storages){
                                if(RESOURCE_ENERGY in storages){
                                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                        creep.moveTo(storages);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(total == creep.carryCapacity && term.store[RESOURCE_ENERGY] <= 1000){
                if(term){
                    if(creep.carry.energy > 0){
                        if(creep.transfer(term, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(term);
                        }
                    }
                    if(creep.transfer(term, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                        creep.moveTo(term);
                        return;
                    }
                }
            }

        else if(links){
            if(creep.carry.energy < creep.carryCapacity){
                if(creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(links[0]);
                    return;
                }
            }
            if(creep.carry.energy == creep.carryCapacity){
                if(labs){
                    if(creep.transfer(labs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(labs[0]);
                        return;
                    }
                }
                if(storages){
                    if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages);
                        return;
                    }
                }
            }
        }
        }
        if(!creep.memory.hauling && job == 'normal'){


            if((creep.carry.energy < creep.carryCapacity) && (creep.room.energyAvailable <= creep.room.energyCapacityAvailable)) {

               // if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 0){  <---why was this here?????
                /*if(creep.memory.role != 'hauler2'){
                    if(links.length > 0){

                        if(links[0] != undefined && links[0].energy){
                            if(creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(links[0], {reusePath: 10});
                                 return;
                            }
                        }
                    }
                }*/
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
                if(can.length > 1  && (can[1].store[RESOURCE_ENERGY] >= creep.carryCapacity) && creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
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

        if(creep.memory.hauling && job == 'normal') {
            if(creep.carry.energy > 0) {



                if((targets.length > 0) && (creep.room.energyAvailable < creep.room.energyCapacityAvailable)) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
                else if(tower.legnth > 0 && (tower[0].energy < 600) && creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#000000'}});
                    return;
                }
                else if(tower.length > 1 && (tower.length > 1) && (tower[0].energy < 600) && (creep.transfer(tower[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
                    creep.moveTo(tower[1],{reusePath: 10}, {visualizePathStyle: {stroke: '#000000'}});
                    return;
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

module.exports = hauler;
