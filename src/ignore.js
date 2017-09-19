var ignore = {

    function getMember(name){
        Memory.allianceMembers = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript'])

    }

    run:function(creep){
        let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: p => !Memory.allianceMembers.has(p)})
        /*let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: (p) => {return (!p.owner.getMember('Shylo132')
                && (!p.owner.getMember('mnuck'))
                && (!p.owner.getMember('LordPong'))
                && (!p.owner.getMember('complexQuanta'))
                && (!p.owner.getMember('Augl'))
                && (!p.owner.getMember('mightyleguan'))
                && (!p.owner.getMember('pragmascript'));
            }
        }); */
    }
};

module.exports = ignore;

Memory.allianceMembers = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript'])


let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: p => !Memory.allianceMembers.has(p)})
