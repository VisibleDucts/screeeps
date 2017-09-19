var modeOffensive = true;
var destroySpawn =  false;
var destroyStructure = true;

var dismantler = {
    run: function(creep, loc, job){
        // Game.creeps.Parker.moveTo(Game.spawns['Spawn1']);
        // Game.spawns['Spawn1'].recycleCreep(creep);
        var hired;
        switch(job.toString()){
            case 'helper': hired = 0; break;
            case 'destroy': hired = 1; break;
            default: /*console.log('Wheres the job?! Now what do I do??');*/ hired = 3;
        }
      // console.log(hired);
      creep.moveTo(Game.flags[loc].pos);
        if (modeOffensive){
            if (Game.flags[loc] == undefined){
                console.log('No ' + loc + ' Flag Found?');
                return;
            }
            else{
                //console.log(creep.room.toString() + ' ' + Game.flags[loc].room.toString());

                if (creep.room != Game.flags[loc].room) {
                    //creep.say('d');
                    creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }
        /*if(creep.carry.energy > 0){

             if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
            }*/

        if(hired == 3){
            return;
        }
        if(hired == 0){
            //creep.say('Helping!');
            let target = Game.getObjectById('59b72ddc626b947ea454bfdb');
            if (target == null) return;
            if(creep.dismantle(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }

        }
        else if(hired == 1){
            //creep.say('DESTROY!');
            if(destroyStructure){
                 let targetx= undefined; // Game.getObjectById('59b40db26149815ad0de3e10'); //Rampart of soonk.
                if (targetx == undefined) return;
                    if(creep.dismantle(target) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                }
            }

            if (destroySpawn){
                let target = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
                if (target == undefined) return;
                if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }


    }
};
module.exports = dismantler;
