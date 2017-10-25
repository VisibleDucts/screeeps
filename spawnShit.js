var roles = require('roles');
var util = require('util');
var bodyPicker = require('bodyPicker');
//var W43S27 = require('W43S27');


function spawnShit(spawn){
    
    var room1 = Game.rooms['W43S27'];
    var room2 = Game.rooms['W43S28'];
    
    //Spawn1 and Spawn3 = room1.
    //Spawn2 and Spawn4 = room2.

  //  console.log(Game.spawns[spawn]);

    if(Game.spawns[spawn].memory.homeID == 1){
        var room = room1;
        var roomN = 'W43S27';
    }
    else if(Game.spawns[spawn].memory.homeID == 2){
        var room = room2;
        var roomN = 'W43S28';
    }
  //  console.log(Memory.rooms[roomN].creep.harvester.job.reboot.count + ' ' + room);
        var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeID == room.memory.homeID);
        var defender = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.homeID == room.memory.homeID);
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.homeID == room.memory.homeID);
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.homeID == room.memory.homeID);
        var sharvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester' && creep.memory.homeID == room.memory.homeID);
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && creep.memory.homeID == room.memory.homeID);
        var hauler = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.homeID == room.memory.homeID);
        var towerHauler = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler' && creep.memory.homeID == room.memory.homeID);
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.homeID == room.memory.homeID);
        var remote = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote' && creep.memory.homeID == room.memory.homeID);
        var remoteHauler = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.homeID == room.memory.homeID);
        var remoteRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.homeID == room.memory.homeID);
        var dismantler = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantler' && creep.memory.homeID == room.memory.homeID);
        var linkHauler = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkHauler' && creep.memory.homeID == room.memory.homeID);
        var healer = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer' && creep.memory.homeID == room.memory.homeID);
        var mineral =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral' && creep.memory.homeID == room.memory.homeID);
        
      /*  if(Memory.timeAdjust == undefined){
            Memory.timeAdjust = 0;
        }
        for(var name in Game.spawns){
            if(Game.spawns[name].spawning){
                if(Memory.timeAdjust == 50){
                    Memory.timeAdjust = 0;
                }
                Memory.timeAdjust++;
            }
        }
        var creepTime = Memory.timeAdjust;
    
    if(room.energyAvailable < UNIT_COST(bodyPicker('hauler')) && sharvester.length < 1 && hauler.length < 1){
        if(harvester.length < Memory.rooms[roomN].creep.harvester.job.reboot.count && Game.spawns[spawn].canCreateCreep(bodyPicker('defaultish')) == 0){
            var newName = Game.spawns[spawn].createCreep(bodyPicker('defaultish'), `${'reboot'}-${creepTime}`, {role:'harvester', job: 'reboot', goal:'', homeID: 1});
            console.log('Spawning new harvester: ' + newName);
        }
    } */
}



module.exports = {
    spawnShit,
}