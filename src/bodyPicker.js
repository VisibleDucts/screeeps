/**
    NOTES: Keep one MOVE at the end of the body array for battle creeps. So they have a move until they're dead...
    Adding a CARRY to battle creeps to pick up GO from invaders should be done sone. Plus the code to handle the GO
**/

bodyPicker = function(role){
        var body;
        switch(role){

            case 'harvester': body =            [MOVE,MOVE,MOVE,WORK,WORK,CARRY]; break;
            case 'defender': body =             [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,MOVE]; break;
            case 'ramparter': body =    //[TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE]; break;
                                                [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE]; break;
            case 'guard' : body =               [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,ATTACK,ATTACK,ATTACK,MOVE]; break;
            case 'backup': body=                [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE]; break;
            case 'hauler': body =               [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; break;
            case 'hauler_min': body =           [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY]; break;
            case 'sharvester': body =           [MOVE,WORK,WORK,WORK,WORK,WORK]; break;
            case 'sharvester2': body =          [MOVE,WORK,WORK,WORK,WORK,WORK]; break;
            case 'upgrader': body =             [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]; break;
            case 'upgrader_small': body =       [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; break;
            case 'builder': body =              [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; break;
            case 'repair': body =               [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; break;
            case 'towerHauler': body =          [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]; break;
            case 'remote': body =               [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK]; break;
            case 'claimer': body =              [CLAIM,CLAIM, MOVE, MOVE]; break;
            case 'remoteHauler': body =         [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; break;  //cheaper [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            case 'remoteRepairer': body =       [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; break; //[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY] 1.4k vs 1k
            case 'attacker': body =             [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE]; break;
            case 'attacker_small': body =       [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE]; break; //bo tough
            case 'attacker_medium': body =      [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE]; break; //10 x attack, 12 x move 2 x tough
            case 'rangedAttack': body =         [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,MOVE]; break; // cost 2.17K
            case 'linkHauler': body =           [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY]; break;
            case 'healer': body =               [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,MOVE]; break;
            case 'healer_big': body =           [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE]; break; //2.28k or there abouts. 7 x heal
            case 'healer_small': body =         [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,MOVE]; break;  //4 x heal
            case 'mineral': body =              [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]; break;
            case 'mineral_small': body =        [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]; break;
            //case 'remote_mineral': body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,HEAL,MOVE]; break;
            case 'remote_mineral': body =       [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE]; break;
            case 'dismantler': body =           [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,MOVE]; break;
            case 'dismantler2': body =          [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK]; break;
            case 'helpful_dismantler': body =   [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]; break;
            default: body = [WORK, CARRY, MOVE];
        }

        return body;

    }


module.exports = bodyPicker;
