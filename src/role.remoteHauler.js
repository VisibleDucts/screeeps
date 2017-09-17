var roleRemoteHauler = {


        run: function(creep, loc, homeID) {

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
              //  console.log(homeID);
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
               //console.log(creep.pos.toString() =='[room W42S27 pos 25,37]' );
             /*  if(loc == Game.flags['Remote'].pos){

                    if(creep.pos.toString() != '[room W42S27 pos 25,37]'){

                        creep.moveTo(new RoomPosition(25, 37, 'W42S27'), {visualizePathStyle: {stroke: '#FFFFFF'}});
                        //console.log(creep.pos);
                        return;

                    }
                 //   creep.say('whatt');
                }
                else if(loc == 'Remote2') {
               // creep.say('whatt');
                    if(loc == 'Remote2'){
                        if (creep.room != Game.flags[loc].room) {
                            creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                            return;
                        }
                        /*if(creep.pos.toString() != '[room W44S27 pos 17,21]'){

                            creep.moveTo(new RoomPosition(17, 21, 'W44S27'), {visualizePathStyle: {stroke: '#FFF9FF'}});
                            //console.log(creep.pos);
                            return;

                        }
                    }
                } */
               // else{

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

                //}
            }
            //console.log(creep.pos + ' ' + Game.flags['Main'].pos)

            if(creep.memory.hauling){

            if(Game.flags[homeID] == undefined) return;
            if(creep.pos.toString() != Game.flags[homeID].pos.toString()){
                if(creep.pos != Game.flags[homeID].pos){
                    creep.moveTo(Game.flags[homeID], {visualizePathStyle: {stroke:'#F0F0F0'}});
                    return;
                }
            }
           /* else if(creep.pos == Game.flags['Main']){
                creep.say('hide');
                var storages = creep.room.storage;
                creep.memory.home = true;
            }*/
            //creep.say('boo');
            //console.log(creep.carry.energy + ' ' + creep.carryCapacity);
                if(creep.pos.toString() === Game.flags[homeID].pos.toString() && creep.carry.energy == creep.carryCapacity){
                    var storages = creep.room.storage;
                    var links = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK);}
                    });
                    //creep.say('hideeee');
                 // console.log(links.length > 1);
                   /* if(loc == Game.flags['Remote2'].pos){
                        // if(links.length > 1){
                            if(creep.transfer(links[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(links[2], {reusePath:10});
                           // }
                        }
                    } */

                        if(creep.pos != storages.pos){
                            creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                            //creep.say('hid');
                             for(const resourceType in creep.carry) {
                                creep.transfer(storages, resourceType);
                            }
                        }

                    if(creep.carry.energy == 0){
                        creep.memory.home = false;
                    }
                }
            }



        }
    };

    module.exports = roleRemoteHauler;
