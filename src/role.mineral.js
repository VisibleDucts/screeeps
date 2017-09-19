var mineral = {

    run: function(creep, job){

        var extractor = creep.room.find(FIND_MINERALS);

        if(extractor){

            //creep.say('hi');
            const total = _.sum(creep.carry);
            if(total < creep.carryCapacity){

                if(creep.harvest(extractor[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(extractor[0], {visualizePathStyle: {stroke: 'red'}});
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
