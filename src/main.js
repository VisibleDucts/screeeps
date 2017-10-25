//For manual spawning
        //Game.spawns['Spawn5'].createCreep([], undefined, {role:'', job:'', goal:'',placeRoads:false,homeID:3});
        //Game.spawns['Spawn1'].createCreep([MOVE], undefined, {role:'runner', job:'', goal:'Claim',placeRoads:false,signShit: false,homeID:1});


///////////   CREEP ROLES //////////////
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
var Runner = require('Runner');
var sk = require('role.sk');
var carrier = require('hauler.carrier');
var moreHauler = require('moreHauler');

////////// STRUCTURES //////////////////////////
var tower = require('tower');
var links = require('links');
var labs = require('labs');
var observer = require('observer');



///////////////////   HELPER FUNCTIONS AND STUFF /////////////////////
//var ignoreUs = require('ignore');
var bodyPicker = require('bodyPicker');
//var findWay = require('findWay');
var roles = require('roles');
var screepsplus = require('screepsplus');
var util = require('util');
var market = require('market');

///////////// rooms ////////
//var W43S27 = require('W43S27');
var roomW45S22 = require('roomW45S22');
var roomW45S28 = require('roomW45S28');
var roomW38S24 = require('roomW38S24');
// Any modules that you use that modify the game's prototypes should be require'd
// before you require the profiler.
const profiler = require('screeps-profiler');

profiler.registerObject(tower, 'tower');
profiler.registerObject(harvester, 'harvester');
profiler.registerObject(builder, 'builder');
profiler.registerObject(sharvester, 'sharvester');
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
profiler.registerObject(util, 'util');
profiler.registerObject(screepsplus, 'screepsplus');
profiler.registerObject(roles, 'roles');
profiler.registerObject(carrier, 'carrier');
profiler.registerObject(moreHauler,'moreHauler');
profiler.registerObject(roomW45S22, 'roomW45S22');
profiler.registerObject(roomW45S28, 'roomW45S28');
profiler.registerObject(roomW38S24, 'roomW38S24');
profiler.registerObject(Runner, 'Runner');
profiler.registerObject(labs, 'labs');
profiler.registerObject(market, 'market');
profiler.registerObject(observer, 'observer');


// This line monkey patches the global prototypes.
profiler.enable();


////////////////////////////////////////////////////////////
 // 39, 18 W49S27

var army = false;


///////////////////////////////////////////////////////////////////
var war = false;

var visuals = true;

global.UNIT_COST = (body) => _.sum(body, p => BODYPART_COST[p]);
global.upgradeLeft = (name) => Game.rooms[name].controller.progressTotal - Game.rooms[name].controller.progress;


module.exports.loop = function(){
profiler.wrap(function() {

	require('infra.commguy').maintain();

    if(Game.time % 10 == 0){
        screepsplus.collect_stats();
    }


	if(visuals){
		let W43S27_visuals = true;
		let W43S28_visuals = true;
		if(W43S27_visuals){
			new RoomVisual('W43S27').text("Wall HP Goal", 9, 36, {color: 'white', font: 0.8});
	        new RoomVisual('W43S27').text(Memory.rooms.W43S27.wallSize, 9, 37, {color: 'white', font: 0.8});

			new RoomVisual('W43S27').text("Worst Wall HP", 9, 39, {color: 'white', font: 0.8});
			new RoomVisual('W43S27').text(Memory.stats.roomSummary.W43S27.structure_info.constructedWall.min_hits, 9, 40, {color: 'white', font: 0.8});


			new RoomVisual('W43S27').text("Rampart HP Goal", 17, 36, {color: 'white', font: 0.8});
			new RoomVisual('W43S27').text(Memory.rooms.W43S27.rampartSize, 17, 37, {color: 'white', font: 0.8});

			new RoomVisual('W43S27').text("Worst Rampart HP", 17, 39, {color: 'white', font: 0.8});
			new RoomVisual('W43S27').text(Memory.stats.roomSummary.W43S27.structure_info.rampart.min_hits, 17, 40, {color: 'white', font: 0.8});
		}

		if(W43S28_visuals){
			new RoomVisual('W43S28').text("Wall HP Goal", 11, 22, {color: 'white', font: 0.8});
	        new RoomVisual('W43S28').text(Memory.rooms.W43S28.wallSize, 11, 23, {color: 'white', font: 0.8});

			new RoomVisual('W43S28').text("Worst Wall HP", 11, 25, {color: 'white', font: 0.8});
			new RoomVisual('W43S28').text(Memory.stats.roomSummary.W43S28.structure_info.constructedWall.min_hits, 11, 26, {color: 'white', font: 0.8});


			new RoomVisual('W43S28').text("Rampart HP Goal", 19, 22, {color: 'white', font: 0.8});
			new RoomVisual('W43S28').text(Memory.rooms.W43S28.rampartSize, 19, 23, {color: 'white', font: 0.8});

			new RoomVisual('W43S28').text("Worst Rampart HP", 19, 25, {color: 'white', font: 0.8});
			new RoomVisual('W43S28').text(Memory.stats.roomSummary.W43S28.structure_info.rampart.min_hits, 19, 26, {color: 'white', font: 0.8});
		}



		if(Memory.switches.labs){
		    //NOTE: moved to labs.reaction. if(Game.time % 10 == 0){

		        labs.reaction('W43S27',0,2,1);
		        labs.reaction('W43S27',0,2,3);
		        labs.reaction('W43S27',0,2,4);
				labs.reaction('W43S27',0,2,6);


				//labs.reaction('W43S27',5,7,8);
				//labs.reaction('W43S27',5,7,6);

		    //}
		}}


	/***** Room variables. Change if rooms are changed! ****/
    var room1 = Game.rooms['W43S27'];
	var room2 = Game.rooms['W43S28'];
	var room3 = Game.rooms['W45S22'];
	var room4 = Game.rooms['W45S28'];
	var room5 = Game.rooms['W38S24'];


	//Naming convention needs to be better.
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeID != 3);
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
	var defenders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender2');
	var defenders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender3');
	var defenders4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender4');
	var defenders5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender5');
	//var defenders4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender5');

    var backups = _.filter(Game.creeps, (creep) => creep.memory.role == 'backup');

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var sharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var sharvesterR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterR2');
    var sharvesterR2_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterR2_1');
    var sharvester2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester2');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair2');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
	var haulersT = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerT'  && creep.memory.homeID != 3 && creep.memory.homeID != 5);
    var haulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler2' && creep.memory.homeID != 3 && creep.memory.homeID != 5);
	var haulers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler3' && creep.memory.homeID != 3 && creep.memory.homeID != 5);
	var haulersC = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerC' && creep.memory.homeID != 3 && creep.memory.homeID != 5);
	var haulersG = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerG' && creep.memory.homeID != 3 && creep.memory.homeID != 5);
	var haulersG2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'haulerG2' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var towerHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler' && creep.memory.homeID != 3 && creep.memory.homeID != 5);
    var towerHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler2');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.homeID !== 3 && creep.memory.homeID !== 4 && creep.memory.homeID !== 5);
	var claimers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer2');
	var claimers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer3');
	//Temp - new rooms claiming and building
	var claimersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimerR');
	var buildersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'builderR');

    var remotes = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var remotes2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote2');
    var remotes3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote3');
	var remotes4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote4');
	var remotes5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote5');
	var remotes6 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote6');

    var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var remoteHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler2');
	var remoteHaulers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler3');
	var remoteHaulers4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler4');
	var remoteHaulers5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler5');

    var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.homeID !== 3 && creep.memory.homeID !== 4 && creep.memory.homeID !== 5);
    var remoteRepairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer2');
	var remoteRepairers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer3');
	var remoteRepairers4 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer4');
	var remoteRepairers5 = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer5');

    var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantler');
    var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkHauler' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    var minerals =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral' && creep.memory.homeID != 3 && creep.memory.homeID != 4 && creep.memory.homeID != 5);
	var minerals2 =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral2');
	var minerals3 =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral3');

	var mineral_transports = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineral_transport');

    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var sks = _.filter(Game.creeps, (creep) => creep.memory.role == 'sk');


	for(var name in Memory.creeps){
		if(!Game.creeps[name]){
			console.log('Clearing non-existing creep memory: ' + name);
			delete Memory.creeps[name];
		}
	}



	global.logCreeps = function(role){
		let rolePick = _.filter(Game.creeps, (creep) => creep.memory.role === role);
		console.log(role + ': ' + rolePick.length)
	}

	//util.roomInit('W43S28');

    //util.drawGrid('W38S24',12,12,8);





	//NOTE:complexQuanta's suicide/recycle code sniippet
   	/*
	if(creep.memory.killme) {
        creep.memory.narrative = "I desire only death. "
        creep.memory.plantRoads = false
        creep.memory.role = "killme"
        creep.memory.roleId = "killme"
        recycle.getRecycled(creep)
    }
    */


	//observer.run('W43S27', 'W36S27');
	//observer.getRooms('W43S27');


	//market.run();


	//NOTE: W43S27 Spawns
	if(Game.spawns['Spawn1'] !== undefined) var spawn1 = Game.spawns['Spawn1'];
	if(Game.spawns['Spawn3'] !== undefined) var spawn3 = Game.spawns['Spawn3'];
	if(Game.spawns['Spawn8'] !== undefined) var spawn8 = Game.spawns['Spawn8'];
	//NOTE: W43S28 spawns
	if(Game.spawns['Spawn2'] !== undefined) var spawn2 = Game.spawns['Spawn2'];
	if(Game.spawns['Spawn4'] !== undefined) var spawn4 = Game.spawns['Spawn4'];
	//NOTE: W45S22 spawns
	if(Game.spawns['Spawn5'] !== undefined) var spawn5 = Game.spawns['Spawn5'];
	//NOTE: W45S28 spawns
	if(Game.spawns['Spawn6'] !== undefined) var spawn6 = Game.spawns['Spawn6'];
	//NOTE: W38S24 spawns
	if(Game.spawns['Spawn7'] !== undefined) var spawn7 = Game.spawns['Spawn7'];




	if(Memory.timeAdjust == undefined){
		Memory.timeAdjust = 0;
	}


	//NOTE:  Shadowwulf's renewal code. NEed to filter out boosted creeps
	/*
	for(var i in Game.spawns){
        var creep = Game.spawns[i].pos.findInRange(FIND_MY_CREEPS , 1, {filter: (c) => (c.ticksToLive + 600/c.body.length < 1500)}).shift();
        if(null != creep)
            Game.spawns[i].renewCreep(creep);
    }
	*/


   /* for(i in Game.rooms){
     //   console.log(i);
        util.creepCount(i, 'builder', 1);
        util.creepCount(i, 'repairer', 0);
        util.creepCount(i, 'towerHauler', 1);
        util.creepCount(i, 'linkHauler', 1);
        util.creepCount(i, 'sharvester', 2);
        util.creepCount(i, 'mineral', 0);
        util.creepCount(i, 'dismantler', 0);
    }*/

	if(spawn1.spawning || spawn2.spawning || spawn3.spawning || spawn4.spawning || spawn5.spawning || spawn6.spawning || spawn7.spawning){
		if(Memory.timeAdjust === 80){
			Memory.timeAdjust = 0;
		}
		Memory.timeAdjust++;
	}
	var creepTime = Memory.timeAdjust;



    roomW45S22.run(creepTime);
    roomW45S28.run(creepTime);
	roomW38S24.run(creepTime);


	// MNUCKS upgrader size throttle.

	//Room W43S27

		Memory.rooms.W43S27.creep.upgrader.shape = [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];
		Memory.rooms.W43S27.creep.upgrader.count = 1;

		Memory.rooms.W43S27.creep.haulerG.count = 0;



	//Room W43S28
    if(Game.rooms.W43S28.storage.store.energy > 200000) {
	     Memory.rooms.W43S28.creep.upgrader.shape = [
		   	WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			CARRY,CARRY,
			MOVE,MOVE,MOVE];
	    Memory.rooms.W43S28.creep.upgrader.count = 2;
	}
	if(Game.rooms.W43S28.storage.store.energy < 200000 && Game.rooms.W43S28.storage.store.energy > 50001) {
	    Memory.rooms.W43S28.creep.upgrader.shape = [
	       	MOVE,MOVE,MOVE,MOVE,
			MOVE,MOVE,MOVE,MOVE,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,
			CARRY,CARRY,CARRY];
	    Memory.rooms.W43S28.creep.upgrader.count = 1;
    }

	if(Game.rooms.W43S28.storage.store.energy < 50001 && Game.rooms.W43S28.storage.store.energy > 29999) {
	   	Memory.rooms.W43S28.creep.upgrader.shape = [
			MOVE,MOVE,MOVE,MOVE,
			MOVE,WORK,WORK,WORK,
			WORK,WORK,WORK,WORK,
			WORK,WORK,WORK,CARRY,
			CARRY,CARRY];
		Memory.rooms.W43S28.creep.upgrader.count = 1;
	}
	if(Game.rooms.W43S28.storage.store.energy < 30000 && Game.rooms.W43S28.storage.store.energy > 14999) {
	   	Memory.rooms.W43S28.creep.upgrader.shape = [
		   	MOVE,MOVE,MOVE,MOVE,
		  	WORK,WORK,WORK,WORK,
		   	WORK,WORK,WORK,WORK,
		   	WORK,WORK,CARRY,CARRY];
	   Memory.rooms.W43S28.creep.upgrader.count = 1;
   	}
   	if(Game.rooms.W43S28.storage.store.energy < 15000) {
	   	Memory.rooms.W43S28.creep.upgrader.shape = [
	   		MOVE,MOVE,MOVE,WORK,
		   	WORK,WORK,WORK,WORK,
		   	WORK,CARRY,CARRY];
	   	Memory.rooms.W43S28.creep.upgrader.count = 1;
   	}


	var room2Needs = {
		'haulers': {
			'normal': 2,
			'tower': 1,
			'links': 1,
			'remote': {
				'Remote4': 1,
				'Remote5': 1,
			},
			'mineral': 1
		}
	};
 	//Ramparts open/close
 	/*
	let southRamparts = Game.rooms['W43S28'].find(FIND_STRUCTURES, {filter: (s)=>{return s.structureType == STRUCTURE_RAMPART}});
    for(var i in southRamparts){
        //console.log(southRamparts[i])
        southRamparts[i].setPublic(false);
    }
	*/

	//****************** ROOM 2 SPAWNING. ROOM W43S28 *********************************************************/
    if(spawn2 != undefined && !Game.spawns['Spawn2'].spawning){
		//Need too change to something like "if room needs rebooted" that
        if(room2.energyAvailable < UNIT_COST(bodyPicker('hauler')) && harvesters2.length < 1 && sharvesterR2.length < 1 && sharvesterR2_1.length < 1){
            if(harvesters2.length < 1 && spawn2.canCreateCreep(bodyPicker('default'))){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('default'), `${'harvester2'}-${creepTime}`, {role:'harvester2', job:'reboot', goal:'Here', homeID:2});
                console.log('Spawning new harvester from Spawn2: ' + newName);
            }
        }
		else if((((haulers2.length < 1) || haulers2[0].ticksToLive < 160) && haulers2.length < 2) && (spawn2.canCreateCreep(bodyPicker('hauler')) == 0)){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('hauler'), `${'hauler2'}-${creepTime}`, {role:'hauler2', job: 'normal', goal:'',roads: true,empty: false, homeID:2, resourceT: null});
				console.log('Spawning new hauler in Spawn2: ' + newName);
		}
        else if(haulers2.length > 0 && (haulers2[0].ticksToLive > 300 || haulers2.length > 1)){
            if(harvesters2.length < 0 /*Memory.rooms.W43S28.creep.harvester.job.harvesting.count */&& (spawn2.canCreateCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY], `${'harvester2'}-${creepTime}`, {role:'harvester2', job:'harvesting', goal:'Here', homeID:2});
                console.log('Spawning new harvester in Spwan2: ' + newName);
            }
            if(sharvesterR2.length < 1 && (haulers2.length > 0) && (spawn2.canCreateCreep(bodyPicker('sharvester_big')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('sharvester_big'), `${'sharvesterR2'}-${creepTime}`, {role:'sharvesterR2', job:'static mining', sourceID:'5982fc22b097071b4adbce38', goal:'Harvest_R2_0', homeID: 2});
                console.log('Spawning new sharvesterR2 in Spawn2: ' + newName);
            }
            if(sharvesterR2_1.length < 1 && (haulers2.length > 0) && (spawn2.canCreateCreep(bodyPicker('sharvester_big')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('sharvester_big'), `${'sharvesterR2_1'}-${creepTime}`, {role:'sharvesterR2_1', job:'static mining', sourceID:'5982fc22b097071b4adbce37', goal:'Harvest_R2_1', homeID: 2});
                console.log('Spawning new sharvesterR2_1 in Spawn2: ' + newName);
            }
            if((upgraders2.length < 1 /*Memory.rooms.W43S28.creep.upgrader.count*/) && (spawn2.canCreateCreep(bodyPicker('upgrader_W43S28')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('upgrader_W43S28'), `${'upgrader2'}-${creepTime}`, {role:'upgrader2', job:'upgrading', goal:'Here', homeID:2});
                console.log('Spawning new upgrader in Spawn2: ' + newName);
            }
            if((builders2.length < 1/*Memory.rooms.W43S28.creep.builder.count*/) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('builder')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('builder'), `${'builder2'}-${creepTime}`, {role:'builder2', job:'building',boost:false,mineral:'LH2O',mineral2:null,mineral3:null, goal:'Here', homeID:2});
                console.log('Spawning new builder in Spawn2: ' + newName);
            }

            if((repairers2.length < 1) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('repair')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('repair'), `${'repairer2'}-${creepTime}`, {role:'repair2', job:'normal', goal:'', homeID: 2});
                console.log('Spawning new repairer in Spawn2: ' + newName);
            }
			//Tower Hauler, merge into hauler?
            if((towerHaulers2.length < 1) && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && upgraders2.length > 0 && (spawn2.canCreateCreep(bodyPicker('towerHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('towerHauler'), `${'towerHauler2'}-${creepTime}`, {role:'towerHauler2', job:'tower hauling', goal:'', homeID: 2});
                console.log('Spawning new Tower Hauler in Spawn2: ' + newName);
            }


            if(roleDismantlers.length < 0 && upgraders2.length > 0 && (spawn2.canCreateCreep(bodyPicker('dismantler2')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('dismantler2'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', goal: 'Attacks', job:'destroy', jobID: 0, homeID: 2});
                console.log('Spawning new Dismantler at Spawn2: ' + newName);
            }
			if((remotes4.length < 1) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remote'), `${'remote4'}-${creepTime}`, {role: 'remote4', goal: 'Remote4', sourceID:'5982fc2eb097071b4adbcf83', canID: 0, homeID: 2});
                console.log('Spawning new Remote Harvester4 from Spawn2: ' + newName);
            }
            if((remotes5.length < 1) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remote'), `${'remote5'}-${creepTime}`, {role: 'remote5', goal: 'Remote5', sourceID:'5982fc17b097071b4adbcccf', canID: 0, homeID: 2});
                console.log('Spawning new Remote Harvester5 from Spawn2: ' + newName);
            }
			if((remoteRepairers3.length < 0) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer3'}-${creepTime}`, {role: 'remoteRepairer3', job:'remote handy maan', goal: 'Remote4', homeID: 2});
                console.log('Spawning new remote Repairer 3 at spawn2: ' + newName);
            }
            if((remoteRepairers4.length < 1) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer4'}-${creepTime}`, {role: 'remoteRepairer4', job:'remote handy maan', goal: 'Remote5', homeID: 2});
                console.log('Spawning new remote Repairer 4 at spawn2: ' + newName);
            }
			if(((remoteHaulers3.length < 1 || remoteHaulers3[0].ticksToLive <= 200) && remoteHaulers3.length < 2) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn2.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteHauler'), `${'remHauler3'}-${creepTime}`, {role: 'remoteHauler3', hauling: '', goal:'Remote4',job:'normal', roads: true,useLinkID: 2, homeFlag: 'Home2', homeID:2});
                console.log('Spawning new remote hauler #3 from spawn2: ' + newName);
            }


            if((healers.length < 0) && (spawn2.canCreateCreep(bodyPicker('healer_small')) == 0)){
                    var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('healer_small'), `${'healer'}-${creepTime}`, {role: 'healer', job: 'normal', goal: 'Rally0', homeID: 2});
                    console.log('Spawning new Healer at Spawn2: ' + newName);
            }

			if(roleDismantlers.length < 0 && (spawn2.canCreateCreep(bodyPicker('dismantler')) == 0)){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('dismantler'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', goal: 'Kill', job:'destroy',boost:false, mineral:null, jobID: 0, homeID: 2});
				console.log('Spawning new Dismantler at Spawn2: ' + newName);
			}

            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.homeID == 1) && (room2.storage.store[RESOURCE_ENERGY] > 100)  && (spawn2.canCreateCreep(bodyPicker('linkHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler',job:'sender', goal:'linkx', homeID: 2});
                console.log('Spawning new Link Hauler at Spawn2: ' + newName);
            }
        }
    }

    if(spawn4 && !spawn4.spawning){
        if(haulers2.length > 0 && (haulers2[0].ticksToLive > 300 || haulers2.length > 1) && sharvesterR2.length > 0 && sharvesterR2_1.length > 0){

		    if(defenders4.length < 1 && upgraders2.length > 0 && (spawn4.canCreateCreep(bodyPicker('ranged5x5'))) == 0){
				var newName = Game.spawns['Spawn4'].createCreep(bodyPicker('ranged5x5'), `${'guard'}-${creepTime}`, {role:'defender4', job:'guard', home:'Spawn2', goal: 'Attacks', homeID: 2});
				console.log('Spawning new Defender at Spawn4: ' + newName);
		    }
		    if((minerals2.length < 0) && (Game.rooms.W43S28.storage.store[RESOURCE_ENERGY] > 50000) && (Game.getObjectById('598342abca90777e307b14b4').ticksToRegeneration == undefined) && (spawn4.canCreateCreep(bodyPicker('static_mineral')) == 0)){
                var newName = Game.spawns['Spawn4'].createCreep(bodyPicker('static_mineral'), `${'mineral2'}-${creepTime}`, {role: 'mineral2', job: 'normal',goal:'home',homeID: 2, home: room2.toString()});
                console.log('Spawning new Mineral Extractor at Spawn4: ' + newName);
            }
            if(claimers2.length < 1 && spawn4.canCreateCreep(bodyPicker('claimer')) == 0){
                var newName = claimer.spawn(Game.spawns['Spawn4'], bodyPicker('claimer'), 'reserving', 'Destroyy', creepTime);
				console.log('Spawning new claimer from ' + spawn1 + ' named: ' + newName);
            }
            if(haulersG2.length < 0 && spawn4.canCreateCreep(bodyPicker('hauler_50')) == 0){
				var newName = spawn4.createCreep(bodyPicker('hauler_50'), `${'haulerG2'}-${creepTime}`, {role:'haulerG2', job:'get', goal:'Remote5', homeID:2, resourceT: ''});
				console.log('Spawning new hauler-get in ' + spawn4 + ' named: ' + newName);
			}
			if(((remoteHaulers4.length < 1 || remoteHaulers4[0].ticksToLive <= 200) && remoteHaulers4.length < 2) && upgraders2.length > 0 && sharvesterR2.length > 0 && sharvesterR2_1.length > 0 && (spawn4.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn4'].createCreep(bodyPicker('remoteHauler'), `${'remHauler4'}-${creepTime}`, {role: 'remoteHauler4', hauling: '', goal:'Remote5', roads: true,job:'normal', useLinkID: null, homeFlag: 'Home2', homeID:2});
                console.log('Spawning new remote hauler4 from spawn2: ' + newName);
            }

			if(mineral_transports.length < 0 && (Game.getObjectById('598342abca90777e307b14b4').ticksToRegeneration == undefined) && (spawn4.canCreateCreep(bodyPicker('hauler_600')) == 0)){  // || haulers[0].ticksToLive < 160) && haulers.length < 2)
                var newName = spawn4.createCreep(bodyPicker('hauler_600'), `${'mineral_transport'}-${creepTime}`, {role:'mineral_transport', job: 'minerals', goal:'', roads:false, homeID:3, empty: false, resourceType:'K'});
                console.log('Spawning new tower hauler in Spawn4: ' + newName);
            }
			if(defenders3.length < 0/*Memory.rooms.W43S28.creep.defender.job.guard.goal.Remote4.count*/ && upgraders.length > 0 && (spawn4.canCreateCreep(bodyPicker('ranged5x5'))) == 0){
				var newName = Game.spawns['Spawn4'].createCreep(bodyPicker('ranged5x5'), `${'guard'}-${creepTime}`, {role:'defender3', job:'guard', goal: 'Destroyy', homeID: 2});
				console.log('Spawning new Defender Destroyy at Spawn4: ' + newName);
		    }
        }
    }



    if(spawn1 != undefined && !Game.spawns['Spawn1'].spawning){
        if(army){
			if((healers.length < 1) && (spawn1.canCreateCreep(bodyPicker('healer_tank_25move')) == 0)){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('healer_tank_25move'), `${'healer'}-${creepTime}`, {role: 'healer', goal:'Here', boost: true, mineral:'XLHO2',mineral2:'XGHO2',mineral3:null, homeID: 1});
				console.log('Spawning new Healer at Spawn3: ' + newName);
			}

				if(attackers.length < 0 && (spawn3.canCreateCreep(bodyPicker('attacker')) == 0 )){
				    var newName = Game.spawns['Spawn3'].createCreep(bodyPicker('attacker'), `${'attacker'}-${creepTime}`, {role: 'attacker', goal:'Here', boost: true, mineral: 'XUH2O',mineral2:'XGHO2',mineral3:'XZHO2', homeID: 1});
					console.log('Spawning new Attacker at Spawn3: ' + newName);
				}
                //Mean dismantler
                if(roleDismantlers.length < 0 && (spawn1.canCreateCreep(bodyPicker('dismantler_brute')) == 0)){
                    var newName = spawn1.createCreep(bodyPicker('dismantler_brute'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', goal: 'Claim', job:'destroy', boost:true, mineral:'XZH2O', jobID: 0, homeID: 1});
                    console.log('Spawning new Dismantler at Spawn1: ' + newName);
                }

            }

        if(room1.energyAvailable < UNIT_COST(bodyPicker('hauler')) && sharvesters.length < 1 && sharvester2.length < 1 && haulers.length < 1){
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

                if((((haulers.length < 2) || haulers[0].ticksToLive < 160) && haulers.length < 3) && (spawn1.canCreateCreep(bodyPicker('hauler_1k')) === 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('hauler_1k'), `${'hauler'}-${creepTime}`, {role:'hauler', job: 'normal', goal:'', homeID:1,roads:true, empty: false, resourceT: null});
                    console.log('Spawning new hauler in Spawn1: ' + newName);
                }

                if(sharvesters.length < 1 && (haulers.length > 0) && (haulers[0].ticksToLive > 300 || haulers.length > 2) &&  (spawn1.canCreateCreep(bodyPicker('sharvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('sharvester'), `${'sharvester'}-${creepTime}`, {role:'sharvester',job:'can mining', sourceID:'5982fc22b097071b4adbce33', goal:'Harvest0', homeID: 1});
                    console.log('Spawning new sharvester in Spawn1: ' + newName);
                }

                if(sharvester2.length < 1 && (haulers.length > 0) && (haulers[0].ticksToLive > 300 || haulers.length > 2) && (spawn1.canCreateCreep(bodyPicker('sharvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('sharvester'), `${'sharvester2'}-${creepTime}`, {role:'sharvester2',job: 'can mining', sourceID:'5982fc22b097071b4adbce34', goal:'Harvest1', homeID:1 });
                    console.log('Spawning new sharvester2 in Spawn1: ' + newName);
                }


        }

        if(sharvesters.length > 0 && sharvester2.length > 0 && haulers.length > 0 && (haulers[0].ticksToLive > 300 || haulers.length > 2)){

            //NOTE: when trying to use remote upgraders.
            /* || (upgraders[0].memory.job === 'remote' || upgraders[0] === undefined) || (upgraders[1] === undefined || upgraders[1].memory.job === 'remote')*/
			if(upgraders.length < Memory.rooms.W43S27.creep.upgrader.count && (haulers.length > 0) && (haulers[0].ticksToLive > 300 || haulers.length > 2) && (spawn1.canCreateCreep(bodyPicker('upgrader_W43S27')) == 0)){
				var newName = spawn1.createCreep(bodyPicker('upgrader_W43S27'),`${'upgrader'}-${creepTime}`, {role:'upgrader', job:'upgrading', goal:'controller',boost:false, mineral:'XGH2O', homeID:1});
				console.log('Spawning new upgrader at Spawn1: ' + newName);
			}
            /*
			if((upgraders.length < 0) && (upgraders[0] === undefined || upgraders[0].memory.job === 'upgrading' || upgraders[2] === undefined) && (spawn1.canCreateCreep(bodyPicker('upgrader_big_remote')) == 0)){
                var newName = spawn1.createCreep(bodyPicker('upgrader_big_remote'),`${'upgrader'}-${creepTime}`, {role:'upgrader', job:'remote',run:true,boost:false,mineral:'XGH2O', goal:'room_W45S28', homeID:1});
                console.log('Spawning new remote upgrader at Spawn1: ' + newName);
            }
            */
			if((haulers3.length < 1)  && (spawn1.canCreateCreep(bodyPicker('hauler_min')) == 0)){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('hauler_min'), `${'hauler3'}-${creepTime}`, {role:'hauler3', job: 'links[0]', goal:'Main', homeID: 1, resourceT: null});
				console.log('Spawning new link to storage hauler in Spawn1: ' + newName);
			}
			if((haulersT.length < 0)  && (spawn1.canCreateCreep(bodyPicker('hauler')) == 0)){
				var newName = spawn1.createCreep(bodyPicker('hauler'), `${'haulerT'}-${creepTime}`, {role:'haulerT', job: 'transfer', goal:'Main', homeID: 1, resourceT: RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE});
				console.log('Spawning new mineral mover in Spawn1: ' + newName);
			}

			if((towerHaulers.length < 1) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('towerHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('towerHauler'), `${'towerHauler'}-${creepTime}`, {role:'towerHauler'});
                console.log('Spawning new Tower Hauler: ' + newName);
            }

			if(builders.length < 0 && upgraders.length > 0 && (spawn1.canCreateCreep(bodyPicker('builder_big')) == 0)){
                var newName = spawn1.createCreep(bodyPicker('builder_big'), `${'builder'}-${creepTime}`, {role:'builder', job:'building',boost:true,mineral:'LH2O',run: true, goal:'room_W45S28', homeID: 1});
                console.log('Spawning new builder at Spawn1: ' + newName);
            }
            if(repairers.length < 1 && upgraders.length > 0 && (spawn1.canCreateCreep(bodyPicker('builder_big')) == 0)){
                var newNamme = Game.spawns['Spawn1'].createCreep(bodyPicker('builder_big'), `${'repairer'}-${creepTime}`, {role:'repair', job:'walls', goal:'', homeID:1});
                console.log('Spawning new repairer: ' + newNamme);
            }
            if((remotes.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) === 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), `${'remote'}-${creepTime}`, {role: 'remote',goal:'Remote', sourceID:'5982fc2eb097071b4adbcf80', canID: 0, homeID: 1});
                console.log('Spawning new remoteHarvester: ' + newName);
            }

			if((remotes6.length < 1)  && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), `${'remote5'}-${creepTime}`, {role: 'remote6', goal: 'Remote6', sourceID:'5982fc0bb097071b4adbcae7', canID: 0, homeID: 1});
                console.log('Spawning new remote Harvester v6 from Spawn1: ' + newName);
            }
            if(remoteHaulers.length < 1 /*|| remoteHaulers[0].ticksToLive < 200) && remoteHaulers.length < 2) */&& (spawn1.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteHauler'), `${'remHauler'}-${creepTime}`, {role: 'remoteHauler', hauling: '',roads: true,job:'normal', goal: 'Remote',useLinkID: 3, homeFlag:'Main', homeID:1});
                console.log('Spawning new remote hauler from Spawn1: ' + newName);
            }
			if(((remoteHaulers5.length < 1 || remoteHaulers5[0].ticksToLive <= 200) && remoteHaulers5.length < 2) && (spawn1.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteHauler'), `${'remHauler'}-${creepTime}`, {role: 'remoteHauler5', hauling: '',roads: true,job:'normal', goal: 'Remote6',useLinkID: 2, homeFlag:'Main', homeID:1});
                console.log('Spawning new remote hauler v6 from Spawn1: ' + newName);
            }
			if(backups.length < 0 && (haulers.length > 0) && (sharvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('backup'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('backup'), `${'defender'}-${creepTime}`, {role:'defender', job:'guard', goal: 'Claim', homeID:2});
				console.log('Spawning new Backup at Spawn2: ' + newName);
			}
            if((remoteRepairers.length < 0) && (spawn1.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer'}-${creepTime}`, {role: 'remoteRepairer', goal: 'Remote', homeID:1});
                console.log('Spawning new remoteRepairer: ' + newName);
            }


            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.homeID == 2)  && (sharvesters.length > 0) && (spawn1.canCreateCreep(bodyPicker('linkHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('linkHauler'), `${'linkHauler'}-${creepTime}`, {role:'linkHauler', homeID: 1});
                console.log('Spawning new Link Hauler at Spawn1: ' + newName);
            }


            //Helpful dismantler.
            if(roleDismantlers.length < 0 && (spawn1.canCreateCreep(bodyPicker('helpful_dismantler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('helpful_dismantler'), `${'dismantler'}-${creepTime}`, {role: 'dismantler', goal:'Claim', job:'helper', jobID: 1 });
                console.log('Spawning new Dismantler at Spawn1: ' + newName);
            }
            if((minerals.length < 0) && (Game.rooms.W43S27.storage.store[RESOURCE_ENERGY] > 50000) && (Game.getObjectById('598342abca90777e307b14b3').ticksToRegeneration == undefined) && (spawn1.canCreateCreep(bodyPicker('mineral')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('mineral'), `${'mineral'}-${creepTime}`, {role: 'mineral', job: 'normal',goal: 'home',homeID: 1, home: room1.toString()});
                console.log('Spawning new Mineral Extractor at Spawn1: ' + newName);
            }

			if(defenders.length < 0 && (haulers.length > 0) && (sharvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('defender'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('defender'), `${'defender'}-${creepTime}`, {role:'defender', job:'defender', home:'Spawn1'});
				console.log('Spawning new Defender at Spawn1: ' + newName);
			}
			if(defenders2.length < 1 && (haulers.length > 0) && (sharvesters.length > 0) && (spawn1.canCreateCreep(bodyPicker('ranged5x5'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('ranged5x5'), `${'defender2'}-${creepTime}`, {role:'defender2', job:'guard', goal: 'Remote_Room', homeID: 1});
				console.log('Spawning new Defender2 at Spawn1: ' + newName);
			}

            //New Room starter kit!
            if((claimersR.length < 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('claimer_swamp')) == 0)){
				var newName = claimer.spawn(Game.spawns['Spawn1'], 'claimer_swamp', 'claiming', 'Flag1', creepTime);
				//var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('claimer_swamp'), `${'claimerR'}-${creepTime}`, {role:'claimerR',job:'claiming', goal:'Flag1', homeID:1});
				console.log('Spawning new claimerR from ' + spawn1 + ' named: ' + newName);
            }
        }
    }
	//if((Game.spawns['Spawn1'].spawning || spawn3 != undefined) && !Game.spawns['Spawn3'].spawning){

	if(spawn3 != undefined && !Game.spawns['Spawn3'].spawning){
		if(army){
				if((healers.length < 0) && (spawn1.canCreateCreep(bodyPicker('healer_tank_25move')) == 0)){
					var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('healer_tank_25move'), `${'healer'}-${creepTime}`, {role: 'healer', goal:'Here', boost: true, mineral:'XLHO2',mineral2:'XGHO2',mineral3:null, homeID: 1});
					console.log('Spawning new Healer at Spawn3: ' + newName);
				}
				if(attackers.length < 1 && (spawn3.canCreateCreep(bodyPicker('attacker')) == 0 )){
				    var newName = Game.spawns['Spawn3'].createCreep(bodyPicker('attacker'), `${'attacker'}-${creepTime}`, {role: 'attacker', goal:'Claim', boost: true, mineral: 'XUH2O',mineral2:'XGHO2',mineral3:'XZHO2', homeID: 1});
					console.log('Spawning new Attacker at Spawn3: ' + newName);
				}
			}

		if(!army && sharvesters.length > 0 && sharvester2.length > 0 && haulers.length > 0 && (haulers[0].ticksToLive > 300 || haulers.length > 2)){

			if((claimers.length < 2) && (claimers[0] == undefined || claimers[0].memory.goal == 'Remote_Room') && (upgraders.length > 0) && (spawn3.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = spawn3.createCreep(bodyPicker('claimer'), `${'claimer'}-${creepTime}`, {role:'claimer',job:'reserving', goal:'Claim', homeID:1});
				console.log('Spawning new claimer from ' + spawn1 + ' named: ' + newName);
            }
			if((claimers3.length < 1) && (spawn3.canCreateCreep(bodyPicker('claimer')) == 0)){
				var newName = spawn3.createCreep(bodyPicker('claimer'), `${'claimer3'}-${creepTime}`, {role:'claimer3',job:'reserving', goal:'Remote6', homeID: 1});
				console.log('Spawning new claimer3 at Spawn 3: ' + newName);
			}
			if(remoteHaulers2.length < 2 && (spawn3.canCreateCreep(bodyPicker('hauler_max_work')) == 0)){
				var newName = spawn3.createCreep(bodyPicker('hauler_max_work'), `${'remHauler2'}-${creepTime}`, {role: 'remoteHauler2', hauling: '', goal:'Remote2',job:'normal',roads: true, useLinkID: 2, homeFlag:'Main', homeID:1});
				console.log('Spawning new remote hauler from Spawn3: ' + newName);
			}
			if(builders.length < 1 /*Memory.rooms.W43S27.creep.builder.count*/ && upgraders.length > 0 && (spawn3.canCreateCreep(bodyPicker('builder_big')) == 0)){
				var newName = spawn3.createCreep(bodyPicker('builder_big'), `${'builder'}-${creepTime}`, {role:'builder', job:'building',boost:false,mineral:'XLH2O', goal:'', homeID: 1});
				console.log('Spawning new builder at Spawn3: ' + newName);
			}
			if((remotes2.length < 1) && (spawn3.canCreateCreep(bodyPicker('remote')) == 0)){
				var newName = spawn3.createCreep(bodyPicker('remote'), `${'remote2'}-${creepTime}`, {role: 'remote2',goal: 'Remote2', sourceID:'5982fc17b097071b4adbcccc', canID: 0});
				console.log('Spawning new remoteHarvester2 from Spawn3: ' + newName);
			}

			if(haulersG.length < 0 && spawn3.canCreateCreep(bodyPicker('hauler_max_work')) == 0){
				var newName = spawn3.createCreep(bodyPicker('hauler_max_work'), `${'haulerG'}-${creepTime}`, {role:'haulerG', job:'termToStorage', goal:'Claim', homeID:1,boost: false, mineral:'KH2O', resourceT: null});
				console.log('Spawning new hauler-getter in ' + spawn3 + ' named: ' + newName);
			}
			if(buildersR.length < 0 && upgraders.length > 0 && (spawn3.canCreateCreep(bodyPicker('upgrader_big_remote')) == 0)){
				var newName = spawn3.createCreep(bodyPicker('upgrader_big_remote'), `${'builderR'}-${creepTime}`, {role:'builderR', job:'remote', boost: true, mineral:'LH2O', room:'W45S28', mineral2: '', goal:'Flag1', homeID: 1});
				console.log('Spawning new builderR at Spawn3: ' + newName);
			}
			if(haulersC.length < 0 && (room1.storage.store[RESOURCE_ENERGY] > 100000) && spawn3.canCreateCreep(bodyPicker('hauler_1k')) == 0){
				//NOTE: params: spawn, body, creepTime, job, goal, send resource, get resource, resource_send, resource_get, boost, mineral, homeID
				var newName = carrier.spawn(Game.spawns['Spawn3'],'hauler_1k',creepTime,'carrier','room_W45S28',true,false,'energy','H',false,null,2);
				console.log('Spawning new hauler-carrier in ' + spawn3 + ' named: ' + newName);
			}
			if((remoteRepairers5.length < 1) && (spawn3.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn3'].createCreep(bodyPicker('remoteRepairer'), `${'remRepairer5'}-${creepTime}`, {role: 'remoteRepairer5', goal: 'Remote6', homeID:1});
                console.log('Spawning new remote Repairer 6 at Spawn3: ' + newName);
            }
		    if(sk.length < 0 && (haulers.length > 0) && (sharvesters.length > 0) && (spawn3.canCreateCreep(bodyPicker('sk_killer'))) == 0){
				var newName = Game.spawns['Spawn3'].createCreep(bodyPicker('sk_killer'), `${'sk'}-${creepTime}`, {role:'sk', job:'killing',attackSK: true , goal: 'SK', homeID: 1});
				console.log('Spawning new SK Killer at Spawn1: ' + newName);
			}
			if((minerals3.length < 0) /*|| minerals3[0].ticksToLive < 300 ) && minerals3.length < 2)*/ && (spawn3.canCreateCreep(bodyPicker('remote_mineral')) == 0)) {
                var newName = Game.spawns['Spawn3'].createCreep(bodyPicker('remote_mineral'), `${'mineral3'}-${creepTime}`, {role: 'mineral3', job: 'remote_mineral', builder: true, goal:'Claim' ,boost: false, mineral: 'KH', homeID:1, home: room1.toString()});
                console.log('Spawning new Remote Mineral Extractor at Spawn1: ' + newName);
            }
		//  SECTION OF JOINT SPAWNS //

		}
	}

	if(spawn8 != undefined && !spawn8.spawning){
		if(army){
				if((healers.length < 0) && (spawn8.canCreateCreep(bodyPicker('healer_tank_25move')) == 0)){
					var newName = spawn8.createCreep(bodyPicker('healer_tank_25move'), `${'healer'}-${creepTime}`, {role: 'healer', goal:'Here', boost: true, mineral:'XLHO2',mineral2:'XGHO2',mineral3:null, homeID: 1});
					console.log('Spawning new Healer at Spawn3: ' + newName);
				}
				if(attackers.length < 0 && (spawn3.canCreateCreep(bodyPicker('attacker')) == 0 )){
					var newName = spawn8.createCreep(bodyPicker('attacker'), `${'attacker'}-${creepTime}`, {role: 'attacker', goal:'Claim', boost: true, mineral: 'XUH2O',mineral2:'XGHO2',mineral3:'XZHO2', homeID: 1});
					console.log('Spawning new Attacker at Spawn3: ' + newName);
				}
			}

		if(!army && sharvesters.length > 0 && sharvester2.length > 0 && haulers.length > 0 && (haulers[0].ticksToLive > 300 || haulers.length > 2)){
			if(defenders5.length < 1 && (haulers.length > 0) && (sharvesters.length > 0) && (spawn8.canCreateCreep(bodyPicker('ranged5x5'))) == 0){
				var newName = spawn8.createCreep(bodyPicker('ranged5x5'), `${'defender5'}-${creepTime}`, {role:'defender5', job:'guard', goal: 'W45S27_guard', homeID: 1});
				console.log('Spawning ' + newName + ' at ' + spawn8);
			}
			if((claimers.length < 2) && (claimers[0] == undefined || claimers[0].memory.goal == 'Claim')  && (upgraders.length > 0) && (spawn8.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = spawn8.createCreep(bodyPicker('claimer'), `${'claimer'}-${creepTime}`, {role:'claimer',job:'reserving', goal:'Remote_Room', homeID:1});
				console.log('Spawning ' + newName + ' at ' + spawn8);
            }
			if((remoteRepairers2.length < 1) && (spawn8.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = spawn8.createCreep(bodyPicker('remoteRepairer'), `${'remRepairer2'}-${creepTime}`, {role: 'remoteRepairer2', goal: 'Remote2', homeID:1});
                console.log('Spawning ' + newName + ' at ' + spawn8);
            }
			if((remotes3.length < 1)  && (spawn8.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = spawn8.createCreep(bodyPicker('remote'), `${'remote3'}-${creepTime}`, {role: 'remote3',goal: 'Remote3', sourceID:'5982fc17b097071b4adbcccd', canID: 1, homeID: 1});
                console.log('Spawning ' + newName + ' at ' + spawn8);
            }
			if(defenders.length < 1 && (haulers.length > 0) && (sharvesters.length > 0) && (upgraders.length > 0) && (spawn8.canCreateCreep(bodyPicker('mixed_arts'))) == 0){
				var newName = spawn8.createCreep(bodyPicker('mixed_arts'), `${'defender'}-${creepTime}`, {role:'defender', job:'guard', home:'Spawn1', goal: 'Defense', homeID:1});
				console.log('Spawning new Defender at Spawn1: ' + newName);
			}
		}

	}

    for(var spawn in Game.spawns){
        if(Game.spawns[spawn].spawning) {

            let dPercent = (Game.spawns[spawn].spawning.remainingTime / Game.spawns[spawn].spawning.needTime) * 100;
            let percent = (100 - dPercent).toPrecision(4);

            var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
			if(Game.spawns[spawn].room === Game.rooms['W43S27']){
				if(Game.spawns[spawn] === Game.spawns['Spawn1']){
					Game.spawns[spawn].room.visual.text(
		                Game.spawns[spawn] + ' spawning ' + spawningCreep.memory.role + ' ' + percent + '%', 15,43,
		                {color: 'white',size:'0.5', opacity: 1});
				}
				if(Game.spawns[spawn] === Game.spawns['Spawn3']){
					Game.spawns[spawn].room.visual.text(
		                Game.spawns[spawn] + ' spawning ' + spawningCreep.memory.role + ' ' + percent + '%', 15,45,
		                {color: 'white',size:'0.5', opacity: 1});
				}
				if(Game.spawns[spawn] === Game.spawns['Spawn8']){
					Game.spawns[spawn].room.visual.text(
		                Game.spawns[spawn] + ' spawning ' + spawningCreep.memory.role + ' ' + percent + '%', 15,47,
		                {color: 'white',size:'0.5', opacity: 1});
				}
			}
			else {
				Game.spawns[spawn].room.visual.text(
	                'Spawning ' + spawningCreep.memory.role + ' ' + percent + '%',
	                Game.spawns[spawn].pos.x + 1,
	                Game.spawns[spawn].pos.y,
	                {color: 'white',size:'0.5', align: 'left', opacity: 1});
			}
        }
    }



	for (var name in Game.creeps) {
        let creep = Game.creeps[name];
        util.statInit(creep.memory.role);
        util.creepInit(Game.creeps[name]);
        //let path = 'creep.type.' + creep.memory.role + '.cpu';
        Memory.stats.creep[creep.memory.role].cpu = 0;
        let startTime = Game.cpu.getUsed();
        if (!Memory.stats.creep[creep.memory.role].cpu) {
            Memory.stats.creep[creep.memory.role].cpu = 0;
        }

	//    roles[creep.memory.role].run(creep);

        Memory.stats.creep[creep.memory.role].cpu += (Game.cpu.getUsed() - startTime);
   }

        /*
           Utilities.rejuve(creep);
	   if (creep.memory.sleep) {
		   creep.memory.sleep -= 1;
	   }*/


    for(var name in Game.creeps){
        let creep = Game.creeps[name];
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
            sharvester.run(creep);
        }
        if(creep.memory.role == 'sharvester2'){
            sharvester.run(creep);
        }
        if(creep.memory.role == 'sharvesterR2'){
            sharvester.run(creep);
        }
        if(creep.memory.role == 'sharvesterR2_1'){
            sharvester.run(creep);
        }
		if(creep.memory.role == 'sharvesterR3'){
            sharvester.run(creep);
        }
        if(creep.memory.role == 'repair'){
            repairer.run(creep);
        }
        if(creep.memory.role == 'repair2'){
            repairer.run(creep);
        }
		if(creep.memory.role == 'repairR3'){
            repairer.run(creep);
        }
        if(creep.memory.role == 'dismantler'){
            dismantler.run(creep);
        }
		if(creep.memory.role == 'hauler'){
			roles['hauler'].run(creep);
		}
	 	if(creep.memory.role == 'hauler2'){
			hauler.run(creep);
        }
		if(creep.memory.role == 'hauler3'){
			hauler.run(creep);
		}
		if(creep.memory.role == 'haulerT'){
		    hauler.run(creep);
		}
		if(creep.memory.role == 'haulerC'){
			hauler.run(creep);
		}
		if(creep.memory.role == 'haulerG'){
			hauler.run(creep);
		}
		if(creep.memory.role == 'haulerG2'){
			hauler.run(creep);
		}
		if(creep.memory.role === 'mineral_transport'){
			moreHauler.run(creep);
		}
        if(creep.memory.role == 'towerHauler'){
            towerHauler.run(creep);
        }
        if(creep.memory.role == 'towerHauler2'){
            towerHauler.run(creep);
        }
        if(creep.memory.role == 'claimer'){
            claimer.run(creep);
        }
		if(creep.memory.role == 'claimer2'){
            claimer.run(creep);
        }
		if(creep.memory.role == 'claimer3'){
            claimer.run(creep);
        }
        if(creep.memory.role == 'remote'){
            remote.run(creep);
        }
        if(creep.memory.role == 'remote2'){
            remote.run(creep);
        }
        if(creep.memory.role == 'remote3'){
            remote.run(creep);
        }
		if(creep.memory.role == 'remote4'){
            remote.run(creep);
        }
        if(creep.memory.role == 'remote5'){
            remote.run(creep);
        }
		if(creep.memory.role == 'remote6'){
            remote.run(creep);
        }
        if(creep.memory.role == 'remoteHauler'){
            remoteHauler.run(creep);
        }
        if(creep.memory.role == 'remoteHauler2'){
            remoteHauler.run(creep);
        }
		if(creep.memory.role == 'remoteHauler3'){
            remoteHauler.run(creep);
        }
        if(creep.memory.role == 'remoteHauler4'){
            remoteHauler.run(creep);
        }
		if(creep.memory.role == 'remoteHauler5'){
            remoteHauler.run(creep);
        }
        if(creep.memory.role == 'remoteRepairer'){
            remoteRepair.run(creep);
        }
        if(creep.memory.role == 'remoteRepairer2'){
            remoteRepair.run(creep);
        }
		if(creep.memory.role == 'remoteRepairer3'){
            remoteRepair.run(creep);
        }
        if(creep.memory.role == 'remoteRepairer4'){
            remoteRepair.run(creep);
        }
		if(creep.memory.role == 'remoteRepairer5'){
            remoteRepair.run(creep);
        }
        if(creep.memory.role == 'backup'){
            defender.run(creep);
        }
        if(creep.memory.role == 'defender'){
            defender.run(creep);
        }
		if(creep.memory.role == 'defender2'){
            defender.run(creep);
        }
		if(creep.memory.role == 'defender3'){
            defender.run(creep);
        }
		if(creep.memory.role == 'defender4'){
            defender.run(creep);
        }
		if(creep.memory.role == 'defender5'){
            defender.run(creep);
        }
        if(creep.memory.role == 'linkHauler'){
            linkHauler.run(creep);
        }
        if(creep.memory.role == 'healer'){
            healer.run(creep);
        }
        if(creep.memory.role == 'mineral'){
            mineral.run(creep);
        }
		if(creep.memory.role == 'mineral2'){
            mineral.run(creep);
        }
		if(creep.memory.role == 'mineral3'){
			mineral.run(creep);
		}
        if(creep.memory.role == 'attacker'){
            attacker.run(creep);
        }
        if(creep.memory.role == 'Zombie'){
            zombie.run(creep);
        }
        // Temp. New room Claim and Build package
        if(creep.memory.role == 'builderR'){
            builder.run(creep);
        }
        if(creep.memory.role == 'claimerR'){
            claimer.run(creep);
        }
        if(creep.memory.role == 'sk'){
            sk.run(creep);
        }
    }

	for(const i in Game.rooms){
		var linksInRoom = Game.rooms[i].find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_LINK;}});
		links.run(linksInRoom, Game.rooms[i]);
	}

	/*
    var towers = room1.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });
    var towers2 = room2.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });

    var towers3 = Game.rooms['W45S22'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });

    var towers4 = Game.rooms['W45S28'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });

	var towers5 = Game.rooms['W38S24'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return(structure.structureType == STRUCTURE_TOWER);}
    });
	*/
	for(var i in Game.rooms){
		if(Game.rooms[i] === Game.rooms['W43S27'] || Game.rooms[i] === Game.rooms['W43S28'] || Game.rooms[i] === Game.rooms['W45S22'] || Game.rooms[i] === Game.rooms['W45S28'] || Game.rooms[i] === Game.rooms['W38S24']){
			let towersInRoom = Game.rooms[i].find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_TOWER;}});
			for(var name in towersInRoom){
				tower.run(towersInRoom[name]);
			}
		}
	}

	/*
   	for(var name in towers){
        tower.run(towers[name]);
    }
    for(var name in towers2){
        tower.run(towers2[name]);
    }
    for(var name in towers3){
        tower.run(towers3[name]);
    }
    for(var name in towers4){
        tower.run(towers4[name]);
    }
	for(var name in towers5){
        tower.run(towers5[name]);
    }
	*/



	Memory.stats.cpu.used = Game.cpu.getUsed();

});
}
