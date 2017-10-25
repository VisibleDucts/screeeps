var bodyPicker = require('bodyPicker');
var util = require('util');

var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var sharvester = require('role.sharvester');
var repairer = require('role.repair');
var hauler = require('role.hauler');
var defender = require('role.defender');
var towerHauler = require('role.towerHauler');
var claimer = require('role.claimer');
var remote = require('role.remote');
var remoteHauler = require('role.remoteHauler');
var remoteRepair = require('role.remoteRepair');
var dismantler = require('role.dismantler');
var linkHauler = require('role.linkHauler');
var healer = require('role.healer');
var mineral = require('role.mineral');
var attacker = require('role.attack');
var zombie = require('zombie');
var moreHauler = require('moreHauler');
var Runner = require('Runner');


var roomW45S22 = {

    run: function(creepTime){

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.homeID === 3);
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender' && creep.memory.homeID === 3);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.homeID === 3);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.homeID === 3);
        var sharvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'sharvester' && creep.memory.homeID === 3);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repair' && creep.memory.homeID === 3);
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler' && creep.memory.homeID === 3);
        //NOTE: FIREHOSE TEMP
        var term_haulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'term_hauler' && creep.memory.homeID === 3);
        var tHaulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'tHauler' && creep.memory.homeID === 3);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer' && creep.memory.homeID === 3);
        var remotes = _.filter(Game.creeps, (creep) => creep.memory.role === 'remote' && creep.memory.homeID === 3);
        var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHauler' && creep.memory.homeID === 3);
        var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteRepairer' && creep.memory.homeID === 3);
        var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role === 'dismantler' && creep.memory.homeID === 3);
        var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'linkHauler' && creep.memory.homeID === 3);
        var healers = _.filter(Game.creeps, (creep) => creep.memory.role === 'healer' && creep.memory.homeID === 3);
        var minerals =_.filter(Game.creeps, (creep) => creep.memory.role === 'mineral' && creep.memory.homeID === 3);
        var attackers =_.filter(Game.creeps, (creep) => creep.memory.role === 'attacker' && creep.memory.homeID === 3);
        var runners =_.filter(Game.creeps, (creep) => creep.memory.role === 'runner' && creep.memory.homeID === 3);


        var hostiles = Game.rooms['W45S22'].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length){
            if(Game.time % 5 == 0){
                console.log('Hostiles in ' + Game.rooms['W45S22'] + ' ' +  hostiles[0].owner.username);
            }
        }

        var visuals = true;
        if(visuals){
            new RoomVisual('W45S22').text("Wall HP Goal", 19, 18, {color: 'white', font: 0.8});
            new RoomVisual('W45S22').text(Memory.rooms.W45S22.wallSize, 19, 19, {color: 'white', font: 0.8});

            new RoomVisual('W45S22').text("Worst Wall HP", 19, 21, {color: 'white', font: 0.8});
            new RoomVisual('W45S22').text(Memory.stats.roomSummary.W45S22.structure_info.constructedWall.min_hits, 19, 22, {color: 'white', font: 0.8});


            new RoomVisual('W45S22').text("Rampart HP Goal", 31, 36, {color: 'white', font: 0.8});
            new RoomVisual('W45S22').text(Memory.rooms.W45S22.rampartSize, 31, 37, {color: 'white', font: 0.8});

            new RoomVisual('W45S22').text("Worst Rampart HP", 31, 39, {color: 'white', font: 0.8});
            new RoomVisual('W45S22').text(Memory.stats.roomSummary.W45S22.structure_info.rampart.min_hits, 31, 40, {color: 'white', font: 0.8});

        }

        var room = Game.rooms['W45S22'];
        if(Game.spawns['Spawn5'] !== undefined){
            var spawn = Game.spawns['Spawn5'];
        }
        if(Game.spawns['Spawn9'] !== undefined){
            var spawn2 = Game.spawns['Spawn9'];
        }

        var upgraader_count;
        /*
        if(room.storage.store[RESOURCE_ENERGY] > 125000){
            upgraader_count = 3;
        }
        else if(room.storage.store[RESOURCE_ENERGY] > 100000){
            upgraader_count = 2;
        }
        else if(room.storage.store[RESOURCE_ENERGY] < 100000){
            upgraader_count = 1;
        }
        */

        //NOTE: FIREHOSE
        var upgrader_body;
        var terminal_mover_count;
        if (Game.rooms.W45S22.terminal.store.energy > 50000) {
            upgrader_body = 'extra_large_upgrader';
            upgrader_count = 5;
            terminal_mover_count = 1;
        }
        if(Game.rooms.W45S22.terminal.store.energy < 50000){
            upgrader_body = 'n4_upgrader_max';
            upgrader_count = 1;
            terminal_mover_count = 0;
        }

        /* NOTE: think Shadowwulf found another route.
        let southRamparts = Game.rooms['W45S22'].find(FIND_STRUCTURES, {filter: (s)=>{return s.structureType == STRUCTURE_RAMPART}});
        for(var i in southRamparts){
            //console.log(southRamparts[i])
            southRamparts[i].setPublic(false);
        }
        */
        /*
        Memory.spawnQueue.W45S22
        if(((haulers.length < 1  || haulers[0].ticksToLive < 100) && haulers.length < 2) && spawn.spawnCreep(bodyPicker('n4_hauler'),`${'haulerR3'}-${creepTime}`, {dryRun: true})){
            Memory.spawnQueue.W45S22.push()
        }
        */




        if(spawn !== undefined && !spawn.spawning){
            if(room.energyAvailable < UNIT_COST(bodyPicker('n4_hauler')) && haulers.length < 1){
                if(harvesters.length < 1 && spawn.canCreateCreep([WORK,WORK,MOVE, MOVE, CARRY]) == 0){
                    var newName = spawn.createCreep([WORK,WORK,MOVE, MOVE, CARRY], `${'harvesterR3'}-${creepTime}`, {role:'harvester', job: 'reboot', goal:'', homeID: 3});
                    console.log('Spawning new harvester: ' + newName);
                }
            }
        }
        if(spawn !== undefined && !spawn.spawning){

            if(((haulers.length < 2  || haulers[0].ticksToLive < 150) && haulers.length < 3) && (spawn.canCreateCreep(bodyPicker('hauler_1k')) == 0)){
                var newName = spawn.createCreep(bodyPicker('hauler_1k'), `${'haulerR3'}-${creepTime}`, {role:'hauler', job: 'normal', goal:'', homeID:3,roads: true, empty: false, resourceT: null});
                console.log('Spawning new haulerR3 in Spawn5: ' + newName);
            }
            if(term_haulers.length < terminal_mover_count && haulers.length > 0 && (haulers[0].ticksToLive > 250 || haulers.length > 2)  && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('n4_hauler')) == 0)){
                var newName = spawn.createCreep(bodyPicker('n4_hauler'), `${'term_hauler'}-${creepTime}`, {role:'term_hauler', job: 'termToStorage', goal:'', homeID:3,roads: false, empty: false, resourceT: null});
                console.log('Spawning new terminal hauler in Spawn5: ' + newName);
            }
            if(upgraders.length < upgrader_count && haulers.length > 0 && (haulers[0].ticksToLive > 250 || haulers.length > 2) && sharvesters.length > 1 && spawn.canCreateCreep(bodyPicker(upgrader_body)) == 0){
                var newName = spawn.createCreep(bodyPicker(upgrader_body), `${'upgraderR3'}-${creepTime}`, {role:'upgrader', job: 'upgrading', goal:'', homeID: 3});
                console.log('Spawning new upgrader at ' + spawn + ' named: ' + newName);
            }
            if((remoteRepairers.length < 0) && upgraders.length > (upgrader_count - 1) && haulers.length > 0 && (haulers[0].ticksToLive > 250 || haulers.length > 2) && sharvesters.length > 1  && (spawn.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = spawn.createCreep(bodyPicker('remoteRepairer'), `${'remRepairer'}-${creepTime}`, {role: 'remoteRepairer', job:'remote handy maan', goal: 'Remote7', homeID: 3});
                console.log('Spawning new remote repair at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((remoteHaulers.length < 1) && upgraders.length > (upgrader_count - 1) && haulers.length > 0 && (haulers[0].ticksToLive > 250 || haulers.length > 2) && sharvesters.length > 1  && (spawn.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = spawn.createCreep(bodyPicker('remoteHauler'), `${'remHauler3'}-${creepTime}`, {role: 'remoteHauler', hauling: '', goal:'Remote7',job:'normal', roads: true,useLinkID: 2, homeFlag: 'room_W45S22', homeID:3});
                console.log('Spawning new remote hauler at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((claimers.length < 1) && haulers.length > 0 && (haulers[0].ticksToLive > 250 || haulers.length > 2) && sharvesters.length > 1  && (spawn.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = spawn.createCreep(bodyPicker('claimer'), `${'claimer'}-${creepTime}`, {role:'claimer',job:'reserving', goal:'Remote7', homeID:3});
				console.log('Spawning new claimer from ' + spawn + ' named: ' + newName);
            }
        }
        if(spawn2 !== undefined && !spawn2.spawning && haulers.length > 0 && (haulers[0].ticksToLive > 250 || haulers.length > 2)){
            if(sharvesters.length < 2 && (sharvesters[0] == undefined || sharvesters[0].memory.sourceID == '5982fc0bb097071b4adbcaca') && (spawn2.canCreateCreep(bodyPicker('n4_sharvester')) == 0)){
                var newName = spawn2.createCreep(bodyPicker('n4_sharvester'), `${'sharvesterR3'}-${creepTime}`, {role:'sharvester',job:'static mining', sourceID:'5982fc0bb097071b4adbcac9', goal:'HarvestR3_0', homeID: 3});
                console.log('Spawning ' + newName + ' at ' + spawn2);
            }
            if(sharvesters.length < 2 && (sharvesters[0] == undefined || sharvesters[0].memory.sourceID == '5982fc0bb097071b4adbcac9') && (spawn2.canCreateCreep(bodyPicker('n4_sharvester')) == 0)){
                var newName = spawn2.createCreep(bodyPicker('n4_sharvester'), `${'sharvesterR3'}-${creepTime}`, {role:'sharvester',job:'static mining', sourceID:'5982fc0bb097071b4adbcaca', goal:'HarvestR3_1', homeID: 3});
                console.log('Spawning ' + newName + ' at ' + spawn2);
            }
            if(builders.length < 1 && upgraders.length > (upgrader_count - 1) && sharvesters.length > 1  && spawn2.canCreateCreep(bodyPicker('builder_big')) == 0){
                var newName = spawn2.createCreep(bodyPicker('builder_big'), `${'builderR3'}-${creepTime}`, {role:'builder', job: 'building', goal:'', homeID: 3});
                console.log('Spawning new builder at ' + spawn2 + ' in ' + room + ' named: ' + newName);
            }
            if(tHaulers.length < 1 && upgraders.length > (upgrader_count - 1) && sharvesters.length > 1  && (spawn2.canCreateCreep(bodyPicker('hauler_min')) == 0)){
                var newName = spawn2.createCreep(bodyPicker('hauler_min'), `${'tHaulerR3'}-${creepTime}`, {role:'tHauler', job: 'tower', goal:'',roads:false, homeID:3, empty: false, resourceT: null});
                console.log('Spawning new tower hauler in Spawn5: ' + newName);
            }
            if(repairers.length < 1 && (upgraders.length > (upgrader_count - 1)) && sharvesters.length > 1  && (spawn2.canCreateCreep(bodyPicker('builder_big')) == 0)){
                var newNamme = spawn2.createCreep(bodyPicker('builder_big'), `${'repairerR3'}-${creepTime}`, {role:'repair', job:'normal', goal:'', homeID:3});
                console.log('Spawning new repairer at Spawn5: ' + newNamme);
            }
            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.job === 'storage') && sharvesters.length > 1  && (spawn2.canCreateCreep(bodyPicker('linkHauler')) === 0)){
                var newName = spawn2.createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'can', homeID: 3});
                console.log('Spawning new Can-Link Hauler at ' + spawn2 + ' in ' + room + ' named: ' + newName);
            }
            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.job === 'can') && sharvesters.length > 1  && (spawn2.canCreateCreep(bodyPicker('linkHauler')) === 0)){
                var newName = spawn2.createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'storage', homeID: 3});
                console.log('Spawning new storage-Link Hauler at ' + spawn2 + ' in ' + room + ' named: ' + newName);
            }
            if((minerals.length < 0) && room.storage.store['energy'] > 20000 && (Game.getObjectById('598342abca90777e307b1421').ticksToRegeneration === undefined) && sharvesters.length > 1  && (spawn2.canCreateCreep(bodyPicker('mineral_small')) == 0)){
                var newName = spawn2.createCreep(bodyPicker('mineral_small'), `${'mineral'}-${creepTime}`, {role: 'mineral', job: 'normal',goal: 'home',homeID: 3});
                console.log('Spawning new Miner at ' + spawn2 + ' in ' + room + ' named: ' + newName);
            }
            if((remotes.length < 1) && upgraders.length > (upgrader_count - 1) && sharvesters.length > 1  && spawn2.canCreateCreep(bodyPicker('remote')) == 0) {
                var newName = spawn2.createCreep(bodyPicker('remote'), `${'remote7'}-${creepTime}`, {role: 'remote', goal: 'Remote7', sourceID:'5982fbffb097071b4adbc8f8', canID: 0, homeID: 3});
                console.log('Spawning new remote harvester at ' + spawn2 + ' in ' + room + ' named: ' + newName);
            }
        }



        for(var name in Game.creeps){
            if(Game.creeps[name].memory.role === 'upgrader'){
                upgrader.run(Game.creeps[name]);
            }
            if(Game.creeps[name].memory.role === 'tHauler'){
                moreHauler.run(Game.creeps[name]);
            }
            if(Game.creeps[name].memory.role === 'runner'){
                Runner.run(Game.creeps[name]);
            }
            if(Game.creeps[name].memory.role === 'term_hauler'){
                hauler.run(Game.creeps[name]);
            }

        }
    }


};

module.exports = roomW45S22;
