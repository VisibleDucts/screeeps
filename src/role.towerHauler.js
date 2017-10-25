var towerHauler = {

        /** @param {Creep} creep **/
        run: function(creep) {


            const total = _.sum(creep.carry);

            if(total == 0) {
                let dropped = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
                let storages = creep.room.storage;
                //let sources = creep.room.find(FIND_SOURCES_ACTIVE);
                let can = creep.room.find(FIND_STRUCTURES, { filter: function(s) {return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity; }});

                if(dropped.length > 0) {
                    if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropped[0]);
                    }
                }
                if(can.length){
                    if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0], {visualizePathStyle: {stroke:'red'}})
                        return;
                    }
                }
                if(storages){
                    if(storages.store[RESOURCE_ENERGY] > 0){
                        if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages, {visualizePathStyle: {stroke: 'red'}});
                            return;
                        }
                    }
                }
            }


            else {
                //var tower = Game.getObjectById('59a6fdbb06441679bbeb1e0b');
              //  const total = _.sum(creep.carry);
                let tower = creep.room.find(FIND_STRUCTURES, { filter: (s) => { return s.structureType == STRUCTURE_TOWER; }});

                //if(tower[0].energy >= 600 && tower[1].energy < tower[1].energyCapacity){
                for(i in tower){
                    if(tower[i].energy < tower[i].energyCapacity){
                        if(creep.transfer(tower[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[i], {visualizePathStyle: {stroke: '#000000'}});
                            return;
                        }
                    }
                }/*
                if(tower.length > 1){
                    if(tower[0].energy < tower[0].energyCapacity && (tower[1].energy >= tower[0].energy)){
                        if(creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#000000'}});
                            return;
                        }
                    }
                    if(tower[1].energy < tower[1].energyCapacity && (tower[1].energy <= tower[0].energy)){
                        if(creep.transfer(tower[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[1], {visualizePathStyle: {stroke: '#000000'}});
                            return;
                        }
                    }
                }
                if(tower.length > 2){
                    if(tower[2].energy < tower[2].energyCapacity && (tower[2].energy <= tower[0].energy) && (tower[2].energy <= tower[1].energy)){
                        if(creep.transfer(tower[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(tower[2], {visualizePathStyle: {stroke: '#000000'}});
                            return;
                        }
                    }
                }

              /*  if(creep.room.storage){
                    for(const resourceType in creep.carry) {
                        if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage);

                        }
                    }
                } */

            }
        }
};

    module.exports = towerHauler;
