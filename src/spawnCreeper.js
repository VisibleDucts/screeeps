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

if(defenders.length < 0 && (haulers.length > 0) && (sharvester.length > 0) && (harvesters.length > 0) && (upgraders.length > 0) && (spawn1.canCreateCreep(bodyPicker('defender'))) == 0){
    var newName = Game.spawns['Spawn1'].createCreep(bodyPicker('defender'), undefined, {role:'defender', job:'defender', home:'Spawn1'});
    console.log('Spawning new Defender at Spawn1: ' + newName);
}

var requirements = ((haulers.length > 0) && (sharvester.length > 0) && (harvesters.length > 0) && (upgraders.length > 0) && (spawn.canCreateCreep(bodyPicker(role)) == 0));


if(role_amount < x && requirements){
    var newName = Game.spawns[spawn].createCreep(bodyPicker(role), `${role}-${Game.time}`, {role:role, job: job, goal: goal, home: home});
    console.log('Spawning new ' + role + ' at ' + spawn + ': ' + newName);
}

module.exports = spawnCreep;


function spawnCreep(SA, role) {
    for(name in Game.spawns) {
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

for(const i in Game.spawns) {
    Game.spawns[i].createCreep(body);
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
