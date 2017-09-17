var ignore = {

    run:function(creep){
        var AllianceMembers = ["Shylo132", "mnuck", "Augi", "complexQuanta"];
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (p) => {return (p.owner.username != AllianceMembers[0]);}});

    }
};

module.exports = ignore;
