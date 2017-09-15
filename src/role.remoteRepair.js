var roleRemoteRepair = {

    run: function(creep, loc){

        //const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => { return(structure.structureType == STRUCTURE_WALL) && structure.hits < structure.hitsMax;}});

         //Game.creeps.Nathaniel.moveTo(13, 37)
        
        var can = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER);}});
        const repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(structure){
                    return ((structure.structureType == STRUCTURE_CONTAINER && structure.hits < 200000) || (structure.structureType == STRUCTURE_ROAD && structure.hits < 3000))
                }});
     //   const repairCans = creep.room.find(FIND_STRUCTURES, {filter: function(s){return s.structureType == STRUCTURE_CONTAINER && s.hits < 200000;}});
                
              // console.log(repairCans);
       // console.log(can);
        var fixit = Game.getObjectById('59bad1ae93782b607a184fd4');
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
          
        if(loc == Game.flags['Remote'].pos){
            if (creep.room != Game.flags["Remote"].room){
                creep.moveTo(Game.flags["Remote"]);
                return;
            }
        }
        else if(loc == Game.flags['Remote2'].pos){
            if (creep.room != Game.flags["Remote2"].room){
                creep.moveTo(Game.flags["Remote2"]);
                return; 
            }
        }
        
        if((creep.room == Game.flags["Remote"].room || creep.room == Game.flags['Remote2'].room) && creep.carry.energy < creep.carryCapacity && !creep.memory.building){
            const targetx = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => { return r.resourceType == RESOURCE_ENERGY; }});
           // creep.say('hip');
            if(targetx.length > 0) {
                if(creep.pickup(targetx[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetx[0], {reusePath: 50});
                    }
            
            }
            else if(can.length > 0 && can[0].store[RESOURCE_ENERGY] >= creep.carryCapacity){
                if(creep.withdraw(can[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(can[0], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
                    }
            }
            if(can.length > 1 && can[1].store[RESOURCE_ENERGY] >= creep.carryCapacity && creep.withdraw(can[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(can[1], {reusePath: 10}, {visualizePathStyle: {stroke: "#00aaFF"}});
            }
                
            
        }
        
        
        

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            
            
            
            
            /*
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            } */
           /*if(fixit){
                if(creep.repair(fixit) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(fixit);
                }
            }
            else*/ if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                if(repairTargets.length > 0) {
                    creep.say('Oh dear me');
                    if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairTargets[0]);
                        return;
                        
                    }
                }
               /* if(repairCans){
                    creep.say('Can time!')
                    let lowest = _.min(repairCans, 'hits');
                //  console.log(repairCans[0]);
                    if(creep.repair(repairCans[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(repairCans[0]);
                    }
                } */
            }
        }
               //console.log(creep.room.controller.sign;
               if(creep.room.controller.sign == undefined){
                    creep.say('hi');
                    if(creep.room.controller) {
                        if(creep.signController(creep.room.controller, "[Unity Alliance] Territory") == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                }
        }

            /*if(containers.length > 0 && creep.carry.energy > 0){
                //console.log(containers[0].store);
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke:"red"}});
                }
            }
            else { 
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            //} */
        
        

        
    
};

module.exports = roleRemoteRepair;


