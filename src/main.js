var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var sharvester = require('role.sharvester');
var repairer = require('role.repair');
var hauler = require('role.hauler');
var defender = require('role.defender');
var towerHauler = require('role.towerHauler');
var tower = require('tower');
var claimer = require('role.claimer');
var remote = require('role.remote');
var remoteHauler = require('role.remoteHauler');
var links = require('links');
var remoteRepair = require('role.remoteRepair');
var dismantler = require('role.dismantler');
var attacker = require('role.attack');
var linkHauler = require('role.linkHauler');
var healer = require('role.healer');
var bodyPicker = require('bodyPicker');
var mineral = require('role.mineral');
var rangedAttacker = require('role.rangedAttack');




var roles = require('roles');



// Any modules that you use that modify the game's prototypes should be require'd
// before you require the profiler.
const profiler = require('screeps-profiler');

// This line monkey patches the global prototypes.
//profiler.enable();
var army = false;

global.UNIT_COST = (body) => _.sum(body, p => BODYPART_COST[p]);
global.Math.getDistance = function( x1, y1, x2, y2 ) {

	var 	xs = x2 - x1,
		ys = y2 - y1;

	xs *= xs;
	ys *= ys;

	return Math.sqrt( xs + ys );
};
//global function Spawn_Eng(){ return Game.spawns['Spawn1'].energyAvailable; }

module.exports.loop = function(){

profiler.wrap(function() {

	/***** Room variables. Change if rooms are changed! ****/
	var room1 = Game.rooms['W43S27'];
	var room2 = Game.rooms['W43S28'];


    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
	var defenders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender2');
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
    var towerHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler');
    var towerHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler2');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
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
	var rangedAttackers =_.filter(Game.creeps, (creep) => creep.memory.role == 'rangedAttacker');

        if ((Game.time % 20) === 0){


        }
		for(var name in Memory.creeps){
			if(!Game.creeps[name]){
				console.log('Clearing non-existing creep memory: ' + name + ' ');
				delete Memory.creeps[name];
				console.log('Defenders: ' + (defenders.length + defenders2.length));
				console.log('Harvesters: ' + harvesters.length + '. Builders: ' + builders.length + ', Upgraders: ' + upgraders.length + ', Repair: ' + repairers.length + ', Haulers: ' + haulers.length +
				', Tower Haulers: ' + towerHaulers.length + ' Dismantlers: ' + roleDismantlers.length + ' Remote Harvesters: ' + remotes.length +
				', Remote Repairers:' + remoteRepairers.length + ', Attackers: ' + attackers.length + ', Healers: ' + healers.length);
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


    //Construction Sites unfinisehd. Using to dynamically control amount of builders spawned.
//    var construction = Object.keys(Game.constructionSites).length;



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

	//****************** ROOM 2 SPAWNING. ROOOM W43S28 *********************************************************/
    var spawn2 = Game.spawns['Spawn2'];

    if(!Game.spawns['Spawn2'].spawning){
        if(room2.energyAvailable < 500 && harvesters2.length < 1){
            if(harvesters2.length < 1){
                var newName = Game.spawns['Spawn2'].createCreep([WORK,CARRY,MOVE], undefined, {role:'harvester2'});
                console.log('Spawning new harvester from Spawn2: ' + newName);
            }
        }
        else{
            if(harvesters2.length < 1 && (spawn2.canCreateCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY], undefined, {role:'harvester2'});
                console.log('Spawning new harvester in Spwan2: ' + newName);
            }
            if((builders2.length < 2) && (harvesters2.length > 0) && (spawn2.canCreateCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY], undefined, {role:'builder2'});
                console.log('Spawning new builder in Spawn2: ' + newName);
            }
            if((upgraders2.length < 2) && (harvesters2.length > 0) && (spawn2.canCreateCreep(bodyPicker('upgrader_small')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('upgrader_small'), undefined, {role:'upgrader2'});
                console.log('Spawning new upgrader in Spawn2: ' + newName);
            }
            if((repairers2.length < 1) && (harvesters2.length > 0) && (spawn2.canCreateCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role:'repair2'});
                console.log('Spawning new repairer in Spawn2: ' + newName);
            }
            if((towerHaulers2.length < 1) && (harvesters2.length > 0) && (spawn2.canCreateCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role:'towerHauler2'});
                console.log('Spawning new Tower Hauler in Spawn2: ' + newName);
            }
            if((haulers2.length < 1) && (spawn2.canCreateCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], undefined, {role:'hauler2', job:'normal'});
                console.log('Spawning new hauler in Spawn2: ' + newName);
            }
            if(sharvesterR2.length < 1 && (haulers2.length > 0) && (spawn2.canCreateCreep([MOVE,WORK,WORK,WORK,WORK, WORK]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,WORK,WORK,WORK,WORK, WORK], undefined, {role:'sharvesterR2', flag:'Harvest_R2_0'});
                console.log('Spawning new sharvesterR2 in Spawn2: ' + newName);
            }
            if(sharvesterR2_1.length < 1 && (haulers2.length > 0) && (spawn2.canCreateCreep([MOVE,WORK,WORK,WORK,WORK, WORK]) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep([MOVE,WORK,WORK,WORK,WORK, WORK], undefined, {role:'sharvesterR2_1', flag:'Harvest_R2_1'});
                console.log('Spawning new sharvesterR2_1 in Spawn2: ' + newName);
            }
            if(roleDismantlers.length < 0 && (spawn2.canCreateCreep(bodyPicker('dismantler2')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('dismantler2'), undefined, {role: 'dismantler', loc: 'Attacks', job:'destroy', jobID: 0});
                console.log('Spawning new Dismantler at Spawn2: ' + newName);
            }
			if((remotes4.length < 1) && (spawn2.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remote'), undefined, {role: 'remote4', sourceID:'5982fc2eb097071b4adbcf83', canID: 0});
                console.log('Spawning new remoteHarvester3 from Spawn2: ' + newName);
            }
			if((remoteRepairers3.length < 1) && (spawn2.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteRepairer'), undefined, {role: 'remoteRepairer3', loc: 'Remote4'});
                console.log('Spawning new remote Repairer 3 at spawn2: ' + newName);
            }
			if((remoteHaulers3.length < 1) && (spawn2.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('remoteHauler'), undefined, {role: 'remoteHauler3', hauling: '', loc: 'Remote4', homeID: 'Home2'});
                console.log('Spawning new remote hauler #3 from spawn2: ' + newName);
            }
            //attack_medium cost 1420.
            if(attackers.length < 0  /*&& (attackers[0] == undefined || attackers[0].memory.ID != 0) */ && (spawn2.canCreateCreep(bodyPicker('attacker_medium')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('attacker_medium'), undefined, {role:'attacker', ID: 0, goal: 'Rally0' });
                console.log('Spawning new attacker at Spawn2: ' + newName);
            }
			if(rangedAttackers.length < 0 && spawn2.canCreateCreep(bodyPicker('rangedAttack')) == 0){
				var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('rangedAttack'), undefined, {role:'rangedAttacker', goal: 'Rally0' });
                console.log('Spawning new ranged attacker at Spawn2: ' + newName);
			}
            if(attackers.length < 0 && (attackers[0] == undefined || attackers[0].memory.ID != 1) && (spawn2.canCreateCreep(bodyPicker('attacker_small')) == 0)){
                 var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('attacker_small'), undefined, {role:'attacker', ID: 1,  goal: 'AttackThere'});
                console.log('Spawning new attacker at Spawn2: ' + newName);
            }
            //healer_small cost 1560
            if((healers.length < 0) && (spawn2.canCreateCreep(bodyPicker('healer_small')) == 0)){
                    var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('healer_small'), undefined, {role: 'healer'});
                    console.log('Spawning new Healer at Spawn2: ' + newName);
            }
			if((minerals2.length < 1) && (harvesters2.length > 0) && (spawn2.canCreateCreep(bodyPicker('mineral_small')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('mineral_small'), undefined, {role: 'mineral2', job: 'normal', home: room2.toString()});
                console.log('Spawning new Mineral Extractor at Spawn2: ' + newName);
            }


            //Doesn't work! Well, I think it only works when you want one in two rooms.
            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.roomID != 1) && (room2.storage.store[RESOURCE_ENERGY] > 100)  && (spawn2.canCreateCreep(bodyPicker('linkHauler')) == 0)){
                var newName = Game.spawns['Spawn2'].createCreep(bodyPicker('linkHauler'), undefined, {role:'linkHauler', roomID: 1});
                console.log('Spawning new Link Hauler at Spawn2: ' + newName);
            }
        }
    }
//  console.log(healers[0].ticksToLive);

    var spawn1 = Game.spawns['Spawn1'];
   // console.log(linkHaulers[0]);
    if(!Game.spawns['Spawn1'].spawning){

        //Auto-Spawning code for each role.
        if(room1.energyAvailable <= 500){
            if(harvesters.length < 1 && (haulers.length < 1) &&  spawn1.canCreateCreep([WORK, CARRY, MOVE]) == 0){
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role:'harvester'});
                console.log('Spawning new harvester: ' + newName);
            }
        }
        else{
                if((harvesters.length < 1) && (spawn1.canCreateCreep(bodyPicker('harvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('harvester'), undefined, {role:'harvester'}); //Cost 900
                    console.log('Spawning new harvester in Spawn1: ' + newName);
                }

                if((((haulers.length < 1) || haulers[0].ticksToLive < 160) && haulers.length < 2) && (spawn1.canCreateCreep(bodyPicker('hauler')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('hauler'), undefined, {role:'hauler', job: 'normal'});
                    console.log('Spawning new hauler in Spawn1: ' + newName);
                }

                if(sharvester.length < 1 && (haulers.length > 0) && (spawn1.canCreateCreep(bodyPicker('sharvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('sharvester'), undefined, {role:'sharvester', flag:'Harvest0'});
                    console.log('Spawning new sharvester in Spawn1: ' + newName);
                }

                if(sharvester2.length < 1 && (haulers.length > 0) && (spawn1.canCreateCreep(bodyPicker('sharvester')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('sharvester'), undefined, {role:'sharvester2', flag:'Harvest1' });
                    console.log('Spawning new sharvester2 in Spawn1: ' + newName);
                }

        }
        if(harvesters.length > 0 && haulers.length > 0 && (haulers[0].ticksToLive > 300 || haulers.length > 1)){
			if(defenders.length < 0 && (haulers.length > 0) && (sharvester.length > 0) && (harvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('defender'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('defender'), undefined, {role:'defender', job:'defender', home:'Spawn1'});
				console.log('Spawning new Defender at Spawn1: ' + newName);
			}
			if(defenders.length < 1 && (haulers.length > 0) && (sharvester.length > 0) && (harvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('guard'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('guard'), undefined, {role:'defender', job:'guard', home:'Spawn1', loc: 'Claim'});
				console.log('Spawning new Defender at Spawn1: ' + newName);
			}




			if(defenders2.length < 1 && (haulers.length > 0) && (sharvester.length > 0) && (harvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('guard'))) == 0){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('guard'), undefined, {role:'defender2', job:'guard', home: room1.toString(), loc: 'Remote_Room'});
				console.log('Spawning new Defender2 at Spawn1: ' + newName);
			}
            if((upgraders.length < 2) && (spawn1.canCreateCreep(bodyPicker('upgrader')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('upgrader'), undefined, {role:'upgrader'});
                console.log('Spawning new upgrader at Spawn1: ' + newName);
            }
			if((haulers3.length < 0)  && (spawn1.canCreateCreep(bodyPicker('hauler_min')) == 0)){
				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('hauler_min'), undefined, {role:'hauler3', job: 'terminal'});
				console.log('Spawning new Terminal hauler in Spawn1: ' + newName);
			}

            if(builders.length < 1 && upgraders.length > 0 && (spawn1.canCreateCreep(bodyPicker('builder')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('builder'), undefined, {role:'builder'});
                console.log('Spawning new builder at Spawn1: ' + newName);
            }
            if(repairers.length < 1 && upgraders.length >= 1 && (spawn1.canCreateCreep(bodyPicker('repair')) == 0)){
                var newNamme = Game.spawns['Spawn1'].createCreep(bodyPicker('repair'), undefined, {role:'repair'});
                console.log('Spawning new repairer: ' + newNamme);
            }

            if((towerHaulers.length < 1) && (upgraders.length >= 1 && repairers.length >= 1) && (spawn1.canCreateCreep(bodyPicker('towerHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('towerHauler'), undefined, {role:'towerHauler'});
                console.log('Spawning new Tower Hauler: ' + newName);
            }
            if((claimers.length < 0) && (upgraders.length >= 1 && repairers.length >= 1) && (spawn1.canCreateCreep(bodyPicker('claimer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('claimer'), undefined, {role:'claimer'});
                console.log('Spawning new claimer: ' + newName);
            }
			//Source ID shoudl be in memory. Not hardcoded.
            if((remotes.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), undefined, {role: 'remote', sourceID:'5982fc2eb097071b4adbcf80', canID: 0});
                console.log('Spawning new remoteHarvester: ' + newName);
            }
            if((remotes2.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), undefined, {role: 'remote2', sourceID:'5982fc17b097071b4adbcccc', canID: 0});
                console.log('Spawning new remoteHarvester2 from Spawn1: ' + newName);
            }
            if((remotes3.length < 1) && (spawn1.canCreateCreep(bodyPicker('remote')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remote'), undefined, {role: 'remote3', sourceID:'5982fc17b097071b4adbcccd', canID: 1});
                console.log('Spawning new remoteHarvester3 from Spawn1: ' + newName);
            }
            if((remoteHaulers.length < 1) && (spawn1.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteHauler'), undefined, {role: 'remoteHauler', hauling: '', loc: 'Remote', homeID:'Main'});
                console.log('Spawning new remote hauler from Spawn1: ' + newName);
            }
            if((remoteHaulers2.length < 2) && (spawn1.canCreateCreep(bodyPicker('remoteHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteHauler'), undefined, {role: 'remoteHauler2', hauling: '', loc:'Remote2', homeID:'Main'});
                console.log('Spawning new remote hauler from Spawn1: ' + newName);
            }

            //need to change code to  use memory loc to determine where to go. Not hardcode it.
            if((remoteRepairers.length < 1) && (spawn1.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteRepairer'), undefined, {role: 'remoteRepairer', loc: 'Remote'});
                console.log('Spawning new remoteRepairer: ' + newName);
            }
            if((remoteRepairers2.length < 1) && (spawn1.canCreateCreep(bodyPicker('remoteRepairer')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('remoteRepairer'), undefined, {role: 'remoteRepairer2', loc: 'Remote2'});
                console.log('Spawning new remote Repairer 2 at Spawn1: ' + newName);
            }

            if((linkHaulers.length < 2) && (linkHaulers[0] == undefined || linkHaulers[0].memory.roomID != 1)  && (sharvester.length > 0) && (spawn1.canCreateCreep(bodyPicker('linkHauler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('linkHauler'), undefined, {role:'linkHauler', roomID: 0});
                console.log('Spawning new Link Hauler at Spawn1: ' + newName);
            }


            //Helpful dismantler.
            if(roleDismantlers.length < 0 && (spawn1.canCreateCreep(bodyPicker('helpful_dismantler')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('helpful_dismantler'), undefined, {role: 'dismantler', loc:'Claim', job:'helper', jobID: 1 });
                console.log('Spawning new Dismantler at Spawn1: ' + newName);
            }
            if((minerals.length < 1) && (spawn1.canCreateCreep(bodyPicker('mineral')) == 0)){
                var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('mineral'), undefined, {role: 'mineral', job: 'normal', home: room1.toString()});
                console.log('Spawning new Mineral Extractor at Spawn1: ' + newName);
            }


            if(army){
                if((healers.length < 4) && (spawn1.canCreateCreep(bodyPicker('healer_big')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('healer_big'), undefined, {role: 'healer'});
                    console.log('Spawning new Healer at Spawn1: ' + newName);
                }

                //Mean dismantler
                if(roleDismantlers.length < 0 && (spawn1.canCreateCreep(bodyPicker('dismantler')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('dismantler'), undefined, {role: 'dismantler', loc: 'Attacks', job:'destroy', jobID: 0});
                    console.log('Spawning new Dismantler at Spawn1: ' + newName);
                }
                // cheaper but not as cost efficient? [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL]
                /*if((attackers.length < 6) && (spawn1.canCreateCreep(bodyPicker('attacker')) == 0)){
                    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('attacker'), undefined, {role:'attacker'});
                    console.log('Spawning new attacker at Spawn1: ' + newName);
                }*/

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
            sharvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce33'));
        }
        if(creep.memory.role == 'sharvester2'){
            sharvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce34'));
        }
        if(creep.memory.role == 'sharvesterR2'){
            sharvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce38'));
        }
        if(creep.memory.role == 'sharvesterR2_1'){
            sharvester.run(creep, creep.memory.flag, Game.getObjectById('5982fc22b097071b4adbce37'));
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
        if(creep.memory.role == 'hauler3'){
            hauler.run(creep, linkA);
        }
		if(creep.memory.role == 'hauler'){
            hauler.run(creep, linkA);
        }
         if(creep.memory.role == 'hauler2'){
            hauler.run(creep, linkB);
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
            remoteHauler.run(creep, creep.memory.loc, creep.memory.homeID);
        }
        if(creep.memory.role == 'remoteHauler2'){
            remoteHauler.run(creep, creep.memory.loc, creep.memory.homeID);
        }
		if(creep.memory.role == 'remoteHauler3'){
            remoteHauler.run(creep, creep.memory.loc, creep.memory.homeID);
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
            mineral.run(creep);
        }
		if(creep.memory.role == 'mineral2'){
            mineral.run(creep);
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
        roleTower.run(towers[name]);
    }

    for(var name in towers2){
        roleTower.run(towers2[name]);
    }

    links.run(linkA);
    links.run(linkB);

});
}
