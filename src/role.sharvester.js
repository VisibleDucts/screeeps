//Memory.y = 0;

var sharvester = {

        /** @param {Creep} creep **/
        run: function(creep, loc, sources) {
            //console.log(sources);
           // console.log(creep.pos + ' ' + Game.flags[loc.toString()].pos);
            if(loc){
                if(creep.pos.toString() !=  Game.flags[loc.toString()].pos.toString()){
                    creep.moveTo(Game.flags[loc.toString()].pos);
                    return;
                }
               // console.log(creep.pos != Game.flags[loc.toString()].pos);
               else{
                    var can = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function(structure){ return (structure.structureType == STRUCTURE_CONTAINER)}});
                    var total = _.sum(can.store);
                    if(can && total < 2000){
                        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                            return;
                        }
                    }
                }
            }

        }
    };

    module.exports = sharvester;
