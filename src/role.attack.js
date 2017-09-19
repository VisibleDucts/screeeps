var modeOffensive = true;
var attackCreep = true;;
var attackStructure = false;

var attacker = {
    run: function(creep, goal){
        // creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
        if (modeOffensive){
            if (Game.flags[goal] == undefined){
                console.log("No " + goal + " Flag Found?");
                return;
            }
            else{
                if (creep.room != Game.flags[goal].room) {
                    creep.moveTo(Game.flags[goal], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
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
            });
            creep.say('HUG ME');
            if (target == undefined) return;
            if (creep.attack(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0], { visualizePathStyle: { stroke: '#22B91B' } });
                return;
            }
        }

        if(attackStructure){

            var structure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
            if (structure == undefined) return;
            if(creep.attack(structure) == ERR_NOT_IN_RANGE){
                creep.moveTo(structure, { visualizePathStyle: { stroke: '#22B91B' } });
                creep.say('LOVE ME');
                return;
            }
        }
    }
};
module.exports = attacker;
