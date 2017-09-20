var mineral = {

    run: function(creep, job, goal, home){
        const total = _.sum(creep.carry);
        if(job == 'normal'){
            var extractor = creep.room.find(FIND_MINERALS);

            if(extractor){
                //creep.say('hi');

                if(total < creep.carryCapacity){
                    if(creep.harvest(extractor[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(extractor[0], {visualizePathStyle: {stroke: 'red'}});
                        return;
                    }
                }
            }
            if(total == creep.carryCapacity){
                for(const resourceType in creep.carry) {
                    if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.storage);
                    }
                }
            }
        }
        else if(job == 'remote_mineral'){
            if(!creep.memory.path1 && total != creep.carryCapacity){
                if (creep.room != Game.flags['path_oxygen'].room) {
                    creep.moveTo(Game.flags['path_oxygen'], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
                else if(creep.room == Game.flags['path_oxygen'].room){
                    creep.memory.path1 = true;
                }
            }
            if(creep.memory.path1){
                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }

            if(creep.room == Game.flags[goal].room){
                let oxy = Game.flags[goal].room.find(FIND_MINERALS);
                if(oxy){
                    const totaloxy = _.sum(creep.carry);
                    if(total < creep.carryCapacity){
                        if(creep.harvest(oxy[0]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(oxy[0], {visualizePathStyle: {stroke: 'red'}});
                            return;
                        }
                    }
                }
            }
            if(total == creep.carryCapacity){
                creep.memory.path1 = false;
                if(!creep.memory.return){
                    if (creep.room != Game.flags['path_oxygen'].room) {
                        creep.moveTo(Game.flags['path_oxygen'], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
                if(creep.room == Game.flags['path_oxygen'].room){
                    creep.memory.return = true;
                }
                if(creep.memory.return){
                    if (creep.room != Game.flags['Main'].room) {
                        creep.moveTo(Game.flags['Main'], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }

        }
        if(total == creep.carryCapacity){
            for(const resourceType in creep.carry) {
                if(creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
            }
        }

    }
}

};

module.exports = mineral;
