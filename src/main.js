///////////   CREEP ROLES //////////////
var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var sHarvester = require('role.sharvester');
var repairer = require('role.repair');
var hauler = require('role.hauler');
var defender = require('role.defender');
var towerHauler = require('role.towerHauler');
var claimer = require('role.claimer');
var remote = require('role.remote');
var remoteHauler = require('role.remoteHauler');
var remoteRepair = require('role.remoteRepair');
var dismantler = require('role.dismantler');
var attacker = require('role.attack');
var linkHauler = require('role.linkHauler');
var healer = require('role.healer');
var mineral = require('role.mineral');
var rangedAttacker = require('role.rangedAttack');

////////// STRUCTURES //////////////////////////
var tower = require('tower');
var links = require('links');

///////////////////   HELPER FUNCTIONS AND STUFF /////////////////////
var ignore = require('ignore');
var bodyPicker = require('bodyPicker');
var findWay = require('findWay');
//var roles = require('roles');



// Any modules that you use that modify the game's prototypes should be require'd
// before you require the profiler.
const profiler = require('screeps-profiler');
/*
profiler.registerObject(tower, 'tower');
profiler.registerObject(harvester, 'harvester');
profiler.registerObject(builder, 'builder');
profiler.registerObject(sHarvester, 'sHarvester');
profiler.registerObject(repairer, 'repairer');
profiler.registerObject(hauler, 'hauler');
profiler.registerObject(defender, 'defender');
profiler.registerObject(towerHauler, 'towerHauler');
profiler.registerObject(claimer, 'claimer');
profiler.registerObject(remote, 'remote');
profiler.registerObject(remoteHauler, 'remoteHauler');
profiler.registerObject(links, 'links');
profiler.registerObject(remoteRepair, 'remoteRepair');
profiler.registerObject(dismantler, 'dismantler');
profiler.registerObject(attacker, 'attacker');
profiler.registerObject(linkHauler, 'linkHauler');
profiler.registerObject(healer, 'healer');
profiler.registerObject(bodyPicker, 'bodyPicker');
profiler.registerObject(mineral, 'mineral');
profiler.registerObject(rangedAttacker, 'rangedAttacker'); */

// This line monkey patches the global prototypes.
//profiler.enable();
var army = false;

global.UNIT_COST = (body) => _.sum(body, p => BODYPART_COST[p]);
global.upgradeLeft = (name) => Game.rooms[name].controller.progressTotal - Game.rooms[name].controller.progress;
global.Math.getDistance = function( x1, y1, x2, y2 ) {

	var 	xs = x2 - x1,
		ys = y2 - y1;

	xs *= xs;
	ys *= ys;

	return Math.sqrt( xs + ys );
};

module.exports.loop = function(){

profiler.wrap(function() {

	/***** Room variables. Change if rooms are changed! ****/
	var room1 = Game.rooms['W43S27'];
	var room2 = Game.rooms['W43S28'];
	//Will break code if no visibility
	var remoteRoom1 = Game.rooms['W42S27'];
	var limesRoom = Game.rooms['W42S28'];


	//Naming convention needs to be better.
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
	var defenders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender2');
	var defenders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender3');
	var defenders4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender4');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var sharvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester');
    var sharvesterR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterR2');
    var sharvesterR2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterR2_1');
    var sharvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester2');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair2');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var haulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler2');
	var haulers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler3');
	var haulersC = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerC');
    var towerHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler');
    var towerHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler2');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
	var claimers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer2');
    var remotes = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote');
    var remotes2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote2');
    var remotes3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote3');
	var remotes4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote4');
    var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler');
    var remoteHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler2');
	var remoteHaulers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler3');
    var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer');
    var remoteRepairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer2');
	var remoteRepairers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer3');
    var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantler');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkHauler');
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    var minerals =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral');
	var minerals2 =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral2');
	var minerals3 =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral3');
	var rangedAttackers =_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedAttacker');


		for(var name in Memory.creeps){
			if(!Game.creeps[name]){
				console.log('Clearing non-existing creep memory: ' + name);
				delete Memory.creeps[name];
				console.log('Defenders: ' + (defenders.length + defenders2.length));
				console.log('Sharvesters: ' + sharvester.length + '. Builders: ' + builders.length + ', Upgraders: ' + upgraders.length);
				console.log('Repair: ' + repairers.length + ', Haulers: ' + haulers.length +', Tower Haulers: ' + towerHaulers.length);
				console.log('Remote Harvesters: ' + remotes.length + ', Remote Repairers:' + remoteRepairers.length);
			}
		}

        var linkA = room1.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);}
    });

    var linkB = room2.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);}
    });

/*	if(Memory.allianceMembers == undefined){
		 let alliance = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript', 'Jestersheepy']);
		 Memory.allianceMembers = alliance;
	} */

    //Construction Sites unfinisehd. Using to dynamically control amount of builders spawned.
//    var construction = Object.keys(Game.constructionSites).length;


	//      complexQuanta's suicide/recycle code sniippet
   /*  if(creep.memory.killme) {
            creep.memory.narrative = "I desire only death. "
            creep.memory.plantRoads = false
            creep.memory.role = "killme"
            creep.memory.roleId = "killme"
            recycle.getRecycled(creep)

        }
    */
    /*for(const i in Game.spawns) {
        if(harvesters.length < 1){
            var newName = Game.spawns[i].createCreep([WORK, CARRY, MOVE], undefined, {role:'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
    }*/
	var spawn1 = Game.spawns['Spawn1'];
	var spawn2 = Game.spawns['Spawn2'];
	var spawn3 = Game.spawns['Spawn3'];
	if(Memory.timeAdjust == undefined){
		Memory.timeAdjust = 0;
	}


	if(spawn1.spawning || spawn2.spawning || spawn3.spawning){
		if(Memory.timeAdjust == 50){
			Memory.timeAdjust = 0;
		}
		Memory.timeAdjust++;
	}
	var creepTime = Memory.timeAdjust;

   	for(var name in Memory.creeps) {
	   	if(!Game.creeps[name]) {
		   	delete Memory.creeps[name];
		   	console.log('Clearing non-existing creep memory:', name);
	   	}
   	}


	//****************** ROOM 2 SPAWNING. ROOOM W43S28 *********************************************************/
    if(!Game.spawns['Spawn2'].spawning){
		//Need too change to something like "if room needs rebooted" that
        if(room2.energyAvailable < 500 && harvesters2.length < 1 && sharvesterR2.length < 1 && sharvesterR2_1.length < 1){
            if(harvesters2.length < 1 && spawn2.canCreateCreep('default')){
                var newName = Game.spawns['Spawn2'].createCreep([WORK,CARRY,MOVE], `${'harvester2'}-${creepTime}`, {role:'harvester2', job:'harvesting', goal:'Here', hoemID:2});
                console.log('Spawning new harvester from Spawn2: ' + newName);
            }
        }
		else if((haulers2.length < 1)){
			if(spawn2.canCreateCreep(bodyPicker('hauler')) == 0){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('hauler'), `${'hauler2'}-${creepTime}`, {role:'hauler2', job:'normal', goal:'here', homeID:2});
				console.log('Spawning new hauler in Spawn2: ' + newName);
			}
		}
        else if(haulers2.length > 0){
            if(harvesters2.length < 0 && (spawn2.canCreateCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY], `${'harvester2'}-${creepTime}`, {role:'harvester2', job:'harvesting', goal:'Here', hoemID:2});
                console.log('Spawning new harvester in Spwan2: ' + newName);
            }
            if((builders2.length < 1) && (spawn2.canCreateCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY], `${'builder2'}-${creepTime}`, {role:'builder2', job:'building', goal:'Here', hoemID:2});
                console.log('Spawning new builder in Spawn2: ' + newName);
            }
            if((upgraders2.length < 1) && (spawn2.canCreateCreep(bodyPicker('upgrader_small')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('upgrader_small'), `${'upgrader2'}-${creepTime}`, {role:'upgrader2', job:'upgrading', goal:'Here', hoemID:2});
                console.log('Spawning new upgrader in Spawn2: ' + newName);
            }
            if((repairers2.length < 1) && (spawn2.canCreateCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], `${'repairer2'}-${creepTime}`, {role:'repair2', job:'repair', goal:'', homeID: 2});
                console.log('Spawning new repairer in Spawn2: ' + newName);
            }
			//Tower Hauler, merge into hauler?
            if((towerHaulers2.length < 1) && (spawn2.canCreateCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], `${'towerHauler2'}-${creepTime}`, {role:'towerHauler2', job:'tower hauling', goal:'', homeID: 2});
                console.log('Spawning new Tower Hauler in Spawn2: ' + newName);
            }
			if(haulersC.length < 1 && spawn2.canCreateCreep(bodyPicker('hauler')) == 0){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('hauler'), `${'haulerC'}-${creepTime}`, {role:'haulerC', job:'carrier', goal:'Main', homeID:2});
				console.log('Spawning new hauler-carrier in Spawn2: ' + newName);
			}
            if(sharvesterR2.length < 1 && (haulers2.length > 0) && (spawn2.canCreateCreep([MOVE,WORK,WORK,WORK,WORK, WORK]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,WORK,WORK,WORK,WORK, WORK], `${'sharvesterR2'}-${creepTime}`, {role:'sharvesterR2', sourceID:'5982fc22b097071b4adbce38', flag:'Harvest_R2_0', homeID: 2});
                console.log('Spawning new sharvesterR2 in Spawn2: ' + newName);
            }
            if(sharvesterR2_1.length < 1 && (haulers2.length > 0) && (spawn2.canCreateCreep([MOVE,WORK,WORK,WORK,WORK, WORK]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,WORK,WORK,WORK,WORK, WORK], `${'sharvesterR2_1'}-${creepTime}`, {role:'sharvesterR2_1', sourceID:'5982fc22b097071b4adbce37', flag:'Harvest_R2_1', homeID: 2});
                console.log('Spawning new sharvesterR2_1 in Spawn2: ' + newName);
            }
            if(roleDismantlers.length < 0 && (spawn2.canCreateCreep(bodyPicker('dismantler2')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('dismantler2'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', loc: 'Attacks', job:'destroy', jobID: 0, homeID: 2});
                console.log('Spawning new Dismantler at Spawn2: ' + newName);
            }
			if((remotes4.length < 1) && (spawn2.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remote'), `${'remote4'}-${creepTime}`, {role: 'remote4', sourceID:'5982fc2eb097071b4adbcf83', canID: 0, homeID: 2});
                console.log('Spawning new remoteHarvester3 from Spawn2: ' + newName);
            }
			if((remoteRepairers3.length < 1) && (spawn2.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer3'}-${creepTime}`, {role: 'remoteRepairer3', job:'remote handy maan', loc: 'Remote4', homeID: 2});
                console.log('Spawning new remote Repairer 3 at spawn2: ' + newName);
            }
			if((remoteHaulers3.length < 1) && (spawn2.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteHauler'), `${'remHauler3'}-${creepTime}`, {role: 'remoteHauler3', hauling: '', loc: 'Remote4',useLink: false, homeID: 'Home2'}); //homeID 2. Check if this is used anywhere and change it.
                console.log('Spawning new remote hauler #3 from spawn2: ' + newName);
            }
            //attack_medium cost 1420.
            if(attackers.length < 0  /*&& (attackers[0] == undefined || attackers[0].memory.ID != 0) */ && (spawn2.canCreateCreep(bodyPicker('attacker_medium')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('attacker_medium'), `${'attacker'}-${creepTime}`, {role:'attacker', ID: 0, goal: 'Rally0' });
                console.log('Spawning new attacker at Spawn2: ' + newName);
            }
			if(rangedAttackers.length < 0 && spawn2.canCreateCreep(bodyPicker('rangedAttack')) == 0){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('rangedAttack'), `${'rangedAttacker'}-${creepTime}`, {role:'rangedAttacker', goal: 'Rally0' });
                console.log('Spawning new ranged attacker at Spawn2: ' + newName);
			}
            if(attackers.length < 0/* && (attackers[0] == undefined || attackers[0].memory.ID != 1) */&& (spawn2.canCreateCreep(bodyPicker('attacker_small')) == 0)){
                 var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('attacker_small'), `${'attacker'}-${creepTime}`, {role:'attacker', ID: 1,  goal: 'AttackThere'});
                console.log('Spawning new attacker at Spawn2: ' + newName);
            }
            //healer_small cost 1560
            if((healers.length < 0) && (spawn2.canCreateCreep(bodyPicker('healer_small')) == 0)){
                    var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('healer_small'), `${'healer'}-${creepTime}`, {role: 'healer', job: 'normal', goal: 'Rally0', homeID: 2});
                    console.log('Spawning new Healer at Spawn2: ' + newName);
            }
			if((minerals2.length < 0)  && (spawn2.canCreateCreep(bodyPicker('mineral_small')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('mineral_small'), `${'mineral2'}-${creepTime}`, {role: 'mineral2', job: 'normal',goal:'home', home: room2.toString()});
                console.log('Spawning new Mineral Extractor at Spawn2: ' + newName);
            }
			if(defenders3.length < 0 && (spawn2.canCreateCreep(bodyPicker('ramparter'))) == 0){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('ramparter'), `${'ramparter'}-${creepTime}`, {role:'defender3', job:'ramparter', home:'Spawn2', loc: 'ramparter', homeID: 2});
				console.log('Spawning new Defender at Spawn2: ' + newName);
			}
			if(roleDismantlers.length < 0 && (spawn2.canCreateCreep(bodyPicker('dismantler')) == 0)){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('dismantler'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', loc: 'Kill', job:'destroy', jobID: 0, homeID: 2});
				console.log('Spawning new Dismantler at Spawn2: ' + newName);
			}
			if((claimers2.length < 0) && (spawn2.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('claimer'), `${'claimer2'}-${creepTime}`, {role:'claimer2',job:'attacking', goal:'Kill', homeID: 2});
                console.log('Spawning new claimer at Spawn 2: ' + newName);
            }

            //Doesn't work! Well, I think it only works when you want one in two rooms.
            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.roomID != 1) && (room2.storage.store[RESOURCE_ENERGY] > 100)  && (spawn2.canCreateCreep(bodyPicker('linkHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'sender', goal:'linkx', roomID: 2});
                console.log('Spawning new Link Hauler at Spawn2: ' + newName);
            }
        }
    }
//  console.log(healers[0].ticksToLive);


   // console.log(linkHaulers[0]);
    if(!Game.spawns['Spawn1'].spawning){

        //Auto-Spawning code for each role.
        if(room1.energyAvailable < UNIT_COST(bodyPicker('hauler')) && sharvester.length < 1 && sharvester2.length < 1 && haulers.length < 1){
            if(harvesters.length < 1 && spawn1.canCreateCreep([WORK, CARRY, MOVE]) == 0){
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role:'harvester', job: 'reboot', goal:'', homeID: 1});
                console.log('Spawning new harvester: ' + newName);
            }
        }
        else{
                if((harvesters.length < 0) && (spawn1.canCreateCreep(bodyPicker('harvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('harvester'), `${'harvester'}-${creepTime}`, {role:'harvester', job: 'harvesting', goal:'', homeID: 1});
                    console.log('Spawning new harvester in Spawn1: ' + newName);
                }

                if((((haulers.length < 1) || haulers[0].ticksToLive < 160) && haulers.length < 2) && (spawn1.canCreateCreep(bodyPicker('hauler')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('hauler'), `${'hauler'}-${creepTime}`, {role:'hauler', job: 'normal', goal:'', homeID:1});
                    console.log('Spawning new hauler in Spawn1: ' + newName);
                }

                if(sharvester.length < 1 && (haulers.length > 0) && (spawn1.canCreateCreep(bodyPicker('sharvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('sharvester'), `${'sharvester'}-${creepTime}`, {role:'sharvester',job:'can mining', sourceID:'5982fc22b097071b4adbce33', flag:'Harvest0', homeID: 1});
                    console.log('Spawning new sharvester in Spawn1: ' + newName);
                }

                if(sharvester2.length < 1 && (haulers.length > 0) && (spawn1.canCreateCreep(bodyPicker('sharvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('sharvester'), `${'sharvester2'}-${creepTime}`, {role:'sharvester2',job: 'can mining', sourceID:'5982fc22b097071b4adbce34', flag:'Harvest1', homeID:1 });
                    console.log('Spawning new sharvester2 in Spawn1: ' + newName);
                }

        }
        if(sharvester.length > 0 && sharvester2.length > 0 && haulers.length > 0 && (haulers[0].ticksToLive > 300 || haulers.length > 1)){

			if(defenders.length < 0 && (haulers.length > 0) && (sharvester.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('defender'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('defender'), `${'defender'}-${creepTime}`, {role:'defender', job:'defender', home:'Spawn1'});
				console.log('Spawning new Defender at Spawn1: ' + newName);
			}
			if(defenders.length < 1 && (haulers.length > 0) && (sharvester.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('guard'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('guard'), `${'defender'}-${creepTime}`, {role:'defender', job:'guard', home:'Spawn1', loc: 'Claim'});
				console.log('Spawning new Defender at Spawn1: ' + newName);
			}
			if(defenders2.length < 1 && (haulers.length > 0) && (sharvester.length > 0) && (spawn1.canCreateCreep(bodyPicker('guard'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('guard'), `${'defender2'}-${creepTime}`, {role:'defender2', job:'guard', home: room1.toString(), loc: 'Remote_Room', homeID: 1});
				console.log('Spawning new Defender2 at Spawn1: ' + newName);
			}
			if(defenders4.length < 0 && (haulers.length > 0) && (sharvester.length > 0) && (spawn1.canCreateCreep(bodyPicker('ramparter'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('ramparter'), `${'defender4'}-${creepTime}`, {role:'defender4', job:'ramparter', home: room1.toString(), loc: 'Remote_Room'});
				console.log('Spawning new Defender4 at Spawn1: ' + newName);
			}

            if((upgraders.length < 3) && (spawn1.canCreateCreep(bodyPicker('upgrader')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('upgrader'),`${'upgrader'}-${creepTime}`, {role:'upgrader', job:'upgrading', goal:'controller', homeID:1});
                console.log('Spawning new upgrader at Spawn1: ' + newName);
            }
			if((haulers3.length < 1)  && (spawn1.canCreateCreep(bodyPicker('hauler_min')) == 0)){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('hauler_min'), `${'hauler3'}-${creepTime}`, {role:'hauler3', job: 'links[0]', goal:'Main', homeID: 1});
				console.log('Spawning new link to storage hauler in Spawn1: ' + newName);
			}

            if(builders.length < 1 && upgraders.length > 0 && (spawn1.canCreateCreep(bodyPicker('builder')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('builder'), `${'builder'}-${creepTime}`, {role:'builder', job:'building', goal:'homeID 1', homeID: 1});
                console.log('Spawning new builder at Spawn1: ' + newName);
            }
            if(repairers.length < 1 && upgraders.length >= 1 && (spawn1.canCreateCreep(bodyPicker('repair')) == 0)){
                var newNamme = Game.spawns['Spawn1'].createCreep(bodyPicker('repair'), `${'repairer'}-${creepTime}`, {role:'repair'});
                console.log('Spawning new repairer: ' + newNamme);
            }

            if((towerHaulers.length < 1) && (upgraders.length >= 1 && repairers.length >= 1) && (spawn1.canCreateCreep(bodyPicker('towerHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('towerHauler'), `${'towerHauler'}-${creepTime}`, {role:'towerHauler'});
                console.log('Spawning new Tower Hauler: ' + newName);
            }
            if((claimers.length < 1) && (upgraders.length >= 1 && repairers.length >= 1) && (spawn1.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('claimer'), `${'claimer'}-${creepTime}`, {role:'claimer',job:'reserving', goal:'Claim', homeID:1});
                console.log('Spawning new claimer: ' + newName);
            }

			//Source ID shoudl be in memory. Not hardcoded.
            if((remotes.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), `${'remote'}-${creepTime}`, {role: 'remote', sourceID:'5982fc2eb097071b4adbcf80', canID: 0});
                console.log('Spawning new remoteHarvester: ' + newName);
            }
            if((remotes2.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), `${'remote2'}-${creepTime}`, {role: 'remote2', sourceID:'5982fc17b097071b4adbcccc', canID: 0});
                console.log('Spawning new remoteHarvester2 from Spawn1: ' + newName);
            }
            if((remotes3.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), `${'remote3'}-${creepTime}`, {role: 'remote3', sourceID:'5982fc17b097071b4adbcccd', canID: 1});
                console.log('Spawning new remoteHarvester3 from Spawn1: ' + newName);
            }
            if((remoteHaulers.length < 1) && (spawn1.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteHauler'), `${'remHauler'}-${creepTime}`, {role: 'remoteHauler', hauling: '', loc: 'Remote',useLink: false, homeID:'Main'});
                console.log('Spawning new remote hauler from Spawn1: ' + newName);
            }
            if((remoteHaulers2.length < 2) && (spawn1.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteHauler'), `${'remHauler2'}-${creepTime}`, {role: 'remoteHauler2', hauling: '', loc:'Remote2',useLink: true, homeID:'Main'});
                console.log('Spawning new remote hauler from Spawn1: ' + newName);
            }

            //need to change code to  use memory loc to determine where to go. Not hardcode it.
            if((remoteRepairers.length < 1) && (spawn1.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer'}-${creepTime}`, {role: 'remoteRepairer', loc: 'Remote'});
                console.log('Spawning new remoteRepairer: ' + newName);
            }
            if((remoteRepairers2.length < 1) && (spawn1.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer2'}-${creepTime}`, {role: 'remoteRepairer2', loc: 'Remote2'});
                console.log('Spawning new remote Repairer 2 at Spawn1: ' + newName);
            }

            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.roomID != 1)  && (sharvester.length > 0) && (spawn1.canCreateCreep(bodyPicker('linkHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler', roomID: 1});
                console.log('Spawning new Link Hauler at Spawn1: ' + newName);
            }


            //Helpful dismantler.
            if(roleDismantlers.length < 0 && (spawn1.canCreateCreep(bodyPicker('helpful_dismantler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('helpful_dismantler'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', loc:'Claim', job:'helper', jobID: 1 });
                console.log('Spawning new Dismantler at Spawn1: ' + newName);
            }
            if((minerals.length < 0) && (spawn1.canCreateCreep(bodyPicker('mineral')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('mineral'), `${'mineral'}-${creepTime}`, {role: 'mineral', job: 'normal',goal: 'home', home: room1.toString()});
                console.log('Spawning new Mineral Extractor at Spawn1: ' + newName);
            }
			if((minerals3.length < 0) && (haulers.length > 0) && (sharvester.length > 0) && (harvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('remote_mineral')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote_mineral'), `${'mineral3'}-${creepTime}`, {role: 'mineral3', job: 'remote_mineral', goal:'oxygen' , home: room1.toString()});
                console.log('Spawning new Remote Mineral Extractor at Spawn1: ' + newName);
            }
			if((attackers.length < 0) && (spawn1.canCreateCreep(bodyPicker('attacker_small')) == 0)){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('attacker_small'), `${'Lover'}-${creepTime}`, {role:'attacker', goal: 'Kill'});
				console.log('Spawning new attacker at Spawn1: ' + newName);
			}

            if(army){
                if((healers.length < 4) && (spawn1.canCreateCreep(bodyPicker('healer_big')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('healer_big'), `${'healer'}-${creepTime}`, {role: 'healer'});
                    console.log('Spawning new Healer at Spawn1: ' + newName);
                }

                //Mean dismantler
                if(roleDismantlers.length < 0 && (spawn1.canCreateCreep(bodyPicker('dismantler')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('dismantler'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', loc: 'Attacks', job:'destroy', jobID: 0});
                    console.log('Spawning new Dismantler at Spawn1: ' + newName);
                }
                // cheaper but not as cost efficient? [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL]


                // It stands to reason that (role)[0] is always going to have the shortest lifespan.

            }
        }
    }

   //console.log(healers[0].ticksToLive);
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            harvester.run(creep);
        }
        if(creep.memory.role == 'harvester2'){
            harvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            upgrader.run(creep);
        }
        if(creep.memory.role == 'upgrader2'){
            upgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            builder.run(creep);
        }
        if(creep.memory.role == 'builder2'){
            builder.run(creep);
        }
        if(creep.memory.role == 'sharvester'){
            sHarvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce33'));
        }
        if(creep.memory.role == 'sharvester2'){
            sHarvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce34'));
        }
        if(creep.memory.role == 'sharvesterR2'){
            sHarvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce38'));
        }
        if(creep.memory.role == 'sharvesterR2_1'){
            sHarvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce37'));
        }
        if(creep.memory.role == 'repair'){
            repairer.run(creep);
        }
        if(creep.memory.role == 'repair2'){
            repairer.run(creep);
        }
        if(creep.memory.role == 'dismantler'){
            dismantler.run(creep, creep.memory.loc, creep.memory.job);
        }
		if(creep.memory.role == 'hauler'){
			hauler.run(creep, linkA, creep.memory.goal, creep.memory.job, creep.memory.homeID);
		}
	 	if(creep.memory.role == 'hauler2'){
			hauler.run(creep, linkB,creep.memory.goal, creep.memory.job, creep.memory.homeID);
        }
		if(creep.memory.role == 'hauler3'){
			hauler.run(creep, linkA,creep.memory.goal, creep.memory.job, creep.memory.homeID);
		}
		if(creep.memory.role == 'haulerC'){
			hauler.run(creep, linkA,creep.memory.goal, creep.memory.job, creep.memory.homeID);
		}
        if(creep.memory.role == 'towerHauler'){
            towerHauler.run(creep);
        }
        if(creep.memory.role == 'towerHauler2'){
            towerHauler.run(creep);
        }
        if(creep.memory.role == 'claimer'){
            claimer.run(creep,creep.memory.job, creep.memory.goal);
        }
		if(creep.memory.role == 'claimer2'){
            claimer.run(creep,creep.memory.job, creep.memory.goal);
        }
        if(creep.memory.role == 'remote'){
            remote.run(creep, Game.flags['Remote'].pos, creep.memory.sourceID, creep.memory.canID);
        }
        if(creep.memory.role == 'remote2'){
            remote.run(creep, Game.flags['Remote2'].pos, creep.memory.sourceID, creep.memory.canID);
        }
        if(creep.memory.role == 'remote3'){
            remote.run(creep, Game.flags['Remote3'].pos, creep.memory.sourceID, creep.memory.canID);
        }
		if(creep.memory.role == 'remote4'){
            remote.run(creep, Game.flags['Remote4'].pos, creep.memory.sourceID, creep.memory.canID);
        }
        if(creep.memory.role == 'remoteHauler'){
            remoteHauler.run(creep, creep.memory.loc,creep.memory.useLink, creep.memory.homeID);
        }
        if(creep.memory.role == 'remoteHauler2'){
            remoteHauler.run(creep, creep.memory.loc,creep.memory.useLink, creep.memory.homeID);
        }
		if(creep.memory.role == 'remoteHauler3'){
            remoteHauler.run(creep, creep.memory.loc,creep.memory.useLink, creep.memory.homeID);
        }
        if(creep.memory.role == 'remoteRepairer'){
            remoteRepair.run(creep, creep.memory.loc);
        }
        if(creep.memory.role == 'remoteRepairer2'){
            remoteRepair.run(creep, creep.memory.loc);
        }
		if(creep.memory.role == 'remoteRepairer3'){
            remoteRepair.run(creep, creep.memory.loc);
        }
        if(creep.memory.role == 'defender'){
            defender.run(creep, creep.memory.job, creep.memory.loc);
        }
		if(creep.memory.role == 'defender2'){
            defender.run(creep, creep.memory.job, creep.memory.loc);
        }
		if(creep.memory.role == 'defender3'){
            defender.run(creep, creep.memory.job, creep.memory.loc);
        }
		if(creep.memory.role == 'defender4'){
            defender.run(creep, creep.memory.job, creep.memory.loc);
        }
        if(creep.memory.role == 'attacker'){
            attacker.run(creep, creep.memory.goal);
        }
		if(creep.memory.role == 'rangedAttacker'){
            rangedAttacker.run(creep, creep.memory.goal);
        }
        if(creep.memory.role == 'linkHauler'){
            linkHauler.run(creep, creep.memory.roomID);
        }
        if(creep.memory.role == 'healer'){
            healer.run(creep);
        }
        if(creep.memory.role == 'mineral'){
            mineral.run(creep, creep.memory.job, creep.memory.goal, creep.memory.home);
        }
		if(creep.memory.role == 'mineral2'){
            mineral.run(creep, creep.memory.job, creep.memory.goal, creep.memory.home);
        }
		if(creep.memory.role == 'mineral3'){
			mineral.run(creep, creep.memory.job, creep.memory.goal, creep.memory.home);
		}

    }
    var towers = room1.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });
    var towers2 = room2.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });

    for(var name in towers){
        tower.run(towers[name]);
    }

    for(var name in towers2){
        tower.run(towers2[name]);
    }

	for(const i in Game.rooms){
		var linksInRoom = Game.rooms[i].find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_LINK;}});
		links.run(linksInRoom, Game.rooms[i]);
	}
//    links.run(linkA);
    //links.run(linkB);

});
}
