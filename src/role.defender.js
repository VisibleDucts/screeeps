var attackCreep = true;

var roleDefender = {

    run: function(creep, job, loc){
       //Game.creeps.Nathan.moveTo(Game.flags['Flag1']);
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                    && (p.owner.username != 'mnuck')
                    && (p.owner.username != 'LordPong')
                    && (p.owner.username != 'complexQuanta')
                    && (p.owner.username != 'Augl')
                    && (p.owner.username != 'mightyleguan')
                    && (p.owner.username != 'pragmascript');
                }
            });

            if(job == 'guard'){
                if (Game.flags[loc] == undefined){
                    console.log('No ' + loc + ' Flag Found?');
                    return;
                }
                else{

                    if (creep.room.toString()  != Game.flags[loc].room.toString()) {
                        creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                        return;
                    }
                }
            if (attackCreep){
                let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132')
                        && (p.owner.username != 'mnuck')
                        && (p.owner.username != 'LordPong')
                        && (p.owner.username != 'complexQuanta')
                        && (p.owner.username != 'Augl')
                        && (p.owner.username != 'mightyleguan')
                        && (p.owner.username != 'pragmascript');
                    }
                }); //var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != 'Shylo132');}});
                if((Game.time % 10) == 0){
                    creep.say('HUG ME');
                }
                if (target == undefined) return;
                if (creep.attack(target[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }
        else{
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
               creep.moveTo(closestHostile);
            }


        }
    }
};
module.exports = roleDefender;
