// for(var upgradr of upgraders){

      // console.log(i)

     //  console.log(upgraders[i].memory.job)
   //}


   /*tryRenew: function(spawn) {
	   	if(spawn.spawning || spawn.room.energyAvailable < 300) {
		   	return;
	   	}
	   	const needsRenewFilter = function(creep) {
		   	if(!(creep.ticksToLive < 1400)) {
			   	return false;
		   	}
		   	if(creep.getActiveBodyparts(CLAIM)) {
			   	return false;
		   	}
		   	const boostedParts = _.filter(<Array<any>>creep.body, x => x.boost)
		   	if(boostedParts.length) {
			   	return false;
		   	}
		   	return true;
	   	}
	   	var adj = spawn.pos.findInRange(FIND_MY_CREEPS, 1, {filter: needsRenewFilter});
	   	if(adj.length > 0) {
		   	var creep = adj[0];
		   	// console.log("Repairing creep: ", creep.name, creep.ticksToLive);
		   	if(spawn.renewCreep(creep) == 0) {
			   	Memory.building[spawn.name] = true;
		   	}
	   	}
   	}*/



//Mnucks wall/rampart upgrade code
if (Game.time % 1000 == 0 &&
        Game.rooms.W37S37.storage &&
        Game.rooms.W37S37.storage.store.energy > 20000) {
        Memory.rooms.W37S37.wallSize += 1000;
        Memory.rooms.W37S37.rampartSize += 1000;
    }
/************** part 2 *******/
var walls = t.room.find(
                FIND_STRUCTURES,
                {
                    filter: s=> { return s.structureType == STRUCTURE_WALL &&
                                         s.hits < Memory.rooms[t.room.name].wallSize; }
                }
            );
            if (walls.length > 0) {
                let target = _.min(walls, w => w.hits);
                t.repair(target);
                return;
            }
///////////////////////////////////////////////////////////////////////////////////////////////



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




var listOfRoles = ['harvester', 'harvester2', 'dismantler', 'claimer', 'upgrader', 'upgrader2', 'builder','builder2' 'remote', 'remote2', 'remote3', 'remote4','remoteHauler', 'remoteHauler2','remoteHauler3','remoteRepairer', 'remoteRepairer2', 'remoteRepairer3',
'towerhauler','towerHauler2','repair','repair2'];
//let room = this.room;
let creepsInRoom = Game.room.find(FIND_MY_CREEPS);
let numberOfCreeps = {};
    for (let role of listOfRoles) {
        numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
    }


//complexQuanta
    Memory.sources = []
    for(var roomName in Memory.roomToSpawn) {
        var room = Game.rooms[roomName]
        if(!room) {
            console.log("No visibility to room: ", roomName)
            continue
        }
        var sources: Array<Source | Structure> = room.find(FIND_SOURCES)
        sources = sources.concat(room.find(FIND_STRUCTURES, {filter: x =>  x.structureType == STRUCTURE_EXTRACTOR}))
        for(let i in sources) {
            var src: Source | Structure | Mineral = sources[i]
            if(src instanceof StructureExtractor) {
                if((<Structure>src).isActive && !(<Structure>src).isActive()) {
                    continue
                }
                src = src.pos.lookFor(LOOK_MINERALS)[0]
                if(src.ticksToRegeneration) {
                    continue
                }
            }
            var controllerRoom = Game.spawns[Memory.roomToSpawn[roomName]].room
            var controllerPos = controllerRoom.controller.pos
            var path = PathFinder.search(controllerPos, {pos: sources[i].pos, range: 1}, {maxOps: 4000})
            var whereToStand = path.path[path.path.length - 1]
            if(whereToStand.roomName in Game.rooms) {
                var containers = _.filter(whereToStand.lookFor(LOOK_STRUCTURES), (x: Structure) => x.structureType == STRUCTURE_CONTAINER) as Container[]
                if(containers.length)
                    var containerId = containers[0].id
                var standy = new RoomPosition(whereToStand.x, whereToStand.y, whereToStand.roomName)
                if(standy.isNearTo(Game.rooms[whereToStand.roomName].controller)) {
                    var stand2 = new RoomPosition(whereToStand.x, whereToStand.y - 1, whereToStand.roomName)
                    if(stand2.isNearTo(src.pos) && !stand2.isNearTo(Game.rooms[whereToStand.roomName].controller)) {
                        whereToStand.y = whereToStand.y - 1
                    }
                }
            }
            Memory.sources.push({room: roomName, x: src.pos.x, y: src.pos.y, standX: whereToStand.x, standY: whereToStand.y, id: src.id, containerId: containerId})
        }

    }



    //old Hauler code



    var hauler = {

        run: function(creep, links, job){

           /// Game.creeps.Cole.moveTo(Game.flags['Main'].pos);
            var storages = creep.room.storage;
            var can = creep.room.find(FIND_STRUCTURES, { filter: function(s){ return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => {
                        return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity;
                    }
            }); // extensions and spawn
            var sources = creep.room.find(FIND_SOURCES_ACTIVE); // energy sources
            const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
            var tower = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_TOWER; }});
            var labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB && l.energy < l.energyCapacity; }});
            var term = creep.room.terminal;
            //Game.creeps.Nicholas.moveTo(new RoomPosition(25, 20, 'W43S27'));


            if(creep.memory.hauling && creep.carry.energy == 0) {
                creep.memory.hauling = false;
                creep.say('🔄 Retrieving');


            }
            if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
                creep.memory.hauling = true;
                creep.say('Hauling');
            }
            if(job == 'links[0]'){
                if(term && term.store[RESOURCE_ENERGY] <= 1000 && term.store[RESOURCE_LEMERGIUM] <= 500){
                    var total = _.sum(creep.carry);
                    if(total < creep.carryCapacity){
                        if(term.store[RESOURCE_LEMERGIUM] <= 500){
                            if(storages){
                                if(RESOURCE_LEMERGIUM in storages){
                                    if(creep.withdraw(storages, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                                        creep.moveTo(storages);
                                        return;
                                    }
                                }
                            }
                        }
                        if(term.store[RESOURCE_ENERGY] <= 1000){
                            if(storages){
                                if(RESOURCE_ENERGY in storages){
                                    if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                        creep.moveTo(storages);
                                        return;
                                    }
                                }
                            }
                        }

                    }
                }

                if(total == creep.carryCapacity){
                    if(term){
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(term, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(term);
                                return;
                            }
                        }
                    }
                }

                if(links){
                    if(creep.carry.energy < creep.carryCapacity){
                        if(creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(links[0]);
                            return;
                        }
                    }
                    if(creep.carry.energy == creep.carryCapacity){
                        if(labs){
                            if(creep.transfer(labs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(labs[0]);
                                return;
                            }
                        }
                        if(storages){
                            if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(storages);
                                return;
                            }
                        }
                    }
                }

            if(!creep.memory.hauling && job == 'normal'){


                if((creep.carry.energy < creep.carryCapacity) && (creep.room.energyAvailable <= creep.room.energyCapacityAvailable)) {

                   // if(can.length > 0 && can[0].store[RESOURCE_ENERGY] > 0){  <---why was this here?????
                    /*if(creep.memory.role != 'hauler2'){
                        if(links.length > 0){

                            if(links[0] != undefined && links[0].energy){
                                if(creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(links[0], {reusePath: 10});
                                     return;
                                }
                            }
                        }
                    }*/
                   // }
                    if(targetx.length > 0) {
                        if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetx[0], {reusePath: 10});
                             return;
                    }

                    }
                    if(can.length > 0 && (can[0].store[RESOURCE_ENERGY] >= creep.carryCapacity) && creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                        return;
                    }
                    if(can.length > 1  && (can[1].store[RESOURCE_ENERGY] >= creep.carryCapacity) && creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[1], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                        return;
                    }

                    else if(storages.store[RESOURCE_ENERGY] > 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                        if(creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke:"red"}});
                             return;
                        }
                    }
                }
            }

            if(creep.memory.hauling) {
                if(creep.carry.energy > 0) {



                    if((targets.length > 0) && (creep.room.energyAvailable < creep.room.energyCapacityAvailable)) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                            return;
                        }
                    }
                    else if(tower.legnth > 0 && (tower[0].energy < 600) && creep.transfer(tower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(tower[0],{reusePath: 10}, {visualizePathStyle: {stroke: '#000000'}});
                        return;
                    }
                    else if(tower.length > 1 && (tower.length > 1) && (tower[0].energy < 600) && (creep.transfer(tower[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)){
                        creep.moveTo(tower[1],{reusePath: 10}, {visualizePathStyle: {stroke: '#000000'}});
                        return;
                    }

                    if(creep.room.energyAvailable == creep.room.energyCapacityAvailable){
                        if(storages == undefined) return;
                        if(creep.pos != storages.pos){
                            creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                             creep.say('hid');
                             for(const resourceType in creep.carry) {
                                creep.transfer(storages, resourceType);
                            }
                        }



                       // }


                        /*
                        if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages,{reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                        }*/
                    }
                    //}
                }
            }
        }
    };

    module.exports = hauler;
