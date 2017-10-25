var util = require('util');
var bodyPicker = require('bodyPicker');

var transfer = {

    spawn: function(spawner,body_name,creepTime, job, goal,resource_fill,resource_remove,labs_fill,labs_remove, homeID) {
        return spawner.createCreep(
            bodyPicker(body_name),
            `${'transfer'}-${creepTime}`,
            {
                role: 'haulerT',
                job: job,
                goal: goal,
                resource_fill: resource_fill,
                resource_remove: resource_remove,
                labs_fill: labs_fill;
                labs_remove: labs_remove;
                homeID: homeID,
            }
        );
    },

    run: function(creep){


        var total = _.sum(creep.carry);

        if(creep.ticksToLive < 70){
            if(total > 0){
                for(const resourceType in creep.carry) {
                    if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.storage);
                        return;
                    }
                }
            }
            else if(total == 0){
                console.log("'NOOO MY BRAIN' said Mr. " + creep.name);
                creep.memory.role = 'Zombie';
            }
        }
        else{
            let labs = creep.room.find(FIND_MY_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_LAB}});
            let resource_fill = creep.memory.resource_fill;
            let resource_remove = creep.memory.resource_remove;
            let terminal = creep.room.terminal;
            let storage = creep.room.storage;
            let labs_fill = creep.memory.labs_fill;
            let labs_remove = creep.memory.labs_remove;


            resource_remove and resource_fill as arrays?

            //removing resource from a lab
            labs[num] = lab with a resource_remove in it. '5' labs. '5' possible removes and fills.
            /**** WORDS OF MNUCK *******/
            1. to assemble your minerals object.
            2. is to iterate across your labs and find one with a mineralType youre interested in.
            3. is to go empty that lab. once the lab is empty, its mineralType will become undefined. which wont match any of your minerals
            //if(lab.mineralType in minerals)

            

            labs = room.find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_LAB && s.mineralType in minerals});
            if (labs.length === 0) {
              return;
            }
            if (creep.pos.isNearTo(labs[0]) {
              creep.moveTo(labs[0]);
              return;
            }
            creep.withdraw(labs[0], labs[0].mineralType);

            // ^^ much nicer ^^ //
            for(var i in resource_remove){
                for(var j in labs){
                    if(labs[j].mineralType === resource_remove[i]){
                        if(labs[j].mineralAmount > 0){
                            if(creep.withdraw(labs[j]) === ERR_NOT_IN_RANGE){
                                creep.moveTo(labs[j], {visualizePathStyle: {stroke: 'blue'}});
                                return;
                            }
                        }
                    }
                }
            }


            if(labs[0].mineralAmount > 0 && labs[0].mineralType !== mineral0){
                let mineral_remove = labs[0].mineralType;
                if(creep.withdraw(labs[0], mineral_remove) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs[0]);
                }
            }
            else if(labs[0].mineralAmount < labs[0].mineralCapacity){
                if(total < creep.carryCapacity){
                    if(storages !== undefined && mineral0 in storages.store){
                        if(creep.withdraw(storages, mineral0) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                        }
                    }
                    else if(term !== undefined && mineral0 in term.store){
                        if(creep.withdraw(term, mineral0) == ERR_NOT_IN_RANGE){
                            creep.moveTo(term);
                        }
                    }
                }
            }

            if(labs[i].mineralAmount > 0 && labs[i].mineralType !== mineral+i ){
                let mineral_remove = labs[i].mineralType;
                if(creep.withdraw(labs[i], mineral_remove) == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs[i]);
                }
            }
            else if(labs[i].mineralAmount < labs[i].mineralCapacity){
                if(total < creep.carryCapacity){
                    if(storages !== undefined && mineral+i in storages.store){
                        if(creep.withdraw(storages, mineral+i) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages);
                        }
                    }
                    else if(term !== undefined && mineral+i in term.store){
                        if(creep.withdraw(term, mineral+i) == ERR_NOT_IN_RANGE){
                            creep.moveTo(term);
                        }
                    }
                }
            }


            if(labs[num].mineralAmount > 0 && labs[num].mineralType === resource_remove[num]){
                if(creep.withdraw(labs[num]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(labs[num], {visualizePathStyle: {stroke: 'blue'}});
                    return;
                }
            }

            if(labs[num].mineralAmount < labs[num].mineralCapacity && (labs[num].mineralType === null || labs[num].mineralType === resource_fill[num])){
                    if(!creep.carry[resource_fill[num]]){

                        if(resource_fill[num] in storage.store && total < creep.carryCapacity){
                            if(creep.withdraw(storage, resource_fill[num]) === ERR_NOT_IN_RANGE){
                                creep.moveTo(storage, {visualizePathStyle: {stroke: 'purple'}});
                                return;
                            }
                        }
                        if(resource_fill[num] in terminal.store && total < creep.carryCapacity){
                            if(creep.withdraw(terminal, resource_fill[num]) === ERR_NOT_IN_RANGE){
                                creep.moveTo(terminal, {visualizePathStyle: {stroke: 'purple'}});
                                return;
                            }
                        }
                    }
                if(creep.carry[resource_fill[num]] > 0){
                    if(creep.transfer(labs[num], resource_fill[num]) === ERR_NOT_IN_RANGE){
                        creep.moveTo(labs[num],{visualizePathStyle: {stroke: 'blue'}});
                        return;
                    }
                }
            }
            else if(labs[num].mineralAmount === labs[num].mineralCapacity && creep.carry[resource_fill[num]] > 0){
                if(terminal.store < terminal.storeCapacity){
                    if(creep.transfer(terminal, reosurce_fill[num]) === ERR_NOT_IN_RANGE){
                        creep.moveTo(terminal);
                        return;
                    }
                }
            }



        }


    }

};

module.exports = transfer;




   //                           HNADY COPY PASTE RESOURCESSSS
   //       RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE
   //       RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE
   //       RESOURCE_CATALYZED_GHODIUM_ALKALIDE
   //       RESOURCE_HYDROGEN
   //       RESOURCE_KEANIUM




        //withdrawing lab 0. EIther or!
      /*  let labs0_mineral = labs_[0].mineralType;
        if(labs_[0].mineralAmount > 0){
            if(creep.withdraw(labs_[0], labs_0_mineral) == ERR_NOT_IN_RANGE){
                creep.moveTo(labs_[0]);
            }
        }*/
        if(labs_[1].mineralAmount > 0){ //< labs_[3].mineralCapacity){
            if(creep.withdraw(labs_[1], 'OH') == ERR_NOT_IN_RANGE){
                creep.moveTo(labs_[1]);
            }
            //return;
        }

       // Filling lab 0

        if(labs_[3].mineralAmount < labs_[3].mineralCapacity){
            if(creep.withdraw(term, 'H') == ERR_NOT_IN_RANGE){
                creep.moveTo(term);
            }
        }
        if(labs_[4].mineralAmount < labs_[4].mineralCapacity){
            if(RESOURCE_OXYGEN in term.store){
                if(creep.withdraw(term, 'O') == ERR_NOT_IN_RANGE){
                    creep.moveTo(term);
                }
            }
            if(RESOURCE_OXYGEN in storages.store){
                if(creep.withdraw(storages, 'O') == ERR_NOT_IN_RANGE){
                    creep.moveTo(storages);
                }
            }
        }


        //withdraw lab 1
        /*let labs_1_mineral = labs_[2].mineralType;

        if(labs_[2].mineralAmount > 0){
            if(creep.withdraw(labs_[2], labs_1_mineral) == ERR_NOT_IN_RANGE){
                creep.moveTo(labs_[2]);
            }
        }
        */
        if(creep.carry.energy > 0){ // creep.carryCapacity){
            if(creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(storages);
            }
        }
        //filling term
        var transferM = 'OH';

        if(creep.carry[transferM] > 0 && labs_[5].mineralAmount < labs_[5].mineralCapacity){
            if(creep.transfer(labs_[5], transferM) == ERR_NOT_IN_RANGE){
                creep.moveTo(labs_[5]);
            }
        }

        //filling labs_[0]

        if(/*labs_[0].mineralAmount == labs_[0].mineralCapacity && creep.carry['KH'] > 0 || creep.carry['LH'] > 0 || */ creep.carry['OH'] > 0 /*|| creep.carry['H'] > 0*/){ //if(labs_ && labs_[4].mineralAmount == labs_[3].mineralCapacity){
            /
            if(creep.transfer(term, 'OH') == ERR_NOT_IN_RANGE){
                creep.moveTo(term);
            }
            if(creep.transfer(term, 'L') == ERR_NOT_IN_RANGE){
                creep.moveTo(term);
            }

        }

       if(creep.carry['H'] > 0){ // creep.carryCapacity){
            if(labs_ && labs_[3].mineralAmount < labs_[3].mineralCapacity){
                if(creep.transfer(labs_[3], 'H') == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_[3]);
                    return;
                }
            }
            else if(labs_[3].mineralAmount == labs_[3].mineralCapacity && creep.carry['H'] > 0){ //if(labs_ && labs_[4].mineralAmount == labs_[3].mineralCapacity){
                if(creep.transfer(term, 'H') == ERR_NOT_IN_RANGE){
                    creep.moveTo(term);
                    //return;
                }

           }
        }

        if(creep.carry['O'] > 0){ // creep.carryCapacity){
            if(labs_ && labs_[4].mineralAmount < labs_[0].mineralCapacity){
                if(creep.transfer(labs_[4], 'O') == ERR_NOT_IN_RANGE){
                    creep.moveTo(labs_[4]);
                    //return;
                }
            }
            else if(labs_[4].mineralAmount == labs_[4].mineralCapacity && creep.carry['O'] > 0){ //if(labs_ && labs_[4].mineralAmount == labs_[3].mineralCapacity){
                if(creep.transfer(term, 'O') == ERR_NOT_IN_RANGE){
                    creep.moveTo(term);
                    //return;
                }

            }
        }
    }
}
