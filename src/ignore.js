var ignore = {

    run: function(creep){
                
        let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: p => !Memory.allianceMembers.has(p)})

        function hasMember(name){
            return Memory.allianceMembers.has(name);
        }

        function addMember(name){
            Memory.allianceMembers.add(name);
            return;
        }
    }

};

module.exports = ignore;

/*
Memory.allianceMembers = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript'])


let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: p => !Memory.allianceMembers.has(p)}) */
