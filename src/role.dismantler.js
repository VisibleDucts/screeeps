var modeOffensive = false;
var destroySpawn =  true;
var destroyStructure = false;

var dismantler = {
    run: function(creep){
        // Game.creeps.Parker.moveTo(Game.spawns['Spawn1']);
        // Game.spawns['Spawn1'].recycleCreep(creep);
        const goal = creep.memory.goal;
        const job = creep.memory.job;
        const boost = creep.memory.boost;
        const mineral = creep.memory.mineral;




        if(boost){
            const labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB }});
            let num;
            switch(mineral){
                case 'XZHO2': num = 0; break;   //  catalyzed zynthium alkalide  aka RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE (move/fatigue)
            //    case 'XLHO2': num = 1; break;   // catalyzed lemergium alkalide aka RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE (heal)
                case 'XZH2O': num = 1; break;   // catalyzed zynthium acid aka RESOURCE_CATALYZED_ZYNTHIUM_ACID  (dismantle effect)
                case 'XGHO2': num = 3 ; break;   // toughness
                default: console.log('What? Mineral blargh?');
            }
            if(creep.pos != labs[num].pos){
                creep.moveTo(labs[num]);
                return;
            }
            if(creep.pos == labs[num].pos){
                labs[num].boostCreep(creep);
                return;
            }

        }

        var hired;
        switch(job.toString()){
            case 'helper': hired = 0; break;
            case 'destroy': hired = 1; break;
            default: /*console.log('Wheres the job?! Now what do I do??');*/ hired = 3;
        }


    //  creep.moveTo(Game.flags[goal].pos);
        if (modeOffensive){
            if (Game.flags[goal] == undefined){
                console.log('No ' + goal + ' Flag Found?');
                return;
            }
            else{


                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
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

            //let target = Game.getObjectById('59b72ddc626b947ea454bfdb');
            if (target == null) return;
            if(creep.dismantle(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target, { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }

        }
        else if(hired == 1){

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
