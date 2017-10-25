/*
let roomName2coords = function(name) {
    // define E0N0 as {x: 0, y: 0}
    // define northward as positive y
    // define eastward as positive x
    let re = /^([EW])(\d+)([NS])(\d+)$/;
    let matches = re.exec(name);
    if (!matches) {
        return null;
    }
    let result = {x: 0, y: 0};
    let horizontal = parseInt(matches[2]);
    let vertical = parseInt(matches[4]);
    if (matches[1] == 'E') {
        result.x = horizontal;
    } else {
        result.x = -1 - horizontal;
    }
    if (matches[3] == 'N') {
        result.y = vertical;
    } else {
        result.y = -1 - vertical;
    }
    return result;
};

let coords2roomName = function(coords) {
    let ew = 'E';
    let horiz = coords.x;
    let ns = 'N';
    let vert = coords.y;
    if (coords.x < 0) {
        ew = 'W';
        horiz = - horiz - 1;
    }
    if (coords.y < 0) {
        ns = 'S';
        vert = - vert - 1;
    }
    return ew + horiz.toString() + ns + vert.toString();
};
*/


var observer = {

    /** @param {string} myRoom  **/
    getRooms: function(myRoom){
        //let room = Game.rooms[myRoom];
        if(myRoom.length === 6){
            var roomXString = myRoom.substr(1,2);
            var roomYString = myRoom.substr(4,5);
        }
        //console.log(roomX[0]);
        //if(Game.map.getRoomLinearDistance(myRoom, otherRoom) <= 10){

        //}


    },

    run: function(myRoom, roomName){
        //NOTE: will this ever be used? myRoom that is..When I have multiple observers maybe?
        let room = Game.rooms[myRoom];
        let observer = room.find(FIND_MY_STRUCTURES, {filter: (s)=> {return s.structureType === STRUCTURE_OBSERVER}});

        if(observer[0].observeRoom(roomName) === 0){
            let observedRoom = Game.rooms[roomName];
            if(observedRoom !== undefined){
                if(!Memory.observedRooms[observedRoom]) Memory.observedRooms[observedRoom] = {};
                Memory.observedRooms[observedRoom].lastUpdated = Game.time;
                //NOTE: controller information incuding if a room is owned and by who and if it's resreved.
                if(observedRoom.controller !== undefined){
                    if(!Memory.observedRooms[observedRoom].controller) Memory.observedRooms[observedRoom].controller = {};
                    Memory.observedRooms[observedRoom].controller.id = observedRoom.controller.id;

                    if(observedRoom.controller.owner !== undefined){
                        Memory.observedRooms[observedRoom].owner = observedRoom.controller.owner.username;
                        Memory.observedRooms[observedRoom].controller.level = observedRoom.controller.level;
                        Memory.observedRooms[observedRoom].controller.progress = observedRoom.controller.progress;
                        if(observedRoom.controller.safeMode !== undefined){
                            Memory.observedRooms[observedRoom].controller.safeMode = observedRoom.controller.safeMode;
                        }
                        Memory.observedRooms[observedRoom].controller.safeModeAvailable = observedRoom.controller.safeModeAvailable;
                        if(observedRoom.controller.safeModeCooldown !== undefined){
                            Memory.observedRooms[observedRoom].controller.safeModeCooldown = observedRoom.controller.safeModeCooldown;
                        }
                    }
                    else if(observedRoom.controller.ownner === undefined){
                        if(observedRoom.controller.reservation !== undefined){
                            Memory.observedRooms[observedRoom].reserved = true;
                            Memory.observedRooms[observedRoom].owner = observedRoom.controller.reservation.username;
                            Memory.observedRooms[observedRoom].controller.reservationTimeLeft = observedRoom.controller.reservation.ticksToEnd;
                        }
                        else if(observedRoom.controller.reservation === undefined){
                            Memory.observedRooms[observedRoom].reserved = false;
                        }
                    }
                }
                //NOTE: End controller section.
                //NOTE: Storage section.
                if(observedRoom.storage !== undefined){
                    if(!Memory.observedRooms[observedRoom].storage) Memory.observedRooms[observedRoom].storage = {};
                    Memory.observedRooms[observedRoom].storage.id = observedRoom.storage.id;
                    if(!Memory.observedRooms[observedRoom].storage.resources) Memory.observedRooms[observedRoom].storage.resources = {};
                    for(var resourceType in observedRoom.storage.store){
                        Memory.observedRooms[observedRoom].storage.resources[resourceType] = observedRoom.storage.store[resourceType];
                    }
                }

                //NOTE: Terminal section.
                if(observedRoom.storage !== undefined){
                    if(!Memory.observedRooms[observedRoom].terminal) Memory.observedRooms[observedRoom].terminal = {};
                    Memory.observedRooms[observedRoom].terminal.id = observedRoom.terminal.id;
                    if(!Memory.observedRooms[observedRoom].terminal.resources) Memory.observedRooms[observedRoom].terminal.resources = {};
                    for(var resourceType in observedRoom.terminal.store){
                        Memory.observedRooms[observedRoom].terminal.resources[resourceType] = observedRoom.terminal.store[resourceType];
                    }
                }
                //NOTE: Is there a nuker?


                let nuke = observedRoom.find(FIND_STRUCTURES,{filter: (s) => { return  s.structureType === STRUCTURE_NUKER; }});
                let nuker = nuke[0];
                if(nuker !== undefined){
                    if(!Memory.observedRooms[observedRoom].nuker) Memory.observedRooms[observedRoom].nuker = {};
                    Memory.observedRooms[observedRoom].nuker.id = nuker.id;
                    Memory.observedRooms[observedRoom].nuker.energy = nuker.energy;
                    Memory.observedRooms[observedRoom].nuker.ghodium = nuker.ghodium;
                    if(nuker.ghodium === nuker.ghodiumCapacity && nuker.energy === nuker.energyCapacity){
                        Memory.observedRooms[observedRoom].nuker.fueled = true;
                    }
                    else { Memory.observedRooms[observedRoom].nuker.fueled = false;}
                    if(nuker.cooldown !== undefined){
                        Memory.observedRooms[observedRoom].nuker.cooldown = nuker.cooldown;
                    }
                }



            }

            return;
        }
        if(observer[0].observeRoom(roomName) === -9){
            console.log(Game.rooms[roomName] + ' is out of range.');
            return;
        }
        if(observer[0].observeRoom(roomName) === -10){
            console.log(roomName + ' is not a valid room name.');
            return;
        }
        if(observer[0].observeRoom(roomName) === -14){
            console.log(room + ' is not RCL 8!');
            return;
        }
    }

};

module.exports = observer;
