const util = require('util');
var remoteRepair = {

    run: function(creep){
        const goal = creep.memory.goal;
        if(goal === null) return;

        //util.beware(creep);
        let threat = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                 && (p.owner.username != 'mnuck')
                 && (p.owner.username != 'LordPong')
                 && (p.owner.username != 'complexQuanta')
                 && (p.owner.username != 'Augl')
                 && (p.owner.username != 'mightyleguan')
                 && (p.owner.username != 'pragmascript')
                 && (p.owner.username != 'Jestersheepy')
                 && (p.owner.username != 'Shadowwulf');
             }
         });
        if (threat && creep.pos.getRangeTo(threat) < 5) {
            let result = PathFinder.search(creep.pos, {pos:threat.pos, range:5}, {flee: true});
            creep.moveByPath(result.path);
            return;
        }
        /*let roomThreat = creep.room.find(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                 && (p.owner.username != 'mnuck')
                 && (p.owner.username != 'LordPong')
                 && (p.owner.username != 'complexQuanta')
                 && (p.owner.username != 'Augl')
                 && (p.owner.username != 'mightyleguan')
                 && (p.owner.username != 'pragmascript')
                 && (p.owner.username != 'Jestersheepy')
                 && (p.owner.username != 'Shadowwulf');
             }
         });
        if(roomThreat.length){
            //spawn defender!
        }
        //if(){}
        //Game.creeps.Nathaniel.moveTo(13, 37)

       /* if(goal == 'Remote2'){
            if(creep.hits < creep.hitsMax){
               //  Memory.alerts.warOff = true;
            }
        }*/

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


        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }


        if((creep.room == Game.flags[goal].room) && creep.carry.energy < creep.carryCapacity && !creep.memory.building){
            const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
            var can = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return (s.structureType == STRUCTURE_CONTAINER);}});

            if(targetx.length > 0) {
                if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetx[0], {reusePath: 10});
                    return;
                }
            }
            else if(can.length > 0 && can[0].store[RESOURCE_ENERGY] >= creep.carryCapacity){
                if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(can[0], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    return;
                }
            }
            if(can.length > 1 && can[1].store[RESOURCE_ENERGY] >= creep.carryCapacity && creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(can[1], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
            }
            //if(!can.length && !targetx.length){
                let source = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source, {visualizePathStyle: {stroke: "blue"}});
                    return;
                }
            //}
        }


        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            var repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                    return (s.structureType === STRUCTURE_ROAD && s.hits < 3500)
                            || (s.structureType === STRUCTURE_CONTAINER && s.hits < 200000)
                    }});

            //const repairCans = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return ;}});
           /* var minTar = _.min(repairTargets, 'hits');

            if(repairTargets.length){
                if(creep.repair(minTar) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(minTar);
                    return;
                }
            }*/
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return;
                }
            }
            else if(repairTargets.length){
                //creep.say('Oh dear me');
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0]);
                    return;
                }
            }
        }


        if(creep.room.controller != undefined){

            if(creep.room.controller.sign == undefined || creep.room.controller.sign.text != "[Former Ecorp Territory] f**k society. Do not claim."){
                if(creep.room.controller) {
                    if(creep.signController(creep.room.controller, "[Former Ecorp Territory] f**k society. Do not claim.") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                        return;
                    }
                }
            }
        }
    }

};

module.exports = remoteRepair;
