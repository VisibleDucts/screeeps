//Credit goes to complexQuanta for this code.

var getRecycled = {
    getRecycled: function(creep) {
        var sp
        if(creep.memory.roomGoal && (creep.memory.roomGoal in Memory.roomToSpawn)) {
            sp = Game.spawns[Memory.roomToSpawn[(creep.memory.roomGoal]];
        }
        else if(!creep.room || !(creep.room.name in Memory.roomToSpawn))
            sp = Game.spawns["Spawn4"]
        else {
            sp = Game.spawns[Memory.roomToSpawn[creep.room.name]]
        }
        if(!creep.pos.isNearTo(sp)) {
            creep.moveTo(sp)
        }
        else {
            sp.recycleCreep(creep)
        }
    }
}

module.exports = getRecycled;
