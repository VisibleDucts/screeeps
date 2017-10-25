if(job === 'getter'){
  //  if(!Memory.stats.creep.hauler.job.getter) Memory.stats.creep.hauler.job.getter = {};
    if(creep.memory.going == undefined) creep.memory.going = true;
    if(creep.memory.grab == undefined)  creep.memory.grab = false;
    if(creep.memory.reverse == undefined)   creep.memory.reverse = false;


   // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
    if(creep.memory.boost){
        let boosty = _.filter(creep.body, (t) => !t.boost && t.type == 'carry');
        let boostLab = labs_.filter(r => r.mineralAmount > 0 && r.mineralType == creep.memory.mineral);
        if(boostLab.length && boosty.length){
            if(boostLab[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(boostLab[0]);
                return;
            }
        }
    }

    if(creep.memory.going){
        if (Game.flags[goal] == undefined){
                console.log('No ' + goal + ' Flag Found?');
                return;
            }
        else{


                if(!creep.memory.goal) {
                    creep.memory.goal = 'Claim';
                }
            if(creep.memory.reverse == false){
                switch(creep.memory.goal) {
                    case 'Claim':
                        if(!creep.memory.start || creep.memory.start == 0) creep.memory.start = Game.time;
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'One';
                        }
                        break;
                    case 'One':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'NEXT';
                        }
                        break;
                    case 'NEXT':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'NEXT2';
                        }
                        break;
                    case 'NEXT2':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'NEXT3';
                        }
                        break;
                    case 'NEXT3':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        creep.memory.grab = true;
                        creep.memory.going = false;
                        break;

                }
            }
                if (creep.room != Game.flags[creep.memory.goal].room) {
                    creep.moveTo(Game.flags[creep.memory.goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }

        if(creep.memory.grab){
            let goods = creep.room.storage;
            //console.log(goods);
            if(goods && total < creep.carryCapacity){
                for(const resourceType in goods.store) {
                    if(creep.withdraw(goods, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(goods);
                        return;
                    }
                }
               /*if(creep.withdraw(goods, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                   creep.moveTo(goods);
                   return;
               }*/
           }
           if(total < creep.carryCapacity){
               creep.memory.going = false;
               creep.memory.grab = false;
               creep.memory.reverse = true;
               creep.memory.goal = 'NEXT2';
           }
        }


        if(creep.memory.reverse){
            if(!creep.memory.goal) {
                creep.memory.goal = 'NEXT2';
            }

            switch(creep.memory.goal) {
                case 'NEXT2':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                        creep.memory.goal = 'NEXT';
                    }
                    break;
                case 'NEXT':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                        creep.memory.goal = 'One';
                    }
                    break;
                case 'One':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                        creep.memory.goal = 'Claim';
                    }
                    break;
                case 'Claim':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                        creep.memory.goal = 'Main';
                    }
                    break;
                case 'Main':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    break;
            }

            if(creep.room == Game.flags[creep.memory.goal].room){
                let storages = creep.room.storage;
                if(storages){
                    if(total > 0){
                       /* if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                        }*/
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(Game.flags[goal].room.storage, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(Game.flags[goal].room.storage);
                            }
                            //return;
                        }
                    }
                }
                if(total == 0){
                    if(creep.ticksToLive < 600){
                        console.log(creep.name + ' says: Think it\'s time for a career change!');
                        creep.memory.role = 'hauler';
                        creep.memory.job = 'normal';
                    }
                    creep.memory.goal = 'Claim';
                    creep.memory.going = true;
                    creep.memory.reverse = false;
                    if(!creep.memory.finish || creep.memory.finish == 0) creep.memory.finish = Game.time;;
                    let timeTaken = creep.memory.finish - creep.memory.start;
                    Memory.stats.creep.hauler.job.getter.extractTime = timeTaken;
                    creep.memory.start = 0;
                    creep.memory.finish = 0;
                }
            }
        }
}


if(job === 'get'){

    if(creep.memory.going === undefined) creep.memory.going = true;

    if(creep.memory.grab === undefined)  creep.memory.grab = false;
    if(creep.memory.reverse === undefined)   creep.memory.reverse = false;


   // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });


    if(creep.memory.going){
        if (Game.flags[goal] == undefined){
                console.log('No ' + goal + ' Flag Found?');
                return;
            }
        else{


                if(!creep.memory.goal) {
                    creep.memory.goal = 'Remote5';
                }
            if(creep.memory.reverse == false){
                switch(creep.memory.goal) {
                    case 'Remote5':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'Drain';
                        }
                        break;
                    case 'Drain':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        creep.memory.grab = true;
                        creep.memory.going = false;
                        break;

                }
            }
                if (creep.room != Game.flags[creep.memory.goal].room) {
                    creep.moveTo(Game.flags[creep.memory.goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }

        if(creep.memory.grab){
            let extensions = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_EXTENSION && s.energy > 0}});
            let spawn = Game.getObjectById('59bc5c270e11a5229dc22403');
            let goods = creep.room.storage;
           // console.log(goods);
            if(goods && total < creep.carryCapacity){
                for(const resourceType in goods.store) {
                    if(creep.withdraw(goods, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(goods);
                        return;
                    }
                }
               /*if(creep.withdraw(goods, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                   creep.moveTo(goods);
                   return;
               }*/
           }

            if(extensions.length){
                if(creep.withdraw(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(extensions[0]);
                    return;
                }
            }
            /*if(spawn.energy > 0){
                if(creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn);
                    return;
                }
            }*/
            if(total == creep.carryCapacity){
                creep.memory.going = false;
                creep.memory.grab = false;
                creep.memory.reverse = true;
                creep.memory.goal = 'Remote5';
            }
        }


        if(creep.memory.reverse){
            if(!creep.memory.goal) {
                creep.memory.goal = 'Remote5';
            }

            switch(creep.memory.goal) {
                case 'Remote5':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                        creep.memory.goal = 'Home2';
                    }
                    break;
                case 'Home2':
                    creep.moveTo(Game.flags[creep.memory.goal]);
                    break;
            }

            if(creep.room == Game.flags[creep.memory.goal].room){
                let storages = creep.room.storage;
                if(storages){
                    if(total > 0){
                       /* if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                        }*/
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(Game.flags[goal].room.storage, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(Game.flags[goal].room.storage);
                            }
                            //return;
                        }
                    }
                }
                if(total == 0){
                    if(creep.ticksToLive < 400){
                        creep.memory.role = 'hauler2';
                        creep.memory.job = 'normal';
                    }
                    creep.memory.goal = 'Remote5';
                    creep.memory.going = true;
                    creep.memory.reverse = false;
                }
            }
        }
}
