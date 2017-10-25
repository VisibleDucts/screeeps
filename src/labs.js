var labs = {

    /** @param {string} roomName, @param {number} input1,@param {number} input2, @param {number} output  **/
    reaction: function(roomName, input1, input2, output){
        let room = Game.rooms[roomName];
        let labs = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_LAB }});
        if(labs.length){
            if(Game.time % 10 === 0){
                if(labs[input1].mineralAmount > 0 && labs[input2].mineralAmount > 0){
                    labs[output].runReaction(labs[input1], labs[input2]);
                    return;
                }
            }
        }

    },

    /** @param {Creep} creep,@param {string} roomName,@param {number} num,@param {string} mineral **/
    fill: function(creep, roomName, num, mineral){
        let room = Game.rooms[roomName];
        let labs = room.find(FIND_MY_STRUCTURES, {filter: (s)=> { return s.structureType == STRUCTURE_LAB;}});
        let total = _.sum(creep.carry);
        if(creep.room.storage !== undefined){
            var storage = creep.room.storage;
            var hasStorage = true;
        }
        if(creep.room.terminal !== undefined){
            var terminal = creep.room.terminal;
            var hasTerminal = true;
        }

        if(labs.length > 0){

            if(labs[num].mineralType !== null && labs[num].mineralType !== mineral){
                console.log('ERROR: lab has ' + labs[num].mineralType + ' and needs to be emptied first.');
                return;
            }
            if(labs[num].mineralType === null || labs[num].mineralType === mineral){
                if(labs[num].mineralAmount < labs[num].mineralCapacity){
                    if(total < creep.carryCapacity){
                        if(hasStorage && mineral in storage.store){
                            if(creep.withdraw(storage, mineral) === ERR_NOT_IN_RANGE){
                                creep.moveTo(storage, {visualizePathStyle: {stroke: 'blue'}});
                                return;
                            }
                        }
                        if(hasTerminal && mineral in terminal.store){
                            if(creep.withdraw(terminal, mineral) === ERR_NOT_IN_RANGE){
                                creep.moveTo(terminal, {visualizePathStyle: {stroke: 'blue'}});
                                return;
                            }
                        }
                        if(!hasStorage && !hasTerminal){
                            console.log(room + ' has no storage or terminal to withdraw minerals from.');
                            return;
                        }
                    }
                    if(total > 0 && mineral in creep.carry){
                        if(creep.transfer(labs[num], mineral) === ERR_NOT_IN_RANGE){
                            creep.moveTo(labs[num]);
                            return;
                        }
                    }
                }
                if(total > 0 && labs[num].mineralAmount === labs[num].mineralCapacity && creep.carry[mineral] > 0){
                    if(hasTerminal){
                        if(_.sum(terminal.store) < 200000){
                            if(creep.transfer(terminal, mineral) === ERR_NOT_IN_RANGE){
                                creep.moveTo(terminal);
                                return;
                            }
                        }
                    }
                    if(hasStorage){
                        if(_.sum(storage.store) < storage.storeCapacity){
                            if(creep.transfer(storage, mineral) === ERR_NOT_IN_RANGE){
                                creep.moveTo(storage);
                                return;
                            }
                        }
                    }
                }
            }
        }
    },

    /** @param {Creep} creep, @param {string} mineral **/
    remove: function(creep, mineral){
        let labs = creep.room.find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_LAB && s.mineralType === mineral});
        let total = _.sum(creep.carry);
        if(creep.room.storage !== undefined){
            var storage = creep.room.storage;
            var hasStorage = true;
        }
        if(creep.room.terminal !== undefined){
            var terminal = creep.room.terminal;
            var hasTerminal = true;
        }

        if(!hasStorage && !hasTerminal){
            console.log(creep.room + ' has no storage or terminal to withdraw minerals from.');
            return;
        }

        if(labs.length > 0 && total < creep.carryCapacity){
            if(creep.withdraw(labs[0], mineral) === ERR_NOT_IN_RANGE){
                creep.moveTo(labs[0], {visualizePathStyle:{stroke:'blue'}});
                return;
            }
            return;
        }
        if(total > 0){
            if(hasTerminal && _.sum(terminal.store) < 250000){
                for(const resourceType in creep.carry) {
                    if(creep.transfer(terminal, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: 'red'}});
                        return;
                    }
                }
            }
            if(hasStorage && _.sum(storage.store) < storage.storeCapacity){
                for(const resourceType in creep.carry) {
                    if(creep.transfer(storage, resourceType) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage, {visualizePathStyle: {stroke: 'red'}});
                        return;
                    }
                }
            }
        }
    },

    getBoosted: function(creep, room, mineral, bodyPart){


    },

    run: function(creep, boost, mineral, bodyPart){
        const labs = creep.room.find(FIND_STRUCTURES, {filter: (l) => {return l.structureType == STRUCTURE_LAB }});


        if(boost){
            let num;
            switch(mineral){
                case 'XZHO2': num = 0; break;
                case 'XLHO2': num = 1; break;
                case 'XZH2O': num = 2; break;
            }
            if(creep.pos != labs[num].pos){
                creep.moveTo(labs[num]);
                return;
            }
            if(creep.pos == labs[num].pos){
                labs[num].boostCreep(creep)
            }

        }
    }
};

module.exports = labs;
