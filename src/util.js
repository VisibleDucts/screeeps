

function drawGrid(roomName, startX,startY,size){
    let room = Game.rooms[roomName];

    if((room.visual.getSize() <= 512000)) {
        //is messed up if not equal x and y start values.
        let end = startX + size;
        let endY = startY + size;
        //y = 10, x = 10,  (10,10)->(20,20)
        //let yend = startX - size;
        for(var x = startX+.5; x <= end; x++){
            let lineX = new RoomVisual(roomName).line(x, startY+.5, x, end + .5, {color:'white', opacity:1});
        }
        for(var y = startY+.5; y <= endY + .5; y++){
            let lineY = new RoomVisual(roomName).line(startX+.5, y, end-.5, y,{color:'white', opacity:1});
        }
        /*for(var y = .5; y <= size + .5; y++){
            let lineY = new RoomVisual(roomName).line(startX+.5, y, end-.5, y);
        }*/

    }

    //console.log(room.visual.getSize())
}


/** @param {creep} creep  **/
function killYourself(creep){
    if(creep.memory.role != 'remoteHauler' || creep.memory.role != 'remoteHauler2' || creep.memory.role != 'remoteHauler3' || creep.memory.role != 'remoteHauler4'){
        if(creep.ticksToLive < 80){
            if(creep.memory.homeID === 1){
                if(!creep.pos.isEqualTo(Game.flags['Recycle'])){
                    creep.moveTo(Game.flags['Recycle']);
                    return;
                }
                else if(creep.pos.isEqualTo(Game.flags['Recycle'])){
                    console.log('Are you there ' + creep.name);
                    Game.spawns['Spawn1'].recycleCreep(creep);
                    return;
                }
            }
        }
    }
    return;
}


// MNUCK flee code.

function beware(creep){
    let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (threat && creep.pos.getRangeTo(threat) < 5) {
        let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
        creep.moveByPath(result.path);
        return;
    }
}

function attacked(creep){

    if(creep.hits < creep.memory.creepHP){
        let hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

        if(hostiles.length > 0){
            if(hostiles[0].owner.username !== 'Invader'){
                Game.notify(creep + ' attacked by human! at ' + creep.room + ' by ' + hostiles[0].owner.username);
            }
            if(Game.time % 10 === 0){
                console.log(creep + ' is being attacked at ' + creep.room + ' by ' + hostiles[0].owner.username);
            }
        }
    }
    creep.memory.creepHP = creep.hits;
    return;
}




function creepInit(creep){
    if(creep.memory.creepHP == undefined){
        creep.memory.creepHP = creep.hitsMax;
    }
}

function statInit(role){
    if(!Memory.stats.creep) Memory.stats.creep = {};
    if(Memory.stats.creep[role] == undefined){
        Memory.stats.creep[role] = {}
    }

}

function reboot(){
    //Could definitely add more  here to actually reboot memory
    for(var name in Game.rooms){
        if(name === 'W43S27' || name === 'W43S28' || name === 'W45S22' || name === 'W45S28'){
            if(!Memory.rooms[name].creep) Memory.rooms[name].creep = {};
            if(!Memory.rooms[name].creep.upgrader) Memory.rooms[name].creep.upgrader = {};
            if(!Memory.rooms[name].creep.upgrader.shape) Memory.rooms[name].creep.upgrader.shape = [];


        }
    }
}

function roomInit(name){

        if(Memory.rooms[name].creep == undefined){
            Memory.rooms[name].creep = {}
        }
        if(!Memory.rooms[name].creep.harvester) Memory.rooms[name].creep.harvester = {};
        if(!Memory.rooms[name].creep.harvester.job) Memory.rooms[name].creep.harvester.job = {};
        if(Memory.rooms[name].creep.harvester.job.harvesting == undefined){
            Memory.rooms[name].creep.harvester.job.harvesting = {};
        }
        if(Memory.rooms[name].creep.harvester.job.reboot == undefined){
            Memory.rooms[name].creep.harvester.job.reboot = {};
        }

        ///
        if(Memory.rooms[name].creep.claimer == undefined){
            Memory.rooms[name].creep.claimer = {};
        }
        if(Memory.rooms[name].creep.claimer.job == undefined){
            Memory.rooms[name].creep.claimer.job = {};
        }
        if(Memory.rooms[name].creep.claimer.job.claiming == undefined){
            Memory.rooms[name].creep.claimer.job.claiming = {};
        }
        if(Memory.rooms[name].creep.claimer.job.reserving == undefined){
            Memory.rooms[name].creep.claimer.job.reserving = {};
        }
        if(Memory.rooms[name].creep.claimer.job.attacking == undefined){
            Memory.rooms[name].creep.claimer.job.attacking = {};
        }

        ///
        if(Memory.rooms[name].creep.dismantler == undefined){
            Memory.rooms[name].creep.dismantler = {};
        }

        ///
        if(Memory.rooms[name].creep.sharvester == undefined){
            Memory.rooms[name].creep.sharvester = {};
        }
        if(Memory.rooms[name].creep.sharvester.node1 == undefined){
            Memory.rooms[name].creep.sharvester.node1 = {};
        }
        if(Memory.rooms[name].creep.sharvester.node2 == undefined){
            Memory.rooms[name].creep.sharvester.node2 = {};
        }

        ///
        if(Memory.rooms[name].creep.upgrader == undefined){
            Memory.rooms[name].creep.upgrader = {};
        }

        ///
        if(Memory.rooms[name].creep.builder == undefined){
            Memory.rooms[name].creep.builder = {};
        }

        ///
        if(Memory.rooms[name].creep.repairer == undefined){
            Memory.rooms[name].creep.repairer = {};
        }

        ///
        if(Memory.rooms[name].creep.hauler == undefined){
            Memory.rooms[name].creep.hauler = {};
        }
        if(Memory.rooms[name].creep.hauler.job == undefined){
            Memory.rooms[name].creep.hauler.job = {};
        }
        if(Memory.rooms[name].creep.hauler.job.normal == undefined){
            Memory.rooms[name].creep.hauler.job.normal = {};
        }
        if(Memory.rooms[name].creep.hauler.job.links == undefined){
            Memory.rooms[name].creep.hauler.job.links = {};
        }
        if(Memory.rooms[name].creep.hauler.job.transfer == undefined){
            Memory.rooms[name].creep.hauler.job.transfer = {};
        }
        if(Memory.rooms[name].creep.hauler.job.carrier == undefined){
            Memory.rooms[name].creep.hauler.job.carrier = {};
        }
        //
        if(Memory.rooms[name].creep.linkHauler == undefined){
            Memory.rooms[name].creep.linkHauler = {};
        }

        //
        if(Memory.rooms[name].creep.towerHauler == undefined){
            Memory.rooms[name].creep.towerHauler = {};
        }

        //
        if(Memory.rooms[name].creep.remote == undefined){
            Memory.rooms[name].creep.remote = {};
        }
        if(Memory.rooms[name].creep.remote.goal == undefined){
            Memory.rooms[name].creep.remote.goal = {};
        }
        if(Memory.rooms[name].creep.remoteHauler == undefined){
            Memory.rooms[name].creep.remoteHauler = {};
        }
        if(Memory.rooms[name].creep.remoteHauler.goal == undefined){
            Memory.rooms[name].creep.remoteHauler.goal = {};
        }
        if(Memory.rooms[name].creep.remoteRepair == undefined){
            Memory.rooms[name].creep.remoteRepair = {};
        }
        if(Memory.rooms[name].creep.remoteRepair.goal == undefined){
            Memory.rooms[name].creep.remoteRepair.goal = {};
        }
        if(Memory.rooms[name].creep.defender == undefined){
            Memory.rooms[name].creep.defender = {};
        }
        if(Memory.rooms[name].creep.defender.job == undefined){
            Memory.rooms[name].creep.defender.job = {};
        }
        if(Memory.rooms[name].creep.defender.job.guard == undefined){
            Memory.rooms[name].creep.defender.job.guard = {};
        }
        if(Memory.rooms[name].creep.defender.job.ranged == undefined){
            Memory.rooms[name].creep.defender.job.ranged = {};
        }
        if(Memory.rooms[name].creep.mineral == undefined){
            Memory.rooms[name].creep.mineral = {};
        }
        if(Memory.rooms[name].creep.mineral.job == undefined){
            Memory.rooms[name].creep.mineral.job = {};
        }
        if(Memory.rooms[name].creep.mineral.job.normal == undefined){
            Memory.rooms[name].creep.mineral.job.normal = {};
        }
        if(Memory.rooms[name].creep.mineral.job.remote_mineral == undefined){
            Memory.rooms[name].creep.mineral.job.remote_mineral = {};
        }
        if(!Memory.rooms[name].creep.healer) Memory.rooms[name].creep.healer = {};

    }


global.creepCount = function(roomName, role, num){
   // console.log('is this thing on?');
    if(Memory.rooms[roomName] == undefined) return;
   /* if(Memory.rooms[roomName].creep[role] == undefined){
        util.roomInit(roomName);
    }*/

    Memory.rooms[roomName].creep[role].count = num;

}

function getEnergy(creep){

    let sources = creep.room.find(FIND_SOURCES_ACTIVE);
    let dropped = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
    let can = creep.room.find(FIND_STRUCTURES, { filter: (s) => { return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 49)}});


    if(dropped.length) {
        if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropped[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            return;
        }
    }
    if(can.length){
        if((can.length == 1) && (creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
            creep.moveTo(can[0], {visualizePathStyle: {stroke: "#00aaFF"}});
            return;
        }
        else if(can.length == 2 && (can[1].store[RESOURCE_ENERGY] > can[0].store[RESOURCE_ENERGY])){
            if(creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(can[1], {visualizePathStyle: {stroke: "#00aaFF"}});
                return;
            }
        }
    }


    if(creep.room.storage){
        if(creep.room.storage[RESOURCE_ENERGY] > 0){
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke:"red"}});
                return;
            }
        }
    }
    if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        return;
    }

}

module.exports = {
    drawGrid,
    beware,
    getEnergy,
    roomInit,
    reboot,
   // creepCount,
    statInit,
    creepInit,
    attacked,
    killYourself,
};
