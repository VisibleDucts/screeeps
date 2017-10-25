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
var sk = require('role.sk');
var carrier = require('hauler.carrier');

//A switch maybe?
var army = false;

var roomW43S27 = {


    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.homeID === 1);
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender' && creep.memory.homeID === 1);
    var defenders2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender2' && creep.memory.homeID === 1);
    var defenders3 = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender3' && creep.memory.homeID === 1);
    var defenders4 = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender4' && creep.memory.homeID === 1);
    var defenders5 = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender5' && creep.memory.homeID === 1);


    var backups = _.filter(Game.creeps, (creep) => creep.memory.role === 'backup' && creep.memory.homeID === 1);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.homeID === 1);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.homeID === 1);
    var sharvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'sharvester' && creep.memory.homeID === 1);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repair' && creep.memory.homeID === 1);
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler' && creep.memory.homeID === 1);
    //NOTE: Transfer hauler....
    var haulersT = _.filter(Game.creeps, (creep) => creep.memory.role === 'haulerT' && creep.memory.homeID === 1);
    //NOTE: job 'links[0]'
    var haulers3 = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler3' && creep.memory.homeID === 1);
    //NOTE: carrier.
    var haulersC = _.filter(Game.creeps, (creep) => creep.memory.role === 'haulerC' && creep.memory.homeID === 1);
    var haulersG = _.filter(Game.creeps, (creep) => creep.memory.role === 'haulerG' && creep.memory.homeID === 1);
    var haulersG2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'haulerG2' && creep.memory.homeID === 1);
    var towerHaulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'towerHauler' creep.memory.homeID === 1);
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer' && creep.memory.homeID === 1);
    var claimers2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer2' && creep.memory.homeID === 1);
    var claimers3 = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer3' && creep.memory.homeID === 1);
    //TEMP: new rooms claiming and building
    var claimersR = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimerR' && creep.memory.homeID === 1);
    var buildersR = _.filter(Game.creeps, (creep) => creep.memory.role === 'builderR' && creep.memory.homeID === 1);

    var remotes = _.filter(Game.creeps, (creep) => creep.memory.role === 'remote' && creep.memory.homeID === 1);
    var remotes2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remote2' && creep.memory.homeID === 1);
    var remotes3 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remote3' && creep.memory.homeID === 1);
    var remotes6 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remote6' && creep.memory.homeID === 1);

    var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHauler' && creep.memory.homeID === 1);
    var remoteHaulers2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHauler2' && creep.memory.homeID === 1);
    var remoteHaulers3 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHauler3' && creep.memory.homeID === 1);
    var remoteHaulers4 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHauler4' && creep.memory.homeID === 1);
    var remoteHaulers5 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHauler5' && creep.memory.homeID === 1);

    var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteRepairer' && creep.memory.homeID === 1);
    var remoteRepairers2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteRepairer2' && creep.memory.homeID === 1);
    var remoteRepairers3 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteRepairer3' && creep.memory.homeID === 1);
    var remoteRepairers4 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteRepairer4' && creep.memory.homeID === 1);
    var remoteRepairers5 = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteRepairer5' && creep.memory.homeID === 1);

    var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role === 'dismantler' && creep.memory.homeID === 1);
    var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'linkHauler' && creep.memory.homeID === 1);
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role === 'healer' && creep.memory.homeID === 1);
    var minerals =_.filter(Game.creeps, (creep) => creep.memory.role === 'mineral' && creep.memory.homeID === 1);
    //NOTE: mineral remote
    var minerals3 =_.filter(Game.creeps, (creep) => creep.memory.role === 'mineral3' && creep.memory.homeID === 1);
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role === 'attacker' && creep.memory.homeID === 1);
    var sks = _.filter(Game.creeps, (creep) => creep.memory.role === 'sk' && creep.memory.homeID === 1);


    Memory.rooms.W43S27.creep.upgrader.shape = [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];
    Memory.rooms.W43S27.creep.upgrader.count = 1;
    Memory.rooms.W43S27.creep.haulerG.count = 0;


    var room = Game.rooms['W43S27'];

    if(Game.spawns(['Spawn1']) !== undefined){
        var spawn1 = Game.spawns(['Spawn1'])
    }
    if(Game.spawns(['Spawn3']) !== undefined){
        var spawn3 = Game.spawns(['Spawn3'])
    }
    if(Game.spawns(['Spawn8']) !== undefined){
        var spawn8 = Game.spawns(['Spawn8'])
    }



    if(army){
        if(healers.length < 1){

        }
        if(attackers.length < 1){

        }
        if(roleDismantlers.length < 0 ){

        }

    }

    if(room.energyAvailable < UNIT_COST(bodyPicker('hauler')) && sharvesters.length < 1 && sharvester2.length < 1 && haulers.length < 1){
        //NOTE: This is reboot harveester..
        if(harvesters.length < 1){

        }
    }
    //NOTE: normal. aka job: 'harvesting'
    if(harvesters.length < 0){

    }

    if((haulers.length < 2 || haulers[0].ticksToLive < 160) && haulers.length < 3) {

    }

    if(sharvesters.length < 2 && (sharvesters[0] === undefined || sharvesters[0].memory.job === 'Harvest1')){


    }
    if(sharvesters.length < 2 && (sharvesters[0] === undefined || sharvesters[0].memory.job === 'Harvest0')){

    }




    if(sharvesters.length > 0 && sharvester2.length > 0 && haulers.length > 0 && (haulers[0].ticksToLive > 300 || haulers.length > 2)){


    	if(upgraders.length < Memory.rooms.W43S27.creep.upgrader.count){

    	}

    	if(haulers3.length < 1){

    	}
    	if(haulersT.length < 0){

    	}
        //NOTE: Swtich to moreHauler version
    	if(towerHaulers.length < 1){

        }

    	if(builders.length < 0){

        }
        if(repairers.length < 1){

        }
        if(remotes.length < 1){

        }

    	if(remotes6.length < 1){

        }
        if(remoteHaulers.length < 1){

        }
    	if(((remoteHaulers5.length < 1 || remoteHaulers5[0].ticksToLive <= 200) && remoteHaulers5.length < 2)){

        }
    	if(backups.length < 0){

    	}
        if(remoteRepairers.length < 0){

        }

        if(linkHaulers.length < 1){

        }


        //NOTE: Helpful dismantler.
        if(roleDismantlers.length < 0){

        }
        if(minerals.length < 0){

        }

    	if(defenders.length < 0){

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

        if(spawn1 != undefined && !Game.spawns['Spawn1'].spawning){
            if(army){
                if((healers.length < 1) && (spawn1.canCreateCreep(bodyPicker('healer_tank_25move')) == 0)){
    				var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('healer_tank_25move'), `${'healer'}-${creepTime}`, {role: 'healer', goal:'Here', boost: true, mineral:'XLHO2',mineral2:'XGHO2',mineral3:null, homeID: 1});
    				console.log('Spawning new Healer at Spawn3: ' + newName);
    			}
            }

	}



};

module.exports = roomW43S27;
