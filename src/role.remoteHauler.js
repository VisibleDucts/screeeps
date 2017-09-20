var remoteHauler = {


        run: function(creep, loc,useLink, homeID) {

            if(creep.memory.hauling && creep.carry.energy == 0) {
                creep.memory.hauling = false;
                creep.memory.home = false;
                creep.say('🔄 Retrieving');

            }

            if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
                creep.memory.hauling = true;
                creep.say('Hauling');

            }


            //console.log(loc.toString() == Game.flags['Remote'].pos.toString());

            if(!creep.memory.hauling){
                if (Game.flags[loc] == undefined){
                    console.log('No ' + loc + ' Flag Found?');
                    return;
                }
                else{
                    if (creep.room != Game.flags[loc].room) {
                        creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
                var can = creep.room.find(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)}});
                const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
                //console.log(targetx);

                if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 499){
                    if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0], {reusePath: 50}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
                }
                else if(can.length > 1 && can[1].store[RESOURCE_ENERGY] > 499){
                    if(creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[1], {reusePath: 50}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
                }
                if(targetx.length > 0) {
                    if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetx[0], {reusePath: 50});
                    }
                }
            }


            if(creep.memory.hauling){

                if(Game.flags[homeID] == undefined) return;
                //Experiment to  see if this stops it from having to move all the way to the flag.
                if(creep.room.toString() != Game.flags[homeID].room.toString()){
                    //if(creep.pos != Game.flags[homeID].pos){
                        creep.moveTo(Game.flags[homeID], {visualizePathStyle: {stroke:'#F0F0F0'}});
                        return;
                //    }
                }


                if(/*creep.pos.toString() == Game.flags[homeID].pos.toString() && */creep.carry.energy > 0){ //creep.carryCapacity){
                    var storages = creep.room.storage;
                    if(useLink){
                        var links = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LINK);}
                        });
                        if(links){
                            if(creep.transfer(links[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(links[2], {reusePath:10});
                            }
                        }
                    }
                    //creep.say('hideeee');
                 // console.log(links.length > 1);
                   /* if(loc == Game.flags['Remote2'].pos){
                        // if(links.length > 1){
                            if(creep.transfer(links[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(links[2], {reusePath:10});
                           // }
                        }
                    } */

                    //if(creep.pos != storages.pos){
                    //    creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                            //creep.say('hid');
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(storages, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(storages);
                            }
                        }
                    //}


                    if(creep.carry.energy == 0){
                        creep.memory.home = false;
                    }
                }
            }



        }
    };

    module.exports = remoteHauler;
