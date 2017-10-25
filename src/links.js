var links = {

    run: function(links, roomName){

        if(links == undefined || links == null) return;

        var room1 = Game.rooms['W43S27'];
        var room2 = Game.rooms['W43S28'];
        var room3 = Game.rooms['W45S22'];
        var room4 = Game.rooms['W45S28'];
        var room5 = Game.rooms['W38S24'];

        if(roomName === room1){
            if(links.length){
                let energySend = links[0].energyCapacity - links[0].energy;
                if(links[1].energy <= energySend){
                    links[1].transferEnergy(links[0], energySend);
                }
                if(links[2].energy <= energySend){
                    links[2].transferEnergy(links[0], energySend);
                }
                if(links[3].energy <= energySend){
                    links[3].transferEnergy(links[0], energySend);
                }
            }
            return;
        }
        if(roomName === room2){
            if(links.length){
                let energySend1 = links[1].energyCapacity - links[1].energy;
                let energySend2 = links[3].energyCapacity - links[3].energy;
                if(links[0].energy >= energySend1){
                    links[0].transferEnergy(links[1], energySend1);
                }

                if(links[2].energy >= energySend2){
                    links[2].transferEnergy(links[3], energySend2);
                }
            }
            return;
        }
        else if(roomName === room3){
            if(links.length){
                let energySend = links[1].energyCapacity - links[1].energy;
                if(energySend === 800){
                    energySend = 400;
                }
                if(links[0].energy >= energySend){
                    links[0].transferEnergy(links[1],energySend);
                    return;
                }
                if(links[2].energy >= energySend){
                    links[2].transferEnergy(links[1],energySend);
                    return;
                }


            }
        }
        else if(roomName === room4){
            if(links.length){
                let energySend = links[1].energyCapacity - links[1].energy;
                if(links[0].energy >= energySend){
                    links[0].transferEnergy(links[1],energySend);
                    return;
                }

            }
        }
        else if(roomName === room5){
            if(links.length){
                let energySend = links[1].energyCapacity - links[1].energy;
                if(links[0].energy >= energySend){
                    links[0].transferEnergy(links[1],energySend);
                    return;
                }
            }
        }




    /********************* Link ids ***********************/
    /*Room 1
    var storage_r1 =    '59c1b3dac2426e29b9ff9880'; //links[0]
    var harvest0 =      '59c1c26dfb610e2e0a6a2b76'; //links[1]
    var exit_left =     '59c1dbaeb9340c0cb707f8dd'; //links[2]
    var exit_right =    '59c7d395e225561d04b3fce4'; //links[3]


    //Room 2
    var storage_r2_send =    '59bb5f4d080cf410740c0f93'; //links[0]
    var controller_r2 = '59bb6c597368b41214a8e5e8'; //links[1]
    var exit_right =    '59c06512b74fe7285184fd2d'; //links[2]
    var storage_r2_recieve =    '59d221503f71547c81521788'; //links[3]

    Room 1 logic: harvest and exit to storage  (1 and 2 to 0)
    Room 2 logic: storage to controller. ... exit not sure cause storage is busyyy (0 to 1)
    /*******************************************************/

  }

};

module.exports = links;
