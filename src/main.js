var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSHarvester = require('role.sharvester');
var roleSHarvester2 = require('role.sharvester2');
var roleRepair = require('role.repair');
var roleHauler = require('role.hauler');
var roleDefender = require('role.defender');
var roleTowerHauler = require('role.towerHauler');
var roleTower = require('tower');
var roleClaimer = require('role.claimer');
var roleScout = require('role.scout');
var roleRemoteHarvester = require('role.remoteHarvester');
var links = require('links');
var roleRemoteRepair = require('role.remoteRepair');
var roleDismantler = require('role.dismantler');
//var spawnCreep = require('spawnCreeper');


global.UNIT_COST = (body) => _.sum(body, p => BODYPART_COST[p]);
/*global.spawnCreep = function spawnCreep(SA, role, Spawns) {
    for(let Spawn of Spawns) {
        if(Spawn.memory.spawned != true) {
            if(Spawn.canCreateCreep(SA) == OK) {
                var newName = Spawn.createCreep(SA, `${role}-${Game.time}`, {role: role, born: Spawn.room.name});
                Spawn.memory.spawned = true;
                console.log(Spawn.room.name + ' spawning ' + role);
                return newName;
            }
        }
    }
},*/



/*global.CREEPS_AMT = () => {return console.log('Harvesters: ' + harvesters.length + '. Builders: ' + builders.length + ', Upgraders: ' + upgraders.length + ', Repair: ' + repairers.length + ', Haulers: ' + haulers.length +
', Tower Haulers: ' + towerHaulers.length + ' Claimers: ' + claimers.length + ' Remote Harvesters: ' + remoteHarvesters.length +
', Remote Repairers:' + remoteRepairers.length);};*/

module.exports.loop = function(){

    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            console.log('Clearing non-existing creep memory: ' + name);
           /* if(Game.creeps.name.memory.flag == 'Harvest0'){
                Game.flags.Harvest0.hasCreep = false;
            }
            /*else if(Game.creeps[name].memory.flag == 'Harvest1'){
                Game.flags.Harvest1.hasCreep = false;
            }*/
            delete Memory.creeps[name];
        }
    }
   
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var sharvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester');
    var sharvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester2');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair2');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var towerHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler');
    var towerHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler2');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester');
    var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer');
    var remoteDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantlers');
    

        if ((Game.time % 10) === 0){
           console.log('Harvesters: ' + harvesters.length + '. Builders: ' + builders.length + ', Upgraders: ' + upgraders.length + ', Repair: ' + repairers.length + ', Haulers: ' + haulers.length +
           ', Tower Haulers: ' + towerHaulers.length + ' Claimers: ' + claimers.length + ' Remote Harvesters: ' + remoteHarvesters.length +
           ', Remote Repairers:' + remoteRepairers.length);
        }
    
    //Controller level. Using as a way to dynamically control the amount of upgraders spawned.
    var roomController = Game.getObjectById('5982fc88b097071b4adbdabf');

    //Construction Sites unfinisehd. Using to dynamically control amount of builders spawned.
    var construction = Object.keys(Game.constructionSites).length;



    
    /*for(const i in Game.spawns) {
        if(harvesters.length < 1){
            var newName = Game.spawns[i].createCreep([WORK, CARRY, MOVE], undefined, {role:'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
    }*/

    
    if(Game.rooms['W43S28'].energyAvailable <= 300){
        if(harvesters2.length < 1){
            var newName = Game.spawns['Spawn2'].createCreep([WORK,CARRY,MOVE], undefined, {role:'harvester2'});
            console.log('Spawning new harvester from Spawn2: ' + newName);
        }
    }
    else{
        if(harvesters2.length < 1){
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY], undefined, {role:'harvester2'});
            console.log('Spawning new harvester in Spwan2: ' + newName);
        }
        if(builders2.length < 4 && harvesters2.length > 0){
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY], undefined, {role:'builder2'});
            console.log('Spawning new builder in Spawn2: ' + newName);
        }
        if(upgraders2.length < 2 && harvesters2.length > 0){
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY], undefined, {role:'upgrader2'});
            console.log('Spawning new upgrader in Spawn2: ' + newName);
        }
        if(repairers2.length < 1 && harvesters2.length > 0){
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,WORK,CARRY], undefined, {role:'repair2'});
            console.log('Spawning new repairer in Spawn2: ' + newName);
        }
        if(towerHaulers2.length < 1){
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role:'towerHauler2'});
            console.log('Spawning new Tower Hauler in Spawn2: ' + newName);
        }
        
    }
    
        
    //Auto-Spawning code for each role.
    if(Game.rooms['W43S27'].energyAvailable <= 300){
        if(harvesters.length < 1){
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role:'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
    }
    else{
            if(defenders.length < 0){
            var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK, RANGED_ATTACK], undefined, {role:'defender'});
            console.log('Spawning new upgrader at Spawn1: ' + newName);
            }
       
            if(harvesters.length < 1){
                var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY], undefined, {role:'harvester'}); //Cost 900
                console.log('Spawning new harvester: ' + newName);
            }
            
            if(haulers.length < 2){
                var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], undefined, {role:'hauler'});
                console.log('Spawning new hauler: ' + newName);
            }
        
    }   // [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY] Cost: 1,550
    if(harvesters.length > 0 && haulers.length > 0){
       
        if(sharvester.length < 1){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,WORK,WORK,WORK,WORK, WORK], undefined, {role:'sharvester', flag:'Harvest0'});
            console.log('Spawning new sharvester: ' + newName);
        }
        
        if(sharvester2.length < 1){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,WORK,WORK,WORK,WORK, WORK], undefined, {role:'sharvester2'});
            console.log('Spawning new sharvester2 in Spawn1: ' + newName);
        }
 
        
        if(upgraders.length < 4){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY], undefined, {role:'upgrader'});
            console.log('Spawning new upgrader at Spawn1: ' + newName);
        }
       

        if(builders.length < 3){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY], undefined, {role:'builder'});
            console.log('Spawning new builder at Spawn1: ' + newName);
        }
        if(repairers.length < 2 && upgraders.length >= 1){
            var newNamme = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role:'repair'});
            console.log('Spawning new repairer: ' + newNamme);
        }
        
        if(towerHaulers.length < 1 && (upgraders.length >= 1 && repairers.length >= 1)){
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role:'towerHauler'});
            console.log('Spawning new Tower Hauler: ' + newName);
        }
        if(claimers.length < 0 && (upgraders.length >= 1 && repairers.length >= 1)){
            var newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE], undefined, {role:'claimer'});
            console.log('Spawning new claimer: ' + newName);
        }
        /*if(scouts.length < 1){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE], undefined, {role: 'scout'});
            console.log('Spawning new scout: ' + newName);
        }*/
        if(remoteHarvesters.length < 0){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY], undefined, {role: 'remoteHarvester'});
            console.log('Spawning new remoteHarvester: ' + newName);
        }
       if(remoteRepairers.length < 0){
            var newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, WORK, WORK,CARRY], undefined, {role: 'remoteRepairer'});
            console.log('Spawning new remoteRepairer: ' + newName);
        }
    }

    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester2'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'upgrader2'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'builder2'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'sharvester'){
            roleSHarvester.run(creep);
        }
        if(creep.memory.role == 'sharvester2'){
            roleSHarvester2.run(creep);
        }
        if(creep.memory.role == 'repair'){
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'repair2'){
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'dismantler'){
            roleDismantler.run(creep);
        }
        if(creep.memory.role == 'hauler'){
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'towerHauler'){
            roleTowerHauler.run(creep);
        }
        if(creep.memory.role == 'towerHauler2'){
            roleTowerHauler.run(creep);
        } 
        if(creep.memory.role == 'claimer'){
            roleClaimer.run(creep);
        }
        /*if(creep.memory.role == 'scout'){
            roleScout.run(creep);
        }*/
        if(creep.memory.role == 'remoteHarvester'){
            roleRemoteHarvester.run(creep);
        }
        if(creep.memory.role == 'remoteRepairer'){
            roleRemoteRepair.run(creep);
        }
        if(creep.memory.role == 'defender'){
            roleDefender.run(creep);
        }
        
    
    /*    if(creep.memory.role = 'claimer'){
            roleClaimer.run(creep);
        }*/
    }
    var towers = Game.rooms['W43S27'].find(FIND_STRUCTURES, { 
        filter: (structure) => { 
            return(structure.structureType == STRUCTURE_TOWER);}
    });
    var towers2 = Game.rooms['W43S28'].find(FIND_STRUCTURES, { 
        filter: (structure) => { 
            return(structure.structureType == STRUCTURE_TOWER);}
    });
    
    for(var name in towers){
        roleTower.run(towers[name]);
    }
    
    for(var name in towers2){
        roleTower.run(towers2[name]);
    }
   
    
     var linkA = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);}
        });
    //links.run(linkA);
    
}
