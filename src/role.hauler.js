var hauler = {

    run: function(creep, links,goal, job, homeID){

       /// Game.creeps.Cole.moveTo(Game.flags['Main'].pos);
        var storages = creep.room.storage;

        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 Retrieving');


        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.hauling = true;
            creep.say('Hauling');
        }
        ///////////////    JOB LINKS/LABS/TERMINAL   ///////////////////////////
        if(job == 'links[0]'){
            var labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB && l.energy < l.energyCapacity; }});
            var term = creep.room.terminal;

        ////////////// TERMINAL ////////////////  (loook into this. Is it seperate from the energy withdrawing of labs and links for a reason?)
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
                            return;
                        }
                    }
                    if(creep.transfer(term, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                        creep.moveTo(term);
                        return;
                    }
                }
            }
            ////////////////// LINKS + LABS /////////////////////////
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

        if(job == 'carrier'){

            // Grab energy //
            if(!creep.memory.hauling && storages && creep.room != Game.flags[goal].room){

                if(storages.store[RESOURCE_ENERGY] > 20000){
                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke:"red"}});
                        return;
                    }
                }
            }
            // Going code //
            if(creep.memory.hauling){
                if (Game.flags[goal] == undefined){
                    console.log('No ' + goal + ' Flag Found?');
                    return;
                }
                else{
                    if (creep.room != Game.flags[goal].room) {
                        creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }

                // Store code //
                if(creep.room == Game.flags[goal].room){
                    if(Game.flags[goal].room.storage == undefined) return;
                    if(creep.pos != Game.flags[goal].room.storage.pos){
                        creep.moveTo(Game.flags[goal].room.storage,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                        for(const resourceType in creep.carry) {
                            creep.transfer(Game.flags[goal].room.storage, resourceType);
                                   return;
                        }
                    }
                }
            }
            // Coming code //
            if(!creep.memory.hauling){

                for(name in Memory.rooms){
                    if(creep.memory.homeID == Memory.rooms[name].homeID){

                        if (creep.room != Memory.rooms[name].roomName) {
                            creep.moveTo(Game.flags[Memory.rooms[name].flag], { visualizePathStyle: { stroke: '#22B91B' } });
                            return;
                        }
                    }
                }
            }
        }

        ///// NORMAL HAULING, aka, grab from containers/links/storage and fill spawn and extensions. /////////
            //  Energy Grabbing //
        if(!creep.memory.hauling && job == 'normal'|| job == undefined || job == null){


            if((creep.carry.energy < creep.carryCapacity) && (creep.room.energyAvailable <= creep.room.energyCapacityAvailable)) {
                const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
                var can = creep.room.find(FIND_STRUCTURES, { filter: function(s){
                    return (s.structureType == STRUCTURE_CONTAINER &&
                            s.store[RESOURCE_ENERGY] >= creep.carryCapacity)
                        }
                    });

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

                else if(storages){
                    if(storages.store[RESOURCE_ENERGY] > 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                        if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke:"red"}});
                            return;
                        }
                    }
                }
            }
        }
            // Energy Storing //
        if(creep.memory.hauling && job == 'normal') {

            var tower = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_TOWER; }});

            if(creep.carry.energy > 0) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (s) => {
                            return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN)
                                    && s.energy < s.energyCapacity;
                        }
                });


                if((targets.length > 0) && (creep.room.energyAvailable < creep.room.energyCapacityAvailable)) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
                // Tower hauling for free time. Patchwork code. IF > 0 (1 or more) fill the first tower. If 2 towers, fill the second. Has to be a better way
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
                        for(const resourceType in creep.carry) {
                            creep.transfer(storages, resourceType);
                            return;
                        }
                    }

                }

            }
        }
    }
};

module.exports = hauler;
