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


var roomW38S24 = {

    run: function(creepTime){

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeID === 5);
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.homeID === 5);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.homeID === 5);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.homeID === 5);
        var sharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester' && creep.memory.homeID === 5);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && creep.memory.homeID === 5);
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.homeID === 5);
        var tHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tHauler' && creep.memory.homeID === 5);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.homeID === 5);
        var remotes = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote' && creep.memory.homeID === 5);
        var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.homeID === 5);
        var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.homeID === 5);
        var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantler' && creep.memory.homeID === 5);
        var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkHauler' && creep.memory.homeID === 5);
        var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer' && creep.memory.homeID === 5);
        var minerals =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral' && creep.memory.homeID === 5);
        var attackers =_.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.homeID === 5);
        var runners =_.filter(Game.creeps, (creep) => creep.memory.role == 'runner' && creep.memory.homeID === 5);
        var canHaulers =_.filter(Game.creeps, (creep) => creep.memory.role == 'canHauler' && creep.memory.homeID === 5);

        var hostiles = Game.rooms['W45S22'].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length){
            if(Game.time % 5 == 0){
                console.log('Hostiles in ' + Game.rooms['W45S22'] + ' ' +  hostiles[0].owner.username);
            }
        }
        var room = Game.rooms['W38S24'];
        var spawn = Game.spawns['Spawn7'];



        var visuals = true;
        if(visuals){
            new RoomVisual('W38S24').text("Wall HP Goal", 7, 6, {color: 'white', font: 0.8});
            new RoomVisual('W38S24').text(Memory.rooms.W38S24.wallSize, 7, 7, {color: 'white', font: 0.8});

            new RoomVisual('W38S24').text("Worst Wall HP", 7, 9, {color: 'white', font: 0.8});
            new RoomVisual('W38S24').text(Memory.stats.roomSummary.W38S24.structure_info.constructedWall.min_hits, 7, 10, {color: 'white', font: 0.8});


            new RoomVisual('W38S24').text("Rampart HP Goal", 34, 3, {color: 'white', font: 0.8});
            new RoomVisual('W38S24').text(Memory.rooms.W38S24.rampartSize, 34, 4, {color: 'white', font: 0.8});

            new RoomVisual('W38S24').text("Worst Rampart HP", 34, 6, {color: 'white', font: 0.8});
            new RoomVisual('W38S24').text(Memory.stats.roomSummary.W38S24.structure_info.rampart.min_hits, 34, 7, {color: 'white', font: 0.8});


        }

//        if (Game.rooms.W38S24.storage.store.energy > 200000) {
            var upgrader_body = 'n4_upgrader_max';
//        }
//        else if(Game.rooms.W38S24.storage.store.energy < 200000){
            //var upgrader_body = 'another_upgrader';
//        }
        /*
        if(Game.rooms.W38S24.storage.store.energy > 100000){
            var upgrader_count = 4;
        }
        else if(Game.rooms.W38S24.storage.store.energy > 75000){
            var upgrader_count = 3;
        }
        else if(Game.rooms.W38S24.storage.store.energy > 50000){
            var upgrader_count = 2;
        }
        else if(Game.rooms.W38S24.storage.store.energy > 25000){
        */
            var upgrader_count = 2;
        //}


        if(!spawn.spawning && room.energyAvailable < UNIT_COST(bodyPicker('n3_hauler')) && haulers.length < 1){
            if(harvesters.length < 0 && spawn.canCreateCreep(bodyPicker('defaultish')) == 0){
                var newName = spawn.createCreep(bodyPicker('defaultish'), `${'harvesterR5'}-${creepTime}`, {role:'harvester', job: 'harvesting', goal:'', homeID:5});
                console.log('Spawning new harvester: ' + newName);
            }
        }
        if(!spawn.spawning){
            if(((haulers.length < 1  || haulers[0].ticksToLive < 100) && haulers.length < 2) && (spawn.canCreateCreep(bodyPicker('n3_hauler')) == 0)) {
                var newName = spawn.createCreep(bodyPicker('n3_hauler'), `${'haulerR5'}-${creepTime}`, {role:'hauler', job: 'normal', goal:'', homeID:5,roads: true, empty: false, resourceT: null});
                console.log('Spawning new haulerR5 in Spawn7: ' + newName);
            }
            if(sharvesters.length < 2 && (sharvesters[0] == undefined || sharvesters[0].memory.sourceID == '5982fc58b097071b4adbd3ba') && (spawn.canCreateCreep(bodyPicker('n_sharvester_big')) == 0)){
                var newName = spawn.createCreep(bodyPicker('n_sharvester_big'), `${'sharvesterR5'}-${creepTime}`, {role:'sharvester',job:'static mining', sourceID:'5982fc58b097071b4adbd3bb', goal:'HarvestR5_1', homeID:5});
                console.log('Spawning new sharvester in Spawn6: ' + newName);
            }
            if(sharvesters.length < 2 && (sharvesters[0] == undefined || sharvesters[0].memory.sourceID == '5982fc58b097071b4adbd3bb') && (spawn.canCreateCreep(bodyPicker('n_sharvester_big')) == 0)){
                var newName = spawn.createCreep(bodyPicker('n_sharvester_big'), `${'sharvesterR5'}-${creepTime}`, {role:'sharvester',job:'static mining', sourceID:'5982fc58b097071b4adbd3ba', goal:'HarvestR5_0', homeID:5});
                console.log('Spawning new sharvester in Spawn6: ' + newName);
            }
            if(upgraders.length < upgrader_count && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1)  && sharvesters.length > 1 && spawn.canCreateCreep(bodyPicker(upgrader_body)) == 0){
                var newName = spawn.createCreep(bodyPicker(upgrader_body), `${'upgraderR5'}-${creepTime}`, {role:'upgrader', job: 'upgrading', goal:'', homeID:5});
                console.log('Spawning new upgrader at ' + spawn + ' named: ' + newName);
            }
            if(builders.length < 1  && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1)  && sharvesters.length > 1 && spawn.canCreateCreep(bodyPicker('builder')) == 0){
                var newName = spawn.createCreep(bodyPicker('builder'), `${'builderR5'}-${creepTime}`, {role:'builder', job: 'building', goal:'', homeID:5});
                console.log('Spawning new builder at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if(tHaulers.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('hauler_min')) == 0)){
                var newName = spawn.createCreep(bodyPicker('hauler_min'), `${'tHaulerR5'}-${creepTime}`, {role:'tHauler', job: 'tower', goal:'',roads:false, homeID:5, empty: false, resourceT: null});
                console.log('Spawning new tower hauler in Spawn6: ' + newName);
            }
            if(repairers.length < 1 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('builder')) == 0)){
                var newNamme = spawn.createCreep(bodyPicker('builder'), `${'repairerR5'}-${creepTime}`, {role:'repair', job:'normal', goal:'', homeID:5});
                console.log('Spawning new repairer at Spawn6: ' + newNamme);
            }
            if(canHaulers.length < 0 && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('hauler_400')) == 0)){
                var newNamme = spawn.createCreep(bodyPicker('hauler_400'), `${'canHaulerR4'}-${creepTime}`, {role:'canHauler', job:'canHauler', goal:'', homeID:5});
                console.log('Spawning new Can Hauler at ' + spawn + ' named: ' + newName)
            }
            if((linkHaulers.length < 2) && (linkHaulers[0] === undefined || linkHaulers[0].memory.job === 'storage') && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('linkHauler')) === 0)){
                var newName = spawn.createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'can', homeID:5});
                console.log('Spawning new Can-Link Hauler at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((linkHaulers.length < 2) && (linkHaulers[0] === undefined || linkHaulers[0].memory.job === 'can')  && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && (spawn.canCreateCreep(bodyPicker('linkHauler')) === 0)){
                var newName = spawn.createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'storage', homeID:5});
                console.log('Spawning new Can-Link Hauler at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((minerals.length < 0) && (Game.getObjectById('598342abca90777e307b1424').ticksToRegeneration === undefined) && (spawn.canCreateCreep(bodyPicker('mineral_small')) == 0)){
                var newName = spawn.createCreep(bodyPicker('mineral_small'), `${'mineral'}-${creepTime}`, {role: 'mineral', job: 'normal',goal: 'home',homeID:5});
                console.log('Spawning new Miner at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((remotes.length < 1) && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1 && spawn.canCreateCreep(bodyPicker('remote')) == 0) {
                var newName = spawn.createCreep(bodyPicker('remote'), `${'remote7'}-${creepTime}`, {role: 'remote', goal: 'Remote8', sourceID:'5982fc64b097071b4adbd509', canID: 0, homeID: 5});
                console.log('Spawning new remote harvester at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((remoteRepairers.length < 0) && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1  && (spawn.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = spawn.createCreep(bodyPicker('remoteRepairer'), `${'remRepairer'}-${creepTime}`, {role: 'remoteRepairer', job:'remote handy maan', goal: 'Remote8', homeID: 5});
                console.log('Spawning new remote repair at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((remoteHaulers.length < 1) && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1  && (spawn.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = spawn.createCreep(bodyPicker('remoteHauler'), `${'remHauler3'}-${creepTime}`, {role: 'remoteHauler', hauling: '', goal:'Remote8',job:'normal', roads: true,useLinkID: null, homeFlag: 'room_W38S24', homeID:5});
                console.log('Spawning new remote hauler at ' + spawn + ' in ' + room + ' named: ' + newName);
            }
            if((claimers.length < 1) && haulers.length > 0 && (haulers[0].ticksToLive > 200 || haulers.length > 1) && sharvesters.length > 1  && (spawn.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = spawn.createCreep(bodyPicker('claimer'), `${'claimer'}-${creepTime}`, {role:'claimer',job:'reserving', goal:'Remote8', homeID:5});
				console.log('Spawning new claimer from ' + spawn + ' named: ' + newName);
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

module.exports = roomW38S24;
