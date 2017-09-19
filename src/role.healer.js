var modeOffensive = true;
var healCreep = true;


var healer = {

    run: function(creep){
       // var flag1 = "Attacks";
        //var flag1 = "Drain";
        //var flag1 = 'Tank';
       var flag1 = 'GoHere';
    //    var flag1 = 'AttackThere';
        creep.moveTo(Game.flags[flag1], { visualizePathStyle: { stroke: '#22B91B' } });

        if (modeOffensive){
            if (Game.flags[flag1] == undefined){
                console.log("No Attacks Flag Found?");
                return;
            }
            else{
                if (creep.room != Game.flags[flag1].room) {
                    creep.moveTo(Game.flags[flag1], { visualizePathStyle: { stroke: '#22B91B' } });
                    return;
                }
            }
        }

        if(creep.room == Game.flags[flag1].room && healCreep){

            let hurtCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });

            if(hurtCreep) {
                if(creep.heal(hurtCreep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hurtCreep, {visualizePathStyle: { stroke: '#FFFFFF'}});
                    return;
                }
            }
        }

    }
};
module.exports = healer;
