var util = require('util');
var bodyPicker = require('bodyPicker');

var mineral = {

    spawn: function(spawner,body_name,creepTime, job, goal, homeID) {
        return spawner.createCreep(
            bodyPicker(body_name),
            `${'mineral'}-${creepTime}`,
            {
                role: 'mineral',
                job: job,   //string
                goal: goal,   //string
                homeID: homeID, //number
            }
        );
    },

    run: function(creep){
        const job = creep.memory.job;
        const goal = creep.memory.goal;
        //const home = creep.memory.home;


        const total = _.sum(creep.carry);
        if(job == 'normal'){
            var extractor = creep.room.find(FIND_MINERALS);
            const labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB && l.mineralAmount < l.mineralCapacity}});
            util.killYourself(creep);
            if(creep.room === Game.rooms['W43S27'] && creep.ticksToLive < 60){
                if(total > 0){
                    if(creep.room.terminal.store[RESOURCE_LEMERGIUM] < 100000  && creep.room.terminal.store < creep.room.terminal.storeCapacity){
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(creep.room.terminal, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(creep.room.terminal);
                                return;
                            }
                        }
                    }
                    else{
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(creep.room.storage);
                                return;
                            }
                        }
                    }
                }
                else if(total == 0){
                    console.log("'NOOO MY BRAIN' said Mr. " + creep.name);
                    creep.memory.role = 'Zombie';
                }

            }

            if(extractor){
              //  if(!Memory.stats.creep.mineral) Memory.stats.creep.mineral = {};
                if(creep.room !== Game.rooms['W43S28'] && total < creep.carryCapacity && extractor[0].mineralAmount > 0){
                    if(!creep.pos.isNearTo(extractor[0])){
                        creep.moveTo(extractor[0]);
                        return;
                    }
                    if(Game.time % 5 === 0){
                        creep.harvest(extractor[0]);
                        if(!creep.memory.start || creep.memory.start == 0) creep.memory.start = Game.time;
                        return;
                    }
                }
                else if(creep.room == Game.rooms['W43S28']){

                    if(Game.getObjectById('59dee0d4379f694de8ce08ec') != null){
                        var totes = _.sum(Game.getObjectById('59dee0d4379f694de8ce08ec').store);
                    }

                    if(totes < 2000){

                        if(creep.harvest(extractor[0]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(extractor[0], {visualizePathStyle: {stroke: 'red'}});
                            return;
                        }
                    }
                    if(total == creep.carryCapacity){
                        creep.drop('K');
                    }
                }
            }
            if(creep.room !== Game.rooms['W43S28'] && (total == creep.carryCapacity || (total > 0 && extractor[0].mineralAmount === 0))){

                if(creep.room.terminal !== undefined){
                    let term_store = _.sum(creep.room.terminal.store);
                    if(creep.room.terminal.store[RESOURCE_LEMERGIUM] < 100000  && term_store < creep.room.terminal.storeCapacity){
                        for(const resourceType in creep.carry) {
                            if(creep.transfer(creep.room.terminal, resourceType) == ERR_NOT_IN_RANGE){
                                creep.moveTo(creep.room.terminal);
                                return;
                            }
                        }
                    }
                }
                if(creep.room.storage !== undefined){
                    for(const resourceType in creep.carry) {
                        if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage);
                            return;
                        }
                    }
                }
                if(!creep.memory.finish || creep.memory.finish == 0) creep.memory.finish = Game.time;
                let timeTaken = creep.memory.finish - creep.memory.start;
                Memory.stats.creep.mineral.extractTime = timeTaken;
                creep.memory.start = 0;
                creep.memory.finish = 0;
            }
        }
        else if(job == 'remote_mineral'){

             if(creep.memory.boost){
                let boosty = _.filter(creep.body, (t) => !t.boost && t.type == 'carry');
                let boostx = _.filter(creep.body, (t) => !t.boost && t.type == 'move');
                let boostLab = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral}});
                let boostLab2 = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LAB && s.mineralAmount > 0 && s.mineralType == creep.memory.mineral2}});
                if(boostLab.length && boosty.length){
                    if(boostLab[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab[0]);
                        return;
                    }
                }
                if(boostLab2.length && boostx.length){
                    if(boostLab2[0].boostCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(boostLab2[0]);
                        return;
                    }
                }

            }
            if(creep.memory.going == undefined) creep.memory.going = true;
            if(creep.memory.grab == undefined)  creep.memory.grab = false;
            if(creep.memory.reverse == undefined)   creep.memory.reverse = false;


           // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });


            if(creep.memory.going){
                if (Game.flags[goal] == undefined){
                        console.log('No ' + goal + ' Flag Found?');
                        return;
                    }
                else{


                    if(!creep.memory.goal) {
                            creep.memory.goal = 'Claim';
                    }
                    if(creep.memory.reverse == false){
                        switch(creep.memory.goal) {
                            case 'Claim':
                                if(!creep.memory.start || creep.memory.start == 0) creep.memory.start = Game.time;
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                                    creep.memory.goal = 'One';
                                }
                                break;
                            case 'One':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                                    creep.memory.goal = 'NEXT';
                                }
                                break;
                            case 'NEXT':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                                    creep.memory.goal = 'oxygen';
                                }
                                break;
                            case 'oxygen':
                                creep.moveTo(Game.flags[creep.memory.goal]);
                                if(creep.room == Game.flags[creep.memory.goal].room){
                                    creep.memory.grab = true;
                                    creep.memory.going = false;
                                }
                                break;
                        }
                    }
                    if (creep.room != Game.flags[creep.memory.goal].room) {
                        creep.moveTo(Game.flags[creep.memory.goal], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
            }

            if(creep.memory.grab){
                if(creep.memory.construct == undefined || (Game.time % 50) === 0){
                    let sites = creep.room.find(FIND_CONSTRUCTION_SITES);
                    let repairTargets = creep.room.find(FIND_STRUCTURES, {filter: function(s){
                            return (s.structureType == STRUCTURE_ROAD && s.hits < 4000)
                                    || (s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax)
                    }});
                    if(sites.length){
                        let minTar = _.min(sites,'hits');
                        creep.memory.build = true;
                        creep.memory.repair = false;
                        creep.memory.construct = minTar.id;
                    }
                    else if(repairTargets.length){
                        let minTar = _.min(repairTargets, 'hits');
                        creep.memory.repair = true;
                        creep.memory.build = false;
                        creep.memory.construct = minTar.id;
                    }
                }

                if(creep.ticksToLive < 600){
                    creep.memory.builder = false;
                    if(creep.memory.doom == undefined) creep.memory.doom = true;
                }

                if(creep.memory.builder){
                    if(creep.memory.building && total == 0) {
                        creep.memory.building = false;
                        creep.say('🔄 harvest');
                    }
                    if(!creep.memory.building && total == creep.carryCapacity) {
                        creep.memory.building = true;
                        creep.say('🚧 build');
                    }


                    if(creep.memory.building){

                        if(Game.getObjectById(creep.memory.construct) != null){
                            if(creep.memory.build){
                                if(Game.getObjectById(creep.memory.construct) == null){
                                    creep.memory.construct = undefined;
                                    return;
                                }
                                if(creep.build(Game.getObjectById(creep.memory.construct)) === ERR_NOT_IN_RANGE){
                                    creep.moveTo(Game.getObjectById(creep.memory.construct), {visualizePathStyle: {stroke:'red'}});
                                    return;
                                }
                            }
                            if(creep.memory.repair){
                                if(Game.getObjectById(creep.memory.construct).hits === Game.getObjectById(creep.memory.construct).hitsMax){
                                    creep.memory.construct = undefined;
                                    return;
                                }
                                if(creep.repair(Game.getObjectById(creep.memory.construct)) === ERR_NOT_IN_RANGE){
                                    creep.moveTo(Game.getObjectById(creep.memory.construct), {visualizePathStyle: {stroke:'red'}});
                                    return;
                                }
                            }
                        }
                    }
                    else if(!creep.memory.building) {
                        if(creep.memory.source == undefined || (Game.time % 20) === 0){
                            creep.memory.source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
                        }
                        if(Game.getObjectById(creep.memory.source) != undefined){
                            if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE){
                                creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke:'green'}});
                                return;
                            }
                        }
                    }

                    if(Game.getObjectById(creep.memory.construct) == null){
                        creep.memory.builder = false;
                    }
                }
                else if(!creep.memory.builder){

                    let oxy = Game.flags[goal].room.find(FIND_MINERALS);
                //    var oxy = false;
                    if(oxy){
                        //const totaloxy = _.sum(creep.carry);
                        if(total < creep.carryCapacity){

                            if(!creep.pos.isEqualTo(Game.flags['oxygen'].pos)){
                                creep.moveTo(Game.flags['oxygen']);
                            }
                            if((Game.time % 5) == 0){
                                creep.harvest(oxy[0]);
                            }
                        }
                    }

                    if(total == creep.carryCapacity){
                        creep.memory.going = false;
                        creep.memory.grab = false;
                        creep.memory.reverse = true;
                        creep.memory.goal = 'NEXT';
                    }
                }
            }

            if(creep.memory.reverse){
                if(!creep.memory.goal) {
                    creep.memory.goal = 'NEXT';
                }

                switch(creep.memory.goal) {
                    case 'NEXT':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'One';
                        }
                        break;
                    case 'One':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'Claim';
                        }
                        break;
                    case 'Claim':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        if(creep.pos.toString() == Game.flags[creep.memory.goal].pos.toString()){
                            creep.memory.goal = 'Main';
                        }
                        break;
                    case 'Main':
                        creep.moveTo(Game.flags[creep.memory.goal]);
                        break;
                }

                if(creep.room == Game.flags[creep.memory.goal].room){
                    let storages = creep.room.storage;
                    if(storages){
                        if(total > 0){
                            for(const resourceType in creep.carry) {
                                if(creep.transfer(Game.flags[goal].room.storage, resourceType) == ERR_NOT_IN_RANGE){
                                    creep.moveTo(Game.flags[goal].room.storage);
                                }
                                //return;
                            }
                        }
                    }
                    if(total == 0 && !creep.memory.doom){
                        if(!creep.memory.finish || creep.memory.finish == 0) creep.memory.finish = Game.time;
                        let timeTaken = creep.memory.finish - creep.memory.start;
                        Memory.stats.creep.mineral.extractTime = timeTaken;
                        creep.memory.start = 0;
                        creep.memory.finish = 0;

                        creep.memory.goal = 'Claim';
                        creep.memory.going = true;
                        creep.memory.reverse = false;
                    }
                    else if(total == 0 && creep.memory.doom){
                        if(!creep.memory.finish || creep.memory.finish == 0) creep.memory.finish = Game.time;
                        let timeTaken = creep.memory.finish - creep.memory.start;
                        Memory.stats.creep.mineral.extractTime = timeTaken;
                        creep.memory.start = 0;
                        creep.memory.finish = 0;

                        creep.memory.role = 'builder';
                        creep.memory.job = 'building';
                    }
                }
            }
        }




     /*   if(total == creep.carryCapacity){
            for(const resourceType in creep.carry) {
                if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
            }
        }*/


    }

};

module.exports = mineral;
