//PAV234's SPAWNING FUNCTION
var spawnCreep = {
    run: function(SA, role) {
    for(Spawn of Spawns) {
        if(Spawn.memory.spawned != true) {
            if(Spawn.canCreateCreep(SA) == OK) {
                var newName = Spawn.createCreep(SA, `${role}-${Game.time}`, {role: role, born: Spawn.room.name});
                Spawn.memory.spawned = true;
                console.log(Spawn.room.name + ' spawning ' + role);
                return newName
            }
        }
    }
}
};

module.exports = spawnCreep;

/*
function spawnCreep(SA, role) {
    for(Spawn of Spawns) {
        if(Spawn.memory.spawned != true) {
            if(Spawn.canCreateCreep(SA) == OK) {
                var newName = Spawn.createCreep(SA, `${role}-${Game.time}`, {role: role, born: Spawn.room.name});
                Spawn.memory.spawned = true;
                console.log(Spawn.room.name + ' spawning ' + role);
                return newName
            }
        }
    }
}
function spawnController() {
    Game.spawns.length;
    for (const i in Game.spawns) {
        let selectedSpawn = Game.spawns[i];
        spawnCreeps(selectedSpawn);
    }
}

function spawnCreeps(currentSpawn) {
let s = currentSpawn.memory.homeID;
let x = 1;
while (Game.flags[s + "Mine" + x] != undefined) {
  if (x == 1) {
    if (hasContainers) {
      if (_.filter(Game.creeps, (creep) => creep.memory.role == s + "M" + x).length < 1) {
        creepDemand(currentSpawn.name, s, bodyPicker(currentSpawn, "Miner"), "worker", s + "M" + x, "Miner", x);
        return;
        
        
          if(cap >= 2300) {
                body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            }
            else if(cap >= 1450){
                body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            }
            else if(cap >= 1200) {
                body = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
            }
            else if(cap >= 1000) {
                body = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
            }
            else if(cap >= 800) {
                body = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
            }
            else if(cap >= 600) {
                body = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
            }
            else if(cap >= 500) {
                body = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
            }
            else if(cap >= 400) {
                body = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]
            }
            
            */
        
        
        
        