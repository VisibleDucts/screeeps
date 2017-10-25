var bodyPicker = require('bodyPicker');
var util = require('util');

var carrier = {
    /** @param {object} spawn, @param {string} body_name, @param {creepTime} creepTime, @param {string} job **/
    spawn: function(spawner,body_name,creepTime, job, goal, sendResource, getResource, resource_send, resource_get,boost,boost_resource, homeID) {
        return spawner.createCreep(
            bodyPicker(body_name),
            `${'carrier'}-${creepTime}`,
            {
                role: 'haulerC',
                job: job,   //string
                goal: goal,   //string
                sendResource: sendResource, //bool
                getResource: getResource, //bool
                resource_send: resource_send, //string
                resource_get: resource_get, //string
                boost: boost,  //boool
                boost_resource: boost_resource, //string
                homeID: homeID, //number
                //homeRoom: spawner.room
            }
        );
    },

    //add checks to make sure places have rsources to grab.
    run: function(creep){
        let goal = creep.memory.goal;
        let getResource = creep.memory.getResource;
        let storages = creep.room.storage;
        let homeRoomID = creep.memory.homeID;
        let sendResource = creep.memory.sendResource;
        let resource_send = creep.memory.resource_send;
        let resource_get = creep.memory.resource_get;
        let boost = creep.memory.boost;
        let boost_resource = creep.memory.boost_resource;

        //watch to make sure this doesn't fuck up.
        if(creep.memory.homeRoom == undefined){
            creep.memory.homeRoom = creep.room;
        }
        let homeRoom = creep.memory.homeRoom.name;
        let total = _.sum(creep.carry);

        util.attacked(creep);

        if(creep.ticksToLive < 80) {
            if(homeRoomID === 1){
                var homeFlag = 'Main';
            }
            else if(homeRoomID === 2){
                var homeFlag = 'Home2'
            }
            if(creep.room === Game.flags[homeFlag].room && total === 0){
                creep.memory.job = 'death';
            }
        }

        if(creep.memory.job === 'death'){
            if(homeRoomID === Game.rooms['W43S27'].homeID && creep.room === Game.rooms['W43S27']){
                if(!creep.pos.isEqualTo(Game.flags['Recycle'])){
                    creep.moveTo(Game.flags['Recycle']);
                    return;
                }
                if(creep.pos.isEqualTo(Game.flags['Recycle'])){
                    Game.spawns['Spawn1'].recycleCreep(creep);
                    return;
                }
            }
            if(creep.room === Game.rooms['W43S28']){
                if(!creep.pos.isEqualTo(Game.flags['Deathzone'])){
                    creep.moveTo(Game.flags['Deathzone']);
                    return;
                }
                if(creep.pos.isEqualTo(Game.flags['Deathzone'])){
                    Game.spawns['Spawn2'].recycleCreep(creep);
                    return;
                }
            }
        }
        /* ========   Start Phase =================== */

        //Check to see if it's sending resources and total carry is 0.
        if(sendResource && total === 0){
            //grab resources sending IF in home room.
            if(creep.room.name === homeRoom){
                if(storages.store[resource_send] > 0){
                    if(creep.withdraw(storages,resource_send) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storages,{visualizePathStyle: {stroke:"red"}});
                        return;
                    }
                }
                if(creep.room.terminal){
                    if(creep.room.terminal.store[resource_send] > 0){
                        if(creep.withdraw(creep.room.terminal,resource_send) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal,{visualizePathStyle: {stroke:"red"}});
                            return;
                        }
                    }
                }
            }
        }   //move to goal room

        if(creep.carry[resource_send] === creep.carryCapacity || !sendResource){
            if (Game.flags[goal] == undefined){
                console.log('No ' + goal + ' Flag Found? says ' + creep.name);
                return;
            }
            else{
                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }
        if(creep.carry[resource_get] === creep.carryCapacity || (!getResource && creep.carry[resource_send] === 0)){
            if (Game.flags[Memory.rooms[homeRoom].flag] == undefined){
                console.log('No ' + goal + ' Flag Found? says ' + creep.name);
                return;
            }
            else{
                if (creep.room != Game.flags[Memory.rooms[homeRoom].flag].room) {
                    creep.moveTo(Game.flags[Memory.rooms[homeRoom].flag], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
            /* === try that ^ way
            if((getResource && total === creep.carryCapacity && resource_get in creep.carry) || !getResource){
                if(creep.room !== homeRoom){
                    if(!creep.pos.isEqualTo(Game.flags[Memory.rooms[homeRoom].flag].pos))
                        creep.moveTo(Game.flags[Memory.rooms[homeRoom].flag].pos);
                    return;
                }
            }
            */
        }
        /* ==== Also messy
        if((sendResource && total === creep.carryCapacity &&
            (creep.room === homeRoom || creep.room !== Game.flags[goal].room)
             && !(resource_get in creep.carry)) || !sendResource){
        }
        */

        /* ====================== Goal Room Phase =============== */
        //Deposit resources
        if(sendResource && creep.room === Game.flags[goal].room && total === creep.carryCapacity && creep.carry[resource_send] === creep.carryCapacity){
            var goalStorage = creep.room.storage;
            if(creep.transfer(goalStorage, resource_send) === ERR_NOT_IN_RANGE){
                creep.moveTo(goalStorage);
                return;
            }
        }

        //Check to see if it's grabbing resources
        if(getResource && total === 0 && creep.room.name !== homeRoom){
            var goalStorage = creep.room.storage;
            //see what it's grabbing
            if(creep.withdraw(goalStorage, resource_get) === ERR_NOT_IN_RANGE){
                creep.moveTo(goalStorage);
                return;
            }
        }

        if(getResource && total === creep.carryCapacity && creep.room.name === homeRoom && resource_get in creep.carry){
            if(creep.transfer(storages, resource_get) === ERR_NOT_IN_RANGE){
                creep.moveTo(storages);
                return;
            }
        }
    }
};


module.exports = carrier;
