
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
con·sole
A panel or unit accommodating a set of controls for electronic or mechanical equipment.
More »
