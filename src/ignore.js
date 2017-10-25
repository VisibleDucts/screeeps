var ignore = {

    run: function(creep,func,name){
        //console.log(func);
        var allianceMembers;
        Memory.allies = [];
        init();
        //let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: p => !Memory.allianceMembers.has(p)})
        if((func != undefined || func != null) && (name != undefined || name != null)){
            if(func == 'hasMember'){
                return hasMember(name);
            }
            if(func == 'addMember'){
                addMember(name);
                return;
            }
        }


        function hasMember(name){
            return Memory.allianceMembers.has(name);
        }

        function addMember(name){
            Memory.allianceMembers.add(name);
            return;
        }

        function init(){
            if(allianceMembers == undefined || allianceMembers == null){
                allianceMembers = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript', 'Jestersheepy']);
                loopity();
                return;
            }

        }

        function loopity(){
            //init();
            //console.log(allianceMembers.has('Shylo132'));
            for(i of allianceMembers){
               Memory.allies.push(i);
            }
            return;
        }


    }

};

module.exports = ignore;

/*
Memory.allianceMembers = new Set(['Shylo132', 'mnuck', 'Lord Pong', 'complexQuanta', 'Augl', 'mightyleguan', 'pragmascript'])


let target = creep.room.find(FIND_HOSTILE_CREEPS, {filter: p => !Memory.allianceMembers.has(p)}) */
