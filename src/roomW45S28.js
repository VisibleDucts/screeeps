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


var roomW45S28 = {

    run: function(creepTime){

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeID == 4);
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.homeID == 4);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.homeID == 4);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.homeID == 4);
        var sharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester' && creep.memory.homeID == 4);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && creep.memory.homeID == 4);
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.homeID == 4);
        var tHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tHauler' && creep.memory.homeID == 4);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.homeID == 4);
        var remotes = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote' && creep.memory.homeID == 4);
        var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.homeID == 4);
        var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.homeID == 4);
        var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantler' && creep.memory.homeID == 4);
        var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkHauler' && creep.memory.homeID == 4);
        var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer' && creep.memory.homeID == 4);
        var minerals =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral' && creep.memory.homeID == 4);
        var attackers =_.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.homeID == 4);
        var runners =_.filter(Game.creeps, (creep) => creep.memory.role == 'runner' && creep.memory.homeID == 4);
        var canHaulers =_.filter(Game.creeps, (creep) => creep.memory.role == 'canHauler' && creep.memory.homeID == 4);

        var hostiles = Game.rooms['W45S22'].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length){
            if(Game.time % 5 == 0){
                console.log('Hostiles in ' + Game.rooms['W45S22'] + ' ' +  hostiles[0].owner.username);
            }
        }

        var visuals = true;
        if(visuals){
            new RoomVisual('W45S28').text("Wall HP Goal", 16, 14, {color: 'white', font: 0.8});
            new RoomVisual('W45S28').text(Memory.rooms.W45S28.wallSize, 16, 15, {color: 'white', font: 0.8});

            new RoomVisual('W45S28').text("Worst Wall HP", 16, 17, {color: 'white', font: 0.8});
            new RoomVisual('W45S28').text(Memory.stats.roomSummary.W45S28.structure_info.constructedWall.min_hits, 16, 18, {color: 'white', font: 0.8});


            new RoomVisual('W45S28').text("Rampart HP Goal", 31, 24, {color: 'white', font: 0.8});
            new RoomVisual('W45S28').text(Memory.rooms.W45S28.rampartSize, 31, 25, {color: 'white', font: 0.8});

            new RoomVisual('W45S28').text("Worst Rampart HP", 31, 27, {color: 'white', font: 0.8});
            new RoomVisual('W45S28').text(Memory.stats.roomSummary.W45S28.structure_info.rampart.min_hits, 31, 28, {color: 'white', font: 0.8});

            if(false){
                new RoomVisual('W45S28').circle(39,8, {radius: .4, fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(39,7, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(37,11-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(38,9-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(37,10-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(38,12-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(38,11-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(40,10-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(40,11-2, {radius: .4,fill: 'red', stroke:'white' });
                new RoomVisual('W45S28').circle(39,12-2, {radius: .4,fill: 'red', stroke:'white' });
            }
        }

//        if (Game.rooms.W45S28.storage.store.energy > 200000) {
            var upgrader_body = 'n4_upgrader_max';
//        }
//        else if(Game.rooms.W45S28.storage.store.energy < 200000){
            //var upgrader_body = 'another_upgrader';
//        }





        var room = Game.rooms['W45S28'];
        var spawn = Game.spawns['Spawn6'];

        if(!spawn.spawning && room.energyAvailable < UNIT_COST(bodyPicker('n4_hauler')) && haulers.length < 1){
            if(harvesters.length < 0 && spawn.canCreateCreep(bodyPicker('default')) == 0){
                var newName = spawn.createCreep(bodyPicker('default'), `${'harvesterR4'}-${creepTime}`, {role:'harvester', job: 'reboot', goal:'', homeID: 4});
                console.log('Spawning new harvester: ' + newName);
            }
        }
        if(!spawn.spawning){
            if(((haulers.length < 1 || haulers[0].ticksToLive < 100) && haulers.length < 2) && (spawn.canCreateCreep(bodyPicker('n4_hauler')) == 0)){
                var newName = spawn.createCreep(bodyPicker('n4_hauler'), `${'haulerR4'}-${creepTime}`, {role:'hauler', job: 'normal', goal:'', homeID:4,roads: true, empty: false, resourceT: null});
                console.log('Spawning new haulerR4 in Spawn6: ' + newName);
            }
            if(sharvesters.length < 2 && (sharvesters[0] == undefined || sharvesters[0].memory.sourceID == '5982fc0cb097071b4adbcaeb') && (spawn.canCreateCreep(bodyPicker('n4_sharvester')) == 0)){
                var newName = spawn.createCreep(bodyPicker('n4_sharvester'), `${'sharvesterR4'}-${creepTime}`, {role:'sharvester',job:'static mining', sourceID:'5982fc0cb097071b4adbcaec', goal:'HarvestR4_0', homeID: 4});
                console.log('Spawning new sharvester in Spawn6: ' + newName);
            }
            if(sharvesters.length < 2 && (sharvesters[0] == undefined || sharvesters[0].memory.sourceID == '5982fc0cb097071b4adbcaec') && (spawn.canCreateCreep(bodyPicker('n4_sharvester')) == 0)){
                var newName = spawn.createCreep(bodyPicker('n4_sharvester'), `${'sharvesterR3'}-${creepTime}`, {role:'sharvester',job:'static mining', sourceID:'5982fc0cb097071b4adbcaeb', goal:'HarvestR4_1', homeID: 4});
                console.log('Spawning new sharvester in Spawn6: ' + newName);
            }
            if(upgraders.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 &&  spawn.canCreateCreep(bodyPicker(upgrader_body)) == 0){
                var newName = spawn.createCreep(bodyPicker(upgrader_body), `${'upgraderR4'}-${creepTime}`, {role:'upgrader', job: 'upgrading', goal:'', homeID: 4});
                console.log('Spawning new upgrader at ' + spawn + ' named: ' + newName);
            }
            if(builders.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1)  && sharvesters.length > 1 && spawn.canCreateCreep(bodyPicker('builder_medium')) == 0){
                var newName = spawn.createCreep(bodyPicker('builder_medium'), `${'builderR4'}-${creepTime}`, {role:'builder', job: 'building', goal:'', homeID: 4});
                console.log('Spawning new builder at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if(tHaulers.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('hauler_min')) == 0)){
                var newName = spawn.createCreep(bodyPicker('hauler_min'), `${'tHaulerR3'}-${creepTime}`, {role:'tHauler', job: 'tower', goal:'',roads:false, homeID:4, empty: false, resourceT: null});
                console.log('Spawning new tower hauler in Spawn6: ' + newName);
            }
            if(repairers.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('builder')) == 0)){
                var newNamme = spawn.createCreep(bodyPicker('builder'), `${'repairerR3'}-${creepTime}`, {role:'repair', job:'normal', goal:'', homeID:4});
                console.log('Spawning new repairer at Spawn6: ' + newNamme);
            }
            if(canHaulers.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('hauler_400')) == 0)){
                var newNamme = spawn.createCreep(bodyPicker('hauler_400'), `${'canHaulerR4'}-${creepTime}`, {role:'canHauler', job:'canHauler', goal:'', homeID:4});
                console.log('Spawning new Can Hauler at ' + spawn + ' named: ' + newName)
            }
            if((linkHaulers.length < 2) && (linkHaulers[0] === undefined || linkHaulers[0].memory.job === 'storage') && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('linkHauler')) === 0)){
                var newName = spawn.createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'can', homeID: 4});
                console.log('Spawning new Can-Link Hauler at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((linkHaulers.length < 2) && (linkHaulers[0] === undefined || linkHaulers[0].memory.job === 'can')  && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('linkHauler')) === 0)){
                var newName = spawn.createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'storage', homeID: 4});
                console.log('Spawning new Can-Link Hauler at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((minerals.length < 0) && room.storage.store['energy'] > 20000 && (Game.getObjectById('598342abca90777e307b1424').ticksToRegeneration === undefined) && (spawn.canCreateCreep(bodyPicker('mineral_medium')) == 0)){
                var newName = spawn.createCreep(bodyPicker('mineral_medium'), `${'mineral'}-${creepTime}`, {role: 'mineral', job: 'normal',goal: 'home',homeID: 4});
                console.log('Spawning new Miner at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
        }




        for(var name in Game.creeps){
           /* if(Game.creeps[name].memory.role == 'harvester'){
                upgrader.run(Game.creeps[name]);
            }*/
            if(Game.creeps[name].memory.role === 'upgrader'){
                upgrader.run(Game.creeps[name]);
            }
            if(Game.creeps[name].memory.role === 'tHauler'){
                moreHauler.run(Game.creeps[name]);
            }
            if(Game.creeps[name].memory.role === 'canHauler'){
                moreHauler.run(Game.creeps[name]);
            }
            if(Game.creeps[name].memory.role === 'runner'){
                Runner.run(Game.creeps[name]);
            }

        }
    }


};

module.exports = roomW45S28;
