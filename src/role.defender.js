var attackCreep = true;

var defender = {

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
                const dropped = creep.room.find(FIND_DROPPED_RESOURCES);
                const can = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_CONTAINER; }});
                if (Game.flags[loc] == undefined){
                    console.log('No ' + loc + ' Flag Found?');
                    return;
                }
                else{

                    if (creep.room  != Game.flags[loc].room) {
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
            if(dropped.length) {
                if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    return;
                }
            }

            total = _.sum(creep.carry);
            if(total > 0){
                for(const resourceType in creep.carry) {
                    if(creep.transfer(can[0], resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(can[0]);
                    }
                }
            }
        }
        else if(job == 'ramparter'){
            if (Game.flags[loc] == undefined){
                console.log('No ' + loc + ' Flag Found?');
                return;
            }
            else{
                if (creep.pos != Game.flags[loc].pos) {
                    creep.moveTo(Game.flags[loc], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
            const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if(targets.length > 0) {
                creep.rangedAttack(targets[0]);
            }
        }
        else{
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
               creep.moveTo(closestHostile);
            }


        }
    }
};
module.exports = defender;
